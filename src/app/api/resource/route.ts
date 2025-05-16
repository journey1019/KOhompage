// src/app/api/resource/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const resources = await prisma.resource.findMany({
        orderBy: { date: 'desc' }
    });
    return NextResponse.json(resources);
}


const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            date,
            contentType,
            title,
            subtitle,
            tags,
            hideTag,
            solutionTag,
            form,
            image,
            path,
            use,
        } = body;

        const result = await prisma.resource.create({
            data: {
                date: new Date(date),
                contentType,
                title,
                subtitle,
                tags,
                hideTag,
                solutionTag,
                form,
                image,
                path,
                use,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ Resource 생성 실패:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}
