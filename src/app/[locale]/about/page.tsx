// export default function About() {
//     return(
//         <section>
//             <div>이미지</div>
//             <div>about text</div>
//             <div className="w-full justify-between">
//                 설립
//                 투자현황
//                 월간 사용자
//                 월간 메시지
//             </div>
//             <div>보안준수 (기간통신사업자 인증 - link) (ORBCOMM 라이센스 체결 - link)</div>
//             <div>핵심 기술 (Technic 페이지 없으면)</div>
//             <div>핵심 가치</div>
//             <div>투자자</div>
//             <div>개선 제안 (Contact Us)</div>
//         </section>
//     )
// }
/**
 * 현재 Next.js+Typescript+TailwindCSS+React를 활용하여 회사 홈페이지를 개발하고 있고, resources 구조를 생성하여 새롭게 구성하고자 한다.
 * src/app/[locale]/resources/notice, src/app/[locale]/resources/blog, src/app/[locale]/resources/board 로 나눈다. ㅜ선 notice 부터 구성하려고 한다.
 * notice에서는 관리자가 HTML5 Editor 같은 라이브러리를 활용하여 게시물을 작성할 수 있고, 사용자들을 그렇게 작성한 게시글들을 페이지별로 보거나, 전체 다 보거나 검색해서 볼 수 있도록 하고싶어.
 * resources/notice에서는 계속 생성되는 게시글들에 대해서 볼 수 있는 게시판 형식을 만들고 싶고, (추후에 따로 만들거지만 관리자들을) 게시글을 생성하는 페이지도 따로 만들어뒀으면 좋겠어.
 * 이 게시글들을 작성하고 저장하는 구조까지 디테일하게 설계해서 코드를 설계해줘
 * */
import aboutData from '@/service/aboutData';
import { Container } from "@/components/(About)/Container";
import { Hero } from "@/components/(About)/Hero";
import { SectionTitle } from "@/components/(About)/SectionTitle";
import { Benefits } from "@/components/(About)/Benefits";
import { Video } from "@/components/(About)/Video";
import { Testimonials } from "@/components/(About)/Testimonials";
import { Faq } from "@/components/(About)/Faq";
import { Cta } from '@/components/Cta';
import { Footer } from "@/components/(About)/Footer";
import { PopupWidget }  from "@/components/(About)/PopupWidget";
import DownloadSection from '@/components/(Templates)/DownloadSection';
import Blog from '@/components/(Templates)/Blog';

import { benefitOne, benefitTwo } from "@/components/(About)/data";
import PageHero from '@/components/PageHero';
import Partner from '@/components/Partner';
import React from 'react';
import WorkWithUs from '@/components/RightNow';
import History from '@/components/(About)/History';
import PartnerManyLines from '@/components/PartnerManyLines';
import PageHeroCenter from '@/components/PageHeroCenter';
import { CtaSolution } from '@/components/(Solution)/CtaSolution';

interface PageProps {
    params: {locale: string};
}
export default function AboutPage({params}: PageProps) {
    const { locale } = params;
    const data = aboutData[locale];

    return (
        <>
            <PageHeroCenter
                size="py-32"
                url={data.imageUrl}
                intro={data.imageIntro}
                title={data.imageMain}
                subtitle={data.imageSub}
                thirdtitle={data.imageThird}
            />

            <Container>
                <PartnerManyLines />

                {/*<Hero />*/}
                {/*<DownloadSection/>*/}
                <SectionTitle
                    preTitle="KOREA ORBCOMM"
                    title={data.introTitle}
                >
                    {data.introLetter}
                </SectionTitle>

                <History />

                {/*<Benefits data={benefitOne} />*/}
                {/*<Benefits imgPos="right" data={benefitTwo} />*/}

                {/*<SectionTitle*/}
                {/*    preTitle="Watch a video"*/}
                {/*    title="Learn how to fullfil your needs"*/}
                {/*>*/}
                {/*    This section is to highlight a promo or demo video of your product.*/}
                {/*    Analysts says a landing page with video has 3% more conversion rate. So,*/}
                {/*    don&apos;t forget to add one. Just like this.*/}
                {/*</SectionTitle>*/}

                {/*<Video videoId="fZ0D0cnR88E" />*/}

                <SectionTitle
                    preTitle="Testimonials"
                    title="Here's what our customers said"
                >
                    Testimonials is a great way to increase the brand trust and awareness.
                    Use this section to highlight your popular customers.
                </SectionTitle>

                <Testimonials />

                {/*<Faq />*/}
                {/*<Cta />*/}
                <CtaSolution items={data.ctas} />
                {/*<Blog/>*/}
                {/*<Footer />*/}
                {/*<PopupWidget />*/}
            </Container>
            <WorkWithUs />
        </>
    );
}
