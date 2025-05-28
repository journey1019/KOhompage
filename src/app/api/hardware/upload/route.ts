// app/api/hardware/upload/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('imageSrc') as File;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), 'public/images/hardware', fileName);

    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/images/hardware/${fileName}` });
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
//         const file = formData.get('imageSrc') as File | null;
//
//         if (!file) {
//             return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//         }
//
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const fileName = `${Date.now()}-${file.name}`;
//         const filePath = join(process.cwd(), 'public/images/hardware', fileName);
//
//         await writeFile(filePath, buffer);
//
//         return NextResponse.json({ url: `/images/hardware/${fileName}` });
//     } catch (error) {
//         console.error('❌ POST /api/hardware/upload 에러:', error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
