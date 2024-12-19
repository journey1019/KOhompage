import solutionsData from '@/service/solutionsData';
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
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import React from 'react';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';

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
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Solution not found</h2>
                <p>Please check the locale or solution slug.</p>
            </div>
        );
    }
    const chips = ['global-iot', 'st2100', 'st6100', 'st9100', 'og2', 'ogi'];

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
            <Advantage/>
            {/*<ContentForm/>*/}
            <UseCase slug="global-iot" locale={locale} />
            {/*<Hardware/>*/}

            <SectionTitle
                preTitle="HARDWARES"
                title="Container-IoT Hardware Lists"
            >
            </SectionTitle>
            <ChipFilterHardwareCarousel chips={['global-iot']} />

            <SectionTitle
                preTitle="Q n A"
                title="Why Customers Love Us"
            />
            <FAQ/>

            {/*<Download/>*/}
            <SectionTitle
                preTitle="REFERENCES"
                title="ALL REFERNCES"
            >
            </SectionTitle>
            {/*<TagFilterBlog initialTags={['container-iot']} />*/}
            <TagFilterBlogCarousel initialTags={chips} />
        </section>
    )
}