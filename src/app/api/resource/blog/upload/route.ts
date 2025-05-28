// src/app/api/resource/blog/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { mkdirSync, existsSync } from "fs"

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
    const contentType = req.headers.get("content-type")

    if (!contentType?.includes("multipart/form-data")) {
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/\s+/g, "_")}`

    const uploadDir = path.join(process.cwd(), "public", "uploads")

    try {
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
    } catch (error) {
        console.error('❌ 파일 저장 실패:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }

    const fileUrl = `/uploads/${filename}`

    return NextResponse.json({ url: fileUrl }, { status: 200 })
}
