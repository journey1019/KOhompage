'use client';

import React from "react";
import Image from "next/image";

interface HardwareItem {
    title: string;
    subTitle: string;
    description: string;
    imageSrc: string;
    tag: string[];
    slug: string;
}

const HardwareCard: React.FC<HardwareItem> = ({ title, subTitle, description, imageSrc, tag, slug }) => (
    <a
        className="group"
        href={`/hardware/${slug}`}
    >
        <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
                <Image
                    alt={slug}
                    src={imageSrc}
                    fill
                    style={{ objectFit: "contain" }}
                    className="bg-white"
                    unoptimized
                />
            </div>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-lg font-bold mt-4">{title}</h2>
            <p className="text-sm text-gray-600 mt-2">{subTitle}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>
            {/*<div className="mt-2">*/}
            {/*    <span className="text-xs text-gray-400">Tags:</span>*/}
            {/*    {tag.map((t, index) => (*/}
            {/*        <span key={index} className="text-xs text-blue-500 ml-2">*/}
            {/*        {t}*/}
            {/*    </span>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className="mt-2">
                <span className="text-xs text-gray-400">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1"> {/* Ensure tags wrap properly */}
                    {tag.map((t, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-500 px-2 py-1 text-xs rounded-full truncate max-w-[80px]" // Prevent tags from overflowing
                        >
                {t}
            </span>
                    ))}
                </div>
            </div>

        </div>
    </a>
);

export default HardwareCard;
