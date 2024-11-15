import { useRouter } from 'next/router';

export default function Language() {
    const router = useRouter();
    const { locale, pathname, query, asPath } = router;

    const switchLanguage = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return(
        <div className="flex space-x-2">
            <button
                onClick={() => switchLanguage('en')}
                className={locale === 'en' ? 'font-bold' : ''}
                >
                EN
            </button>
            <button
                onClick={() => switchLanguage('ko')}
                className={locale === 'ko' ? 'font-bold' : ''}
            >
                KO
            </button>
        </div>
    )
}
// import { useRouter, usePathname } from '@/i18n/routing'; // next-intl 라우터 사용
//
// export default function Language() {
//     const router = useRouter();
//     const pathname = usePathname();
//
//     const switchLanguage = (newLocale: string) => {
//         router.push(`/${newLocale}${pathname}`);
//     };
//
//     return (
//         <div className="flex space-x-2">
//             <button onClick={() => switchLanguage('en')} className="px-3 py-1">EN</button>
//             <button onClick={() => switchLanguage('ko')} className="px-3 py-1">KO</button>
//         </div>
//     );
// }
