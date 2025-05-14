// // src/app/api/upload/pdf/route.ts
// import { writeFile } from 'fs/promises';
// import path from 'path';
// import { NextRequest, NextResponse } from 'next/server';
//
// export async function POST(req: NextRequest) {
//     const formData = await req.formData();
//     const file = formData.get('file') as File;
//
//     if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileName = `${Date.now()}-${file.name}`;
//     const uploadPath = path.join(process.cwd(), 'public/uploads/pdfs', fileName);
//
//     await writeFile(uploadPath, buffer);
//     return NextResponse.json({ url: `/uploads/pdfs/${fileName}` });
// }

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
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const safeFileName = sanitizeFileName(file.name);
        const fileName = `${Date.now()}-${safeFileName}`;
        const filePath = path.join(process.cwd(), 'public/uploads/pdfs', fileName);
        console.log('✅ 파일 저장 경로:', filePath);
        // 디렉토리 없으면 생성
        await mkdir(filePath, { recursive: true });

        const uploadPath = path.join(filePath, fileName);
        await writeFile(uploadPath, buffer);
        console.log('✅ 파일 저장 경로:', uploadPath);

        return NextResponse.json({ url: `/uploads/pdfs/${fileName}` });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
