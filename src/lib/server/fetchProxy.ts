// src/lib/server/fetchProxy.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET
 * */
export async function proxyGetFetch(req: NextRequest, targetPath: string) {
    try {
        const url = new URL(req.url);
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${targetPath}?${url.searchParams.toString()}`;

        const res = await fetch(fullUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return NextResponse.json({ message: data?.message || '요청 실패' }, { status: res.status });
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
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${targetPath}?${url.searchParams.toString()}`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
