'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AdvantageData {
    direction: "left" | "right";
    title1: string;
    title2: string;
    description: string;
    image: string;
}

interface SolutionAdvantageProps {
    advantages: AdvantageData[]; // advantage 데이터를 props로 전달받음
}

// 애니메이션 Variants
const textVariants = {
    hidden: (direction: "left" | "right") => ({
        opacity: 0,
        x: direction === "left" ? -100 : 100,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8 },
    },
};

const imageVariants = {
    hidden: (direction: "left" | "right") => ({
        opacity: 0,
        x: direction === "left" ? 100 : -100,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8 },
    },
};

// Case 컴포넌트: 각각의 장점 케이스를 렌더링
const Case: React.FC<AdvantageData> = ({ direction, title1, title2, description, image }) => (
    <motion.div
        className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 pb-20 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
    >
        {direction === "left" ? (
            <>
                {/* 텍스트 영역 */}
                <motion.div
                    className="w-full lg:w-2/5 flex items-center"
                    custom="left"
                    variants={textVariants}
                >
                    <div className="block lg:text-left text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            <span className="text-red-700">{title1}</span>
                            {title2}
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">{description}</p>
                    </div>
                </motion.div>

                {/* 이미지 영역 */}
                <motion.div
                    className="w-full lg:w-3/5 flex items-center"
                    custom="left"
                    variants={imageVariants}
                >
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt={`${title1} ${title2}`}
                                className="rounded-2xl w-full object-cover"
                                width={500}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </motion.div>
            </>
        ) : (
            <>
                {/* 이미지 영역 */}
                <motion.div
                    className="w-full lg:w-3/5 flex items-center"
                    custom="right"
                    variants={imageVariants}
                >
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt={`${title1} ${title2}`}
                                className="rounded-2xl w-full object-cover"
                                width={500}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </motion.div>

                {/* 텍스트 영역 */}
                <motion.div
                    className="w-full lg:w-2/5 flex items-center"
                    custom="right"
                    variants={textVariants}
                >
                    <div className="block lg:text-right text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            {title1}
                            <span className="text-red-700">{title2}</span>
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">{description}</p>
                    </div>
                </motion.div>
            </>
        )}
    </motion.div>
);

// SolutionAdvantage 컴포넌트: 전체 장점 섹션을 렌더링
const SolutionAdvantage: React.FC<SolutionAdvantageProps> = ({ advantages }) => {
    if (!advantages || advantages.length === 0) {
        return <p>No advantages available.</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {advantages.map((advantage, index) => (
                        <Case
                            key={index}
                            direction={advantage.direction}
                            title1={advantage.title1}
                            title2={advantage.title2}
                            description={advantage.description}
                            image={advantage.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionAdvantage;
