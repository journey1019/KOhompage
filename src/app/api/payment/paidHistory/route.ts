/** src/app/api/payment/paidHistory/[purchaseId]/route.ts */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { purchaseId: string } }
) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        return NextResponse.json({ message: 'API URL not configured' }, { status: 500 });
    }

    const purchaseId = params.purchaseId;
    const auth = req.headers.get('authorization') || '';

    // 1차: path 스타일 시도 (/history/paid/detail/purchaseId=12)
    const try1 = await fetch(`${apiUrl}/history/paid/detail/purchaseId=${encodeURIComponent(purchaseId)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            ...(auth ? { Authorization: auth } : {}),
        },
        cache: 'no-store',
    });

    if (try1.ok) {
        const text = await try1.text();
        const isJson = try1.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});
        return NextResponse.json(data);
    }

    // 2차: query 스타일 폴백 (/history/paid/detail?purchaseId=12)
    const try2 = await fetch(`${apiUrl}/history/paid/detail?purchaseId=${encodeURIComponent(purchaseId)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            ...(auth ? { Authorization: auth } : {}),
        },
        cache: 'no-store',
    });

    const text2 = await try2.text();
    const isJson2 = try2.headers.get('content-type')?.includes('application/json');
    const data2 = isJson2 && text2 ? JSON.parse(text2) : (text2 || {});

    if (!try2.ok) {
        return NextResponse.json(
            typeof data2 === 'string' ? { message: data2 } : data2,
            { status: try2.status }
        );
    }

    return NextResponse.json(data2);
}
