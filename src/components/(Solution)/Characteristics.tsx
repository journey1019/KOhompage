'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CharacteristicItem {
    icon: string; // 아이콘 이미지 경로
    title: string; // 제목 텍스트
}

interface CharacteristicsProps {
    items: CharacteristicItem[];
    gridCols?: number;
}

export default function Characteristics({ items, gridCols = 4 }: CharacteristicsProps) {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // 순차적으로 애니메이션 적용
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 lg:px-8 pb-12">
            <motion.div
                className={`grid grid-cols-2 gap-4 maxWeb:gap-2 sm:gap-8 mt-4 md:grid-cols-2 lg:grid-cols-${gridCols} max-w-7xl mx-auto px-2 sm:px-6`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center sm:p-5 bg-white rounded-lg transition-shadow duration-300"
                        variants={itemVariants}
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            width={100}
                            height={100}
                            className="object-contain my-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 maxWeb:w-28 maxWeb:h-28"
                            unoptimized
                        />
                        <h2 className="text-md maxWeb:text-xl font-medium text-gray-600 text-center">
                            {item.title}
                        </h2>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
