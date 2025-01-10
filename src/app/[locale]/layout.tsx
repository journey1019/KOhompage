// import React from 'react';
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
// import { notFound } from 'next/navigation';
// import Navbar from '@/components/(Header)/example/Navbar';
// import { Footer } from '@/components/(Header)/Footer';
//
// // 타입 정의
// type Props = {
//     children: React.ReactNode;
//     params: { locale: string }; // params.locale을 string으로 명확히 설정
// };
//
// // 유효한 locale 리스트
// const VALID_LOCALES = ['en', 'ko'];
//
// export default async function LocaleLayout({ children, params }: Props) {
//     // locale 확인 및 기본값 설정
//     const locale = VALID_LOCALES.includes(params.locale) ? params.locale : 'ko';
//
//     // 메시지 데이터 로드
//     let messages: Record<string, any>;
//     try {
//         messages = await getMessages(locale); // locale 타입이 string으로 전달됨
//     } catch (error) {
//         console.error(`Failed to load messages for locale "${locale}":`, error);
//         notFound(); // 메시지를 로드하지 못한 경우
//     }
//
//     return (
//         <NextIntlClientProvider messages={messages}>
//             <Navbar locale={locale} />
//             <main className="grow pt-[74px]">{children}</main>
//             <Footer locale={locale} />
//         </NextIntlClientProvider>
//     );
// }

import './globals.css';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/(Header)/Header';
import Footers from '@/components/Footer';
import { Footer } from "@/components/(Header)/Footer";
import Navbar from "@/components/(Header)/example/Navbar";
import NewNavbar from "@/components/(Header)/example/NewNavbar";
import { Metadata } from 'next';

const sans = Open_Sans({ subsets: ['latin'] });
export const metadata:Metadata = {
    title: "KOREA ORBCOMM | IoT & Satellite Solutions",
    description:
        "IoT와 위성통신 솔루션의 글로벌 리더, KOREA ORBCOMM. 최고의 IoT 통신 서비스를 제공합니다.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "KOREA ORBCOMM | IoT & Satellite Solutions",
        description: "IoT와 위성통신 솔루션의 글로벌 리더, KOREA ORBCOMM.",
        url: "https://www.orbcomm.co.kr",
        images: "/images/og-image-main.png",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "KOREA ORBCOMM | IoT & Satellite Solutions",
        description: "IoT와 위성통신 솔루션의 글로벌 리더, KOREA ORBCOMM.",
        images: "/images/twitter-card-main.png",
    },
    robots: {
        index: true,
        follow: true,
    },
    viewport: "width=device-width, initial-scale=1.0",
};


type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>; // params를 비동기적으로 처리
};
export default async function LocaleLayout({ children, params }: Props) {
    // `locale`을 함수 내부에서 추출
    const { locale } = await params;

    // locale 유효성 검증
    if (!['en', 'ko'].includes(locale)) {
        notFound();
    }

    // 메시지 데이터 가져오기
    // @ts-ignore
    const messages = await getMessages(locale);
    if (!messages) {
        throw new Error(`Messages for locale ${locale} could not be loaded.`);
    }

    return (
        <html lang={locale} className={sans.className}>
        <body className="flex flex-col min-h-screen w-full mx-auto vsc-initialized">
        <NextIntlClientProvider messages={messages}>
            {/*<Header locale={locale}/>*/}
            <NewNavbar locale={locale}/>
            <main className="grow pt-[74px]">{children}</main>
            <Footer locale={locale}/>
            {/*<Footers locale={locale}/>*/}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}