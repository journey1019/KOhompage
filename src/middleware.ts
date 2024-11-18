import {routing} from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
    // 국제화 경로에 대한 매칭
    matcher: ['/en', '/(ko|en)/:path*'],
};