import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import CarouselPosts from '@/components/CarouselPosts';
import CaseStudies from '@/components/CaseStudies';
import Partners from '@/components/Partners';
import StartNow from '@/components/StartNow';
import Partner from '@/components/Partner';


export default function Home() {
    return (
        <section className='bd-gray-500'>
            <Hero/>
            <FeaturedPosts />
            <CarouselPosts />
            <CaseStudies />
            <Partners/>
            <Partner/>
            <StartNow />
        </section>
    );
}
