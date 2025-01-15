import './globals.css';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import NewNavbar from "@/components/(Header)/example/NewNavbar";
import { Footer } from "@/components/(Header)/Footer";
import { Metadata } from 'next';
import mainData from '@/service/mainData';

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
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!['en', 'ko'].includes(locale)) {
        notFound();
    }

    const messages = await getMessages(locale);
    if (!messages) {
        throw new Error(`Messages for locale ${locale} could not be loaded.`);
    }

    return (
        <html lang={locale} className={sans.className}>
        <body className="flex flex-col min-h-screen w-full mx-auto vsc-initialized">
        <NextIntlClientProvider messages={messages}>
            <NewNavbar locale={locale} />
            <main className="grow pt-[74px]">{children}</main>
            <Footer locale={locale} />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
