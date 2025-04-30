//app/api/user/[id]/route.ts

import prisma from '@/app/lib/prisma'
import { verifyJwt } from '@/app/lib/jwt'

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    // accessToken 유효성 검사
    const accessToken = request.headers.get('authorization')

    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({ error: 'No Authorization' }), {
            status: 401,
        })
    }

    console.log(params)

    // 테이블에서 id 값은 Int 로 정의되어 있기 때문에 형변환
    const id = Number(params.id)

    const userPosts = await prisma.post.findMany({
        where: {
            authorId: id,
        },
        include: {
            author: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
    })
    return new Response(JSON.stringify(userPosts))
}