import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const resource = await prisma.hardware.findUnique({
        where: { id: Number(params.id) },
    });
    return resource
        ? NextResponse.json(resource)
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.hardware.update({
        where: { id: Number(params.id) },
        data: {
            ...data,
            date: new Date(data.date),
        },
    });
    return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.hardware.delete({
        where: { id: Number(params.id) },
    });
    return NextResponse.json({ ok: true });
}
