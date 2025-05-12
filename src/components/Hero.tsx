'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoBackground from '@/components/VideoBackground';

interface HeroProps {
    locale: string;
}

export default function Hero({ locale }: HeroProps) {
    return (
        <section className="relative w-full h-[calc(100vh-72px)] bg-white dark:bg-gray-900">
            {/* 비디오 배경 */}
            <VideoBackground src="/video/main_video.mp4" />

            {/* 콘텐츠 오버레이 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 dark:bg-black/50">
                {/* 로고 애니메이션 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} // 시작 상태
                    animate={{ opacity: 1, scale: 1 }}  // 애니메이션 후 상태
                    transition={{ duration: 1.2, ease: 'easeOut' }} // 애니메이션 시간과 타이밍
                >
                    <Image
                        src="/images/main/KoreaORBCOMMLogo.png"
                        alt="Main Hero Korea Orbcomm Logo"
                        width={700}
                        height={500}
                        unoptimized
                        className="items-center justify-center mx-auto"
                    />
                </motion.div>

                {/* 서브 헤딩 애니메이션 */}
                <motion.h2
                    initial={{ y: 50, opacity: 0 }} // 시작 상태: 아래에서 위로 이동
                    animate={{ y: 0, opacity: 1 }}  // 최종 상태
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} // 딜레이 추가
                    className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white font-normal text-center mt-2"
                >
                    전세계 Total IoT Service를 제공하는 Provider
                </motion.h2>

                {/* 버튼 애니메이션 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} // 시작 상태: 아래에서 위로 이동
                    animate={{ opacity: 1, y: 0 }}  // 최종 상태
                    transition={{ duration: 1, delay: 1, ease: 'easeOut' }} // 딜레이 추가
                    className="flex flex-col items-center space-y-4 lg:space-y-0 mt-6 lg:flex-row lg:gap-x-5"
                >
                    <a
                        href={`/${locale}/contact-us`}
                        className="w-full max-w-xs lg:max-w-[12rem] bg-gray-300 bg-opacity-10 font-bold text-gray-300 rounded-full border-2 border-gray-800 py-3 px-6 sm:px-8 lg:px-10 text-center hover:bg-gray-700 hover:bg-opacity-10"
                    >
                        상담 요청하기
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
