import PageHero from '@/components/PageHero';
import React from 'react';
import ogxData from '@/service/solutions/satellite/ogxData';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import TableAdvantage from "@/components/(Solution)/TableAdvantage";
import Strength from '@/components/(Solution)/Strength';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';
import { Metadata } from 'next';


export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale;
    const data = ogxData[locale];

    return {
        title: `${data.title} | KOREA ORBCOMM`,
        description: data.description,
        icons: {
            icon: "/favicon.ico",
        },
        openGraph: {
            title: `${data.title} | KOREA ORBCOMM`,
            description: data.openGraphDesc,
            url: `https://www.orbcomm.co.kr/${locale}/solutions/satellite/ogx`,
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
        viewport: "width=device-width, initial-scale=1.0",
    };
}

interface PageProps {
    params: {locale: string};
}
export default function OGxPage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = ogxData[locale];

    const pageName = ['OGx/IDP']
    const filteredKeyword = ["ogx/idp"]

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
                preTitle="OGx"
                title={data.introTitle}
                length={3}
            >
                {data.introLetter}
            </SectionTitle>
            <TableAdvantage items={data.features || []}/>

            <SectionTitle
                preTitle="Advantages"
                title="OGx의 힘을 최대한 활용하세요"
            >
                최신 위성 기술을 사용하여 IoT 솔루션을 더 빠르고 유연하게 구현하세요.
            </SectionTitle>
            <Strength items={data.advantages || []} gridCols={3}/>


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

            <CtaSolution items={data.ctas}/>
        </section>
    )
}