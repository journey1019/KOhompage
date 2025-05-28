// src/app/api/hardware/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const hardwares = await prisma.hardware.findMany({ orderBy: { date: 'desc' } })
        return NextResponse.json(hardwares)
    } catch (error) {
        console.error('Error fetching hardware:', error)
        return NextResponse.json({ error: '서버 에러' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();


        const result = await prisma.hardware.create({
            data: {
                date: new Date(body.date),
                title: body.title,
                subtitle: body.subtitle,
                description: body.description,
                tags: body.tags,
                hideTag: body.hideTag,
                solutionTag: body.solutionTag,
                category: body.category,
                imageSrc: body.imageSrc,
                slug: body.slug,
                path: body.path,
                use: body.use,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ Hardware 생성 실패:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}
