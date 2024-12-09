import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// export default getRequestConfig(async ({requestLocale}) => {
//     // This typically corresponds to the `[locale]` segment
//     let locale = await requestLocale || 'en';
//     if (!routing.locales.includes(locale)) {
//         locale = routing.defaultLocale;
//     }
//
//     const messages = {
//         header: (await import(`../../messages/${locale}/header.json`)).default,
//         home: (await import(`../../messages/${locale}/home.json`)).default,
//         hardware: (await import(`../../messages/${locale}/hardware.json`)).default
//     }
//
//     return { locale, messages };
// });

const allMessages = {
    en: {
        header: require('../../messages/en/header.json'),
        home: require('../../messages/en/home.json'),
        hardware: require('../../messages/en/hardware.json'),
    },
    ko: {
        header: require('../../messages/ko/header.json'),
        home: require('../../messages/ko/home.json'),
        hardware: require('../../messages/ko/hardware.json'),
    },
};


export default getRequestConfig(async ({ requestLocale }) => {
    // 비동기적으로 locale 처리
    // let locale = (await requestLocale) || routing.defaultLocale;
    //
    // // 유효하지 않은 locale을 기본 locale로 설정
    // if (!routing.locales.includes(locale)) {
    //     locale = routing.defaultLocale;
    // }
    //
    // // 동적으로 JSON 메시지 가져오기
    // const messages = {
    //     header: (await import(`../../messages/${locale}/header.json`)).default,
    //     home: (await import(`../../messages/${locale}/home.json`)).default,
    //     hardware: (await import(`../../messages/${locale}/hardware.json`)).default,
    // };
    //
    // return { locale, messages };
    const locale = routing.locales.includes(await requestLocale)
        ? await requestLocale
        : routing.defaultLocale;

    try {
        const messages = {
            header: (await import(`@/locales/${locale}/header.json`)).default,
            // home: (await import(`../../messages/${locale}/home.json`)).default,
            // hardware: (await import(`../../messages/${locale}/hardware.json`)).default,
            solutions: (await import(`@/locales/${locale}/solutions.json`)).default,
            hard: (await import(`@/locales/${locale}/hardware.json`)).default,
        };

        return {locale, messages};
    } catch (error) {
        console.error(`Failed to load messages for locale "${locale}":`, error);
        return {locale, messages: {}};
    }
});