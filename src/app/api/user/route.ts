import { NextRequest } from 'next/server';
import prisma from '@/app/lib/prisma'
import bcrypt from 'bcrypt' // 암호화

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();

        const existing = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (existing) {
            return new Response(JSON.stringify({ message: "이미 존재하는 이메일입니다." }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword, // ✅ 반드시 해시된 비밀번호 저장
                role: 'USER', // 기본 USER
            },
        });

        const { password, ...userWithoutPassword } = user;

        return new Response(JSON.stringify(userWithoutPassword), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('회원가입 오류:', error);
        return new Response(JSON.stringify({ message: "회원가입 실패" }), { status: 500 });
    }
}