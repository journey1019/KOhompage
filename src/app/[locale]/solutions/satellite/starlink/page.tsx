import PageHero from '@/components/PageHero';
import React from 'react';
import starlinkData from '@/service/solutions/satellite/starlink';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import CharacteristicsBackImage from '@/components/(Solution)/CharacteristicsBackImage';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';
import FilterReferenceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const viewport = "width=device-width, initial-scale=1.0";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const data = starlinkData[locale];

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
            url: `https://www.orbcomm.co.kr/${locale}/solutions/satellite/starlink`,
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
export default async function StarlinkPage({params}: PageProps) {
    const { locale } = await params; // 비동기 처리
    const data = starlinkData[locale];

    if (!data) {
        notFound();
    }

    const pageName = ['Starlink']
    const filteredKeyword = ["starlink"]

    return(
        <section>
            <PageHero
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
            />

            <SectionTitle
                preTitle="Starlink"
                title={data.introTitle}
            >
                {data.introLetter}
            </SectionTitle>
            <CharacteristicsBackImage items={data.character || []} gridCols={3}/>

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


            <CtaSolution items={data.ctas}/>
        </section>
    )
}