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

import { Container } from "@/components/(About)/Container";
import { Hero } from "@/components/(About)/Hero";
import { SectionTitle } from "@/components/(About)/SectionTitle";
import { Benefits } from "@/components/(About)/Benefits";
import { Video } from "@/components/(About)/Video";
import { Testimonials } from "@/components/(About)/Testimonials";
import { Faq } from "@/components/(About)/Faq";
import { Cta } from "@/components/(About)/Cta";
import { Footer } from "@/components/(About)/Footer";
import { PopupWidget }  from "@/components/(About)/PopupWidget";
import HeroSection from '@/components/(Templates)/HeroSection';
import Blog from '@/components/(Templates)/Blog';

import { benefitOne, benefitTwo } from "@/components/(About)/data";
export default function AboutPage() {
    return (
        <Container>
            <Hero />
            <HeroSection/>
            <SectionTitle
                preTitle="Nextly Benefits"
                title=" Why should you use this landing page"
            >
                Nextly is a free landing page & marketing website template for startups
                and indie projects. Its built with Next.js & TailwindCSS. And its
                completely open-source.
            </SectionTitle>

            <Benefits data={benefitOne} />
            <Benefits imgPos="right" data={benefitTwo} />

            <SectionTitle
                preTitle="Watch a video"
                title="Learn how to fullfil your needs"
            >
                This section is to highlight a promo or demo video of your product.
                Analysts says a landing page with video has 3% more conversion rate. So,
                don&apos;t forget to add one. Just like this.
            </SectionTitle>

            <Video videoId="fZ0D0cnR88E" />

            <SectionTitle
                preTitle="Testimonials"
                title="Here's what our customers said"
            >
                Testimonials is a great way to increase the brand trust and awareness.
                Use this section to highlight your popular customers.
            </SectionTitle>

            <Testimonials />

            <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
                Answer your customers possible questions here, it will increase the
                conversion rate as well as support or chat requests.
            </SectionTitle>

            <Faq />
            <Cta />
            <Blog/>
            <Footer />
            <PopupWidget />
        </Container>
    );
}
