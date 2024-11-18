import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale || 'en';
    if (!routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }

    const messages = {
        header: (await import(`../../messages/${locale}/header.json`)).default,
        home: (await import(`../../messages/${locale}/home.json`)).default,
    }

    return { locale, messages };
});