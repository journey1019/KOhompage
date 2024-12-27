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
import { SectionTitle2 } from '@/components/(About)/SectionTitle2';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import React from 'react';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';
import Image from 'next/image';
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
    const data = solutionsData[locale]?.["global-iot"]; // 안전하게 데이터 접근



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
    const chips = ['Global-IoT'];

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
            <CarouselSolutions items={data.carousels || []}/>
            {/*<Card/>*/}
            {/*<Advantage/>*/}
            {/*<ContentForm/>*/}

            <SectionTitle2
                preTitle="Use Case"
                title="실시간 모니터링 시스템을 경험해보세요"
            >
                고객에게 제공되는 웹플랫폼(Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.
            </SectionTitle2>
            <UseCase slug="global-iot" locale={locale} />

            {/*<Hardware/>*/}

            <SectionTitle
                preTitle="Network"
                title="Communication network"
            >
                고객의 다양한 산업 분야에 적합한 최적의 디바이스 및 통신망을 제공합니다.
            </SectionTitle>
            <Image src="/images/solutions/global-iot/global-iot.png" alt="/images/solutions/global-iot/global-iot.png"
                   className="mx-auto items-center max-w-7xl justify-center pb-24"
                   width={800} height={300} unoptimized
            />

            {/*<SectionTitle*/}
            {/*    preTitle="HARDWARES"*/}
            {/*    title="Container-IoT Hardware Lists"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<ChipFilterHardwareCarousel chips={['global-iot']} />*/}
            <SectionTitle
                preTitle="HARDWARES"
                title="Global-IoT Hardware Lists"
            >
            </SectionTitle>
            <FilterHardwareCarousel keywords={['Global-IoT']} />

            <SectionTitle
                preTitle="Q n A"
                title="Why Customers Love Us"
            />
            <FAQ/>

            {/*<Download/>*/}
            {/*<SectionTitle*/}
            {/*    preTitle="RESOURCES"*/}
            {/*    title="ALL RESOURCES"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<TagFilterBlog initialTags={['container-iot']} />*/}
            {/*<TagFilterBlogCarousel initialTags={chips} />*/}
            <SectionTitle
                preTitle="RESOURCES"
                title={`${chips} : All Resources`}
            >
            </SectionTitle>
            <FilterResourceCarousel keywords={['Container-IoT']} />
        </section>
    )
}