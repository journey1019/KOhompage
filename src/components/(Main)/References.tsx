import ImageCard from '@/components/component/ImageCard';
import React from 'react';

export default function References () {
    return (
        <div className="p-6 mx-auto max-w-7xl">
            <div className="m-auto max-w-5xl pb-10">
                <h2 className="text-center text-md font-semibold text-red-800 pb-6 sm:pb-10">OUR RESOURCES</h2>
                <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">ARTICLE</h2>
            </div>

            {/* More Blog 버튼 (오른쪽 정렬) */}
            <div className="flex justify-end mb-6">
                <a
                    href="/resources/blog"
                    type="button"
                    className="border focus:outline-none focus:ring-4 focus:ring-red-100 font-medium rounded-full text-sm lg:text-md px-5 py-3 me-2 bg-white text-red-700 border-red-600 hover:border-red-700 hover:bg-red-700 hover:text-white transition"
                >
                    More Article
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto mt-20 max-w-7xl sm:mt-40">
                {[
                    { value: '60억 +', label: '최종 사용자' },
                    { value: '50억 +', label: '월간 데이터' },
                    { value: '30만 +', label: '선박' },
                ].map((item, index) => (
                    <div key={index}
                         className="flex flex-col w-full m-5 text-center justify-center dark:text-white">
                        <h3 className="text-6xl md:text-7xl lg:text-7xl font-bold mb-5">
                            {item.value}
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}