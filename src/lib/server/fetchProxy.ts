import { NextRequest, NextResponse } from 'next/server';

/**
 * GET
 * */
export async function proxyGetFetch(req: NextRequest, targetPath: string) {
    try {
        const url = new URL(req.url);
        const qs = url.searchParams.toString();
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${targetPath}${qs ? `?${qs}` : ''}`;

        const auth = req.headers.get('authorization') || ''; // 👈 추가

        const upstreamRes = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(auth ? { Authorization: auth } : {}), // 👈 추가
            },
            cache: 'no-store',
        });

        const text = await upstreamRes.text();
        const isJson = upstreamRes.headers.get('content-type')?.includes('application/json');
        const data = isJson && text ? JSON.parse(text) : (text || {});

        if (!upstreamRes.ok) {
            // 업스트림 에러 메시지를 그대로 전달해 디버깅 용이
            return NextResponse.json(
                typeof data === 'string' ? { message: data } : data,
                { status: upstreamRes.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(`[proxyGetFetch error] ${targetPath}`, error);
        return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
    }
}



/**
 * POST (Body)
 * */
export async function proxyPostBodyFetch(req: NextRequest, targetPath: string) {
    try {
        const body = await req.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${targetPath}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return NextResponse.json({ message: result?.message || '요청 실패' }, { status: res.status });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(`[proxyFetch error] ${targetPath}`, error);
        return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
    }
}


export async function proxyPostQueryFetch(req: NextRequest, targetPath: string) {
    try {
        const url = new URL(req.url);
        const queryString = url.searchParams.toString();
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${targetPath}${queryString ? `?${queryString}` : ''}`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.get('Authorization') || '',
            },
            body: JSON.stringify({}) // logout은 비어있어도 보냄
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return NextResponse.json({ message: result?.message || '요청 실패' }, { status: res.status });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(`[proxyPostQueryFetch error] ${targetPath}`, error);
        return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
    }
}
