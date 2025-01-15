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
import { SectionTitle2 } from '@/components/(About)/SectionTitle2';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import React from 'react';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import CarouselSolutionBlock from '@/components/(Solution)/CarouselSolutionBlock';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';

export const viewport = "width=device-width, initial-scale=1.0";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = solutionsData[locale]?.["global-iot"];

    if (!data) {
        throw new Error(`Metadata for locale ${locale} could not be found.`);
    }

    return {
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}/solutions/global-iot`,
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
export default async function GlobalIoT({params}: PageProps){
    const { locale } = await params; // 비동기적으로 처리
    const data = solutionsData[locale]?.["global-iot"]; // 안전하게 데이터 접근

    // 데이터 유효성 검증
    if (!data) {
        notFound();
    }

    const pageName = ['Global-IoT']
    const filteredKeyword = ["global-iot"]

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
            <CarouselSolutionBlock items={data.carousels || []}/>
            {/*<Card/>*/}
            {/*<Advantage/>*/}
            {/*<ContentForm/>*/}

            {/*<SectionTitle2*/}
            {/*    preTitle="Use Case"*/}
            {/*    title="실시간 모니터링 시스템을 경험해보세요"*/}
            {/*>*/}
            {/*    고객에게 제공되는 웹플랫폼(Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.*/}
            {/*</SectionTitle2>*/}

            <SectionTitle
                preTitle="Use Case"
                title="실시간 모니터링 시스템을 경험해보세요"
                length={3}
            >
                고객에게 제공되는 웹플랫폼(VMS Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.
            </SectionTitle>
            <UseCase slug="global-iot" locale={locale} />

            {/*<Hardware/>*/}

            <SectionTitle
                preTitle="Network"
                title="Communication Network"
            >
                고객의 다양한 산업 분야에 적합한 최적의 디바이스 및 통신망을 제공합니다.
            </SectionTitle>
            <Image src="/images/solutions/global-iot/global-iot.png" alt="/images/solutions/global-iot/global-iot.png"
                   className="mx-auto items-center justify-center w-full h-auto sm:max-w-md md:max-w-lg lg:max-w-4xl pb-24"
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
                title={`${pageName} Hardware Lists`}
            >
            </SectionTitle>
            <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />

            <SectionTitle
                preTitle="FAQ"
                title="자주 묻는 질문"
            />
            <FAQ faqImage={data.faqImage || ''} items={data.faq || []}/>

            {/*<SectionTitle*/}
            {/*    preTitle="RESOURCES"*/}
            {/*    title="ALL RESOURCES"*/}
            {/*>*/}
            {/*</SectionTitle>*/}
            {/*<TagFilterBlog initialTags={['container-iot']} />*/}
            {/*<TagFilterBlogCarousel initialTags={chips} />*/}
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