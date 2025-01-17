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
    advantages: AdvantageData[];
}

// 애니메이션 Variants
const textVariants = {
    hidden: (direction: "left" | "right") => ({
        opacity: 0,
        x: direction === "left" ? -50 : 50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const imageVariants = {
    hidden: (direction: "left" | "right") => ({
        opacity: 0,
        x: direction === "left" ? 50 : -50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

// Case 컴포넌트
const Case: React.FC<AdvantageData> = ({ direction, title1, title2, description, image }) => (
    <motion.div
        className={`flex flex-col-reverse lg:flex-row items-center gap-8 pb-20 overflow-hidden ${
            direction === "left" ? "lg:flex-row-reverse" : ""
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
    >
        {/* 이미지 영역 */}
        <motion.div
            className={`w-full lg:w-3/5 order-1 lg:order-${direction === "left" ? "2" : "1"}`}
            custom={direction}
            variants={imageVariants}
        >
            <Image
                src={image}
                alt={`${title1} ${title2}`}
                className="rounded-2xl object-cover w-full"
                width={500}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                unoptimized
            />
        </motion.div>

        {/* 텍스트 영역 */}
        <motion.div
            className={`w-full lg:w-2/5 text-center ${
                direction === "left" ? "lg:text-right" : "lg:text-left"
            }`}
            custom={direction}
            variants={textVariants}
        >
            <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-5">
                {direction === "left" ? (
                    <>
                        <span className="text-red-700">{title1}</span> {title2}
                    </>
                ) : (
                    <>
                        {title1} <span className="text-red-700">{title2}</span>
                    </>
                )}
            </h2>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg 2xl:text-2xl">{description}</p>
        </motion.div>
    </motion.div>
);

// SolutionAdvantage 컴포넌트
const SolutionAdvantage: React.FC<SolutionAdvantageProps> = ({ advantages }) => {
    if (!advantages || advantages.length === 0) {
        return <p>No advantages available.</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900 overflow-hidden">
            <div className="pb-24">
                <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8">
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
