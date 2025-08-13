import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

function sanitizeFileName(name: string) {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^\w.-]/g, '')
        .toLowerCase();
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const page = (formData.get('page')?.toString() || 'resources').toLowerCase();

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const safeName = sanitizeFileName(file.name);
    const fileName = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'docs', page);
    const uploadPath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    try {
        await writeFile(uploadPath, buffer);
        return NextResponse.json({ url: `/docs/${page}/${fileName}` });
    } catch (error) {
        console.error('❌ 문서 저장 실패:', error);
        return NextResponse.json({ error: '파일 저장 중 오류 발생' }, { status: 500 });
    }
}
