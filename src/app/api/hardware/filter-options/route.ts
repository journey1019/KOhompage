// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
//
// export const runtime = 'nodejs'
//
// export async function GET() {
//     const options = await prisma.hardwareFilterOption.findMany({
//         orderBy: { type: 'asc' },
//     });
//     return NextResponse.json(options);
// }
//
// export async function POST(req: NextRequest) {
//     try {
//         const { type, label } = await req.json();
//
//         if (!type || !label) {
//             return NextResponse.json({ error: 'Missing type or label' }, { status: 400 });
//         }
//
//         const created = await prisma.hardwareFilterOption.create({
//             data: { type, label },
//         });
//
//         return NextResponse.json(created);
//     } catch (error) {
//         console.error('❌ POST 오류:', error);
//         return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
//     }
// }
//
// export async function DELETE(req: NextRequest) {
//     try {
//         const { type, label } = await req.json();
//
//         if (!type || !label) {
//             return NextResponse.json({ error: 'Missing type or label' }, { status: 400 });
//         }
//
//         const deleted = await prisma.hardwareFilterOption.deleteMany({
//             where: { type, label },
//         });
//
//         return NextResponse.json({ message: 'Deleted successfully', count: deleted.count });
//     } catch (error) {
//         console.error('❌ DELETE 오류:', error);
//         return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
//     }
// }


import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const options = await prisma.hardwareFilterOption.findMany({
            orderBy: { type: 'asc' },
        });
        return NextResponse.json(options);
    } catch (error) {
        console.error('❌ GET /api/hardware/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { type, label } = await req.json();

        if (!type || !label) {
            return NextResponse.json({ error: 'Missing type or label' }, { status: 400 });
        }

        const created = await prisma.hardwareFilterOption.create({
            data: { type, label },
        });

        return NextResponse.json(created);
    } catch (error) {
        console.error('❌ POST /api/hardware/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { type, label } = await req.json();

        if (!type || !label) {
            return NextResponse.json({ error: 'Missing type or label' }, { status: 400 });
        }

        const deleted = await prisma.hardwareFilterOption.deleteMany({
            where: { type, label },
        });

        return NextResponse.json({ message: 'Deleted successfully', count: deleted.count });
    } catch (error) {
        console.error('❌ DELETE /api/hardware/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}
