// import { NextRequest } from 'next/server';
// import { proxyPostBodyFetch } from '@/lib/server/fetchProxy';
//
// export async function POST(req: NextRequest) {
//     return proxyPostBodyFetch(req, '/paid/serverPaid');
// }
/** src/app/api/payment/serverPaid/route.ts */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const auth = req.headers.get('authorization') || '';
        const raw = await req.text();
        const body = raw ? JSON.parse(raw) : {};

        // ✅ receiptId / receipt_id 동기화
        const finalBody = {
            ...body,
            receipt_id: body.receipt_id ?? body.receiptId,
            receiptId : body.receiptId  ?? body.receipt_id,
        };

        const upstream = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paid/serverPaid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(auth ? { Authorization: auth } : {}),
            },
            body: JSON.stringify(finalBody),
            cache: 'no-store',
        });

        const text = await upstream.text();
        const isJson = upstream.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});

        // 업스트림 status 그대로 전달
        return NextResponse.json(data, { status: upstream.status });
    } catch (e: any) {
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error(/serverPaid)', error: String(e?.message || e) },
            { status: 500 }
        );
    }
}
