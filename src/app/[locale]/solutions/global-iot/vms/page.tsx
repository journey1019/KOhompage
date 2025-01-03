import React from 'react';
import vmsData from '@/service/solutions/global-iot/vms';
import PageHero from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Video } from '@/components/Video';
import { Faq } from '@/components/Faq';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';
import SubscribeSection from '@/components/SubscribeSection';
import Blog from '@/components/Blog';
import { SlugHardware } from '@/components/(Solution)/SlugHardware';
import FilterableHardwareList from '@/components/(Hardware)/FilterableHardwareList';
import TagFilterBlog from '@/components/(Resources)/TagFilterBlog';
import UseCaseAdvantage from '@/components/(Solution)/UseCaseAdvantage';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import Characteristics from '@/components/(Solution)/Characteristics';
import OneImage from '@/components/(Solution)/OneImage';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';

interface PageProps {
    params: {locale: string};
}
export default async function MaritimePage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = vmsData[locale];


    const pageName = ['VMS']
    const filteredKeyword = ["vms"]

    return(
        <section>
            <PageHero
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
                solutionButton={data.solutionButton}
                solutionUrl={data.solutionUrl}
            />
            <Container>

                <SectionTitle
                    preTitle="VMS"
                    title={data.characteristicsTitle}
                >
                    {data.characteristicsLetter}
                </SectionTitle>
                <Characteristics items={data.character || []} gridCols={4}/>


                <SectionTitle
                    preTitle="VMS"
                    title={data.introTitle}
                >
                    {data.introLetter}
                </SectionTitle>
                <OneImage item="/images/solutions/global-iot/VMS.png"/>


                <SectionTitle
                    preTitle="HARDWARES"
                    title={`${pageName} Hardware Lists`}
                >
                </SectionTitle>
                <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />


                {/*<SectionTitle preTitle="FAQ" title={data.qnaTitle}>*/}
                {/*    {data.qnaLetter}*/}
                {/*</SectionTitle>*/}
                {/*<Faq items={data.faqs || []} />*/}


                <SectionTitle
                    preTitle="RESOURCES"
                    title={`${pageName} Resource Lists`}
                >
                </SectionTitle>
                <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />


                <CtaSolution items={data.ctas}/>
            </Container>
        </section>
    )
}
