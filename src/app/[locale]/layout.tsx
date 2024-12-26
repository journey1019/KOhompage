import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/(Header)/example/Navbar';
import { Footer } from '@/components/(Header)/Footer';

// 타입 정의
type Props = {
    children: React.ReactNode;
    params: { locale: string }; // params.locale을 string으로 명확히 설정
};

// 유효한 locale 리스트
const VALID_LOCALES = ['en', 'ko'];

export default async function LocaleLayout({ children, params }: Props) {
    // locale 확인 및 기본값 설정
    const locale = VALID_LOCALES.includes(params.locale) ? params.locale : 'ko';

    // 메시지 데이터 로드
    let messages: Record<string, any>;
    try {
        messages = await getMessages(locale); // locale 타입이 string으로 전달됨
    } catch (error) {
        console.error(`Failed to load messages for locale "${locale}":`, error);
        notFound(); // 메시지를 로드하지 못한 경우
    }

    return (
        <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} />
            <main className="grow pt-[74px]">{children}</main>
            <Footer locale={locale} />
        </NextIntlClientProvider>
    );
}
