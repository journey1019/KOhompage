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

import {NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
    const locales = ['en', 'ko'];
    const pathname = req.nextUrl.pathname;

    const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));
    if (!locale) {
        const defaultLocale = 'ko';
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
    }

    return NextResponse.next();
}

// export const config = {
//     matcher: ['/en/:path*', '/ko/:path*'], // 올바른 matcher 설정
// };
export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], // 국제화 적용 경로
};