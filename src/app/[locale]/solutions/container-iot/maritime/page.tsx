import React from 'react';
import maritimeData from '@/service/solutions/container-iot/maritime';
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
import SolutionAdvantage from '@/components/(Solution)/SolutionAdvantage';
import { notFound } from 'next/navigation';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';

interface PageProps {
    params: {locale: string};
}
export default async function MaritimePage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = maritimeData[locale];

    if (!data) {
        notFound();
    }

    const chips = ['maritime']

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
                    preTitle="Maritime Platform"
                    title={data.introTitle}
                >
                    {data.introLetter}
                </SectionTitle>
                <Video videoUrl="https://www.youtube.com/embed/-QE6gJMhrgU" />

                <SectionTitle preTitle="Nextly Benefits" title={data.useCaseTitle}>
                    {data.useCaseLetter}
                </SectionTitle>
                {/*<UseCaseAdvantage solutionKey="maritime" locale={locale} />*/}
                <SolutionAdvantage advantages={data.advantage} />

                {/*<SectionTitle preTitle="Hardware" title={data.qnaTitle}>*/}
                {/*    {data.qnaLetter}*/}
                {/*</SectionTitle>*/}


                {/*<ChipFilterHardwareCarousel chips={['maritime']} />*/}
                <SectionTitle
                    preTitle="HARDWARES"
                    title="Maritime Hardware Lists"
                >
                </SectionTitle>
                <FilterHardwareCarousel keywords={['Maritime']} />
                {/*<FilterableHardwareList chips={chips}/>*/}
                {/*<SlugHardware locale={locale}/>*/}

                <SectionTitle
                    preTitle="RESOURCES"
                    title={`${chips} : All Resources`}
                >
                </SectionTitle>
                <FilterResourceCarousel keywords={[ 'Maritime']} />

                <SectionTitle preTitle="FAQ" title={data.qnaTitle}>
                    {data.qnaLetter}
                </SectionTitle>
                <Faq items={data.faqs || []} />

                <CtaSolution items={data.ctas}/>

                {/*<SectionTitle preTitle="Resources" title="Maritime Platform: Resources" />*/}
                {/*<Blog/>*/}
                {/*<TagFilterBlog initialTags={['maritime']} />*/}
            </Container>
        </section>
    )
}
