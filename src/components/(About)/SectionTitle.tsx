'use client';

import React from "react";
import { Container } from "@/components/(About)/Container";
import { motion } from "framer-motion";

interface SectionTitleProps {
    preTitle?: string;
    title?: string;
    align?: "left" | "center";
    children?: React.ReactNode;
    length?: number; // Optional length prop to control styles (2/3)
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
    const maxWidthClass =
        props.length && props.children && props.length > 2
            ? "max-w-screen-2xl"
            : "max-w-2xl";

    // Framer Motion Variants for animation
    const variants = {
        hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and slightly below
        visible: {
            opacity: 1,
            y: 0, // Animate to its original position
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animation triggers when 20% of the component is in view
        >
            <Container
                className={`flex w-full flex-col mt-8 ${
                    props.align === "left" ? "" : "items-center justify-center text-center"
                }`}
            >
                {props.preTitle && (
                    <motion.div
                        className="text-sm maxWeb:text-xl font-bold tracking-wider text-red-700 uppercase"
                        variants={variants}
                    >
                        {props.preTitle}
                    </motion.div>
                )}

                {props.title && (
                    <motion.h2
                        className="max-w-2xl maxWeb:max-w-screen-2xl mt-3 maxWeb:mt-5 text-2xl md:text-3xl lg:text-4xl maxWeb:text-5xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight dark:text-white"
                        variants={variants}
                    >
                        {props.title}
                    </motion.h2>
                )}

                {props.children && (
                    <motion.p
                        className={`${maxWidthClass} maxWeb:max-w-screen-2xl py-4 maxWeb:pb-8 text-base md:text-lg lg:text-xl maxWeb:text-2xl leading-normal text-gray-500 dark:text-gray-300`}
                        variants={variants}
                    >
                        {props.children}
                    </motion.p>
                )}
            </Container>
        </motion.div>
    );
};
