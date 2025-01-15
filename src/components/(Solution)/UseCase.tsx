'use client';

import solutionsData from '@/service/solutions/solutionsData';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    // Updated animation variants (Fade-in with slight scaling)
    const textVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 pb-16 lg:pb-36"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
        >
            <motion.div
                className={`flex justify-center order-1 lg:order-${direction === 'left' ? '2' : '1'}`}
                variants={imageVariants}
            >
                <div className="w-full max-w-lg">
                    <Image
                        src={image}
                        alt="blogs tailwind section"
                        className="rounded-2xl object-contain"
                        width={800}
                        height={450}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                        priority
                        unoptimized
                    />
                </div>
            </motion.div>

            <motion.div
                className={`flex flex-col items-center ${direction === 'left' ? 'lg:items-start lg:order-1' : 'lg:items-end lg:order-2'}`}
                variants={textVariants}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 leading-snug mb-5">
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
                <p className="text-gray-500 mb-10 max-w-prose text-center lg:text-left text-sm md:text-base">
                    {description}
                </p>
                <a
                    href={slug}
                    className="group flex items-center text-red-700 font-medium text-lg md:text-md gap-2 hover:gap-4 transition-all duration-300 ease-in-out"
                >
                    View More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-700 group-hover:translate-x-2 transition-transform duration-300 ease-in-out"
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
            <div className="py-12 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
