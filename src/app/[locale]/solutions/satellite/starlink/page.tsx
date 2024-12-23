import PageTopImage from '@/components/PageTopImage';
import React from 'react';
import starlinkData from '@/service/solutions/satellite/starlink';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import Characteristics from '@/components/(Solution)/Characteristics';

interface PageProps {
    params: {locale: string};
}
export default function StarlinkPage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = starlinkData[locale];


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

            <SectionTitle
                preTitle="Starlink"
                title="ORBCOMM 저궤도위성"
            >
                ORBCOMM의 저궤도(LEO: Low Earth Orbit) 위성 네트워크. 소형 위성모듈과 Whip 형태의 무지향성 안테나를 적용하여 쉽고 간단한 설치로 통신 인프라가 구축되어 있지 않은 산악/해상 등의 장소에서 유용한 데이터 통신 서비스를 제공합니다.
            </SectionTitle>
            <Characteristics items={data.character || []} gridCols={3}/>

        </section>
    )
}