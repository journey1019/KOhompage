import './globals.css';
import React from 'react';
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import NewNavbar from "@/components/(Header)/example/NewNavbar";
import { Footer } from "@/components/(Header)/Footer";
import { Metadata } from 'next';
import mainData from '@/service/mainData';
import PopupWidget from '@/components/PopupWidget';
import Provider from '@/app/[locale]/_components/Provider';
import Analytics from '@/components/Analytics';

const sans = Open_Sans({ subsets: ['latin'] });

export const viewport = {
    viewport: "width=device-width, initial-scale=1.0",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    // 비동기적으로 `params` 처리
    const { locale } = await params;
    const data = mainData[locale];

    if (!data) {
        throw new Error(`Metadata for locale ${locale} could not be found.`);
    }

    return {
        title: data.title,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        // openGraph: {
        //     title: data.title,
        //     description: data.openGraphDesc,
        //     url: `https://www.orbcomm.co.kr/${locale}`,
        //     images: "/images/KO_SmallLogo.png",
        //     type: "website",
        // },
        // twitter: {
        //     card: "summary_large_image",
        //     title: data.title,
        //     description: data.openGraphDesc,
        //     images: "/images/KO_SmallLogo.png",
        // },
        robots: {
            index: true,
            follow: true,
        },
    };
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const resolvedParams = await params; // Promise 처리
    const { locale } = resolvedParams;

    if (!['en', 'ko'].includes(locale)) {
        notFound();
    }

    const messages = await getMessages(locale);
    if (!messages) {
        throw new Error(`Messages for locale ${locale} could not be loaded.`);
    }

    return (
        <html lang={locale} className={sans.className}>
        <head>
            {/* Google Tag 삽입 */}
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-2NGPZE546T"
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2NGPZE546T', {
                page_path: window.location.pathname,
              });
            `,
                }}
            />
            {/* 카카오 주소 API */}
            <Script
                src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="beforeInteractive"
            />
        </head>
        <body className="flex flex-col min-h-screen w-full mx-auto vsc-initialized">
        <NextIntlClientProvider messages={messages}>
            <NewNavbar locale={locale} />
            <main className="grow pt-[72px] maxWeb:pt-[96px]">
                <Provider>
                    {children}
                </Provider>
            </main>
            <Footer locale={locale} />
            <PopupWidget />
        </NextIntlClientProvider>
        <Analytics />
        </body>
        </html>
    );
}