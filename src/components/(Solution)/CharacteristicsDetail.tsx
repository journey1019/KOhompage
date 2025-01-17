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
        <section className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-8 pb-12">
            <motion.div
                className={`grid grid-cols-1 gap-8 2xl:gap-4 mt-16 md:grid-cols-2 lg:grid-cols-${gridCols} max-w-7xl mx-auto px-6`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // 20% 화면에 보이면 실행
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center p-5 bg-white rounded-lg"
                        variants={itemVariants}
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            className="object-contain my-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                            width={80}
                            height={80}
                            unoptimized
                        />
                        <h2 className="text-lg 2xl:text-2xl text-gray-600 text-center font-semibold">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm 2xl:text-lg text-gray-500 dark:text-gray-400 text-center line-clamp-3">
                            {item.subtitle}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
