import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import CarouselPosts from '@/components/CarouselPosts';
import CaseStudies from '@/components/CaseStudies';
import Partners from '@/components/Partners';
import StartNow from '@/components/StartNow';
import Partner from '@/components/Partner';
import Introduce from '@/components/Introduce';
import ResponsiveSection from '@/components/ResponsiveSection';


export default function Home() {
    return (
        <section className='bd-gray-500'>
            <ResponsiveSection/>
            <Hero/>
            {/*<Partners/>*/}
            <Partner/>
            <Introduce/>
            <FeaturedPosts />
            <CarouselPosts />
            <CaseStudies />
            <StartNow />
        </section>
    );
}
