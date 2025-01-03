'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CharacteristicItem {
    icon: string; // 아이콘 이미지 경로
    title: string; // 제목 텍스트
    subtitle: string; // 설명
}

interface CharacteristicsProps {
    items: CharacteristicItem[];
    gridCols?: number;
}

export default function Characteristics({ items, gridCols = 4 }: CharacteristicsProps) {
    // 애니메이션 Variants
    const containerVariants = {
        hidden: {}, // 부모 요소는 자식 요소를 컨트롤만
        visible: {
            transition: {
                staggerChildren: 0.2, // 자식 요소 순차적으로 애니메이션
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 }, // 초기 상태: 위로 이동 및 투명
        visible: {
            opacity: 1,
            y: 0, // 최종 상태: 제자리
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
            <motion.div
                className={`grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-${gridCols} max-w-7xl mx-auto px-6`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // 20% 화면에 보이면 실행
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center p-5 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                        variants={itemVariants}
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            className="w-20 h-20 object-contain my-4"
                            width={80}
                            height={80}
                            unoptimized
                        />
                        <h2 className="text-lg text-gray-600 text-center font-semibold">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3">
                            {item.subtitle}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
