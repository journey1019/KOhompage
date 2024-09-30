'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import partnerData from '../../data/partner.json';
import Image from 'next/image';


export default function PartnerSliderFast() {
    const [isPaused, setIsPaused] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 300, // 숫자가 커질 수록 전환 속도가 느려짐
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false, // 기본 pauseOnHover 기능을 비활성화
        cssEase: 'ease-in-out', // 전환 애니메이션의 이점을 설정하여 부드러운 효과 적용
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section
            className="py-8 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}  // 마우스가 슬라이더에 들어가면 일시 정지
            onMouseLeave={() => setIsPaused(false)} // 마우스가 슬라이더를 벗어나면 재개
        >
            <style jsx>{`
                .slick-slider {
                    animation-play-state: ${isPaused ? 'paused' : 'running'}; // 커스텀 스타일 적용
                }
            `}</style>
            <Slider {...settings}>
                {partnerData.map((partner) => (
                    <div key={partner.index} className="p-4 cursor-pointer">
                        <Image
                            src={partner.imageUrl}
                            className="w-full h-20 object-contain mx-auto"
                            alt={partner.name}
                            width={300}
                            height={100}
                            unoptimized
                        />
                    </div>
                ))}
            </Slider>
        </section>
    );
}
