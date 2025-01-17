'use client';

import React from "react";
import { Container } from "@/components/Container";
import { motion } from "framer-motion";

interface SectionTitleProps {
    preTitle?: string;
    title?: string;
    align?: "left" | "center";
    children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <Container
            className={`flex w-full flex-col mt-4 ${
                props.align === "left" ? "" : "items-center justify-center text-center 2xl:max-w-screen-2xl"
            }`}>
            {/* PreTitle with Animation */}
            {props.preTitle && (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="text-sm 2xl:text-xl font-bold tracking-wider text-red-800 uppercase"
                >
                    {props.preTitle}
                </motion.div>
            )}

            {/* Title with Animation */}
            {props.title && (
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="max-w-2xl 2xl:max-w-7xl mt-3 text-3xl 2xl:text-5xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white"
                >
                    {props.title}
                </motion.h2>
            )}

            {/* Children with Animation */}
            {props.children && (
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="max-w-4xl 2xl:max-w-7xl py-4 2xl:py-5 text-sm 2xl:text-2xl leading-normal text-gray-500 lg:text-lg dark:text-gray-300"
                >
                    {props.children}
                </motion.p>
            )}
        </Container>
    );
};
