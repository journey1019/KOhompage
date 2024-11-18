import { Metadata } from 'next';
import PageTopImage from '@/components/PageTopImage';
import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';
import Hardware from '@/components/(Solution)/Hardware';
import ContentForm from '@/components/(Solution)/ContentForm';
import FAQ from '@/components/(Solution)/FAQ';
import UseCase from '@/components/(Solution)/UseCase';
import Download from '@/components/(Solution)/Download';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Solutions',
    description: 'KOREA ORBCOMM 의 Solutions 소개'
}

export default function SolutionsPage() {
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
            {/*<Header/>*/}
            <Greet />
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