import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

function encodeRFC5987(str: string) {
    // filename*=UTF-8''... 용 인코딩
    return encodeURIComponent(str).replace(/['()]/g, escape).replace(/\*/g, "%2A");
}

function guessMime(ext: string) {
    switch (ext.toLowerCase()) {
        case ".pdf":
            return "application/pdf";
        case ".hwp":
            // 일부 브라우저는 이 타입을 알아야 안전하게 다운로드
            return "application/x-hwp"; // (대안: application/haansofthwp)
        case ".hwpx":
            return "application/vnd.hancom.hwpx";
        default:
            return "application/octet-stream";
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const p = searchParams.get("path"); // 예: /docs/resources/173...-myfile.hwp

        if (!p || !p.startsWith("/docs/")) {
            return NextResponse.json({ error: "invalid path" }, { status: 400 });
        }

        // public/docs/... 아래만 허용 (디렉토리 탈출 방지)
        const publicDir = path.join(process.cwd(), "public");
        const requested = path.normalize(path.join(publicDir, p)); // p 앞의 /는 무시됨
        const docsRoot = path.join(publicDir, "docs");

        if (!requested.startsWith(docsRoot + path.sep)) {
            return NextResponse.json({ error: "forbidden" }, { status: 403 });
        }

        const data = await fs.readFile(requested);

        const filename = path.basename(requested);
        const ext = path.extname(filename);
        const mime = guessMime(ext);

        return new NextResponse(data, {
            headers: {
                "Content-Type": mime,
                // 이 두 헤더로 "무조건 다운로드" 유도 (UTF-8 파일명 호환)
                "Content-Disposition":
                    `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeRFC5987(filename)}`,
                "Cache-Control": "private, max-age=0, must-revalidate",
            },
        });
    } catch (e) {
        return NextResponse.json({ error: "not found" }, { status: 404 });
    }
}
