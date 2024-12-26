import PageTopImage from '@/components/PageTopImage';
import React from 'react';
import ogxData from '@/service/solutions/satellite/ogxData';
import { SectionTitle } from '@/components/(About)/SectionTitle';
import ChipFilterHardwareCarousel from '@/components/(Hardware)/ChipFilterHardwareCarousel';
import TableAdvantage from "@/components/(Solution)/TableAdvantage";
import Strength from '@/components/(Solution)/Strength';


interface PageProps {
    params: {locale: string};
}
export default function OGxPage({params}: PageProps) {
    const { locale } = params; // 비동기 처리
    const data = ogxData[locale];

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


            <SectionTitle
                preTitle="HARDWARES"
                title="Satellite Hardware Lists"
            >
            </SectionTitle>
            <ChipFilterHardwareCarousel chips={['ogx', 'ogi', 'og2']} />

        </section>
    )
}