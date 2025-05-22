// GET /api/tags?type=tags
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, type } = await req.json();

    if (!name || !type) {
        return NextResponse.json({ error: 'name과 type은 필수입니다.' }, { status: 400 });
    }

    try {
        const existing = await prisma.tag.findFirst({
            where: { name, type },
        });

        if (existing) {
            return NextResponse.json({ error: "이미 존재하는 태그입니다." }, { status: 409 });
        }

        const tag = await prisma.tag.create({
            data: { name, type },
        });
        return NextResponse.json(tag);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: '이미 존재하는 태그이거나 오류 발생' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get('type') || 'tags';

    const tags = await prisma.tag.findMany({
        where: { type },
        orderBy: { name: 'asc' },
    });

    return NextResponse.json(tags);
}
