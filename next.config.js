const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
        reactStrictMode: false, // 개발 중 React의 잠재적인 문제 발견을 위한 도구(프로덕트 환경에서 영향 X)
    }
};

module.exports = withNextIntl(nextConfig);


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