'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AdvantageItem {
    imageUrl: string;
    advantage: string;
    description: string;
}
interface AdvantageProps {
    items: AdvantageItem[];
    gridCols?: number;
}

const Strength: React.FC<AdvantageProps> = ({ items, gridCols = 4 }) => {
    // Variants for container and individual items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // delay between items
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
        <div className="bg-white dark:bg-gray-900 lg:pb-10">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:pt-0 sm:pb-24 lg:px-8">
                <motion.div
                    className={`grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridCols} xl:gap-x-8`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            variants={itemVariants}
                        >
                            {/* Image Section */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                <Image
                                    src={item.imageUrl}
                                    alt="Example"
                                    width={50}
                                    height={50}
                                    className="object-contain w-full h-full bg-white"
                                    unoptimized
                                />
                            </div>

                            {/* Text Section */}
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-700 font-semibold dark:text-gray-200">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {item.advantage}
                                    </h3>
                                    <p className="mt-3 text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Strength;
