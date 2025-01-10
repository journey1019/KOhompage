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
import mainData from '@/service/mainData';

const sans = Open_Sans({ subsets: ['latin'] });

// `viewport` 설정은 별도로 export
export const viewport = {
    viewport: "width=device-width, initial-scale=1.0",
};
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    // 비동기 params 처리
    const locale = await params.locale;
    const data = mainData[locale];

    return {
        title: data.title,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: data.title,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}`,
            images: "/images/KO_SmallLogo.png",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.openGraphDesc,
            images: "/images/KO_SmallLogo.png",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

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