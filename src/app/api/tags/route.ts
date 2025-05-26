// GET /api/tags?type=tags
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, type, scope } = await req.json();

    if (!name || !type || !scope) {
        return NextResponse.json({ error: 'name, type, scope는 필수입니다.' }, { status: 400 });
    }

    try {
        const existing = await prisma.tag.findFirst({
            where: { name, type, scope },
        });

        if (existing) {
            return NextResponse.json({ error: "이미 존재하는 태그입니다." }, { status: 409 });
        }

        const tag = await prisma.tag.create({
            data: { name, type, scope },
        });

        return NextResponse.json(tag);
    } catch (error) {
        return NextResponse.json({ error: '태그 생성 중 오류 발생' }, { status: 500 });
    }
}


// export async function GET(req: NextRequest) {
//     const type = req.nextUrl.searchParams.get('type') || 'tags';
//     const scope = req.nextUrl.searchParams.get('scope') || 'resource';
//
//     const tags = await prisma.tag.findMany({
//         where: { type, scope },
//         orderBy: { name: 'asc' },
//     });
//
//     return NextResponse.json(tags);
// }
export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get('type') || 'tags';
    const scope = req.nextUrl.searchParams.get('scope') || 'resource';

    try {
        const tags = await prisma.tag.findMany({
            where: { type, scope },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(tags);
    } catch (error) {
        console.error("🚨 GET /api/tags 실패:", error);  // ← 로그 출력
        return NextResponse.json({ error: '태그 조회 실패' }, { status: 500 });
    }
}

