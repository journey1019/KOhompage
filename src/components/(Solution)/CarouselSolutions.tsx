/** CarouselSolutions */
'use client';
import React, { useState } from "react";
import Image from 'next/image';

interface CarouselItem {
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

const CarouselSolutions: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-2xl lg:max-w-7xl mx-auto h-screen overflow-hidden">
            {/* Carousel Items */}
            <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center justify-center w-full h-screen md:h-[70vh] p-4 md:p-8 flex-shrink-0"
                    >
                        {/* Left Section: Text */}
                        <div className="text-left w-full md:w-1/2 p-4">
                            <h1 className="text-2xl md:text-4xl font-bold mb-10">{item.title}</h1>
                            <p className="text-md md:text-lg text-gray-600">{item.subtitle}</p>
                        </div>
                        {/* Right Section: Image */}
                        <div className="w-full md:w-1/2 p-4">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                                unoptimized
                            />
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
            <div className="absolute left-0 w-full flex items-center">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 flex-1 mx-1 rounded-full transition-all duration-300 ${
                            currentIndex === index ? "bg-gray-800" : "bg-gray-300"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default CarouselSolutions;
