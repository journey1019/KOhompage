import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import CarouselPosts from '@/components/CarouselPosts';
import CaseStudies from '@/components/CaseStudies';
import Partners from '@/components/Partners';
import StartNow from '@/components/StartNow';
import Partner from '@/components/Partner';
import Introduce from '@/components/Introduce';
import ResponsiveSection from '@/components/ResponsiveSection';
import ThreeComponent from '@/components/ThreeComponenet';
import Solutions from '@/components/Solutions';
import Intro from '@/components/Intro';
import PartnerTable from '@/components/PartnerTable';
import RightNow from '@/components/RightNow';
import SubscribeSection from '@/components/SubscribeSection';
import CarouselSolutions from '@/components/CarouselSolutions';
import { getAllSolutions } from '@/service/solutions';
import News from '@/components/News';

/**
 * @Todo: 스크롤 내릴 때 컴포넌트 스무스 생성
 * */
export default async function Home() {
    const solutions = await getAllSolutions(); // 데이터를 비동기로 가져옴

    return (
        <section className='bd-gray-500'>
            {/*<ResponsiveSection/>*/}
            <Hero/>
            {/*<Partners/>*/}
            <PartnerTable/>
            <Partner/>
            <Introduce/>
            <Intro/>
            <ThreeComponent />
            <CarouselSolutions solutions={solutions} />
            {/*<Solutions/>*/}
            {/*<FeaturedPosts />*/}
            {/*<CarouselPosts />*/}
            <CaseStudies />
            {/*<StartNow />*/}
            <News/>
            <RightNow/>
            <SubscribeSection/>
        </section>
    );
}
