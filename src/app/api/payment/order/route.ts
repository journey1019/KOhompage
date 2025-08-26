/** src/app/api/payment/order/route.ts */
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const auth = req.headers.get('authorization') || '';
        const upstream = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paid/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(auth ? { Authorization: auth } : {}),
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        const text = await upstream.text();
        const isJson = upstream.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});

        if (!upstream.ok) {
            return NextResponse.json(
                typeof data === 'string' ? { message: data } : data,
                { status: upstream.status }
            );
        }
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: '서버 내부 오류(/paid/order)' }, { status: 500 });
    }
}
