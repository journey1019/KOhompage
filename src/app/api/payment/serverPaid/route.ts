import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         console.log('[proxy->serverPaid] body keys =', Object.keys(body)); // receipt_id 보이는지 확인
//         const auth = req.headers.get('authorization') || '';
//
//         // 서버가 @RequestParam 으로 읽어도 되게 쿼리스트링에 같이 실어준다
//         const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/paid/serverPaid`);
//         const receiptId = body?.receiptId || body?.receipt_id;
//         if (receiptId) url.searchParams.set('receiptId', String(receiptId));
//         if (body?.orderId)   url.searchParams.set('orderId',   String(body.orderId));
//         if (body?.paidPrice) url.searchParams.set('paidPrice', String(body.paidPrice));
//         if (body?.purchaseIndex) url.searchParams.set('purchaseIndex', String(body.purchaseIndex));
//         if (body?.expiredDate)   url.searchParams.set('expiredDate',   String(body.expiredDate));
//
//         // ✅ 꼭 url.toString() 사용
//         const upstream = await fetch(url.toString(), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(auth ? { Authorization: auth } : {}),
//             },
//             // JSON 바디도 함께 유지(서버가 DTO로 받을 수 있으면 활용)
//             body: JSON.stringify(body),
//             cache: 'no-store',
//         });
//
//         const text = await upstream.text();
//         const isJson = upstream.headers.get('content-type')?.includes('application/json');
//         const data = isJson && text ? JSON.parse(text) : (text || {});
//
//         if (!upstream.ok) {
//             console.error('[serverPaid upstream error]', upstream.status, text);
//             return NextResponse.json(
//                 typeof data === 'string' ? { message: data } : data,
//                 { status: upstream.status },
//             );
//         }
//         return NextResponse.json(data);
//     } catch (e) {
//         return NextResponse.json({ message: '서버 내부 오류(/paid/serverPaid)' }, { status: 500 });
//     }
// }

// const API = process.env.NEXT_PUBLIC_API_URL!;
//
// export async function POST(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const auth = req.headers.get('authorization') || '';
//
//         // 원문 보존: text로 읽고 JSON 파싱
//         const text = await req.text();
//         const body = text ? JSON.parse(text) : {};
//
//         // 쿼리 -> 바디 fallback 병합
//         const merged = {
//             ...body,
//             receiptId:
//                 body.receiptId ??
//                 searchParams.get('receipt_id') ??
//                 searchParams.get('receiptId') ??
//                 undefined,
//             receipt_id:
//                 body.receipt_id ??
//                 body.receiptId ??
//                 searchParams.get('receipt_id') ??
//                 searchParams.get('receiptId') ??
//                 undefined,
//             orderId:
//                 body.orderId ??
//                 searchParams.get('order_id') ??
//                 searchParams.get('orderId') ??
//                 undefined,
//             paidPrice:
//                 body.paidPrice ??
//                 Number(searchParams.get('paidPrice') ?? searchParams.get('amount') ?? body.billingPrice),
//         };
//
//         if (!merged.receiptId && !merged.receipt_id) {
//             return NextResponse.json({ error: 'receiptId is missing' }, { status: 400 });
//         }
//
//         // upstream이 queryParam만 읽는 경우를 대비해, 둘 다 전달
//         const qs = new URLSearchParams({
//             ...(merged.receiptId ? { receiptId: String(merged.receiptId) } : {}),
//             ...(merged.orderId ? { orderId: String(merged.orderId) } : {}),
//             ...(merged.paidPrice ? { paidPrice: String(merged.paidPrice) } : {}),
//         }).toString();
//
//         const upstream = await fetch(`${API}/paid/serverPaid${qs ? `?${qs}` : ''}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(auth ? { Authorization: auth } : {}),
//             },
//             body: JSON.stringify(merged),
//             cache: 'no-store',
//         });
//
//         const upstreamText = await upstream.text();
//         const isJson = upstream.headers.get('content-type')?.includes('application/json');
//         const data = isJson && upstreamText ? JSON.parse(upstreamText) : (upstreamText || {});
//
//         if (!upstream.ok) {
//             console.error('[serverPaid upstream error]', upstream.status, data);
//             return NextResponse.json(
//                 typeof data === 'string' ? { message: data } : data,
//                 { status: upstream.status }
//             );
//         }
//         return NextResponse.json(data);
//     } catch (e) {
//         console.error(e);
//         return NextResponse.json({ message: '서버 내부 오류(/serverPaid)' }, { status: 500 });
//     }
// }

// src/app/api/payment/serverPaid/route.ts

export async function POST(req: NextRequest) {
    try {
        const auth = req.headers.get('authorization') || '';
        const url = new URL(req.url);
        const qs = Object.fromEntries(url.searchParams.entries());

        // body는 없을 수도 있으므로 try-catch
        let body: any = {};
        try { body = await req.json(); } catch {}

        // 쿼리 + 바디 병합
        const merged: any = { ...qs, ...body };

        // camel ↔ snake 동기화
        if (!merged.receiptId && merged.receipt_id) merged.receiptId = merged.receipt_id;
        if (!merged.receipt_id && merged.receiptId) merged.receipt_id = merged.receiptId;

        // 업스트림 URL 구성 (쿼리도 함께 전달)
        const upstreamUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/paid/serverPaid`);
        if (merged.receiptId) upstreamUrl.searchParams.set('receiptId', String(merged.receiptId));
        if (merged.orderId)   upstreamUrl.searchParams.set('orderId',   String(merged.orderId));
        if (merged.paidPrice) upstreamUrl.searchParams.set('paidPrice', String(merged.paidPrice));

        // 업스트림으로 JSON body 그대로 전달
        const upstream = await fetch(upstreamUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(auth ? { Authorization: auth } : {}),
            },
            body: JSON.stringify(merged),
            cache: 'no-store',
        });

        const text = await upstream.text();
        const isJson = upstream.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});

        if (!upstream.ok) {
            console.error('[serverPaid upstream error]', upstream.status, data);
            return NextResponse.json(
                typeof data === 'string' ? { message: data } : data,
                { status: upstream.status },
            );
        }
        return NextResponse.json(data);
    } catch (e) {
        console.error('[serverPaid proxy fatal]', e);
        return NextResponse.json({ message: '서버 내부 오류(/paid/serverPaid)' }, { status: 500 });
    }
}


// export async function POST(req: NextRequest) {
//     try {
//         // 본문이 없을 수도 있어 안전 파싱
//         const body = await req.json().catch(() => ({} as any));
//         const auth = req.headers.get('authorization') || '';
//
//         // 클라이언트가 body 또는 URL로 넘겨도 모두 수용
//         const clientQs = req.nextUrl.searchParams;
//         const receipt =
//             body?.receiptId ||
//             body?.receipt_id ||
//             clientQs.get('receiptId') ||
//             clientQs.get('receipt_id');
//
//         const orderId = body?.orderId || clientQs.get('orderId');
//         const paidPriceRaw = body?.paidPrice ?? clientQs.get('paidPrice');
//         const paidPrice =
//             typeof paidPriceRaw === 'number'
//                 ? paidPriceRaw
//                 : paidPriceRaw
//                     ? Number(paidPriceRaw)
//                     : undefined;
//
//         // 사전 검증(로그 가독성 ↑)
//         if (!receipt) {
//             return NextResponse.json(
//                 { error: 'receiptId missing at proxy', status: false, orderMessage: 'fail' },
//                 { status: 400 },
//             );
//         }
//
//         // 서버가 @RequestParam("receiptId")로만 읽는 경우를 위해 camelCase로 싣는다
//         const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/paid/serverPaid`);
//         url.searchParams.set('receiptId', String(receipt));
//         if (orderId)   url.searchParams.set('orderId', String(orderId));
//         if (paidPrice) url.searchParams.set('paidPrice', String(paidPrice));
//
//         // 디버깅 로그
//         console.log('[serverPaid upstream url]', url.toString());
//         console.log('[serverPaid body keys]', Object.keys(body || {}));
//
//         // ❗❗ 여기서 반드시 url.toString() 사용
//         const upstream = await fetch(url.toString(), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(auth ? { Authorization: auth } : {}),
//             },
//             body: JSON.stringify(body ?? {}),
//             cache: 'no-store',
//         });
//
//         const text = await upstream.text();
//         const isJson = upstream.headers.get('content-type')?.includes('application/json');
//         const data = isJson && text ? JSON.parse(text) : (text || {});
//
//         if (!upstream.ok) {
//             console.error('[serverPaid upstream error]', upstream.status, text);
//             return NextResponse.json(
//                 typeof data === 'string' ? { message: data } : data,
//                 { status: upstream.status },
//             );
//         }
//
//         return NextResponse.json(data);
//     } catch (e) {
//         console.error('[serverPaid proxy error]', e);
//         return NextResponse.json({ message: '서버 내부 오류(/paid/serverPaid)' }, { status: 500 });
//     }
// }
