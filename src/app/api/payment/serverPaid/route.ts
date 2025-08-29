/** src/app/api/payment/serverPaid/route.ts */
// import { NextRequest, NextResponse } from 'next/server';
//
// export const runtime = 'nodejs';
//
// function parseBackendOrigin(apiUrl: string) {
//     try {
//         const u = new URL(apiUrl);
//         return `${u.protocol}//${u.hostname}${u.port ? ':' + u.port : ''}`;
//     } catch {
//         return null;
//     }
// }
//
// async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 7000) {
//     const controller = new AbortController();
//     const id = setTimeout(() => controller.abort(), timeoutMs);
//     try {
//         return await fetch(url, { ...init, signal: controller.signal });
//     } finally {
//         clearTimeout(id);
//     }
// }
//
// export async function POST(req: NextRequest) {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ex) http://testvms.commtrace.com:33004/api
//     if (!apiUrl) {
//         return NextResponse.json(
//             { status: false, orderMessage: 'proxy error(/serverPaid)', error: 'API_URL is not configured' },
//             { status: 500 }
//         );
//     }
//     const backendOrigin = parseBackendOrigin(apiUrl) || 'http://testvms.commtrace.com:33004'; // fallback
//     const upstreamJsonUrl = `${apiUrl}/paid/serverPaid`;
//     const auth = req.headers.get('authorization') || '';
//
//     try {
//         const raw = await req.text();
//         let body: any = {};
//         try {
//             body = raw ? JSON.parse(raw) : {};
//         } catch {
//             body = {};
//         }
//
//         // FE에서 보낸 receiptId/receipt_id를 강제 정규화
//         const rid = body.receiptId ?? body.receipt_id;
//         const receiptId = (rid ?? '').toString().trim();
//         if (!receiptId) {
//             return NextResponse.json(
//                 { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
//                 { status: 400 }
//             );
//         }
//
//         // 서버 특성상: query string 금지(혼란 가능). → Form only (no query)
//         // 1) FORM + AUTH + Backend Origin
//         {
//             const form = new URLSearchParams();
//             form.set('receipt_id', receiptId); // 서버가 이 이름만 읽는 것으로 보임
//
//             const headers: Record<string, string> = {
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                 Accept: 'application/json',
//                 Origin: backendOrigin,                          // 백엔드 도메인 기준
//                 Referer: backendOrigin + '/paid/serverPaid',    // 백엔드 경로 기준
//             };
//             if (auth) {
//                 headers['Authorization'] = auth;                // 서버가 Bearer 검사하면 통과
//                 headers['X-Auth-Token'] = auth.replace(/^Bearer\s+/i, '');
//             }
//
//             try {
//                 const r = await fetchWithTimeout(upstreamJsonUrl, {
//                     method: 'POST',
//                     headers,
//                     body: form.toString(),
//                     cache: 'no-store',
//                 }, 7000);
//                 const t = await r.text();
//                 console.log('[serverPaid proxy] FORM(AUTH) status:', r.status, 'body:', t || '(empty)');
//                 if (r.ok) {
//                     return new NextResponse(t || '', {
//                         status: r.status,
//                         headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
//                     });
//                 }
//                 // 403 등 실패면 다음 단계로 폴백
//             } catch (e: any) {
//                 console.error('[serverPaid proxy] FORM(AUTH) exception:', e?.message || e, 'cause:', e?.cause);
//             }
//         }
//
//         // 2) FORM + NO AUTH + Backend Origin (일부 서버는 Authorization 헤더가 있으면 CORS/CSRF로 막기도 함)
//         {
//             const form = new URLSearchParams();
//             form.set('receipt_id', receiptId);
//
//             try {
//                 const r = await fetchWithTimeout(upstreamJsonUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                         Accept: 'application/json',
//                         Origin: backendOrigin,
//                         Referer: backendOrigin + '/paid/serverPaid',
//                     },
//                     body: form.toString(),
//                     cache: 'no-store',
//                 }, 7000);
//                 const t = await r.text();
//                 console.log('[serverPaid proxy] FORM(no AUTH) status:', r.status, 'body:', t || '(empty)');
//                 if (r.ok) {
//                     return new NextResponse(t || '', {
//                         status: r.status,
//                         headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
//                     });
//                 }
//             } catch (e: any) {
//                 console.error('[serverPaid proxy] FORM(no AUTH) exception:', e?.message || e, 'cause:', e?.cause);
//             }
//         }
//
//         // 3) FORM + NO AUTH + X-Requested-With (서버가 AJAX 요청만 화이트리스트 했을 수도 있음)
//         {
//             const form = new URLSearchParams();
//             form.set('receipt_id', receiptId);
//
//             try {
//                 const r = await fetchWithTimeout(upstreamJsonUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                         Accept: 'application/json',
//                         Origin: backendOrigin,
//                         Referer: backendOrigin + '/paid/serverPaid',
//                         'X-Requested-With': 'XMLHttpRequest',
//                         'User-Agent': 'Mozilla/5.0', // 일부 서버는 UA로 필터링하기도 함
//                     },
//                     body: form.toString(),
//                     cache: 'no-store',
//                 }, 7000);
//                 const t = await r.text();
//                 console.log('[serverPaid proxy] FORM(no AUTH + XRW) status:', r.status, 'body:', t || '(empty)');
//                 if (r.ok) {
//                     return new NextResponse(t || '', {
//                         status: r.status,
//                         headers: { 'Content-Type': r.headers.get('content-type') || 'application/json' },
//                     });
//                 }
//             } catch (e: any) {
//                 console.error('[serverPaid proxy] FORM(no AUTH + XRW) exception:', e?.message || e, 'cause:', e?.cause);
//             }
//         }
//
//         // 모두 실패 ⇒ 서버 원문 그대로 만들 수 없으니 400/403 그대로 전달 불가 → 원인 노출
//         return NextResponse.json(
//             {
//                 status: false,
//                 orderMessage: 'fail',
//                 error: 'serverPaid upstream blocked (likely CSRF/Origin/Content-type policy). Only POST form with receipt_id is accepted by server.',
//             },
//             { status: 400 }
//         );
//     } catch (e: any) {
//         console.error('[serverPaid proxy] FATAL:', e?.message || e);
//         return NextResponse.json(
//             { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
//             { status: 500 }
//         );
//     }
// }

// src/app/api/payment/serverPaid/route.ts
// import { NextRequest, NextResponse } from 'next/server';
//
// export const runtime = 'nodejs';
//
// async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 7000) {
//     const controller = new AbortController();
//     const id = setTimeout(() => controller.abort(), timeoutMs);
//     try {
//         return await fetch(url, { ...init, signal: controller.signal });
//     } finally {
//         clearTimeout(id);
//     }
// }
//
// export async function POST(req: NextRequest) {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g., http://testvms.commtrace.com:33004/api
//     if (!apiUrl) {
//         return NextResponse.json(
//             { status: false, orderMessage: 'proxy error(/serverPaid)', error: 'API_URL is not configured' },
//             { status: 500 }
//         );
//     }
//
//     try {
//         const raw = await req.text();
//         let body: any = {};
//         try { body = raw ? JSON.parse(raw) : {}; } catch { body = {}; }
//
//         const rid = body.receiptId ?? body.receipt_id;
//         const receiptId = (rid ?? '').toString().trim();
//         if (!receiptId) {
//             return NextResponse.json(
//                 { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
//                 { status: 400 }
//             );
//         }
//
//         const upstreamUrl = `${apiUrl}/paid/serverPaid`;
//
//         // ===== Try #1: MINIMAL FORM (no Origin/Referer/Auth) =====
//         try {
//             const form1 = new URLSearchParams();
//             form1.set('receipt_id', receiptId); // 오직 receipt_id만
//
//             const r1 = await fetchWithTimeout(upstreamUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                     // Accept 헤더조차 빼서 최대한 단순하게
//                 },
//                 body: form1.toString(),
//                 cache: 'no-store',
//             }, 7000);
//             const t1 = await r1.text();
//             console.log('[serverPaid proxy] FORM#1(minimal) status:', r1.status, 'body:', t1 || '(empty)');
//             if (r1.ok) {
//                 return new NextResponse(t1 || '', {
//                     status: r1.status,
//                     headers: { 'Content-Type': r1.headers.get('content-type') || 'application/json' },
//                 });
//             }
//         } catch (e: any) {
//             console.error('[serverPaid proxy] FORM#1(minimal) exception:', e?.message || e, 'cause:', e?.cause);
//         }
//
//         // ===== Try #2: FORM + Authorization (필요시만) =====
//         try {
//             const form2 = new URLSearchParams();
//             form2.set('receipt_id', receiptId);
//
//             const auth = req.headers.get('authorization') || ''; // 로컬 userToken
//             const headers2: Record<string, string> = {
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//             };
//             if (auth) {
//                 headers2['Authorization'] = auth;
//                 headers2['X-Auth-Token'] = auth.replace(/^Bearer\s+/i, '');
//             }
//
//             const r2 = await fetchWithTimeout(upstreamUrl, {
//                 method: 'POST',
//                 headers: headers2,
//                 body: form2.toString(),
//                 cache: 'no-store',
//             }, 7000);
//             const t2 = await r2.text();
//             console.log('[serverPaid proxy] FORM#2(auth) status:', r2.status, 'body:', t2 || '(empty)');
//             if (r2.ok) {
//                 return new NextResponse(t2 || '', {
//                     status: r2.status,
//                     headers: { 'Content-Type': r2.headers.get('content-type') || 'application/json' },
//                 });
//             }
//         } catch (e: any) {
//             console.error('[serverPaid proxy] FORM#2(auth) exception:', e?.message || e, 'cause:', e?.cause);
//         }
//
//         // ===== Try #3: MULTIPART FORM (간혹 urlencoded 차단 & multipart 허용 케이스) =====
//         try {
//             const fd = new FormData();
//             fd.set('receipt_id', receiptId);
//
//             // multipart는 Content-Type 자동 설정(바운더리 포함). 절대 수동으로 넣지 않기
//             const r3 = await fetchWithTimeout(upstreamUrl, {
//                 method: 'POST',
//                 body: fd as any,
//                 cache: 'no-store',
//             }, 7000);
//             const t3 = await r3.text();
//             console.log('[serverPaid proxy] FORM#3(multipart) status:', r3.status, 'body:', t3 || '(empty)');
//             if (r3.ok) {
//                 return new NextResponse(t3 || '', {
//                     status: r3.status,
//                     headers: { 'Content-Type': r3.headers.get('content-type') || 'application/json' },
//                 });
//             }
//         } catch (e: any) {
//             console.error('[serverPaid proxy] FORM#3(multipart) exception:', e?.message || e, 'cause:', e?.cause);
//         }
//
//         // ===== Try #4: FORM + 추가필드(orderId, billingPrice) =====
//         // (서버가 이 필드를 요구할 수도 있으니 마지막에만 넣는다 — 일부 서버는
//         //  receipt_id 외 필드가 오면 차단할 수 있음)
//         try {
//             const form4 = new URLSearchParams();
//             form4.set('receipt_id', receiptId);
//             if (body.orderId) form4.set('orderId', String(body.orderId));
//             if (body.billingPrice != null) form4.set('billingPrice', String(body.billingPrice));
//
//             const r4 = await fetchWithTimeout(upstreamUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                 },
//                 body: form4.toString(),
//                 cache: 'no-store',
//             }, 7000);
//             const t4 = await r4.text();
//             console.log('[serverPaid proxy] FORM#4(extra fields) status:', r4.status, 'body:', t4 || '(empty)');
//             if (r4.ok) {
//                 return new NextResponse(t4 || '', {
//                     status: r4.status,
//                     headers: { 'Content-Type': r4.headers.get('content-type') || 'application/json' },
//                 });
//             }
//         } catch (e: any) {
//             console.error('[serverPaid proxy] FORM#4(extra fields) exception:', e?.message || e, 'cause:', e?.cause);
//         }
//
//         // 모든 시도 실패
//         return NextResponse.json(
//             {
//                 status: false,
//                 orderMessage: 'fail',
//                 error: 'serverPaid upstream blocked (likely CSRF/Origin/Content-type policy). Only very specific POST form is accepted. Tried: minimal, auth, multipart, extra fields.',
//             },
//             { status: 400 }
//         );
//     } catch (e: any) {
//         console.error('[serverPaid proxy] FATAL:', e?.message || e);
//         return NextResponse.json(
//             { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
//             { status: 500 }
//         );
//     }
// }


import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Node 런타임 강제 (edge에서 fetch 실패 방지)

// ---------- Helpers ----------
function jsonContentType(h: Headers) {
    return h.get('content-type') || 'application/json';
}

function buildCommonHeaders(auth: string, originHeader: string) {
    return {
        Accept: 'application/json',
        ...(auth ? { Authorization: auth } : {}),
        ...(auth ? { 'X-Auth-Token': auth.replace(/^Bearer\s+/i, '') } : {}),
        Origin: originHeader,
        Referer: originHeader + '/ko/online-store/payment-result',
    } as Record<string, string>;
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

function setParam(form: URLSearchParams, k: string, v: any) {
    if (v === undefined || v === null) return;
    form.append(k, typeof v === 'string' ? v : String(v));
}

function appendDeliveryInfoAllForms(form: URLSearchParams, delivery: any) {
    if (!delivery || typeof delivery !== 'object') return;
    // 1) JSON 문자열
    setParam(form, 'deliveryInfo', JSON.stringify(delivery));
    // 2) dot notation
    Object.entries(delivery).forEach(([dk, dv]) => {
        setParam(form, `deliveryInfo.${dk}`, dv);
    });
    // 3) bracket notation
    Object.entries(delivery).forEach(([dk, dv]) => {
        setParam(form, `deliveryInfo[${dk}]`, dv);
    });
}

function appendAllParamsUrlencoded(form: URLSearchParams, body: any) {
    // 1-depth 필드들
    const keys = [
        'productId', 'productNm', 'finalPrice', 'orderStatus', 'purchaseQuantity',
        'productPrice', 'taxAddYn', 'taxAddType', 'taxAddValue', 'paidPrice',
        'expiredDate', 'purchaseIndex', 'orderId', 'billingPrice',
    ];
    keys.forEach(k => setParam(form, k, body[k]));

    // receiptId / receipt_id 둘 다
    const rid = (body.receiptId ?? body.receipt_id ?? '').toString().trim();
    setParam(form, 'receiptId', rid);
    setParam(form, 'receipt_id', rid);

    // deliveryInfo는 3방식 모두
    appendDeliveryInfoAllForms(form, body.deliveryInfo);
}

async function tryFormUrlencoded(upstreamUrl: string, body: any, extraHeaders: Record<string, string> = {}) {
    const form = new URLSearchParams();
    appendAllParamsUrlencoded(form, body);

    return await fetchWithTimeout(upstreamUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            ...extraHeaders,
        },
        body: form.toString(),
        cache: 'no-store',
    }, 7000);
}

async function tryFormMultipart(upstreamUrl: string, body: any, extraHeaders: Record<string, string> = {}) {
    const fd = new FormData();

    // 1-depth 필드
    const keys = [
        'productId', 'productNm', 'finalPrice', 'orderStatus', 'purchaseQuantity',
        'productPrice', 'taxAddYn', 'taxAddType', 'taxAddValue', 'paidPrice',
        'expiredDate', 'purchaseIndex', 'orderId', 'billingPrice',
    ];
    keys.forEach(k => {
        const v = body[k];
        if (v !== undefined && v !== null) fd.append(k, typeof v === 'string' ? v : String(v));
    });

    // receiptId / receipt_id
    const rid = (body.receiptId ?? body.receipt_id ?? '').toString().trim();
    fd.append('receiptId', rid);
    fd.append('receipt_id', rid);

    // deliveryInfo: 3방식 모두
    const d = body.deliveryInfo || {};
    fd.append('deliveryInfo', JSON.stringify(d));
    Object.entries(d).forEach(([dk, dv]) => fd.append(`deliveryInfo.${dk}`, String(dv ?? '')));
    Object.entries(d).forEach(([dk, dv]) => fd.append(`deliveryInfo[${dk}]`, String(dv ?? '')));

    return await fetchWithTimeout(upstreamUrl, {
        method: 'POST',
        headers: {
            // multipart는 boundary 자동 부여됨
            ...extraHeaders,
        },
        body: fd,
        cache: 'no-store',
    }, 7000);
}

// (옵션) 업스트림 세션/CSRF가 필요한 경우, 로그인/토큰 발급 후 Cookie/헤더를 반환하는 유틸을 여기에 붙인다.
// async function ensureUpstreamSession(): Promise<{ cookie?: string; csrf?: string }> {
//   /*
//   1) 로그인 POST → Set-Cookie 획득
//   2) CSRF 토큰 페이지/엔드포인트 호출 → 토큰 추출
//   3) return { cookie: "JSESSIONID=...", csrf: "..." }
//   */
//   return {};
// }

// ---------- Route ----------
export async function POST(req: NextRequest) {
    const originHeader = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const auth = req.headers.get('authorization') || '';
        console.log('[serverPaid proxy] incoming Authorization:', auth ? auth.slice(0, 20) + '…' : '(none)');
        console.log('[serverPaid proxy] ENV NEXT_PUBLIC_API_URL:', apiUrl);

        const raw = await req.text();
        let body: any = {};
        try {
            body = raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.warn('[serverPaid proxy] WARN: request JSON parse failed, raw=', raw?.slice(0, 200));
            body = {};
        }

        // receiptId 확보 (camel or snake)
        const rid = body.receiptId ?? body.receipt_id;
        const receiptId = (rid ?? '').toString().trim();
        if (!receiptId) {
            console.error('[serverPaid proxy] ERROR: receiptId missing at proxy');
            return NextResponse.json(
                { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
                { status: 400 },
            );
        }

        if (!apiUrl) {
            console.error('[serverPaid proxy] ERROR: NEXT_PUBLIC_API_URL is missing');
            return NextResponse.json(
                { status: false, orderMessage: 'proxy error(/serverPaid)', error: 'API_URL is not configured' },
                { status: 500 },
            );
        }

        // 공통 헤더
        const commonHeaders = buildCommonHeaders(auth, originHeader);

        // Upstream URL (쿼리에도 함께 실어준다)
        const qs = new URLSearchParams({ receiptId, receipt_id: receiptId }).toString();
        const upstreamUrl = `${apiUrl}/paid/serverPaid?${qs}`;

        // JSON 본문 (receiptId 동기화)
        const jsonBody = { ...body, receiptId, receipt_id: receiptId };
        console.log('[serverPaid proxy] → upstream JSON URL:', upstreamUrl);
        console.log('[serverPaid proxy] → forward JSON body keys:', Object.keys(jsonBody));

        // 1) JSON POST 시도
        try {
            const upstreamJson = await fetchWithTimeout(upstreamUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    ...commonHeaders,
                },
                body: JSON.stringify(jsonBody),
                cache: 'no-store',
            }, 7000);

            const textJson = await upstreamJson.text();
            console.log('[serverPaid proxy] upstream(JSON) status:', upstreamJson.status, 'body:', (textJson || '(empty)').slice(0, 300));

            if (upstreamJson.ok) {
                return new NextResponse(textJson || '', {
                    status: upstreamJson.status,
                    headers: { 'Content-Type': jsonContentType(upstreamJson.headers) },
                });
            }

            const isReceiptUndefined = upstreamJson.status === 400 && textJson && /receiptId\s+is\s+undefined/i.test(textJson);

            // 2) JSON이 400 & 'receiptId is undefined' → GET 폴백들
            if (isReceiptUndefined) {
                // 2-1) GET with auth
                console.log('[serverPaid proxy] → try GET fallback (with auth):', upstreamUrl);
                try {
                    const toGet = await fetchWithTimeout(upstreamUrl, {
                        method: 'GET',
                        headers: { ...commonHeaders },
                        cache: 'no-store',
                    }, 7000);
                    const textGet = await toGet.text();
                    console.log('[serverPaid proxy] upstream(GET with auth) status:', toGet.status, 'body:', (textGet || '(empty)').slice(0, 300));
                    if (toGet.ok) {
                        return new NextResponse(textGet || '', {
                            status: toGet.status,
                            headers: { 'Content-Type': jsonContentType(toGet.headers) },
                        });
                    }
                } catch (e: any) {
                    console.error('[serverPaid proxy] GET with auth fetch exception:', e?.message || e, 'cause:', e?.cause);
                }

                // 2-2) GET without auth
                console.log('[serverPaid proxy] → try GET fallback (NO auth):', upstreamUrl);
                try {
                    const toGetNoAuth = await fetchWithTimeout(upstreamUrl, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Origin: originHeader,
                            Referer: originHeader + '/ko/online-store/payment-result',
                        },
                        cache: 'no-store',
                    }, 7000);
                    const textGetNoAuth = await toGetNoAuth.text();
                    console.log('[serverPaid proxy] upstream(GET no auth) status:', toGetNoAuth.status, 'body:', (textGetNoAuth || '(empty)').slice(0, 300));
                    if (toGetNoAuth.ok) {
                        return new NextResponse(textGetNoAuth || '', {
                            status: toGetNoAuth.status,
                            headers: { 'Content-Type': jsonContentType(toGetNoAuth.headers) },
                        });
                    }
                } catch (e: any) {
                    console.error('[serverPaid proxy] GET no auth fetch exception:', e?.message || e, 'cause:', e?.cause);
                }

                // (선택) 업스트림이 CSRF/세션 요구할 경우 → ensureUpstreamSession()로 Cookie/CSRF 확보 후 폼에 적용
                // const { cookie, csrf } = await ensureUpstreamSession();
                // const sessionHeaders = cookie ? { Cookie: cookie, ...(csrf ? { 'X-XSRF-TOKEN': csrf } : {}) } : {};

                // 3) urlencoded 폼 (FULL fields)
                const r1 = await tryFormUrlencoded(`${apiUrl}/paid/serverPaid`, jsonBody /* , sessionHeaders */);
                const t1 = await r1.text();
                console.log('[serverPaid proxy] FORM urlencoded FULL:', r1.status, (t1 || '(empty)').slice(0, 300));
                if (r1.ok) {
                    return new NextResponse(t1 || '', {
                        status: r1.status,
                        headers: { 'Content-Type': jsonContentType(r1.headers) },
                    });
                }

                // 4) multipart 폼 (FULL fields)
                const r2 = await tryFormMultipart(`${apiUrl}/paid/serverPaid`, jsonBody /* , sessionHeaders */);
                const t2 = await r2.text();
                console.log('[serverPaid proxy] FORM multipart FULL:', r2.status, (t2 || '(empty)').slice(0, 300));
                if (r2.ok) {
                    return new NextResponse(t2 || '', {
                        status: r2.status,
                        headers: { 'Content-Type': jsonContentType(r2.headers) },
                    });
                }

                // 폼까지 실패하면 JSON 응답 그대로 전달
                return new NextResponse(textJson || '', {
                    status: upstreamJson.status,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            // receiptId undefined 이외의 오류 → 그대로 전달
            return new NextResponse(textJson || '', {
                status: upstreamJson.status,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e: any) {
            // 네트워크 레벨(fetch failed) 등
            console.error('[serverPaid proxy] JSON fetch exception:', e?.message || e);
            console.error('[serverPaid proxy] JSON fetch cause:', e?.cause);
            return NextResponse.json(
                { status: false, orderMessage: 'proxy json error', error: String(e?.message || e) },
                { status: 502 },
            );
        }
    } catch (e: any) {
        console.error('[serverPaid proxy] FATAL catch:', e?.message || e);
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
            { status: 500 },
        );
    }
}
