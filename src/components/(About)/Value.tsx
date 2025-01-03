'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Item {
    image: string;
    title: string;
    description: string;
}

interface ItemsProps {
    items: Item[];
}

export default function Value({ items }: ItemsProps) {
    // Variants for animation
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2, // 각 자식 요소 간의 애니메이션 지연
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="mx-auto max-w-screen-xl py-12">
            <motion.div
                className="mt-16 grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 transition-transform border border-1 hover:scale-105 hover:shadow-lg"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col items-start space-y-4">
                            {/* 이미지 상단 정렬 */}
                            <div className="relative w-16 h-16">
                                <Image
                                    src={item.image}
                                    alt={item.title || 'Image description missing'}
                                    className="transition group-hover:filter group-hover:sepia group-hover:hue-rotate-90 group-hover:scale-105"
                                    width={64}
                                    height={64}
                                    unoptimized
                                />
                            </div>
                            <div>
                                {/* 텍스트 상단 정렬 */}
                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white transition group-hover:text-secondary">
                                    {item.title}
                                </h5>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
