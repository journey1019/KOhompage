// // src/app/api/resource/filter-options/route.ts
// import { prisma } from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';
//
// export const runtime = 'nodejs'
//
// export async function GET() {
//     const options = await prisma.resourceFilterOption.findMany({
//         orderBy: { type: 'asc' },
//     });
//     return NextResponse.json(options);
// }
//
// // src/app/api/resource/filter-options/route.ts
// export async function POST(req: Request) {
//     const { type, label } = await req.json();
//
//     if (!type || !label) {
//         return NextResponse.json({ error: 'type and label are required' }, { status: 400 });
//     }
//
//     const created = await prisma.resourceFilterOption.create({
//         data: { type, label },
//     });
//
//     return NextResponse.json(created);
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
//         await prisma.resourceFilterOption.deleteMany({
//             where: {
//                 type,
//                 label,
//             },
//         });
//
//         return NextResponse.json({ message: 'Deleted successfully' });
//     } catch (error) {
//         console.error('❌ 삭제 중 오류 발생:', error);
//         return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
//     }
// }



// src/app/api/resource/filter-options/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
    try {
        const options = await prisma.resourceFilterOption.findMany({
            orderBy: { type: 'asc' },
        });
        return NextResponse.json(options);
    } catch (error) {
        console.error('❌ GET /api/resource/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}

// src/app/api/resource/filter-options/route.ts
export async function POST(req: Request) {
    try {
        const { type, label } = await req.json();

        if (!type || !label) {
            return NextResponse.json({ error: 'type and label are required' }, { status: 400 });
        }

        const created = await prisma.resourceFilterOption.create({
            data: { type, label },
        });

        return NextResponse.json(created);
    } catch (error) {
        console.error('❌ POST /api/resource/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { type, label } = await req.json();

        if (!type || !label) {
            return NextResponse.json({ error: 'Missing type or label' }, { status: 400 });
        }

        await prisma.resourceFilterOption.deleteMany({
            where: {
                type,
                label,
            },
        });

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('❌ DELETE /api/resource/filter-options 에러:', error);
        return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
    }
}