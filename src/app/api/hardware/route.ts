// src/app/api/hardware/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';

export async function GET() {
    const hardwares = await prisma.hardware.findMany({
        orderBy: { date: 'desc' }
    });
    return NextResponse.json(hardwares);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            date,
            title,
            subtitle,
            description,
            tags,
            hideTag,
            solutionTag,
            category,
            imageSrc,
            slug,
            path,
            use,
        } = body;

        const result = await prisma.hardware.create({
            data: {
                date: new Date(date),
                title,
                subtitle,
                description,
                tags,
                hideTag,
                solutionTag,
                category,
                imageSrc,
                slug,
                path,
                use,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ Hardware 생성 실패:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}
