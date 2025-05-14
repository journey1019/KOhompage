// src/app/api/resource/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const resources = await prisma.resource.findMany({
        orderBy: { date: 'desc' }
    });
    return NextResponse.json(resources);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const newResource = await prisma.resource.create({
        data: {
            ...data,
            date: new Date(data.date),
        },
    });
    return NextResponse.json(newResource, { status: 201 });
}
