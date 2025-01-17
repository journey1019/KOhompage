'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Feature() {
    // 애니메이션 Variants
    const textVariants = {
        hidden: { opacity: 0, x: -30 }, // 이동 범위 축소
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.3, ease: 'easeOut' },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 30 }, // 이동 범위 축소
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.3, ease: 'easeOut' },
        },
    };

    return (
        <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-8 lg:py-14 overflow-hidden">
            {/* Section 1 */}
            <motion.div
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                <motion.div
                    className="flex justify-center order-1 lg:order-none"
                    variants={imageVariants}
                >
                    <Image
                        src="/images/solutions/ais/UseData1.png"
                        alt="main_dashboard"
                        width={500}
                        height={300}
                        className="w-full h-auto aspect-[4/3] rounded-lg"
                        unoptimized
                    />
                </motion.div>
                <motion.div
                    className="max-w-xl lg:max-w-lg 2xl:max-w-2xl mx-auto text-center lg:text-start order-2 lg:order-none"
                    variants={textVariants}
                >
                    <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-black">
                        전세계 해상을 커버하는 AIS 데이터
                    </h2>
                    <p className="mt-4 text-md sm:text-lg lg:text-xl 2xl:text-2xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                        Korea ORBCOMM의 AIS 서비스는 저궤도 AIS 위성과 10,000여개의 육상 AIS 기지국들을 통해 전세계 해상 전역의 AIS 신호를 탐지합니다.
                    </p>
                </motion.div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                <motion.div
                    className="max-w-xl lg:max-w-lg 2xl:max-w-2xl mx-auto text-center lg:text-start order-2 lg:order-none"
                    variants={textVariants}
                >
                    <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-black">
                        고품질의 AIS 데이터
                    </h2>
                    <p className="mt-4 text-md sm:text-lg lg:text-xl 2xl:text-2xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                        Korea ORBCOMM의 AIS 서비스는 60만척 이상의 선박에서 일일 천만개의 AIS 메시지를 수집/처리합니다.
                    </p>
                </motion.div>
                <motion.div
                    className="flex justify-center order-1 lg:order-none"
                    variants={imageVariants}
                >
                    <Image
                        src="/images/solutions/ais/UseData2.png"
                        alt="main_dashboard"
                        width={500}
                        height={300}
                        className="w-full h-auto aspect-[4/3] rounded-lg"
                        unoptimized
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
