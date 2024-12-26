const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
    reactStrictMode: false, // 개발 시 엄격 모드 활성화
    typescript: {
        ignoreBuildErrors: true, // 실제 환경에서는 타입 오류 허용하지 않음
    },
});


// const createNextIntlPlugin = require('next-intl/plugin');
//
// const withNextIntl = createNextIntlPlugin({
//     locales: ['en', 'ko'], // 지원 언어
//     defaultLocale: 'en',   // 기본 언어
// });
//
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     i18n: {
//         locales: ['en', 'ko'], // Next.js 다국어 설정
//         defaultLocale: 'en',   // 기본 언어
//     },
//     reactStrictMode: true,


// module.exports = {
//     i18n: {
//         locales: ['en', 'ko'],
//         defaultLocale: 'ko',
//     },
//     experimental: {
//         appDir: true,
//     },
// };