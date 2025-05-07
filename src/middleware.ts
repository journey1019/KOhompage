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

        // ✅ 2. 관리자 경로 보호
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
            signIn: '/ko/auth/signin', // 공통 로그인 페이지
        },
        callbacks: {
            // authorized: ({ token }) => {
            //     return token?.role === 'ADMIN';
            // },
            authorized: ({ token, req }) => {
                const url = req.nextUrl.pathname

                if(!token) return false // 로그인 안했으면 막음

                // ADMIN은 모두 통과
                if(token.role === 'ADMIN') return true

                // USER는 /admin 아래 접근 차단
                if(url.startsWith('/ko/admin')) return false

                // 나머지 경로는 USER도 허용
                return true
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
        // '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/|video/).*)',
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/|video/).*)',

    ],
}