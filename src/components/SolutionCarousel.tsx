'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

type Props = {
    children: React.ReactNode;
}
export default function SolutionCarousel({children}: Props) {
    return (
        <Carousel
            infinite
            showDots
            autoPlay
            autoPlaySpeed={6000} // 6초
            responsive={responsive}
            dotListClass="custom-dot-list" // Add this line
            // itemClass='m-2'
        >
            {children}
        </Carousel>
    )
}