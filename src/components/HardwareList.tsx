import React from 'react';
import Image from 'next/image';

interface HardwareItem {
    title: string;
    subTitle: string;
    description: string;
    category: string;
    imageSrc: string;
    tag: string[];
    slug: string;
    featured: boolean;
}

interface HardwareListProps {
    items: HardwareItem[];
}

const HardwareList: React.FC<HardwareListProps> = ({ items }) => {
    if (items.length === 0) {
        return <p>No hardware found matching your criteria.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map((item) => (
                <a
                    key={item.slug}
                    href={`/hardware/${item.slug}`}
                    className="group border p-4 rounded-md shadow-md mb-4 hover:shadow-lg hover:border-blud-500 transition duration-300"
                >
                    <div className="relative w-full h-60 overflow-hidden rounded-lg bg-gray-200 group-hover:bg-gray-300 transition duration-300">
                        {/* 이미지 컴포넌트 */}
                        <Image
                            alt={item.slug}
                            src={item.imageSrc}
                            layout="fill" // 이미지 크기를 부모 요소에 맞춤
                            objectFit="contain" // 비율 유지하면서 부모에 맞춤
                            className="bg-white group-hover:opacity-90 transition duration-300"
                            unoptimized
                        />
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-blue-500 transition duration-300">
                        {item.title}
                    </h2>
                    <p className="group-hover:text-gray-700 transition duration-300">{item.subTitle}</p>
                    <div className="mt-2">
                        <span className="text-xs text-gray-600">Tags: </span>
                        {item.tag.map((tag) => (
                            <span
                                key={tag}
                                className="text-blue-500 mr-2 text-xs group-hover:underline transition duration-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default HardwareList;
