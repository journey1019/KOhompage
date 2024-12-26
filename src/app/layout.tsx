import './globals.css';
import React from 'react';
import { Open_Sans } from 'next/font/google';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
    title: 'KOREA ORBCOMM',
    description: 'Leading global M2M services provider',
    icons: {
        icon: '/favicon.ico',
    },
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="ko" className={sans.className}>
        <body className="flex flex-col min-h-screen vsc-initialized">
        {children}
        </body>
        </html>
    );
}
