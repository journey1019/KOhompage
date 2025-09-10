/** src/app/api/payment/adminProductImageUpload/[productId]/route.ts */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // 큰 FormData 스트리밍 안정성

export async function POST(
    req: NextRequest,
    { params }: { params: { productId: string } }
) {
    const { productId } = params;

    // 원 요청의 Authorization과 Cookie를 업스트림으로 전달
    const auth = req.headers.get("authorization") || "";
    const cookie = req.headers.get("cookie") || "";

    const form = await req.formData(); // mainDesc, mainImageFile 포함

    const upstream = `${process.env.NEXT_PUBLIC_API_URL}/admin/product/image/upload/${encodeURIComponent(productId)}`;

    const res = await fetch(upstream, {
        method: "POST",
        body: form, // ⚠️ Content-Type 수동 설정 금지 (boundary 자동)
        headers: {
            ...(auth ? { Authorization: auth } : {}),
            ...(cookie ? { Cookie: cookie } : {}),
        },
    });

    // 업스트림 응답 그대로 전달
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    }
    const text = await res.text().catch(() => "");
    return new NextResponse(text, { status: res.status });
}
