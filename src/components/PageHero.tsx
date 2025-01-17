'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ImageTopPageProps {
    size: string;
    url: string;
    intro: string;
    title: string;
    subtitle: string;
    solutionButton?: string;
    solutionUrl?: string;
    opacity?: number;
}

export default function PageHero({
                                     size,
                                     url,
                                     intro,
                                     title,
                                     subtitle,
                                     solutionButton,
                                     solutionUrl,
                                     opacity = 30,
                                 }: ImageTopPageProps) {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8, // 전체 애니메이션 지속시간
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }, // 각 항목 애니메이션 지속 시간
        },
    };

    return (
        <>
            <section className={`relative flex py-56 md:${size} 2xl:py-80`}>
                {/* 고정된 배경 이미지 */}
                <div className="absolute inset-0 bg-fixed bg-cover bg-center">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${url})`,
                        }}
                    />
                    {/* 어두운 오버레이 */}
                    <div
                        className="absolute inset-0 bg-black"
                        style={{
                            backgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
                        }}
                    />
                </div>

                {/* 안쪽 콘텐츠 */}
                <motion.main
                    className="relative flex flex-col justify-center items-start text-white z-10 p-5 text-start md:ml-16 xl:ml-32"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-sm md:text-lg 2xl:text-3xl font-bold mb-3 md:mb-5"
                        variants={itemVariants}
                    >
                        {intro}
                    </motion.h1>
                    <motion.h1
                        className="text-3xl md:text-6xl 2xl:text-8xl font-bold mb-5"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="text-sm md:text-base 2xl:text-2xl mb-5"
                        variants={itemVariants}
                    >
                        {subtitle}
                    </motion.p>
                    {solutionUrl && (
                        <motion.a
                            href={solutionUrl}
                            target="_blank"
                            rel="noopener"
                            className="text-base md:text-lg 2xl:text-3xl font-medium text-white bg-transparent border-2 border-white rounded-md px-5 md:px-7 lg:px-10 2xl:px-14 py-3 md:py-4 2xl:py-6 hover:bg-white hover:text-red-700 hover:border-red-700 transition-colors duration-300 ease-in-out"
                            variants={itemVariants}
                        >
                            {solutionButton}
                        </motion.a>
                    )}
                </motion.main>
            </section>
        </>
    );
}
