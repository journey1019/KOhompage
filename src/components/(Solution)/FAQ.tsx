'use client';

import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null); // 아코디언을 열기 위한 상태 관리

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2
                            className="text-4xl font-manrope text-center font-bold text-gray-900 dark:text-white leading-[3.25rem]"
                        >
                            Frequently asked questions
                        </h2>
                    </div>
                    <div className="accordion-group">
                        {/* 1st Accordion */}
                        <div
                            className={`accordion border border-solid p-4 rounded-xl transition duration-500 ${openIndex === 1 ? 'bg-indigo-50 border-indigo-600 dark:bg-indigo-900' : 'border-gray-300 dark:border-gray-700'} mb-8 lg:p-4`}
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-300"
                                onClick={() => toggleAccordion(1)}
                                aria-controls="basic-collapse-one"
                            >
                                <h5>How can I reset my password?</h5>
                                {openIndex === 1 ? (
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
                            {openIndex === 1 && (
                                <div
                                    id="basic-collapse-one"
                                    className="accordion-content mt-4 transition-all duration-500"
                                >
                                    <p className="text-base text-gray-900 dark:text-gray-200 font-normal leading-6">
                                        To reset your password, go to the account settings, click on &apos;Forgot Password,&apos; and follow the instructions sent to your registered email.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 2nd Accordion */}
                        <div
                            className={`accordion border border-solid p-4 rounded-xl transition duration-500 ${openIndex === 2 ? 'bg-indigo-50 border-indigo-600 dark:bg-indigo-900' : 'border-gray-300 dark:border-gray-700'} mb-8 lg:p-4`}
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-300"
                                onClick={() => toggleAccordion(2)}
                                aria-controls="basic-collapse-two"
                            >
                                <h5>How do I update my billing information?</h5>
                                {openIndex === 2 ? (
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
                            {openIndex === 2 && (
                                <div
                                    id="basic-collapse-two"
                                    className="accordion-content mt-4 transition-all duration-500"
                                >
                                    <p className="text-base text-gray-900 dark:text-gray-200 font-normal leading-6">
                                        To update your billing information, go to &apos;Account Settings,&apos; navigate to &apos;Billing,&apos; and update your payment method.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 3rd Accordion */}
                        <div
                            className={`accordion border border-solid p-4 rounded-xl transition duration-500 ${openIndex === 3 ? 'bg-indigo-50 border-indigo-600 dark:bg-indigo-900' : 'border-gray-300 dark:border-gray-700'} mb-8 lg:p-4`}
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-300"
                                onClick={() => toggleAccordion(3)}
                                aria-controls="basic-collapse-three"
                            >
                                <h5>How can I contact customer support?</h5>
                                {openIndex === 3 ? (
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
                            {openIndex === 3 && (
                                <div
                                    id="basic-collapse-three"
                                    className="accordion-content mt-4 transition-all duration-500"
                                >
                                    <p className="text-base text-gray-900 dark:text-gray-200 font-normal leading-6">
                                        You can contact customer support by clicking &apos;Help&apos; in the footer or visiting the &apos;Contact Us&apos; page.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
