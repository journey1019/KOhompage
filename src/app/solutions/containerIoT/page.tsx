import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';
import ContentForm from '@/components/(Solution)/ContentForm';
import UseCase from '@/components/(Solution)/UseCase';
import Hardware from '@/components/(Solution)/Hardware';
import FAQ from '@/components/(Solution)/FAQ';
import Download from '@/components/(Solution)/Download';
import PageTopImage from '@/components/PageTopImage';

export default function ContianerIoT(){
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