'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import partnerData from '@/data/partner.json';

import Image from 'next/image';

export default function PartnerSliderLines({ line }: { line: number }) {
    const [isPaused, setIsPaused] = useState(false); // Correctly defining isPaused state
    const [isMobile, setIsMobile] = useState(false);

    // 윈도우 크기에 따라 상태를 업데이트
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 슬라이더 설정
    const settings = {
        dots: false,
        infinite: true,
        speed: isMobile ? 3000 : 5000, // 모바일: 빠름, 데스크탑: 느림
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        variableWidth: true,
        pauseOnHover: false,
        centerMode: true,
        rtl: line === 2, // line 2는 오른쪽에서 왼쪽으로 슬라이드
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: isMobile ? 4000 : 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: isMobile ? 4000 : 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: isMobile ? 3000 : 4000,
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
            className="py-4 overflow-hidden max-w-screen-2xl xl:max-w-screen-xl px-4 md:px-10 mx-auto"
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
                    <div
                        key={index}
                        className="px-2 sm:px-1 md:py-6 flex justify-center items-center"
                    >
                        <Image
                            src={partner.imageUrl}
                            alt={partner.name}
                            className={`object-contain mx-auto filter grayscale brightness-1100 ${
                                isMobile ? 'h-16 sm:h-14 md:h-12' : 'h-20 sm:h-16 md:h-14 lg:h-12'
                            }`}
                            width={isMobile ? 150 : 200}
                            height={isMobile ? 150 : 200}
                            unoptimized
                        />
                    </div>
                ))}
            </Slider>
        </section>
    );
}
