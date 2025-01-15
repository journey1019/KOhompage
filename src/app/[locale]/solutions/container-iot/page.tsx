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
// import TagFilterBlog from "@/components/(Resources)/TagFilterBlog"
import FilterableHardwareList from '@/components/(Hardware)/FilterableHardwareList';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';
// import TagFilterBlog from '@/components/(Main)/TagFilterBlog';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import { notFound } from 'next/navigation';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';

// viewport 설정을 별도로 export
export const viewport = "width=device-width, initial-scale=1.0";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = solutionsData[locale]?.["container-iot"];

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
            url: `https://www.orbcomm.co.kr/${locale}/solutions/container-iot`,
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
export default async function ContainerIoT({ params }: PageProps){
    const { locale } = await params; // `params`를 비동기적으로 처리
    const data = solutionsData[locale]?.["container-iot"]; // 안전하게 데이터 접근

    // 데이터 유효성 검증
    if (!data) {
        notFound(); // 데이터가 없으면 404 페이지로 리다이렉트
        // return (
        //     <div className="text-center py-12">
        //         <h2 className="text-2xl font-bold">Solution not found</h2>
        //         <p>Please check the locale or solution slug.</p>
        //     </div>
        // );
        // Redirect to 404 if the hardware is not found
    }
    const pageName = ['Container-IoT'];
    const filteredKeyword = ["container-iot"]

    return(
        <section>
            <PageHero
                size="py-36"
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
            <Point items={data.points || []} />
            {/*<ContentForm/>*/}
            <UseCase slug="container-iot" locale={locale} />
            <Strength items={data.advantages || []} gridCols={4} />

            <SectionTitle
                preTitle="HARDWARES"
                title={`${pageName} Hardware Lists`}
            >
            </SectionTitle>
            <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />
            {/*<FilterableHardwareList chips={['container', 'maritime']}/>*/}
            {/*<ChipFilterHardwareCarousel chips={['container-iot', 'maritime']} />*/}
            {/*<Hardware/>*/}
            {/*<FAQ/>*/}
            {/*<Download/>*/}
            {/*<References locale={locale} tag="container-iot" />*/}

            {/*<TagFilterBlog initialTags={chips}/>*/}

            <SectionTitle
                preTitle="FAQ"
                title="자주 묻는 질문"
            />
            <FAQ faqImage={data.faqImage || ''} items={data.faq || []}/>

            <SectionTitle
                preTitle="RESOURCES"
                title={`${pageName} Resource Lists`}
            >
            </SectionTitle>
            <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />
            {/*<TagFilterBlog initialTags={['container-iot']} />*/}
            {/*<TagFilterBlogCarousel initialTags={chips} />*/}

            <CtaSolution items={data.ctas}/>
        </section>
    )
}