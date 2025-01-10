import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const resolvedLocale = await requestLocale; // 비동기적으로 locale 해제

    const locale = routing.locales.includes(resolvedLocale ?? '')
        ? resolvedLocale
        : routing.defaultLocale; // 기본 locale 설정

    let messages = {};
    try {
        messages = {
            header: (await import(`@/locales/${locale}/header.json`)).default,
            solutions: (await import(`@/locales/${locale}/solutions.json`)).default,
            hard: (await import(`@/locales/${locale}/hardware.json`)).default,
        };
    } catch (error) {
        console.error(`Failed to load messages for locale "${locale}"`, error);
    }

    return { locale, messages };
});