import React from 'react';
import maritimeData from '@/service/solutions/container-iot/maritime';
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
import SolutionAdvantage from '@/components/(Solution)/SolutionAdvantage';
import { notFound } from 'next/navigation';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';

interface PageProps {
    params: {locale: string};
}
export default async function MaritimePage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = maritimeData[locale];

    if (!data) {
        notFound();
    }

    const pageName = ['Maritime']
    const filteredKeyword = ["maritime"]

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

                <CtaSolution items={data.ctas}/>

                <SectionTitle preTitle="FAQ" title={data.qnaTitle}>
                    {data.qnaLetter}
                </SectionTitle>
                <Faq items={data.faqs || []} />

                {/*<ChipFilterHardwareCarousel chips={['maritime']} />*/}
                <SectionTitle
                    preTitle="HARDWARES"
                    title={`${pageName} Hardware Lists`}
                >
                </SectionTitle>
                <FilterHardwareCarouselBySolutionTags keywords={filteredKeyword} />
                {/*<FilterableHardwareList chips={chips}/>*/}
                {/*<SlugHardware locale={locale}/>*/}

                <SectionTitle
                    preTitle="RESOURCES"
                    title={`${pageName} Resource Lists`}
                >
                </SectionTitle>
                <FilterResourceCarouselBySolutionTags keywords={filteredKeyword} />

                {/*<SectionTitle preTitle="Resources" title="Maritime Platform: Resources" />*/}
                {/*<Blog/>*/}
                {/*<TagFilterBlog initialTags={['maritime']} />*/}
            </Container>
        </section>
    )
}
