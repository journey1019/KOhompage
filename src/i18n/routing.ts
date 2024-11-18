// import {defineRouting} from 'next-intl/routing';
// import {createNavigation} from 'next-intl/navigation';
//
// export const routing = defineRouting({
//     // A list of all locales that are supported
//     locales: ['en', 'ko'],
//
//     // Used when no locale matches
//     defaultLocale: 'en'
// });
//
// // Lightweight wrappers around Next.js' navigation APIs
// // that will consider the routing configuration
// export const {Link, redirect, usePathname, useRouter} =
//     createNavigation(routing);

// import {createNavigation} from 'next-intl/navigation';
// export const routing = {
//     // 지원하는 언어 목록
//     locales: ['en', 'ko'],
//     // 기본 언어 설정
//     defaultLocale: 'en',
// }
//
// // @ts-ignore
// export const {Link, redirect, usePathname, useRouter} = createNavigation({
//     locales: ['en', 'ko'],
//     defaultLocale:  'en',
// });


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