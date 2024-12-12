import React from 'react';
import maritimeData from '@/service/solutions/container-iot/maritime';
import PageTopImage from '@/components/PageTopImage';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Video } from '@/components/Video';
import { Faq } from '@/components/Faq';
import { Cta } from '@/components/Cta';
import SubscribeSection from '@/components/SubscribeSection';
import Blog from '@/components/Blog';
import { SlugHardware } from '@/components/(Solution)/SlugHardware';

interface PageProps {
    params: {locale: string};
}
export default async function MaritimePage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = maritimeData[locale];

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
                <Video videoUrl="https://www.youtube.com/watch?v=9ppHkaMbCRE" />

                <SectionTitle preTitle="Nextly Benefits" title="Why should you use this solution">
                    ORBCOMM은 IoT와 AIS 기반 솔루션 및 서비스를 독특하게 결합하여 전 세계 해역을 운항하는 해운 회사, 상업용 어선 및 상선 함대를 위한 컨테이너 및 기타 해양 자산에 대한 중요한 모니터링을 제공합니다.
                </SectionTitle>

                <div>장,단점</div>
                <div>하드웨어</div>
                <div>Maritime(Solution) 이동</div>


                <SectionTitle preTitle="Hardware" title={data.qnaTitle}>
                    {data.qnaLetter}
                </SectionTitle>
                <SlugHardware locale={locale}/>

                <SectionTitle preTitle="FAQ" title={data.qnaTitle}>
                    {data.qnaLetter}
                </SectionTitle>
                <Faq items={data.faqs || []} />

                <Cta items={data.ctas}/>

                <SectionTitle preTitle="Resources" title="자원" />
                <Blog/>

            </Container>
        </section>
    )
}
