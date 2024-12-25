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

    // 데이터 유효성 검증
    if (!data) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Solution not found</h2>
                <p>Please check the locale or solution slug.</p>
            </div>
        );
    }

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
                ORBCOMM의 저궤도(LEO: Low Earth Orbit) 위성 네트워크. 소형 위성모듈과 Whip 형태의 무지향성 안테나를 적용하여 쉽고 간단한 설치로 통신 인프라가 구축되어 있지 않은 산악/해상 등의 장소에서 유용한 데이터 통신 서비스를 제공합니다.
            </SectionTitle>
            <CharacteristicsDetail items={data.character || []} gridCols={3}/>

            <Feature/>

            <FAQ/>
            <Download/>
            {/*<References/>*/}
        </section>
    )
}