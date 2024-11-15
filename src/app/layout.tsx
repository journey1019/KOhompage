import './globals.css';
import React from 'react';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/(Header)/Header';
import Footer from '@/components/Footer';

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
};
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" className={sans.className}>
        <body className="flex flex-col min-h-screen w-full mx-auto vsc-initialized">
        <Header />
        <main className="grow pt-[74px]">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
