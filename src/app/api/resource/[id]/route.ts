// src/app/api/resource/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const resource = await prisma.resource.findUnique({
        where: { id: Number(params.id) },
    });
    return resource
        ? NextResponse.json(resource)
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.resource.update({
        where: { id: Number(params.id) },
        data: {
            ...data,
            date: new Date(data.date),
        },
    });
    return NextResponse.json(updated);
}

// export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
//     await prisma.resource.delete({
//         where: { id: Number(params.id) },
//     });
//     return NextResponse.json({ ok: true });
// }
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    const { params } = await context;
    await prisma.resource.delete({
        where: { id: Number(params.id) },
    });
    return NextResponse.json({ ok: true });
}



// src/app/api/resource/[id]/route.ts
// import { prisma } from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';
//
// export const runtime = 'nodejs'
//
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const resource = await prisma.resource.findUnique({
//             where: { id: Number(params.id) },
//         });
//
//         if (!resource) {
//             return NextResponse.json({ error: 'Not found' }, { status: 404 });
//         }
//
//         return NextResponse.json(resource);
//     } catch (error) {
//         console.error('❌ GET /api/resource/[id] 에러:', error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
//
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const data = await req.json();
//
//         const updated = await prisma.resource.update({
//             where: { id: Number(params.id) },
//             data: {
//                 ...data,
//                 date: data.date ? new Date(data.date) : undefined,
//             },
//         });
//
//         return NextResponse.json(updated);
//     } catch (error) {
//         console.error('❌ PUT /api/resource/[id] 에러:', error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
//
// export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         await prisma.resource.delete({
//             where: { id: Number(params.id) },
//         });
//         return NextResponse.json({ ok: true });
//     } catch (error) {
//         console.error('❌ DELETE /api/resource/[id] 에러:', error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
