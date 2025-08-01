// src/app/[locale]/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function POST() {
    const res = NextResponse.redirect('/');
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    return res;
}
