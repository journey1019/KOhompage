import React from 'react';

import { Metadata } from 'next';
import aboutData from '@/service/aboutData';
import { Container } from "@/components/(About)/Container";
import { SectionTitle } from "@/components/(About)/SectionTitle";
import { Cta } from '@/components/Cta';
import WorkWithUs from '@/components/RightNow';
import PartnerManyLines from '@/components/PartnerManyLines';
import PageHeroCenter from '@/components/PageHeroCenter';
import Value from '@/components/(About)/Value';
import Feature from '@/components/Feature';
import Timeline from '@/components/(About)/Timeline';
import { Benefits } from "@/components/(About)/Benefits";
import { Testimonials } from "@/components/(About)/Testimonials";
import { Footer } from "@/components/(About)/Footer";
import { PopupWidget }  from "@/components/(About)/PopupWidget";
import DownloadSection from '@/components/(Templates)/DownloadSection';
import Blog from '@/components/(Templates)/Blog';
import PageHero from '@/components/PageHero';
import Partner from '@/components/Partner'
import History from '@/components/(About)/History';

// 다국어 지원 Metadata 설정
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale;
    const data = aboutData[locale];

    return {
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.description,
            url: `https://www.orbcomm.co.kr/${locale}/about`,
            images: "/images/KO_SmallLogo.png",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.description,
            images: "/images/KO_SmallLogo.png",
        },
        robots: {
            index: true,
            follow: true,
        },
        viewport: "width=device-width, initial-scale=1.0",
    };
}

interface PageProps {
    params: {locale: string};
}
export default function AboutPage({params}: PageProps) {
    const { locale } = params;
    const data = aboutData[locale];

    return (
        <>
            <PageHeroCenter
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
                thirdtitle={data.imageThird}
            />

            <PartnerManyLines />

            {/*<DownloadSection/>*/}
            {/*<History />*/}
            {/*<Benefits data={benefitOne} />*/}
            {/*<Benefits imgPos="right" data={benefitTwo} />*/}

            <Feature sections={data.feature}/>

            <SectionTitle
                preTitle="Time line"
                title="Company History"
            >
            </SectionTitle>
            <Timeline timeline={data.timeline} />

            <SectionTitle
                preTitle="Values"
                title="Why KOREA ORBCOMM"
            >
            </SectionTitle>
            <Value items={data.value}/>

            {/*<SectionTitle*/}
            {/*    preTitle="Testimonials"*/}
            {/*    title="Here's what our customers said"*/}
            {/*>*/}
            {/*    Testimonials is a great way to increase the brand trust and awareness.*/}
            {/*    Use this section to highlight your popular customers.*/}
            {/*</SectionTitle>*/}
            {/*<Testimonials />*/}

            {/*<Blog/>*/}
            {/*<Footer />*/}
            {/*<PopupWidget />*/}

            <Cta items={data.ctas}/>

            <WorkWithUs />
        </>
    );
}
