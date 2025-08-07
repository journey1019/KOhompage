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
        if (pathname.startsWith('/images') || pathname.startsWith('/pdf')) {
            return NextResponse.next();
        }
        const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

        // ✅ 로그인된 사용자가 로그인 페이지 접근 시 자동 리디렉션
        if (pathname.endsWith('/auth/signin') && token) {
            const locale = locales.find((locale) => pathname.startsWith(`/${locale}`)) || 'ko';
            const isAdmin = token.role === 'ADMIN';
            url.pathname = `/${locale}/${isAdmin ? 'admin' : ''}`;
            return NextResponse.redirect(url);
        }

        // ✅ 1. locale이 아예 없으면 /ko로 리디렉션
        if (!locale) {
            const defaultLocale = 'ko';
            // / → /ko 리디렉션
            if (pathname === '/') {
                return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
            }
            // 그 외 /ko, /en이 아닌 경로는 404로 rewrite
            return NextResponse.rewrite(new URL(`/${defaultLocale}/404`, req.url));
        }

        // ✅ 관리자 페이지 보호
        if (pathname.includes('/admin') && !token) {
            url.pathname = `/${locale}/auth/signin`;
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    },
    {
        pages: {
            signIn: '/ko/auth/signin', // 공통 로그인 페이지
        },
        callbacks: {
            // authorized: ({ token }) => {
            //     return token?.role === 'ADMIN';
            // },
            authorized: ({ token, req }) => {
                const url = req.nextUrl.pathname

                if (url === '/' || url === '/ko' || url === '/en') return true;

                // 관리자 페이지만 보호
                const isAdminPath = url.startsWith('/ko/admin') || url.startsWith('/en/admin');

                if (isAdminPath) {
                    if (!token) return false; // 로그인 안한 상태면 관리자 접근 불가
                    return token.role === 'ADMIN'; // 관리자 권한만 허용
                }

                // 🔓 그 외 페이지는 로그인 여부와 무관하게 접근 허용
                return true;
            }
        },
    }
);


export const config = {
    matcher: [
        /**
         * 정적 리소스들은 미들웨어 제외
         * - _next/static: JS, CSS 번들
         * - _next/image: 이미지 최적화
         * - favicon.ico, robots.txt 등
         * - images/, fonts/, videos/: 정적 폴더들
         */
        // '/', // 루트 경로도 감지
        // '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/|video/).*)',
        // '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/|video/).*)',
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/|video|downloads/|pdf/|images/|uploads/|pdfs/).*)',
        '/(ko|en)/auth/signin'
    ],
}
