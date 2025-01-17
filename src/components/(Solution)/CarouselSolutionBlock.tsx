'use client';
import React, { useState } from "react";
import Image from 'next/image';

interface CarouselItem {
    title: string;
    subtitle: string;
    imageTitle1: string;
    imageTitle2: string;
    imageTitle3: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

const CarouselSolutionBlock: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-7xl maxWeb:max-w-screen-2xl mx-auto overflow-hidden pb-10">
            {/* Carousel Items */}
            <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center w-full min-h-fit flex-shrink-0"
                    >
                        {/* Top Section: Text */}
                        <div className="w-full text-center lg:text-start mb-8 px-8 sm:px-16">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl maxWeb:text-5xl font-bold mb-2 text-gray-800">
                                {item.title}
                            </h1>
                            <p className="text-md sm:text-lg lg:text-xl maxWeb:text-2xl text-gray-500">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Bottom Section: Images */}
                        <div
                            className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-16 sm:px-16 md:px-32 lg:px-16 maxWeb:px-32 sm:py-0 bigMobile:pb-16">
                            {[item.imageUrl1, item.imageUrl2, item.imageUrl3].map((url, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className="relative w-full aspect-[7/4] smallMobile:aspect-[7/4] bigMobile:aspect-[9/3] lg:aspect-[4/4] xl:aspect-[4/5] rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500"
                                >
                                    <Image
                                        src={url}
                                        alt={`Image ${imgIndex + 1}`}
                                        fill
                                        className="absolute inset-0 h-full w-full object-cover rounded-xl"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/30 rounded-xl" />
                                    <div className="relative p-4 flex items-end justify-center">
                                        <h3 className="text-sm md:text-lg lg:text-xl maxWeb:text-2xl font-bold text-white">
                                            {imgIndex === 0 ? item.imageTitle1 : imgIndex === 1 ? item.imageTitle2 : item.imageTitle3}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute text-base maxWeb:text-2xl h-1/2 top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white py-2 px-4 maxWeb:py-3 maxWeb:px-5 rounded-md shadow-lg hover:bg-gray-600"
            >
                ❮
            </button>
            <button
                onClick={handleNext}
                className="absolute text-base maxWeb:text-2xl h-1/2 top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-30 text-white py-2 px-4 maxWeb:py-3 maxWeb:px-5 rounded-md shadow-lg hover:bg-gray-600"
            >
                ❯
            </button>

            {/* Carousel Indicators */}
            <div
                className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-2 p-4">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 maxWeb:h-3 w-10 sm:w-1/5 lg:w-1/3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default CarouselSolutionBlock;
