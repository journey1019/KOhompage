import solutionsData from '@/service/solutions/solutionsData';
import PageHero from '@/components/PageHero';
import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';
import ContentForm from '@/components/(Solution)/ContentForm';
import UseCase from '@/components/(Solution)/UseCase';
import Hardware from '@/components/(Solution)/Hardware';
import FAQ from '@/components/(Solution)/FAQ';
import { Metadata } from 'next';
import Download from '@/components/(Solution)/Download';
import CarouselSolutions from '@/components/(Solution)/CarouselSolutions';
import References from '@/components/(Solution)/References';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import CharacteristicsDetail from '@/components/(Solution)/CharacteristicsDetail';
import React from 'react';
import Feature from '@/components/(Solution)/Feature';
import { notFound } from 'next/navigation';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';

export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = solutionsData[locale]?.["ais"];

    if (!data) {
        throw new Error(`Metadata for locale ${locale} could not be found.`);
    }

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.orbcomm.co.kr"),
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}/solutions/ais`,
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
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ko' },
    ];
}

export default async function AISPage({params}: PageProps){
    const { locale } = await params; // 비동기적으로 처리
    const data = solutionsData[locale]?.["ais"]; // 안전하게 데이터 접근

    if (!data) {
        // Redirect to 404 if the hardware is not found
        notFound();
    }

    // 데이터 유효성 검증
    if (!data) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Solution not found</h2>
                <p>Please check the locale or solution slug.</p>
            </div>
        );
    }

    const pageName = ['AIS']
    const filteredKeyword = ["ais"]

    return(
        <section>
            <PageHero
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
            />
            <Greet {...data} />

            {/*<Greet*/}
            {/*    solutionNumber={data.solutionNumber}*/}
            {/*    title={data.title}*/}
            {/*    solutionName={data.solutionName}*/}
            {/*    description={data.description}*/}
            {/*/>*/}
            {/*<Intro />*/}
            {/*<CarouselSolutions items={data.carousels || []}/>*/}
            {/*<Card/>*/}
            {/*<Advantage/>*/}


            {/*<ContentForm/>*/}
            {/*<UseCase slug="ais" locale={locale} />*/}
            {/*<Hardware/>*/}

            <SectionTitle
                preTitle="Characteristics"
                title="ORBCOMM 위성 데이터 통신 서비스 특징"
            >
                AIS 서비스는 전세계 모든 지역에서의 AIS 정보를 수집하여 고객에게 제공합니다. AIS(선박 자동 식별 장치, Automatic Identification System)는 선박의 식별, 위치, 탐색을 지원하고 해양 안전을 향상시키는데 사용할 수 있는 중요한 데이터를 전송하는 선박 발신 시스템입니다. AIS 데이터는 해상 영역 인식, 수색 및 구조, 환경 모니터링, 해상 정보 분석 등에 사용됩니다.
            </SectionTitle>
            <CharacteristicsDetail items={data.character || []} gridCols={3}/>

            <Feature/>

            {/*<FAQ/>*/}
            {/*<Download/>*/}
            <SectionTitle
                preTitle="HARDWARES"
                title={`${pageName} Hardware Lists`}
            >
            </SectionTitle>
            <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />

            <SectionTitle
                preTitle="RESOURCES"
                title={`${pageName} Resource Lists`}
            >
            </SectionTitle>
            <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />
            {/*<References/>*/}
            <CtaSolution items={data.ctas} locale={locale}/>
        </section>
    )
}