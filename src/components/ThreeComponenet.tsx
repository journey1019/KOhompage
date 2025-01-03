'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThreeComponent() {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const AnimatedCounter = ({ endValue, unit }: { endValue: number; unit: string }) => {
        const motionValue = useMotionValue(0); // 초기값 0으로 설정
        const roundedValue = useTransform(motionValue, (value) => Math.round(value)); // 정수로 변환
        const [displayValue, setDisplayValue] = useState(0); // React 상태로 변환

        useEffect(() => {
            const unsubscribe = roundedValue.onChange((latest) => {
                setDisplayValue(latest); // 최신 값으로 상태 업데이트
            });

            return () => unsubscribe(); // unmount 시 구독 해제
        }, [roundedValue]);

        const startAnimation = () => {
            const duration = 2000; // 애니메이션 지속 시간 (ms)
            const interval = 20; // 업데이트 간격 (ms)
            const step = endValue / (duration / interval); // 증가 값 계산

            let currentValue = 0; // 현재 값을 추적
            const increment = setInterval(() => {
                currentValue += step;
                if (currentValue >= endValue) {
                    currentValue = endValue; // 종료 조건
                    clearInterval(increment); // 애니메이션 완료 후 클리어
                }
                motionValue.set(currentValue); // 업데이트
            }, interval);
        };

        return (
            <motion.span
                onViewportEnter={startAnimation} // 뷰포트에 진입 시 애니메이션 실행
                style={{ display: 'inline-block' }}
            >
                {displayValue.toLocaleString()}
                {unit}
            </motion.span>
        );
    };

    const data = [
        { value: 12000, label: '사용자 수', unit: '+' },
        { value: 30, label: '월간 데이터', unit: 'M+' },
        { value: 600, label: '탐지선박수', unit: 'K+' },
    ];

    return (
        <section>
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto max-w-7xl py-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col w-full m-5 text-center justify-center dark:text-white"
                        variants={itemVariants}
                    >
                        <motion.h3
                            className="text-6xl md:text-7xl lg:text-7xl font-bold mb-5"
                            variants={itemVariants}
                        >
                            <AnimatedCounter endValue={item.value} unit={item.unit} />
                        </motion.h3>
                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl font-semibold"
                            variants={itemVariants}
                        >
                            {item.label}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
