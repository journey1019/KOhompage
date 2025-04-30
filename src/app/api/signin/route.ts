import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from "@/app/lib/jwt";

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    try{
        const body: RequestBody = await request.json()

        const user = await prisma.user.findFirst({
            where: {
                // 입력받은 username 과 테이블 email 컬럼 값이 같은 데이터 추출
                email: body.username,
            },
        })

        // 패스워드도 동일한지 확인
        if (!user || !user.password) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
        }

        const isValid = await bcrypt.compare(body.password, user.password)
        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
        }

        // password 제외
        const { password, ...userWithoutPass } = user

        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken, // token 에도 role 이 포함됨
        };

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch(error) {
        console.error('Login API error:', error);
        return new Response(JSON.stringify(null), {
            status: 401, // ✅ 실패는 명시적으로 401 Unauthorized
            headers: { 'Content-Type': 'application/json' },
        })
    }
}