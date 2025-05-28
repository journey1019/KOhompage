// src/app/api/resource/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const resources = await prisma.resource.findMany({
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(resources);
    } catch (error) {
        console.error('❌ GET /api/resource 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await prisma.resource.create({
            data: {
                date: new Date(body.date),
                contentType: body.contentType,
                title: body.title,
                subtitle: body.subtitle,
                tags: body.tags,
                hideTag: body.hideTag,
                solutionTag: body.solutionTag,
                form: body.form,
                image: body.image,
                path: body.path,
                use: body.use,
                html: body.html,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ POST /api/resource 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}
