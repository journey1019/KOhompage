import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs'

const users = [
    {
        email: 'support@orbcomm.co.kr',
        password: '$2a$10$5/IgzgguTvWU1PKBnywEWeYQJ8kggTTKzhQrqSwV0mqWMoFismBzm', // bcrypt로 해싱된 비밀번호
    },
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    // console.log('Received email:', email); // 로그 추가

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
        // console.log('User not found');
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        // console.log('Password mismatch');
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // console.log('Login successful, token generated');
    return NextResponse.json({ token });
}
