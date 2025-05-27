import FeaturedPosts from '@/components/FeaturedPosts';
import CarouselPosts from '@/components/CarouselPosts';
// import Board from '@/components/Board';
// import Board from '@/components/Board';
import Partners from '@/components/Partners';
import StartNow from '@/components/StartNow';
// import Partner from '@/components/Partner';
// import Introduce from '@/components/(Main)/Introduce';
import ResponsiveSection from '@/components/ResponsiveSection';

// import Solutions from '@/components/Solutions';
import Intro from '@/components/Intro';
import PartnerTable from '@/components/PartnerTable';
import RightNow from '@/components/RightNow';
// import SubscribeSection from '@/components/SubscribeSection';
import CarouselSolutions from '@/components/CarouselSolutions';
// import { getAllSolutions } from '@/service/solutions';
import News from '@/components/News';
// import CaseStudies from '../components/(Home)/CaseStudies';
// import Company from '@/components/(Main)/Company';
// import { useTranslations } from 'next-intl';
//
// /**
//  * @Todo: 스크롤 내릴 때 컴포넌트 스무스 생성
//  * */
// export default async function HomePage() {
//     // const t = useTranslations('home');
//     const solutions = await getAllSolutions(); // 데이터를 비동기로 가져옴
//
//     return (
//         <section className='bd-gray-500'>
//         {/*<ResponsiveSection/>*/}
//         {/*<Hero/>*/}
//         <Introduce/>
//         {/*<Partners/>*/}
//         {/*<PartnerTable/>*/}
//         <Partner/>
//         {/*<Introduce/>*/}
//         <Company/>
//         {/*<Intro/>*/}
//         {/*<ThreeComponent />*/}
//         {/*<CarouselSolutions solutions={solutions} />*/}
//         <Solutions solutions={solutions}/>
//         {/*<FeaturedPosts />*/}
//         {/*<CarouselPosts />*/}
//         <Board />
//         <SubscribeSection/>
//         <CaseStudies/>
//         {/*<StartNow />*/}
//         {/*<News/>*/}
//         <RightNow/>
//         </section>
//     );
// }
// 'use client'

// import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Introduce from '@/components/(Main)/Introduce';
import Partner from '@/components/Partner';
import PartnerManyLines from '@/components/PartnerManyLines';
import Company from '@/components/(Main)/Company';
import { getAllSolutions } from '@/service/solutions';
import Hero from '@/components/Hero';
import ThreeComponent from '@/components/ThreeComponenet';
import Solutions from '@/components/Solutions';
import Board from '@/components/Board';
import SubscribeSection from '@/components/SubscribeSection';
import CaseStudies from '@/components/(Home)/CaseStudies';
import React from 'react';
import WorkWithUs from '@/components/RightNow';
import TagFilterBlog from '@/components/(Main)/TagFilterBlog';
import TagFilterBoard from '@/components/(Main)/TagFilterBoard';
import References from '@/components/(Main)/References';
import TagFilterBlogCarousel from '@/components/(Resources)/TagFilterBlogCarousel';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';


export default async function HomePage({params}: {params: {locale: string}}) {
    const { locale } = params;
    // const t = useTranslations('home');
    const solutions = await getAllSolutions(); // 데이터를 비동기로 가져옴

    return (
        <section>
            {/*<h1>{t('HomePage.title')}</h1>*/}
            {/*<Link href="/about">{t('HomePage.about')}</Link>*/}
            <Hero locale={locale}/>

            {/*<Introduce />*/}
            {/*<Partner />*/}

            <PartnerManyLines />
            <ThreeComponent />


            {/*<Company />*/}
            {/*<Solutions solutions={solutions} />*/}
            {/*<CaseStudies />*/}
            {/*<Board />*/}
            {/*<div className="mx-auto max-w-7xl py-32">*/}
            {/*    <div className="m-auto max-w-5xl">*/}
            {/*        <h2 className="text-center text-md font-semibold text-red-800 pb-6 sm:pb-10">OUR RESOURCES</h2>*/}
            {/*    </div>*/}
            {/*    <TagFilterBlog initialTags={[]} />*/}
            {/*</div>*/}
            {/*<References/>*/}
            {/*<TagFilterBoard initialTags={[]} />*/}

            {/*<SubscribeSection />*/}
            <WorkWithUs locale={locale}/>
        </section>
    );
    }