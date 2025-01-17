'use client';

import React from "react";
import { Container } from "@/components/Container";
import { motion } from "framer-motion";

interface CtaProps {
    items: {
        imageUrl?: string;
        title: string;
        subTitle: string;
        button: string;
        solutionButton?: string;
        solutionUrl?: string;
    };
}

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

export const CtaSolution: React.FC<CtaProps> = ({ items }) => {
    const hasImage = !!items.imageUrl;

    return (
        <Container>
            <motion.div
                className={`relative flex flex-wrap items-center justify-between w-full max-w-7xl 2xl:max-w-screen-2xl gap-5 mx-auto text-white p-7 lg:p-12 2xl:p-16 2xl:my-10 xl:flex-nowrap rounded-xl ${
                    hasImage ? "" : "bg-gray-900"
                }`}
                style={{
                    backgroundImage: hasImage ? `url(${items.imageUrl})` : "none",
                    backgroundSize: hasImage ? "cover" : "none",
                    backgroundPosition: hasImage ? "center" : "none",
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Overlay */}
                {hasImage && (
                    <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-xl"></div>
                )}

                {/* Content */}
                <motion.div
                    className="relative flex-grow text-center lg:text-left"
                    variants={textVariants}
                >
                    <h2 className="text-2xl font-medium lg:text-3xl 2xl:text-4xl">{items.title}</h2>
                    <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl 2xl:text-2xl">
                        {items.subTitle}
                    </p>
                </motion.div>

                {/* Button 1 */}
                <motion.div
                    className="relative flex-shrink-0 w-full text-center lg:w-auto"
                    variants={buttonVariants}
                >
                    <a
                        href="/contact-us"
                        className="inline-block py-3 mx-auto text-md lg:text-lg 2xl:text-xl font-medium text-center text-gray-900 bg-white rounded-md px-7 lg:px-10 lg:py-5 hover:bg-red-800 hover:text-white hover:border-2 hover:border-gray-50"
                    >
                        {items.button}
                    </a>
                </motion.div>

                {/* Button 2 */}
                {items.solutionButton && (
                    <motion.div
                        className="relative flex-shrink-0 w-full text-center lg:w-auto"
                        variants={buttonVariants}
                    >
                        <a
                            href={items.solutionUrl}
                            target="_blank"
                            rel="noopener"
                            className="inline-block py-3 mx-auto text-md lg:text-lg 2xl:text-xl font-medium text-center text-white bg-red-700 border-2 border-red-700 rounded-md px-7 lg:px-10 lg:py-5 hover:bg-white hover:text-red-800 hover:border-2 hover:border-red-700"
                        >
                            {items.solutionButton}
                        </a>
                    </motion.div>
                )}
            </motion.div>
        </Container>
    );
};
