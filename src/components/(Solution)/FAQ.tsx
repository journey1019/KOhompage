'use client';

import React from "react";
import { useState } from 'react';
import Image from 'next/image';

interface FAQItem {
    question: string;
    answer: string;
}
interface FAQProps {
    items: FAQItem[];
}

const FAQ:React.FC<FAQProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); // 아코디언을 열기 위한 상태 관리

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                        <div className="w-full lg:w-1/2">
                            <Image
                                src="https://images.pexels.com/photos/5428824/pexels-photo-5428824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="FAQ tailwind section"
                                width={400} // 너비를 줄임
                                height={240} // 높이를 줄임
                                unoptimized
                                className="w-full max-w-md rounded-xl object-cover mx-auto" // 크기 제한 및 중앙 정렬
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-xl">
                                <div className="accordion-group">
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`accordion border border-solid p-4 rounded-xl transition duration-500 ${openIndex === index ? 'bg-indigo-50 border-indigo-600 dark:bg-indigo-900' : 'border-gray-300 dark:border-gray-700'} mb-8 lg:p-4`}
                                        >
                                            <button
                                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-300"
                                                onClick={() => toggleAccordion(index)}
                                                aria-controls="basic-collapse-one"
                                            >
                                                <h5>{item.question}</h5>
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
                                                <div
                                                    id="basic-collapse-one"
                                                    className="accordion-content mt-4 transition-all duration-500"
                                                >
                                                    <p className="text-base text-gray-900 dark:text-gray-200 font-normal leading-6">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;