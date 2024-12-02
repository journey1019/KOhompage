import React from 'react';
import Image from 'next/image';

interface HardwareItem {
    title: string;
    subTitle: string;
    description: string;
    brochure: string;
    devkit: string;
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {items.map((item) => (
                <a key={item.slug} href={`hard/${item.slug}`} className="group border p-4 rounded-md shadow-md mb-4 hover:shadow-lg hover:border-blud-500 transition duration-300">
                    <div
                        className="w-full h-60 overflow-hidden rounded-lg bg-gray-200 group-hover:bg-gray-300 transition duration-300"> {/* 고정된 크기 설정 */}
                        <Image
                            alt={item.slug}
                            src={item.imageSrc}
                            width={240} // 고정된 크기
                            height={240} // 고정된 크기
                            className="object-cover object-center w-full h-full bg-white group-hover:opacity-90 transition duration-300"
                            unoptimized
                        />
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-blue-500 transition duration-300">{item.title}</h2>
                    <p className="group-hover:text-gray-700 transition duration-300">{item.subTitle}</p>
                    <div className="mt-2">
                        <span className="text-xs text-gray-600">Tags: </span>
                        {item.tag.map((tag) => (
                            <span key={tag} className="text-blue-500 mr-2 text-xs group-hover:underline transition duration-300">{tag}</span>
                        ))}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default HardwareList;
