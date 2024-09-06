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
import AllPartner from '@/components/PartnerTable';


export default function Home() {
    return (
        <section className='bd-gray-500'>
            {/*<ResponsiveSection/>*/}
            <Hero/>
            {/*<Partners/>*/}
            <AllPartner/>
            {/*<Partner/>*/}
            <Introduce/>
            <Intro/>
            <ThreeComponent />
            <Solutions/>
            <FeaturedPosts />
            <CarouselPosts />
            <CaseStudies />
            <StartNow />
        </section>
    );
}
