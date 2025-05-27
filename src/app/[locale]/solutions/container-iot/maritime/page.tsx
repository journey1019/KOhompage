import React from 'react';
import maritimeData from '@/service/solutions/container-iot/maritime';
import PageHero from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Video } from '@/components/Video';
import { Faq } from '@/components/Faq';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';
import SubscribeSection from '@/components/SubscribeSection';
import Blog from '@/components/Blog';
import { SlugHardware } from '@/components/(Solution)/SlugHardware';
import FilterableHardwareList from '@/components/(Hardware)/FilterableHardwareList';
import TagFilterBlog from '@/components/(Resources)/TagFilterBlog';
import UseCaseAdvantage from '@/components/(Solution)/UseCaseAdvantage';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import SolutionAdvantage from '@/components/(Solution)/SolutionAdvantage';
import { notFound } from 'next/navigation';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { Metadata } from 'next';


export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = maritimeData[locale];

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
            url: `https://www.orbcomm.co.kr/${locale}/solutions/container-iot/maritime`,
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
export default async function MaritimePage({params}: PageProps) {
    const { locale } = await params; // 비동기 처리
    const data = maritimeData[locale];

    if (!data) {
        notFound();
    }

    const pageName = ['Maritime']
    const filteredKeyword = ["maritime"]

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
                preTitle="Maritime Platform"
                title={data.introTitle}
            >
                {data.introLetter}
            </SectionTitle>
            <Video videoUrl="https://www.youtube.com/embed/-QE6gJMhrgU" />

            <SectionTitle preTitle="Nextly Benefits" title={data.useCaseTitle}>
                {data.useCaseLetter}
            </SectionTitle>
            {/*<UseCaseAdvantage solutionKey="maritime" locale={locale} />*/}
            <SolutionAdvantage advantages={data.advantage} />

            {/*<SectionTitle preTitle="Hardware" title={data.qnaTitle}>*/}
            {/*    {data.qnaLetter}*/}
            {/*</SectionTitle>*/}

            {/*<SectionTitle preTitle="FAQ" title={data.qnaTitle}>*/}
            {/*    {data.qnaLetter}*/}
            {/*</SectionTitle>*/}
            {/*<Faq items={data.faqs || []} />*/}

            {/*<ChipFilterHardwareCarousel chips={['maritime']} />*/}
            <SectionTitle
                preTitle="HARDWARES"
                title={`${pageName} Hardware Lists`}
            >
            </SectionTitle>
            <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />
            {/*<FilterableHardwareList chips={chips}/>*/}
            {/*<SlugHardware locale={locale}/>*/}

            <SectionTitle
                preTitle="RESOURCES"
                title={`${pageName} Resource Lists`}
            >
            </SectionTitle>
            <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />

            <CtaSolution items={data.ctas} locale={locale}/>
            {/*<SectionTitle preTitle="Resources" title="Maritime Platform: Resources" />*/}
            {/*<Blog/>*/}
            {/*<TagFilterBlog initialTags={['maritime']} />*/}
        </section>
    )
}
