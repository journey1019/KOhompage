import Image from 'next/image';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import CarouselPosts from '@/components/CarouselPosts';
import CaseStudies from '@/components/CaseStudies';
import Patners from '@/components/Patners';

export default function Home() {
    return (
        <section className='bd-gray-500'>
            <Hero/>
            <FeaturedPosts />
            <CarouselPosts />
            {/*<CaseStudies />*/}
            <Patners/>
        </section>
    );
}
