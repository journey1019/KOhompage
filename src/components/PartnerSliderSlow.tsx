'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import partnerData from '../../data/partner.json';
//import partnerData from '../../data/partner_compatibility.json'
import partnerData from '../../data/main/partner.json'

import Image from 'next/image';

export default function PartnerSlider() {
    const [isPaused, setIsPaused] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000, // 전환 속도 설정
        slidesToShow: 3, // 한 번에 하나의 슬라이드 표시
        slidesToScroll: 1, // 한 번에 하나의 슬라이드 이동
        autoplay: true,
        autoplaySpeed: 0, // autoplaySpeed를 0으로 설정하여 연속적인 움직임을 만듦
        cssEase: 'linear', // linear easing을 사용해 슬라이드가 일정한 속도로 이동하도록 함
        variableWidth: true, // 슬라이드 너비를 동적으로 조정
        pauseOnHover: false,
        centerMode: true, // 슬라이드를 중앙에 배치 (옵션)
        arrow: false, // 화살표 제거
        responsive: [
            {
                breakpoint: 1280, // Large devices
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 1024, // Medium devices
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 5000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 768, // Tablet devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 4000,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 480, // Mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 4000,
                    variableWidth: true,
                },
            },
        ],
    };

    return (
        <section
            className="py-8 overflow-hidden max-w-screen-2xl xl:max-w-screen-xl px-20 mx-auto"
            onMouseEnter={() => setIsPaused(true)} // 마우스가 슬라이더에 들어가면 일시 정지
            onMouseLeave={() => setIsPaused(false)} // 마우스가 슬라이더를 벗어나면 재개
        >
            <style jsx global>{`
                .slick-prev, .slick-next {
                    display: none !important;
                }
            `}</style>
            <Slider {...settings}>
                {partnerData.map((partner, index) => (
                    <div key={index} className="px-4 sm:px-1 py-10 cursor-pointer dark:text-white items-center">
                        <Image
                            src={partner.imageUrl}
                            alt={partner.name}
                            className="h-24 sm:h-8 md:h-20 lg:h-14 object-contain mx-auto filter grayscale brightness-[3000%]" // 필요에 따라 width 조정
                            width={300}
                            height={700}
                            unoptimized
                        />
                    </div>
                ))}
            </Slider>
        </section>
        // <section
        //     className="relative py-8 overflow-hidden max-w-screen-2xl xl:max-w-screen-xl px-20 mx-auto"
        //     onMouseEnter={() => setIsPaused(true)} // 마우스가 슬라이더에 들어가면 일시 정지
        //     onMouseLeave={() => setIsPaused(false)} // 마우스가 슬라이더를 벗어나면 재개
        // >
        //     <style jsx>{`
        //         .carousel-container {
        //             position: relative;
        //         }
        //         .carousel-gradient-left,
        //         .carousel-gradient-right {
        //             position: absolute;
        //             top: 0;
        //             bottom: 0;
        //             width: 100px; /* 그라데이션의 너비 */
        //             z-index: 2;
        //             pointer-events: none; /* 클릭 차단 */
        //         }
        //         .carousel-gradient-left {
        //             left: 0;
        //             background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
        //         }
        //         .carousel-gradient-right {
        //             right: 0;
        //             background: linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent);
        //         }
        //     `}</style>
        //
        //     {/* 그라데이션 오버레이 */}
        //     <div className="carousel-container">
        //         <div className="carousel-gradient-left"></div>
        //         <div className="carousel-gradient-right"></div>
        //
        //         {/* Slider */}
        //         <Slider {...settings}>
        //             {partnerData.map((partner, index) => (
        //                 <div key={index} className="px-4 sm:px-1 py-10 cursor-pointer dark:text-white items-center">
        //                     <Image
        //                         src={partner.imageUrl}
        //                         alt={partner.name}
        //                         className="h-24 sm:h-8 md:h-20 lg:h-14 object-contain mx-auto filter grayscale brightness-[3000%]" // 필요에 따라 width 조정
        //                         width={300}
        //                         height={700}
        //                         unoptimized
        //                     />
        //                 </div>
        //             ))}
        //         </Slider>
        //     </div>
        // </section>
    );
}
