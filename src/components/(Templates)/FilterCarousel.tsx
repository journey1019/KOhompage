"use client";

import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getBlogData } from "@/service/blogData";
import BlogCard from "@/components/(Resources)/BlogCard";

interface TagFilterProps {
    initialTags: string[];
}

const FilterCarousel: React.FC<TagFilterProps> = ({ initialTags }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const blogData = getBlogData().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const filteredData = blogData.filter((item) =>
        selectedTag ? item.tags.includes(selectedTag) : initialTags.some((tag) => item.tags.includes(tag))
    );

    // 반응형 카드 개수 설정
    const getCardsToShow = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width < 640) return 1; // 모바일
            if (width < 1024) return 2; // 태블릿
        }
        return 3; // 데스크톱
    };

    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

    // 화면 크기 변경 감지 (반응형 업데이트)
    React.useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(filteredData.length - cardsToShow, 0);

    const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    return (
        <div className="relative p-6 mx-auto max-w-7xl">
            {/* Carousel Container */}
            <div className="overflow-hidden mb-6">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    }}
                >
                    {filteredData.map((item, index) => (
                        <div key={index} className="w-full px-2 py-5 flex-shrink-0" style={{ flex: `0 0 ${100 / cardsToShow}%` }}>
                            <BlogCard {...item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons at the Bottom */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={goPrev}
                    className="flex flex-row items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === 0}
                >
                    <ArrowLeftIcon aria-hidden="true" className="h-5 w-5 text-white mr-2" />
                    <span>Prev</span>
                </button>
                <button
                    onClick={goNext}
                    className="flex flex-row items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === maxIndex}
                >
                    <span>Next</span>
                    <ArrowRightIcon aria-hidden="true" className="h-5 w-5 text-white ml-2" />
                </button>
            </div>
        </div>
    );
};

export default FilterCarousel;
