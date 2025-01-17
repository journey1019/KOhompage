'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import solutionsData from '@/service/solutions/solutionsData';

interface CaseData {
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    slug: string;
    description: string;
    image: string;
}

interface UseCaseProps {
    locale: string;
    slug: string;
}

const Case: React.FC<CaseData> = ({ direction, title1, title2, slug, description, image }) => {
    // Animation Variants
    const textVariants = {
        hidden: { opacity: 0, x: direction === 'left' ? -10 : 10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: direction === 'left' ? 10 : -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <motion.div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 lg:gap-y-16 pb-24 lg:pb-12 lg:max-w-none lg:grid-cols-2 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Image Section */}
            <motion.div
                className={`flex justify-center ${direction === 'left' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}
                variants={imageVariants}
            >
                <div className="relative w-full max-w-lg 2xl:max-w-2xl aspect-[4/3]">
                    <Image
                        src={image}
                        alt={title1}
                        className="rounded-lg object-contain" // object-contain으로 이미지 전체 표시
                        fill
                        unoptimized
                    />
                </div>
            </motion.div>


            {/* Text Section */}
            <motion.div
                className={`max-w-xl lg:max-w-lg 2xl:max-w-2xl mx-auto text-center order-2 lg:text-start ${
                    direction === 'left' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'
                } flex flex-col justify-center items-center lg:items-start`}
                variants={textVariants}
            >
                <h2 className="text-3xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-black">
                    {direction === 'left' ? (
                        <>
                            <span className="text-red-700">{title1}</span> {title2}
                        </>
                    ) : (
                        <>
                            {title1} <span className="text-red-700">{title2}</span>
                        </>
                    )}
                </h2>
                <p className="mt-4 text-md sm:text-lg lg:text-xl 2xl:text-2xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                    {description}
                </p>
                <a
                    href={slug}
                    className="group flex items-center text-red-700 font-medium text-lg md:text-md 2xl:text-2xl gap-2 hover:gap-4 transition-all duration-300 ease-in-out mt-6"
                >
                    View More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 2xl:h-8 2xl:w-8 text-red-700 group-hover:translate-x-2 transition-transform duration-300 ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </motion.div>

        </motion.div>
    );
};

export default function UseCase({ locale, slug }: UseCaseProps) {
    const solution = solutionsData[locale]?.[slug];

    if (!solution || !solution.useCases) {
        return <p>No use cases available.</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="pb-12 md:pb-24">
                <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    {solution.useCases.map((useCase, index) => (
                        <Case
                            key={index}
                            direction={useCase.direction}
                            title1={useCase.title1}
                            title2={useCase.title2}
                            slug={`${slug}/${useCase.slug}`}
                            description={useCase.description}
                            image={useCase.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
