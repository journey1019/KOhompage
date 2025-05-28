// app/api/resource/upload/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), 'public/images/resources', fileName);

    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/images/resources/${fileName}` });
}



// import { writeFile } from 'fs/promises';
// import { join } from 'path';
// import { NextRequest, NextResponse } from 'next/server';
//
// export const runtime = 'nodejs';
//
// export async function POST(req: NextRequest) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('image') as File | null;
//
//         if (!file) {
//             return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//         }
//
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const fileName = `${Date.now()}-${file.name}`;
//         const filePath = join(process.cwd(), 'public/images/resources', fileName);
//
//         await writeFile(filePath, buffer);
//
//         return NextResponse.json({ url: `/images/resources/${fileName}` });
//     } catch (error) {
//         console.error('❌ POST /api/resource/upload 에러:', error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
