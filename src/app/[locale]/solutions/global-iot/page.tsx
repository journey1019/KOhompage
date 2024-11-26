import solutionsData from '@/service/solutionsData';
import PageTopImage from '@/components/PageTopImage';
import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';
import ContentForm from '@/components/(Solution)/ContentForm';
import UseCase from '@/components/(Solution)/UseCase';
import Hardware from '@/components/(Solution)/Hardware';
import FAQ from '@/components/(Solution)/FAQ';
import { Metadata } from 'next';
import Download from '@/components/(Solution)/Download';

export const metadata: Metadata = {
    title: 'Solution | %s',
    description: 'KOREA ORBCOMM 의 Solutions 소개'
}

interface PageProps {
    params: {locale: string};
}
export default function GlobalIoT({params}: PageProps){
    const data = solutionsData[params.locale]["global-iot"];
    return(
        <section>
            <PageTopImage
                size="py-52"
                url="https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg"
                title="KOREAORBCOMM FOR RINANCIAL SERVICES"
                subtitle="글로벌 통신으로 경험을 향상시키세요"
                description="이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다."
                textPosition="center"
            />
            <Greet {...data} />
            {/*<Greet*/}
            {/*    solutionNumber={data.solutionNumber}*/}
            {/*    title={data.title}*/}
            {/*    solutionName={data.solutionName}*/}
            {/*    description={data.description}*/}
            {/*/>*/}
            <Intro />
            <Card/>
            <Advantage/>
            <ContentForm/>
            <UseCase/>
            <Hardware/>
            <FAQ/>
            <Download/>
        </section>
    )
}