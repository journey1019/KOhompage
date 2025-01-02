'use client';

import Image from 'next/image';

interface Item {
    image: string;
    title: string;
    description: string;
}

interface ItemsProps {
    items: Item[];
}

export default function Value({ items }: ItemsProps) {
    return (
        <section className="mx-auto max-w-screen-xl py-12">
            <div className="mt-16 grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 transition-transform border border-1 hover:scale-105 hover:shadow-lg"
                    >
                        <div className="flex flex-col items-start space-y-4">
                            {/* 이미지 상단 정렬 */}
                            <div className="relative w-16 h-16">
                                <Image
                                    src={item.image}
                                    alt={item.title || 'Image description missing'}
                                    className="transition group-hover:filter group-hover:sepia group-hover:hue-rotate-90 group-hover:scale-105"
                                    width={64}
                                    height={64}
                                    unoptimized
                                />
                            </div>
                            <div>
                                {/* 텍스트 상단 정렬 */}
                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white transition group-hover:text-secondary">
                                    {item.title}
                                </h5>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
