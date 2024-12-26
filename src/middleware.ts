// import {routing} from './i18n/routing';
// import createMiddleware from 'next-intl/middleware';
//
// export default createMiddleware(routing);
//
// export const config = {
//     matcher: [
//         '/((?!api|_next|static|favicon.ico).*)', // 필요한 경로만 매칭
//         '/:locale(en|ko)/:path*',
//     ],
// };
/** src/middleware.ts */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const locales = ['en', 'ko'];
    const pathname = req.nextUrl.pathname;

    // `locale` 추출
    const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

    // 없는 경우 기본 locale로 리다이렉트
    if (!locale) {
        const defaultLocale = 'ko';
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], // API, 정적 파일, Next.js 내부 경로 제외
};

// export const config = {
//     matcher: ['/en/:path*', '/ko/:path*'], // 올바른 matcher 설정
// };
