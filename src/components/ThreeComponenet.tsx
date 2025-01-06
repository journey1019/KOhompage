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
                duration: 0.4, // 속도 조정
                staggerChildren: 0.1, // 자식 요소 간의 간격 감소
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }, // 요소 애니메이션 속도 조정
        },
    };

    const AnimatedCounter = ({ endValue, unit }: { endValue: number; unit: string }) => {
        const motionValue = useMotionValue(0);
        const roundedValue = useTransform(motionValue, (value) => Math.round(value));
        const [displayValue, setDisplayValue] = useState(0);
        const [hasAnimated, setHasAnimated] = useState(false); // 애니메이션 실행 여부 추적

        useEffect(() => {
            const unsubscribe = roundedValue.onChange((latest) => {
                setDisplayValue(latest);
            });

            return () => unsubscribe();
        }, [roundedValue]);

        const startAnimation = () => {
            if (hasAnimated) return; // 이미 애니메이션이 실행되었으면 종료
            setHasAnimated(true);

            const duration = 1500; // 애니메이션 지속 시간 (ms) - 더 빠르게 설정
            const interval = 15; // 업데이트 간격 (ms)
            const step = endValue / (duration / interval);

            let currentValue = 0;
            const increment = setInterval(() => {
                currentValue += step;
                if (currentValue >= endValue) {
                    currentValue = endValue;
                    clearInterval(increment);
                }
                motionValue.set(currentValue);
            }, interval);
        };

        return (
            <motion.span
                onViewportEnter={startAnimation} // 뷰포트에 들어올 때 애니메이션 시작
                style={{ display: 'inline-block' }}
            >
                {displayValue.toLocaleString()}
                {unit}
            </motion.span>
        );
    };

    const data = [
        { value: 12000, label: '사용자 수', unit: '+' },
        { value: 60, label: '월간 데이터', unit: 'M+' },
        { value: 600, label: '모니터링 자산', unit: 'K+' },
    ];

    return (
        <section>
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto max-w-7xl py-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // 뷰포트에서 50% 이상 보일 때 실행
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
