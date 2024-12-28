/** 각 페이지 및 컴포넌트에 첨부되는 'Filtered Hardware List Component' */

'use client';

import React from "react";
import Image from "next/image";

interface HardwareItem {
    title: string;
    subTitle: string;
    description: string;
    category: string;
    imageSrc: string;
    tag: string[];
    slug: string;
}

const FilteredHardwareCard: React.FC<HardwareItem> = ({ title, subTitle, description, category, imageSrc, tag, slug }) => (
    <a
        className="group"
        href={`/hardware/${slug}`}
    >
        <div className="pb-4">
            <div className="relative w-full h-60 overflow-hidden rounded-lg border-2 border-gray-200">
                <Image
                    alt={slug}
                    src={imageSrc}
                    layout="fill"
                    objectFit="contain"
                    className="bg-white transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    unoptimized
                />
                {/* Category */}
                {/*<div*/}
                {/*    className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white border border-gray-200 text-xs px-3 py-1 rounded-full shadow-md">*/}
                {/*    {category}*/}
                {/*</div>*/}
            </div>
            <h3 className="text-base font-normal mt-4 text-gray-500">{subTitle}</h3>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-2xl font-bold ">{title}</h2>
            {/*<p className="text-sm text-gray-600 mt-2">{subTitle}</p>*/}
            {/*<p className="text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>*/}
            {/* Tags */}
            {/*<div className="mt-2">*/}
            {/*    /!*<span className="text-xs text-gray-400">Tags:</span>*!/*/}
            {/*    <div className="flex flex-wrap gap-1 mt-1"> /!* Ensure tags wrap properly *!/*/}
            {/*        {tag.map((t, index) => (*/}
            {/*            <span*/}
            {/*                key={index}*/}
            {/*                className="bg-blue-100 text-blue-500 px-2 py-1 text-xs rounded-full truncate " // Prevent tags from overflowing*/}
            {/*            >*/}
            {/*    {t}*/}
            {/*</span>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    </a>
);

export default FilteredHardwareCard;
