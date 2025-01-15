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
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';

export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = solutionsData[locale]?.["satellite"];

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
            url: `https://www.orbcomm.co.kr/${locale}/solutions/satellite`,
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
    const data = solutionsData[locale]?.["satellite"]; // 안전하게 데이터 접근

    // 데이터 유효성 검증
    if (!data) {
        notFound();
    }

    const pageName = ['Satellite']
    const filteredKeyword = ["satellite"]

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

            <CtaSolution items={data.ctas}/>
        </section>
    )
}