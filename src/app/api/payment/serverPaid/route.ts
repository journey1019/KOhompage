/** src/app/api/payment/serverPaid/route.ts */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const auth = req.headers.get('authorization') || '';
        const raw = await req.text();
        const body = raw ? JSON.parse(raw) : {};

        // 1) receiptId 정규화(+빈 문자열 거부)
        const rid = body.receiptId || body.receipt_id;
        const receiptId = (rid ?? '').toString().trim();
        if (!receiptId) {
            return NextResponse.json(
                { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
                { status: 400 },
            );
        }

        // 2) 업스트림 URL 구성: 쿼리스트링에 receiptId / receipt_id 모두 추가
        const qs = new URLSearchParams({
            receiptId,
            receipt_id: receiptId, // 혹시 서버가 snake 케이스만 읽는다면
        }).toString();

        const upstreamUrl = `${process.env.NEXT_PUBLIC_API_URL}/paid/serverPaid?${qs}`;

        // 3) 최종 바디는 camelCase만 유지(혼동 제거)
        const finalBody: any = {
            ...body,
            receiptId,
        };
        delete finalBody.receipt_id;

        // (디버깅) 콘솔에서 진짜로 무엇이 올라가는지 반드시 확인
        console.log('[serverPaid proxy] → upstream URL:', upstreamUrl);
        console.log('[serverPaid proxy] → forward JSON body:', {
            orderId: finalBody.orderId,
            receiptId: finalBody.receiptId,
            paidPrice: finalBody.paidPrice,
            billingPrice: finalBody.billingPrice,
        });

        // 4) 1차 시도: JSON
        let upstream = await fetch(upstreamUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                ...(auth ? { Authorization: auth } : {}),
            },
            body: JSON.stringify(finalBody),
            cache: 'no-store',
        });

        // 5) 400이면, form-urlencoded로 재시도 (백엔드가 getParameter만 읽는 경우)
        if (upstream.status === 400) {
            const txt = await upstream.text();
            const isJson = upstream.headers.get('content-type')?.includes('application/json');
            const data = isJson && txt ? JSON.parse(txt) : (txt || {});
            console.warn('[serverPaid proxy] JSON POST got 400 → retry as form', data);

            const form = new URLSearchParams();
            for (const [k, v] of Object.entries(finalBody)) {
                if (v !== undefined && v !== null) form.append(k, String(v));
            }
            // receiptId는 쿼리에도 이미 있으므로 form에도 넣어 두면 가장 안전
            form.set('receiptId', receiptId);

            upstream = await fetch(upstreamUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    Accept: 'application/json',
                    ...(auth ? { Authorization: auth } : {}),
                },
                body: form.toString(),
                cache: 'no-store',
            });
        }

        // 6) 업스트림 응답 그대로 반환
        const text = await upstream.text();
        const isJson = upstream.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});
        return NextResponse.json(data, { status: upstream.status });
    } catch (e: any) {
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
            { status: 500 },
        );
    }
}