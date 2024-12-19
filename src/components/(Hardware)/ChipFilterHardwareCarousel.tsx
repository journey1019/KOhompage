'use client';

import React, { useState, useEffect } from "react";
import { getFilteredByKeywords } from "@/service/hardwareData";
import HardwareCard from '@/components/(Hardware)/HardwareCard';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface FilterableHardwareCarouselProps {
    chips: string[];
}

const ChipFilterHardwareCarousel: React.FC<FilterableHardwareCarouselProps> = ({ chips }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredItems, setFilteredItems] = useState(getFilteredByKeywords([])); // 초기 데이터
    const [cardsToShow, setCardsToShow] = useState(3); // 반응형 카드 개수 설정

    // 반응형 카드 개수 계산
    const getCardsToShow = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width < 640) return 1; // 모바일
            if (width < 1024) return 2; // 태블릿
        }
        return 3; // 데스크탑
    };

    // Chips 변경에 따라 데이터 필터링
    useEffect(() => {
        setFilteredItems(getFilteredByKeywords(chips));
    }, [chips]);

    // 창 크기 변경 감지
    useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener("resize", handleResize);
        setCardsToShow(getCardsToShow()); // 초기 값 설정
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(filteredItems.length - cardsToShow, 0);

    const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    return (
        <div className="relative p-6 mx-auto max-w-7xl bg-white">
            {/* Carousel Container */}
            <div className="overflow-hidden mb-6">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    }}
                >
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className="w-full px-2 py-5 flex-shrink-0"
                            style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                        >
                            <HardwareCard {...item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={goPrev}
                    className="flex items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === 0}
                >
                    <ArrowLeftIcon aria-hidden="true" className="h-5 w-5 text-white mr-2" />
                    Prev
                </button>
                <button
                    onClick={goNext}
                    className="flex items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === maxIndex}
                >
                    Next
                    <ArrowRightIcon aria-hidden="true" className="h-5 w-5 text-white ml-2" />
                </button>
            </div>
        </div>
    );
};

export default ChipFilterHardwareCarousel;
