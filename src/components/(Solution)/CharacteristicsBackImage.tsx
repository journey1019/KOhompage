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

export default function CharacteristicsBackImage({ items, gridCols = 4 }: CharacteristicsProps) {
    // 애니메이션 Variants 설정
    const containerVariants = {
        hidden: {}, // 부모 요소는 자식 요소 컨트롤만
        visible: {
            transition: {
                staggerChildren: 0.2, // 자식 요소가 순차적으로 애니메이션
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 }, // 처음에는 위로 이동 + 투명
        visible: {
            opacity: 1,
            y: 0, // 원래 위치로 이동
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section
            className="relative mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 lg:px-8 py-12 bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/solutions/satellite/WorldMap.png')",
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white bg-opacity-75"></div>

            {/* Content with Framer Motion */}
            <motion.div
                className={`relative grid grid-cols-2 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-${gridCols} max-w-7xl mx-auto px-6`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // 스크롤 시 20% 보이면 트리거
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center p-5 bg-opacity-0 rounded-lg"
                        variants={itemVariants}
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            width={80}
                            height={80}
                            className="object-contain my-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 maxWeb:w-28 maxWeb:h-28"
                            unoptimized
                        />
                        <h2 className="text-base maxWeb:text-2xl font-medium text-gray-600 text-center">
                            {item.title}
                        </h2>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
