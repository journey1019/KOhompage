import './globals.css';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import {getMessages} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/(Header)/Header';
import Footers from '@/components/Footer';
import { Footer } from "@/components/(Header)/Footer";
import Navbar from "@/components/(Header)/example/Navbar";

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
    title: {
        default: 'Global AIS 서비스를 선도하는 서비스 | 코리아오브컴',
        template: 'KOREA ORBCOMM | %s',
    },
    description: '전세계 M2M Service를 위한 통신 서비스와 하드웨어, 어플리케이션을 제공하는 Total SERVICE Provider',
    icons: {
        icon: '/favicon.ico',
    },
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
            <Navbar locale={locale}/>
            <main className="grow pt-[74px]">{children}</main>
            <Footer locale={locale}/>
            {/*<Footers locale={locale}/>*/}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}