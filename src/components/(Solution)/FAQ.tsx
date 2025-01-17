'use client';

import React, { useState, useRef } from "react";
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion'; // framer-motion 라이브러리 사용
import { useInView } from "react-intersection-observer";

interface FAQItem {
    question: string;
    answer: string;
}
interface FAQProps {
    faqImage: string;
    items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqImage, items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Intersection Observer 설정
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.2, // 컴포넌트가 20% 보일 때 트리거
        triggerOnce: true, // 한 번만 실행
    });

    if (inView) {
        controls.start("visible");
    }

    return (
        <section className="bg-white dark:bg-gray-900" ref={ref}>
            <div className="py-6">
                <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full"
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                        }}
                    >
                        {/* 이미지 */}
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
                            }}
                        >
                            <Image
                                src={faqImage}
                                alt="FAQ section"
                                width={400}
                                height={240}
                                unoptimized
                                className="w-full max-w-md 2xl:max-w-lg rounded-xl object-cover mx-auto"
                            />
                        </motion.div>

                        {/* FAQ */}
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-xl 2xl:max-w-2xl">
                                <div className="accordion-group">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className={`accordion border border-solid p-3 md:p-4 mb-4 md:mb-8 rounded-xl transition duration-500 ${openIndex === index ? 'bg-gray-100 border-gray-600' : 'border-gray-300 dark:border-gray-700'}`}
                                            initial="hidden"
                                            animate={controls}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                                            }}
                                        >
                                            <button
                                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-gray-600"
                                                onClick={() => toggleAccordion(index)}
                                                aria-controls={`collapse-${index}`}
                                            >
                                                <motion.h5
                                                    whileHover={{ scale: 1.05 }}
                                                    className="transition-transform text-base md:text-lg 2xl:text-xl"
                                                >
                                                    {item.question}
                                                </motion.h5>
                                                {openIndex === index ? (
                                                    <svg
                                                        className="w-6 h-6 text-gray-900 dark:text-gray-200"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6 12H18"
                                                            stroke="currentColor"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-6 h-6 text-gray-900 dark:text-gray-200"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6 12H18M12 6V18"
                                                            stroke="currentColor"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            {openIndex === index && (
                                                <motion.div
                                                    id={`collapse-${index}`}
                                                    className="accordion-content mt-4"
                                                    initial={{ height: 0, opacity: 0, y: -20 }}
                                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                                    exit={{ height: 0, opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                >
                                                    <p className="text-sm md:text-base 2xl:text-xl text-gray-900 dark:text-gray-200 font-normal leading-6">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
