'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SectionData {
    image: string;
    title: string;
    description: string;
    reverse?: boolean; // true이면 이미지와 텍스트 위치 반전
}

interface FeatureProps {
    sections: SectionData[];
}

export default function Feature({ sections }: FeatureProps) {
    // Variants for animation
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    const imageVariants = {
        hidden: (reverse: boolean) => ({
            opacity: 0,
            x: reverse ? 100 : -100,
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-8 lg:py-14">
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center ${
                        section.reverse ? 'lg:flex-row-reverse' : ''
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {/* 이미지 */}
                    <motion.div
                        className="flex justify-center order-1 lg:order-none"
                        custom={section.reverse}
                        variants={imageVariants}
                    >
                        <Image
                            src={section.image}
                            alt={section.title}
                            width={500}
                            height={300}
                            className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-xl"
                            unoptimized
                        />
                    </motion.div>
                    {/* 텍스트 */}
                    <motion.div
                        className="max-w-xl 2xl:max-w-screen-2xl lg:max-w-lg mx-auto text-center lg:text-start"
                        variants={textVariants}
                    >
                        <h2 className="text-3xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-black">
                            {section.title}
                        </h2>
                        <p className="mt-4 text-md sm:text-lg lg:text-xl 2xl:text-2xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                            {section.description}
                        </p>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
