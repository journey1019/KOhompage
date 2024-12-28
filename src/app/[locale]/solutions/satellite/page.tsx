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
import Strength from '@/components/(Solution)/Strength';
import Image from 'next/image';
import React from 'react';
import Point from '@/components/(Solution)/Point';
import FilterableHardwareList from '@/components/(Hardware)/FilterableHardwareList';
import TagFilterBlog from '@/components/(Resources)/TagFilterBlog';
import TagFilterBoard from '@/components/(Main)/TagFilterBoard';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import Kind from '@/components/(Solution)/Kind';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';
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

export default async function GlobalIoT({params}: PageProps){
    const { locale } = params; // 비동기적으로 처리
    const data = solutionsData[locale]?.["satellite"]; // 안전하게 데이터 접근

    // 데이터 유효성 검증
    if (!data) {
        // return (
        //     <div className="text-center py-12">
        //         <h2 className="text-2xl font-bold">Solution not found</h2>
        //         <p>Please check the locale or solution slug.</p>
        //     </div>
        // );
        notFound();
    }

    const chips = ["Satellite"];
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
            {/*<CarouselSolutions items={data.carousels}/>*/}
            {/*<Card/>*/}
            {/*<Advantage/>*/}
            {/*<Point items={data.points || []}/>*/}
            {/*<ContentForm/>*/}
            <Kind items={data.kind || []}/>

            <SectionTitle
                preTitle="Use Case"
                title="실시간 모니터링 시스템을 경험해보세요"
                length={3}
            >
                고객에게 제공되는 웹플랫폼(VMS Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.
            </SectionTitle>
            <UseCase slug="satellite" locale={locale} />

            {/*<SectionTitle*/}
            {/*    preTitle="HARDWARES"*/}
            {/*    title="Satellite Hardware Lists"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<ChipFilterHardwareCarousel chips={['ogx', 'ogi', 'og2']} />*/}
            <SectionTitle
                preTitle="HARDWARES"
                title="Satellite Hardware Lists"
            >
            </SectionTitle>
            <FilterHardwareCarousel keywords={['Satellite', 'Starlink','OGx/IDP']} />

            <SectionTitle
                preTitle="RESOURCES"
                title={`${chips} : All Resources`}
            >
            </SectionTitle>
            <FilterResourceCarousel keywords={['Satellite', 'Starlink','OGx/IDP']} />
            {/*<SectionTitle*/}
            {/*    preTitle="RESOURCES"*/}
            {/*    title="ALL RESOURCES"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<TagFilterBlogCarousel initialTags={chips} />*/}
            {/*<FilterableHardwareList chips={chips}/>*/}
            {/*<TagFilterBlog initialTags={['ogx']} />*/}
            {/*<TagFilterBoard initialTags={['']}/>*/}
            {/*<FAQ/>*/}
            {/*<Download/>*/}
            {/*<References/>*/}
        </section>
    )
}