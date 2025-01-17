import { Metadata } from 'next';
import hardwareData from '@/service/hardwarePageData';

export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = await params;
    const data = hardwareData[locale];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.orbcomm.co.kr"), // 환경 변수 사용
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}/hardware`,
            images: "/images/KO_SmallLogo.png",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            images: "/images/KO_SmallLogo.png",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function HardwareLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}