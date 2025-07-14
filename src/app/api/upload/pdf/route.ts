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
// export async function POST(req: NextRequest) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('file') as File;
//         const page = (formData.get('page')?.toString() || 'resources').toLowerCase(); // 'resources' | 'hardware'
//
//         if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//
//         const safeFileName = sanitizeFileName(file.name);
//         const fileName = `${Date.now()}-${safeFileName}`;
//
//         // ❗ 디렉토리만 생성
//         const pdfDir = path.join(process.cwd(), 'public/uploads/pdfs', page);
//         await mkdir(pdfDir, { recursive: true });
//
//         // ✅ 파일은 디렉토리 아래에 바로 저장
//         const uploadPath = path.join(pdfDir, fileName);
//         await writeFile(uploadPath, buffer);
//
//         console.log('✅ PDF 저장:', uploadPath);
//         return NextResponse.json({ url: `/uploads/pdfs/${fileName}` });
//
//     } catch (error) {
//         console.error('Upload error:', error);
//         return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//     }
// }

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const page = (formData.get('page')?.toString() || 'resources').toLowerCase(); // 'resources' | 'hardware'

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    // const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
    const fileName = 'test_installation_manual_KSV1001.pdf';
    // const uploadDir = path.join(process.cwd(), 'public', 'pdf', page);
    const uploadDir = path.join(process.cwd(), 'public', 'downloads', 'manual');
    const uploadPath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        await writeFile(uploadPath, buffer);
        // return NextResponse.json({ url: `/pdf/${page}/${fileName}` });
        // return NextResponse.json({ url: `/downloads/manual/test1_installation_manual_KSV1001.pdf` });
        // return NextResponse.json({ url: `/downloads/manual/test_installation_manual_KSV1001` }); // downloads/manual/installation_manual_KSV1001.pdf
        return NextResponse.json({ url: `/downloads/manual/${fileName}` });
    } catch (error) {
        console.error('❌ PDF 저장 실패:', error);
        return NextResponse.json({ error: '파일 저장 중 오류 발생' }, { status: 500 });
    }
}