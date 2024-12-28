
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
        <div className="relative w-full max-w-2xl md:max-w-7xl mx-auto h-screen overflow-hidden">
            {/* Carousel Items */}
            <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between w-full h-screen h-[70vh] p-4 md:p-8 flex-shrink-0"
                    >
                        {/* Top Section: Text */}
                        <div className="text-start w-full py-4">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                {item.title}
                            </h1>
                            <p className="md:max-w-5xl text-md md:text-xl text-gray-500">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Bottom Section: Images */}
                        <div className="w-full px-16 md:py-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 이미지 1 */}
                            <section className="block">
                                <div
                                    className="relative min-h-[10rem] md:min-h-[30rem] rounded-xl overflow-hidden grid items-end transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                                    <Image
                                        src={item.imageUrl1}
                                        alt={item.imageTitle1}
                                        fill
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <div className="relative p-4 flex flex-col justify-end">
                                        <h3 className="text-sm md:text-xl font-bold text-white text-center">
                                            {item.imageTitle1}
                                        </h3>
                                    </div>
                                </div>
                            </section>

                            {/* 이미지 2 */}
                            <section className="block">
                                <div
                                    className="relative min-h-[10rem] md:min-h-[30rem] rounded-xl overflow-hidden grid items-end transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                                    <Image
                                        src={item.imageUrl2}
                                        alt={item.imageTitle2}
                                        fill
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <div className="relative p-4 flex flex-col justify-end">
                                        <h3 className="text-sm md:text-xl font-bold text-white text-center">
                                            {item.imageTitle2}
                                        </h3>
                                    </div>
                                </div>
                            </section>

                            {/* 이미지 3 */}
                            <section className="block">
                                <div
                                    className="relative min-h-[10rem] md:min-h-[30rem] rounded-xl overflow-hidden grid items-end transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                                    <Image
                                        src={item.imageUrl3}
                                        alt={item.imageTitle3}
                                        fill
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <div className="relative p-4 flex flex-col justify-end">
                                        <h3 className="text-sm md:text-xl font-bold text-white text-center">
                                            {item.imageTitle3}
                                        </h3>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-600"
            >
                ❮
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-600"
            >
                ❯
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 flex-1 w-2 mx-2 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default CarouselSolutionBlock;
