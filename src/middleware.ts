/** src/middleware.ts */
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token') // Check JWT in cookies
    const url = req.nextUrl.clone();

    const locales = ['en', 'ko'];
    const pathname = req.nextUrl.pathname;
    // `locale` 추출
    const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

    // 없는 경우 기본 locale로 리다이렉트
    if (!locale) {
        const defaultLocale = 'ko';
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
    }

    // 관리자 페이지 보호
    if (token) {
        try {
            jwt.verify(token.value, JWT_SECRET); // 토큰 유효성 검증
        } catch (err) {
            url.pathname = `/${locale}/admin/login`;
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], // API, 정적 파일, Next.js 내부 경로 제외
};
