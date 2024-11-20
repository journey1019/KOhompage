const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

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
