'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ImageTopPageProps {
    size: string;
    url: string;
    intro: string;
    title: string;
    subtitle: string;
    thirdtitle: string;
}

export default function PageHeroCenter({ size, url, intro, title, subtitle, thirdtitle }: ImageTopPageProps) {
    // Variants for animation
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2, // 순차적으로 각 요소 애니메이션
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className={`relative flex items-center justify-center py-36 md:${size}`}>
            {/* 고정된 배경 이미지 */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: `url(${url})`,
                }}
            />

            {/* 안쪽 콘텐츠 */}
            <motion.main
                className="relative flex flex-col text-center text-white z-10 px-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/*<motion.h1*/}
                {/*    className="text-md md:text-lg maxWeb:text-2xl font-bold mb-3"*/}
                {/*    variants={itemVariants}*/}
                {/*>*/}
                {/*    {intro}*/}
                {/*</motion.h1>*/}
                <motion.h2
                    className="text-3xl md:text-5xl maxWeb:text-6xl font-bold mb-3 md:pb-2"
                    variants={itemVariants}
                >
                    {title}
                </motion.h2>
                <motion.h3
                    className="text-3xl md:text-5xl maxWeb:text-6xl font-bold mb-3 md:pb-2"
                    variants={itemVariants}
                >
                    {subtitle}
                </motion.h3>
                <motion.h4
                    className="text-3xl md:text-5xl maxWeb:text-6xl font-bold md:pb-2"
                    variants={itemVariants}
                >
                    {thirdtitle}
                </motion.h4>
            </motion.main>
        </section>
    );
}
