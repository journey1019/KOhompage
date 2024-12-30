'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import partnerData from '@/data/partner.json'

import Image from 'next/image';

export default function PartnerSliderLines({ line }: { line: number }) {
    const [isPaused, setIsPaused] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        variableWidth: true,
        pauseOnHover: false,
        centerMode: true,
        arrow: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 4000,
                    variableWidth: true,
                },
            },
        ],
    };

    // 데이터를 절반으로 나누어 각 라인에 다른 데이터를 보여줌
    const itemsPerLine = Math.ceil(partnerData.length / 2);
    const data = line === 1
        ? partnerData.slice(0, itemsPerLine)
        : partnerData.slice(itemsPerLine);

    return (
        <section
            className="py-4 overflow-hidden max-w-screen-2xl xl:max-w-screen-xl px-10 mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style jsx global>{`
                .slick-prev, .slick-next {
                    display: none !important;
                }
            `}</style>
            <Slider {...settings}>
                {data.map((partner, index) => (
                    <div key={index} className="px-2 sm:px-1 py-6 cursor-pointer items-center">
                        <Image
                            src={partner.imageUrl}
                            alt={partner.name}
                            className="h-20 sm:h-16 md:h-14 lg:h-12 object-contain mx-auto filter grayscale brightness-1100" // 크기 조정
                            width={200}
                            height={200}
                            unoptimized
                        />
                    </div>
                ))}
            </Slider>
        </section>
    );
}