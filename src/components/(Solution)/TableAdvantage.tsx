'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface FeaturesData {
    messageSize: string;
    ogx: string;
    idp: string;
}
interface FeaturesProps {
    items: FeaturesData[];
}

const TableAdvantage: React.FC<FeaturesProps> = ({ items }) => {
    // 애니메이션 Variants 설정
    const leftVariants = {
        hidden: { opacity: 0, x: -20 }, // 왼쪽에서 대기
        visible: {
            opacity: 1,
            x: 0, // 원래 위치로 이동
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 20 }, // 오른쪽에서 대기
        visible: {
            opacity: 1,
            x: 0, // 원래 위치로 이동
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="bg-white dark:bg-gray-900 mx-auto max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-8 lg:pb-40">
            <h1 className="text-center text-3xl font-bold pb-6">OGx 위성서비스 특장점</h1>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // 화면에 20% 이상 보이면 애니메이션 실행
            >
                {/* Left Side: Icon and Text */}
                <motion.div
                    className="flex flex-col items-center md:items-start"
                    variants={leftVariants}
                >
                    {/* Icon */}
                    <div className="mb-4">
                        <Image
                            src="/images/icons/FastTime.png" // 아이콘 경로
                            alt="Icon Description"
                            width={100}
                            height={100}
                            className="object-contain w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                            unoptimized
                        />
                    </div>
                    {/* Text */}
                    <h2 className="text-lg 2xl:text-2xl font-semibold text-gray-800 dark:text-white">
                        Faster message delivery speeds
                    </h2>
                    <p className="text-sm 2xl:text-lg text-gray-600 dark:text-gray-300 mt-2">
                        이전 세대의 위성보다 최대 40배 빠른 메시지 전송 속도로 향상된 위성 IoT 서비스를 지원합니다.
                    </p>
                </motion.div>

                {/* Right Side: Table */}
                <motion.div
                    className="overflow-x-auto"
                    variants={rightVariants}
                >
                    <table className="table-auto w-full h-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                Message Size
                            </th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                OGx
                            </th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                IDP
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0
                                        ? 'bg-white dark:bg-gray-900'
                                        : 'bg-gray-50 dark:bg-gray-800'
                                }`}
                            >
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                    {item.messageSize}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                    {item.ogx}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md 2xl:text-xl text-gray-700 dark:text-gray-300">
                                    {item.idp}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TableAdvantage;
