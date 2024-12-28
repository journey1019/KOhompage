import PageHero from '@/components/PageHero';
import React from 'react';
import lowEarthOrbitData from '@/service/solutions/satellite/low-earth-orbit';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import Characteristics from '@/components/(Solution)/Characteristics';
import OneImage from '@/components/(Solution)/OneImage';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import FilterHardwareCarousel from '@/components/(Hardware)/FilterHardwareCarousel';
import FilterResourceCarousel from '@/components/(Resources)/FilterResourceCarousel';
import FilterHardwareCarouselBySolutionTags from '@/components/(Hardware)/FilterHardwareCarouselBySolutionTags';
import FilterResourceCarouselBySolutionTags from '@/components/(Resources)/FilterResourceCarouselBySolutionTags';

interface PageProps {
    params: {locale: string};
}
export default function LowEarthOrbitPage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = lowEarthOrbitData[locale];


    const pageName = ['Low Earth Orbit']
    const filteredKeyword = ["low-earth-orbit"]

    return(
        <section>
            <PageHero
                size="py-52"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
                textPosition="center"
            />

            <SectionTitle
                preTitle="Low Earth Orbit"
                title="ORBCOMM 위성 데이터 통신 서비스 특징"
            >
                ORBCOMM의 저궤도(LEO: Low Earth Orbit) 위성 네트워크. 소형 위성모듈과 Whip 형태의 무지향성 안테나를 적용하여 쉽고 간단한 설치로 통신 인프라가 구축되어 있지 않은 산악/해상 등의 장소에서 유용한 데이터 통신 서비스를 제공합니다.
            </SectionTitle>
            <Characteristics items={data.character || []} gridCols={4}/>

            <SectionTitle
                preTitle="Low Earth Orbit"
                title="ORBCOMM 저궤도위성"
                length={3}
            >
                ORBCOMM 위성 데이터통신 서비스는 단말기에서 생성된 자료를 인터넷이나 전용회선을 통하여 E-Mail(SMTP) 또는 XML Gate-way 형식으로 데이터를 송수신합니다. 각 분야에 맞는 솔루션을 제공하고 있어, 추가 설비나 비용의 투자 없이 바로 이용할 수 있습니다. 현재 건설장비, 해양, 환경, 기상 등 다양한 분야의 고정 및 이동자산의 상태감시, 위치추적, 원격관리 등을 제공하고 있습니다.
            </SectionTitle>
            <OneImage item="/images/solutions/satellite/Remote.png"/>

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
        </section>
    )
}