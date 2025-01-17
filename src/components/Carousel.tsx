"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
    children: ReactNode;
    itemsCount: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsCount }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3);

    useEffect(() => {
        const updateCardsToShow = () => {
            const width = window.innerWidth;
            if (width < 640) setCardsToShow(1);
            else if (width < 1024) setCardsToShow(2);
            else if (width < 1440) setCardsToShow(3);
            else setCardsToShow(4);
        };

        updateCardsToShow();
        window.addEventListener("resize", updateCardsToShow);
        return () => window.removeEventListener("resize", updateCardsToShow);
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
                    className="flex flex-row items-center 2xl:text-xl bg-gray-800 text-white p-2 2xl:p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === 0}
                >
                    Prev
                    <ArrowLeftIcon aria-hidden="true" className="h-5 w-5 2xl:h-7 2xl:w-7 text-white ml-2"/>
                </button>
                <button
                    onClick={goNext}
                    className="flex flex-row items-center 2xl:text-xl bg-gray-800 text-white p-2 2xl:p-3 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentIndex === maxIndex}
                >
                    Next
                    <ArrowRightIcon aria-hidden="true" className="h-5 w-5 2xl:h-7 2xl:w-7 text-white ml-2"/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
