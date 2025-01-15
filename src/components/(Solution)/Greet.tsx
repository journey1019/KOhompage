'use client';

import { motion } from 'framer-motion';

interface GreetProps {
    solutionNumber: string;
    solutionTitle: string;
    solutionName: string;
}

export default function Greet({ solutionNumber, solutionTitle, solutionName }: GreetProps) {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section className="w-full max-w-2xl md:max-w-7xl mx-auto bg-white dark:bg-gray-900">
            <motion.div
                className="py-10 md:py-36 px-4 md:px-24 text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // 스크롤이 컴포넌트 영역에 들어오면 visible 상태로 전환
                viewport={{ once: true, amount: 0.2 }} // 한 번만 실행, 20%가 보이면 애니메이션 시작
            >
                <motion.h1
                    className="text-md md:text-xl text-red-800 font-semibold py-1"
                    variants={itemVariants}
                >
                    {solutionNumber}
                </motion.h1>
                <motion.h1
                    className="text-4xl md:text-6xl text-black font-bold py-3 dark:text-white"
                    variants={itemVariants}
                >
                    {solutionTitle}
                </motion.h1>
                <motion.h1
                    className="text-base md:text-xl text-gray-400 font-semibold py-4"
                    variants={itemVariants}
                >
                    {solutionName}
                </motion.h1>
            </motion.div>
        </section>
    );
}
