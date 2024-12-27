import React from 'react';
import vmsData from '@/service/solutions/global-iot/vms';
import PageTopImage from '@/components/PageTopImage';
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

interface PageProps {
    params: {locale: string};
}
export default async function MaritimePage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = vmsData[locale];

    const site = 'VMS'
    const chips = ['VMS']

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
            <Container>

                <SectionTitle
                    preTitle="Network Monitoring System"
                    title={data.characteristicsTitle}
                >
                    {data.characteristicsLetter}
                </SectionTitle>
                <Characteristics items={data.character || []} gridCols={4}/>


                <SectionTitle
                    preTitle="NMS"
                    title={data.introTitle}
                >
                    {data.introLetter}
                </SectionTitle>
                <OneImage item="/images/solutions/global-iot/VMSCommtrace.png"/>


                <SectionTitle
                    preTitle="HARDWARES"
                    title="Satellite Hardware Lists"
                >
                </SectionTitle>
                <FilterHardwareCarousel keywords={['AIS', 'Modem']} />


                <SectionTitle preTitle="FAQ" title={data.qnaTitle}>
                    {data.qnaLetter}
                </SectionTitle>
                <Faq items={data.faqs || []} />


                <CtaSolution items={data.ctas}/>


                <SectionTitle
                    preTitle="RESOURCES"
                    title={`${chips} : All Resources`}
                >
                </SectionTitle>
                <FilterResourceCarousel keywords={['Global-IoT']} />

            </Container>
        </section>
    )
}
