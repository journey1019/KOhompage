// src/app/layout.tsx
import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
    title: {
        default: 'KOREA ORBCOMM',
        template: 'KOREA ORBCOMM | %s'
    },
    description: '전세계 M2M Service를 위한 통신 서비스와 하드웨어, 어플리케이션을 제공하는 Total SERVICE Provider',
    icons: {
        icon: '/favicon.ico',
    }
}

type Props = {
    children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" className={sans.className}>
        {/*<body className='flex flex-col w-full max-w-screen-2xl mx-auto'>*/}
        <body className='flex flex-col w-full mx-auto'>
        <Header />
        <Navbar />
        <main className='grow'>{children}</main>
        <Footer />
        </body>
        </html>
    );
}
