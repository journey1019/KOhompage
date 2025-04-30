/**
 * @description: NextAuth 기반으로 JWT 토큰 검증 & 로컬화 지원 & 관리자 페이지 보호
 */
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware";


export default withAuth(
    async function middleware(req: NextRequest) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const url = req.nextUrl.clone();

        const locales = ['en', 'ko'];
        const pathname = req.nextUrl.pathname;
        const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

        if (!locale) {
            const defaultLocale = 'ko';
            return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
        }

        // 관리자 페이지 보호
        const isAdminPath = pathname.includes('/admin');

        if (isAdminPath) {
            if (!token) {
                url.pathname = `/${locale}/auth/signin`;
                return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    },
    {
        pages: {
            signIn: '/ko/auth/signin',
        },
    }
);

export const config = {
    matcher: ['/ko/admin/:path*', '/en/admin/:path*'], // 언어별 관리페이지 보호
};