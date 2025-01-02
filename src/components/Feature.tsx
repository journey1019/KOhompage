'use client';

import Image from 'next/image';

interface SectionData {
    image: string;
    title: string;
    description: string;
    reverse?: boolean; // true이면 이미지와 텍스트 위치 반전
}

interface FeatureProps {
    sections: SectionData[];
}

export default function Feature({ sections }: FeatureProps) {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:py-14">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center ${
                        section.reverse ? 'lg:flex-row-reverse' : ''
                    }`}
                >
                    {/* 이미지 */}
                    <div className="flex justify-center order-1 lg:order-none">
                        <Image
                            src={section.image}
                            alt={section.title}
                            width={500}
                            height={300}
                            className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-xl"
                            unoptimized
                        />
                    </div>
                    {/* 텍스트 */}
                    <div className="max-w-xl lg:max-w-lg mx-auto text-center lg:text-start">
                        <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
                            {section.title}
                        </h2>
                        <p className="mt-4 text-md sm:text-lg lg:text-xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                            {section.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
