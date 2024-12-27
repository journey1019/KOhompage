import solutionsData from '@/service/solutions/solutionsData';
import PageTopImage from '@/components/PageTopImage';
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

interface PageProps {
    params: {locale: string};
}
export const metadata: Metadata = {
    title: 'Solution | %s',
    description: 'KOREA ORBCOMM 의 Solutions 소개'
}
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ko' },
    ];
}

export default async function AISPage({params}: PageProps){
    const { locale } = params; // 비동기적으로 처리
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
    const chips = ['AIS']

    return(
        <section>
            <PageTopImage
                size="py-52"
                url={data.imageUrl}
                title={data.imageIntro}
                subtitle={data.imageMain}
                description={data.imageSub}
                textPosition="center"
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
                preTitle="Low Earth Orbit"
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
                title="Satellite Hardware Lists"
            >
            </SectionTitle>
            <FilterHardwareCarousel keywords={['AIS']} />

            <SectionTitle
                preTitle="RESOURCES"
                title={`${chips} : All Resources`}
            >
            </SectionTitle>
            <FilterResourceCarousel keywords={['AIS']} />
            {/*<References/>*/}
        </section>
    )
}