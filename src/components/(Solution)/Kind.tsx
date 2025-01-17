'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface KindItem {
    title: string;
    image: string;
}

interface KindProps {
    items: KindItem[];
}

const Kind: React.FC<KindProps> = ({ items }) => {
    // 애니메이션 Variants 설정
    const containerVariants = {
        hidden: { opacity: 0, y: 50 }, // 처음에 아래쪽에서 대기
        visible: {
            opacity: 1,
            y: 0, // 정상 위치로 이동
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                staggerChildren: 0.2, // 자식 요소별로 순차적으로 실행
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 }, // 아래쪽에서 대기
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl maxWeb:max-w-screen-2xl px-4 pb-4 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // 화면에 20% 이상 보이면 애니메이션 실행
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group relative flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-2"
                            variants={itemVariants}
                        >
                            {/* 이미지 */}
                            <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                                <Image
                                    alt={item.title}
                                    src={item.image}
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                    unoptimized
                                />
                            </div>
                            {/* 제목 */}
                            <div className="p-4">
                                <motion.h3
                                    className="text-lg font-bold text-gray-900 dark:text-white break-words"
                                    variants={itemVariants}
                                >
                                    {item.title}
                                </motion.h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Kind;
