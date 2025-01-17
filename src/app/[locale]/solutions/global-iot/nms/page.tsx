import React from 'react';
import nmsData from '@/service/solutions/global-iot/nms';
import PageHero from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Faq } from '@/components/Faq';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';
import SubscribeSection from '@/components/SubscribeSection';
import Blog from '@/components/Blog';
import { SlugHardware } from '@/components/(Solution)/SlugHardware';
import FilterableHardwareList from '@/components/(Hardware)/FilterableHardwareList';
import TagFilterBlog from '@/components/(Resources)/TagFilterBlog';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import SolutionAdvantage from '@/components/(Solution)/SolutionAdvantage';
import Characteristics from '@/components/(Solution)/Characteristics';
import OneImage from '@/components/(Solution)/OneImage';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { Metadata } from 'next';
import vmsData from '@/service/solutions/global-iot/vms';
import { notFound } from 'next/navigation';

export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = vmsData[locale];

    if (!data) {
        throw new Error(`Metadata for locale ${locale} could not be found.`);
    }

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
            url: `https://www.orbcomm.co.kr/${locale}/solutions/global-iot/nms`,
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


interface PageProps {
    params: {locale: string};
}
export default async function NMSPage({params}: PageProps) {
    const { locale } = await params; // 비동기 처리
    const data = nmsData[locale];

    if (!data) {
        notFound();
    }

    const pageName = ['NMS']
    const filteredKeyword = ["nms"]

    return(
        <section>
            <PageHero
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
                solutionButton={data.solutionButton}
                solutionUrl={data.solutionUrl}
            />
            <SectionTitle
                preTitle="Network Monitoring System"
                title={data.characteristicsTitle}
            >
                {data.characteristicsLetter}
            </SectionTitle>
            <Characteristics items={data.character || []} gridCols={4}/>

            <SectionTitle
                preTitle="NMS"
                title={data.introTitle}
            >
                {data.introLetter}
            </SectionTitle>
            <OneImage item="/images/solutions/global-iot/nms_main.png"/>

            {/*<SectionTitle preTitle="Nextly Benefits" title={data.useCaseTitle}>*/}
            {/*    {data.useCaseLetter}*/}
            {/*</SectionTitle>*/}
            {/*<SolutionAdvantage advantages={data.advantage} />*/}


            {/*<SectionTitle preTitle="Hardware" title={data.qnaTitle}>*/}
            {/*    {data.qnaLetter}*/}
            {/*</SectionTitle>*/}


            {/*<SectionTitle*/}
            {/*    preTitle="HARDWARES"*/}
            {/*    title="HARDWARE LIST"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<ChipFilterHardwareCarousel chips={chips} />*/}
            {/*<FilterableHardwareList chips={chips}/>*/}
            {/*<SlugHardware locale={locale}/>*/}
            <SectionTitle
                preTitle="HARDWARES"
                title={`${pageName} Hardware Lists`}
            >
            </SectionTitle>
            <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />


            {/*<SectionTitle preTitle="FAQ" title={data.qnaTitle}>*/}
            {/*    {data.qnaLetter}*/}
            {/*</SectionTitle>*/}
            {/*<Faq items={data.faqs || []} />*/}

            {/*<SectionTitle preTitle="Resources" title={`${site}: Resources`} />*/}
            {/*<Blog/>*/}
            {/*<TagFilterBlog initialTags={chips} />*/}
            <SectionTitle
                preTitle="RESOURCES"
                title={`${pageName} Resource Lists`}
            >
            </SectionTitle>
            <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />


            <CtaSolution items={data.ctas}/>
        </section>
    )
}
