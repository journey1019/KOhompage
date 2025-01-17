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
        <section className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl">
            <motion.div
                className="mt-4 grid gap-2 sm:gap-6 grid-cols-2 lg:grid-cols-4 px-4 sm:px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-1 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-105"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col items-start space-y-4">
                            {/* 이미지 크기 조정 */}
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 2xl:w-28 2xl:h-28 transition-all duration-500 ease-in-out group-hover:scale-110">
                                <Image
                                    src={item.image}
                                    alt={item.title || 'Image description missing'}
                                    width={150}
                                    height={150}
                                    className="transition-all duration-500 ease-in-out group-hover:filter group-hover:sepia group-hover:hue-rotate-90"
                                    unoptimized
                                />
                            </div>
                            <div>
                                {/* 텍스트 상단 정렬 */}
                                <h5 className="text-md sm:text-lg 2xl:text-2xl font-semibold text-gray-800 dark:text-white transition-all duration-500 ease-in-out group-hover:text-red-700">
                                    {item.title}
                                </h5>
                                <p className="mt-2 text-xs sm:text-sm 2xl:text-xl text-gray-600 dark:text-gray-300 transition-all duration-500 ease-in-out group-hover:text-gray-900 dark:group-hover:text-gray-100">
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
