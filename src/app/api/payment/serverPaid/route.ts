/** src/app/api/payment/serverPaid/route.ts */
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function parseBackendOrigin(apiUrl: string) {
    try {
        const u = new URL(apiUrl);
        return `${u.protocol}//${u.hostname}${u.port ? ':' + u.port : ''}`;
    } catch {
        return null;
    }
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 7000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...init, signal: controller.signal });
    } finally {
        clearTimeout(id);
    }
}

export async function POST(req: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ex) http://testvms.commtrace.com:33004/api
    if (!apiUrl) {
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error(/serverPaid)', error: 'API_URL is not configured' },
            { status: 500 }
        );
    }
    const backendOrigin = parseBackendOrigin(apiUrl) || 'http://testvms.commtrace.com:33004'; // fallback
    const upstreamJsonUrl = `${apiUrl}/paid/serverPaid`;
    const auth = req.headers.get('authorization') || '';

    try {
        const raw = await req.text();
        let body: any = {};
        try {
            body = raw ? JSON.parse(raw) : {};
        } catch {
            body = {};
        }

        // FE에서 보낸 receiptId/receipt_id를 강제 정규화
        const rid = body.receiptId ?? body.receipt_id;
        const receiptId = (rid ?? '').toString().trim();
        if (!receiptId) {
            return NextResponse.json(
                { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
                { status: 400 }
            );
        }

        // 서버 특성상: query string 금지(혼란 가능). → Form only (no query)
        // 1) FORM + AUTH + Backend Origin
        {
            const form = new URLSearchParams();
            form.set('receipt_id', receiptId); // 서버가 이 이름만 읽는 것으로 보임

            const headers: Record<string, string> = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Accept: 'application/json',
                Origin: backendOrigin,                          // 백엔드 도메인 기준
                Referer: backendOrigin + '/paid/serverPaid',    // 백엔드 경로 기준
            };
            if (auth) {
                headers['Authorization'] = auth;                // 서버가 Bearer 검사하면 통과
                headers['X-Auth-Token'] = auth.replace(/^Bearer\s+/i, '');
            }

            try {
                const r = await fetchWithTimeout(upstreamJsonUrl, {
                    method: 'POST',
                    headers,
                    body: form.toString(),
                    cache: 'no-store',
                }, 7000);
                const t = await r.text();
                console.log('[serverPaid proxy] FORM(AUTH) status:', r.status, 'body:', t || '(empty)');
                if (r.ok) {
                    return new NextResponse(t || '', {
                        status: r.status,
                        headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
                    });
                }
                // 403 등 실패면 다음 단계로 폴백
            } catch (e: any) {
                console.error('[serverPaid proxy] FORM(AUTH) exception:', e?.message || e, 'cause:', e?.cause);
            }
        }

        // 2) FORM + NO AUTH + Backend Origin (일부 서버는 Authorization 헤더가 있으면 CORS/CSRF로 막기도 함)
        {
            const form = new URLSearchParams();
            form.set('receipt_id', receiptId);

            try {
                const r = await fetchWithTimeout(upstreamJsonUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        Accept: 'application/json',
                        Origin: backendOrigin,
                        Referer: backendOrigin + '/paid/serverPaid',
                    },
                    body: form.toString(),
                    cache: 'no-store',
                }, 7000);
                const t = await r.text();
                console.log('[serverPaid proxy] FORM(no AUTH) status:', r.status, 'body:', t || '(empty)');
                if (r.ok) {
                    return new NextResponse(t || '', {
                        status: r.status,
                        headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
                    });
                }
            } catch (e: any) {
                console.error('[serverPaid proxy] FORM(no AUTH) exception:', e?.message || e, 'cause:', e?.cause);
            }
        }

        // 3) FORM + NO AUTH + X-Requested-With (서버가 AJAX 요청만 화이트리스트 했을 수도 있음)
        {
            const form = new URLSearchParams();
            form.set('receipt_id', receiptId);

            try {
                const r = await fetchWithTimeout(upstreamJsonUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        Accept: 'application/json',
                        Origin: backendOrigin,
                        Referer: backendOrigin + '/paid/serverPaid',
                        'X-Requested-With': 'XMLHttpRequest',
                        'User-Agent': 'Mozilla/5.0', // 일부 서버는 UA로 필터링하기도 함
                    },
                    body: form.toString(),
                    cache: 'no-store',
                }, 7000);
                const t = await r.text();
                console.log('[serverPaid proxy] FORM(no AUTH + XRW) status:', r.status, 'body:', t || '(empty)');
                if (r.ok) {
                    return new NextResponse(t || '', {
                        status: r.status,
                        headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
                    });
                }
            } catch (e: any) {
                console.error('[serverPaid proxy] FORM(no AUTH + XRW) exception:', e?.message || e, 'cause:', e?.cause);
            }
        }

        // 모두 실패 ⇒ 서버 원문 그대로 만들 수 없으니 400/403 그대로 전달 불가 → 원인 노출
        return NextResponse.json(
            {
                status: false,
                orderMessage: 'fail',
                error: 'serverPaid upstream blocked (likely CSRF/Origin/Content-type policy). Only POST form with receipt_id is accepted by server.',
            },
            { status: 400 }
        );
    } catch (e: any) {
        console.error('[serverPaid proxy] FATAL:', e?.message || e);
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
            { status: 500 }
        );
    }
}