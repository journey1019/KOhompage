import { Metadata } from 'next';
import adminData from '@/service/adminData';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale;
    const data = adminData[locale];

    return {
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}/resources`,
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
        viewport: "width=device-width, initial-scale=1.0",
    };
}


export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}