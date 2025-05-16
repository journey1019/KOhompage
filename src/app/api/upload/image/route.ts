// src/app/api/upload/image/route.ts
// API는 이미지 업로드만 처리하고, 이미지가 저장된 이후에는 브라우저가 '/uploads/images/..;로 직접 접근함
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

function sanitizeFileName(name: string) {
    return name
        .normalize('NFD')                        // 한글 분해
        .replace(/[\u0300-\u036f]/g, '')         // 한글 결합 문자 제거
        .replace(/\s+/g, '_')                    // 공백 -> 언더스코어
        .replace(/[^\w.-]/g, '')                 // 특수문자 제거
        .toLowerCase();
}
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const page = (formData.get('page')?.toString() || 'resources').toLowerCase(); // default to 'resource'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const safeName = sanitizeFileName(file.name);
    const fileName = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), 'public/images/', page);
    const uploadPath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        await writeFile(uploadPath, buffer);
        return NextResponse.json({ url: `/images/${page}/${fileName}` });
    } catch (err) {
        console.error('❌ 파일 저장 실패:', err);
        return NextResponse.json({ error: '파일 저장 중 오류 발생' }, { status: 500 });
    }
}

