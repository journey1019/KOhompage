import React from 'react';

import aboutData from '@/service/aboutData';
import { Container } from "@/components/(About)/Container";
import { SectionTitle } from "@/components/(About)/SectionTitle";
import { Cta } from '@/components/Cta';
import WorkWithUs from '@/components/RightNow';
import PartnerManyLines from '@/components/PartnerManyLines';
import PageHeroCenter from '@/components/PageHeroCenter';
import Value from '@/components/(About)/Value';
import Feature from '@/components/Feature';
import Timeline from '@/components/(About)/Timeline';
import { Benefits } from "@/components/(About)/Benefits";
import { Testimonials } from "@/components/(About)/Testimonials";
import { Footer } from "@/components/(About)/Footer";
import { PopupWidget }  from "@/components/(About)/PopupWidget";
import DownloadSection from '@/components/(Templates)/DownloadSection';
import Blog from '@/components/(Templates)/Blog';
import PageHero from '@/components/PageHero';
import Partner from '@/components/Partner'
import History from '@/components/(About)/History';

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

                {/*<DownloadSection/>*/}
                {/*<History />*/}
                {/*<Benefits data={benefitOne} />*/}
                {/*<Benefits imgPos="right" data={benefitTwo} />*/}

                <Feature sections={data.feature}/>


                <SectionTitle
                    preTitle="Time line"
                    title="Company History"
                >
                </SectionTitle>
                <Timeline timeline={data.timeline} />


                <SectionTitle
                    preTitle="Values"
                    title="Why KOREA ORBCOMM"
                >
                </SectionTitle>
                <Value items={data.value}/>


                {/*<SectionTitle*/}
                {/*    preTitle="Testimonials"*/}
                {/*    title="Here's what our customers said"*/}
                {/*>*/}
                {/*    Testimonials is a great way to increase the brand trust and awareness.*/}
                {/*    Use this section to highlight your popular customers.*/}
                {/*</SectionTitle>*/}
                {/*<Testimonials />*/}

                <Cta items={data.ctas}/>
                {/*<Blog/>*/}
                {/*<Footer />*/}
                {/*<PopupWidget />*/}
            </Container>
            <WorkWithUs />
        </>
    );
}
