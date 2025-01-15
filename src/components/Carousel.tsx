"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
    children: ReactNode; // Items to render inside the carousel
    itemsCount: number; // Total number of items
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsCount }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getCardsToShow = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width < 640) return 2; // Show 2 items on mobile
            if (width < 1024) return 2; // Show 2 items on tablet
        }
        return 3; // Show 3 items on desktop
    };

    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

    useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(itemsCount - cardsToShow, 0);

    const goPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.currentTarget.blur();
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const goNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.currentTarget.blur();
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className="relative">
            {/* Carousel Items */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    }}
                >
                    {React.Children.map(children, (child, index) => (
                        <div
                            key={index}
                            className="px-1 py-3 flex-shrink-0"
                            style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={goPrev}
                    type="button"
                    className="flex flex-row items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === 0}
                >
                    <ArrowLeftIcon aria-hidden="true" className="h-5 w-5 text-white mr-2" />
                    Prev
                </button>
                <button
                    onClick={goNext}
                    type="button"
                    className="flex flex-row items-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === maxIndex}
                >
                    Next
                    <ArrowRightIcon aria-hidden="true" className="h-5 w-5 text-white ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
