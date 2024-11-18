import {createNavigation} from 'next-intl/navigation';

const locales = ['en', 'ko']; // 지원하는 언어 목록
const defaultLocale = 'en'; // 기본 언어

// Export routing configuration (useful for other files if needed)
export const routing = {
    locales,
    defaultLocale,
};

// Create navigation helpers based on routing configuration
export const {Link, redirect, usePathname, useRouter} = createNavigation();