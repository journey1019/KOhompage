'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PointProps {
    items: { text: string }[];
}

const Point: React.FC<PointProps> = ({ items }) => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2, // 각 아이템의 애니메이션을 순차적으로 실행
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 }, // 아이템이 화면 왼쪽에서 시작
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
        exit: { opacity: 0, x: 50, transition: { duration: 0.6 } }, // 화면을 벗어날 때 오른쪽으로 사라짐
    };

    return (
        <motion.div
            className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32"
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            variants={containerVariants}
            viewport={{ amount: 0.3 }} // 30%가 보일 때 애니메이션 시작
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    {/* Left Section: Image */}
                    <motion.div
                        className="max-w-xl lg:max-w-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/solutions/container-iot/Advantage.png"
                            className="object-cover w-full h-full"
                            alt="Advantage"
                            width={300}
                            height={500}
                            unoptimized
                        />
                    </motion.div>

                    {/* Right Section: Points */}
                    <motion.dl
                        className="grid grid-cols-1 gap-x-1 gap-y-4 md:gap-y-0 lg:pt-2"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="text-white text-3xl md:text-4xl font-bold pb-4 md:py-4"
                            variants={itemVariants}
                        >
                            Container Management
                        </motion.div>
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-row items-center"
                                variants={itemVariants}
                            >
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-gray-300 ring-white/10">
                                    <CheckCircleIcon
                                        aria-hidden="true"
                                        className="h-4 w-4 md:h-6 md:w-6 text-white"
                                    />
                                </div>
                                <p className="font-semibold text-white pl-3 text-base md:text-xl m-0">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.dl>
                </div>
            </div>
        </motion.div>
    );
};

export default Point;
