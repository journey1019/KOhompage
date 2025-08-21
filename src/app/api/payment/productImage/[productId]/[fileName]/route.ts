import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // 이미지 프록시 캐시 방지 (선택)

export async function GET(req: NextRequest, ctx: { params: { productId: string; fileName: string } }) {
    const { productId, fileName } = ctx.params;

    // 업스트림 실제 이미지 URL
    const upstreamUrl =
        `${process.env.NEXT_PUBLIC_API_URL}` +
        `/resource/image/product/${encodeURIComponent(productId)}/${encodeURIComponent(fileName)}`;

    // 원 요청의 Authorization(있다면) 전달
    const auth = req.headers.get('authorization') || '';

    const upstreamRes = await fetch(upstreamUrl, {
        method: 'GET',
        headers: {
            ...(auth ? { Authorization: auth } : {}),
        },
        cache: 'no-store',
    });

    // 업스트림 실패 시 그대로 상태코드 전달
    if (!upstreamRes.ok) {
        const msg = await upstreamRes.text().catch(() => '');
        return new NextResponse(msg || 'Upstream error', { status: upstreamRes.status });
    }

    // 업스트림 응답 그대로 스트리밍
    const contentType = upstreamRes.headers.get('content-type') ?? 'application/octet-stream';
    const contentLength = upstreamRes.headers.get('content-length') ?? undefined;

    return new NextResponse(upstreamRes.body, {
        status: upstreamRes.status,
        headers: {
            'content-type': contentType,
            ...(contentLength ? { 'content-length': contentLength } : {}),
            // 캐시 전략(원하면 조정)
            'cache-control': 'public, max-age=60, s-maxage=60',
        },
    });
}
