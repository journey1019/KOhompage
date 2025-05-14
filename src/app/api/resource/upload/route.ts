// app/api/resource/upload/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), 'public/uploads', fileName);

    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/${fileName}` });
}
