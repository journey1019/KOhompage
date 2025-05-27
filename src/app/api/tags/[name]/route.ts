// src/app/api/tags/[name]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function DELETE(
    req: NextRequest,
    { params }: { params: { name: string } }
) {
    const name = decodeURIComponent(params.name);
    const type = req.nextUrl.searchParams.get('type');

    if (!type) {
        return NextResponse.json({ error: 'type 쿼리 파라미터가 필요합니다.' }, { status: 400 });
    }

    try {
        await prisma.tag.deleteMany({
            where: { name, type },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('🚨 태그 삭제 실패:', error);
        return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
    }
}
