/** src/app/api/payment/serverPaid/route.ts */
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const originHeader = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        return NextResponse.json(
            { status: false, orderMessage: 'proxy error', error: 'API URL not configured' },
            { status: 500 }
        );
    }

    const auth = req.headers.get('authorization') || '';
    const cookie = req.headers.get('cookie') || '';

    // ✅ JSON 그대로 파싱
    let body: any = {};
    try {
        body = await req.json();
    } catch {
        body = {};
    }

    const rid = body.receiptId ?? body.receipt_id;
    const receiptId = (rid ?? '').toString().trim();
    if (!receiptId) {
        return NextResponse.json(
            { status: false, orderMessage: 'fail', error: 'receiptId is undefined at proxy' },
            { status: 400 }
        );
    }

    const url = `${apiUrl}/paid/serverPaid`; // 업스트림 URL

    // ✅ JSON으로 전달
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Origin': originHeader,
        'Referer': originHeader + '/ko/online-store/payment-result',
    };
    if (cookie) headers['Cookie'] = cookie;
    if (auth) headers['Authorization'] = auth;

    const upstream = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),  // 🚀 form → JSON으로 교체
        cache: 'no-store',
    });

    const text = await upstream.text();
    if (!upstream.ok) {
        return NextResponse.json(
            {
                status: false,
                orderMessage: 'fail',
                error: text || 'serverPaid upstream blocked (CSRF/Origin/Cookie)',
            },
            { status: upstream.status }
        );
    }

    // 그대로 응답
    return new NextResponse(text || '', {
        status: upstream.status,
        headers: {
            'Content-Type': upstream.headers.get('content-type') || 'application/json',
        },
    });
}
