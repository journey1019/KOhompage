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

const HardwareCard2: React.FC<HardwareItem> = ({ title, subTitle, description, imageSrc, tag, slug }) => (
    <a
        className="group"
        href={`/hard/${slug}`}
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
            </div>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-2xl font-bold mt-4">{title}</h2>
            {/*<p className="text-sm text-gray-600 mt-2">{subTitle}</p>*/}
            {/*<p className="text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>*/}
            <div className="mt-2">
                {/*<span className="text-xs text-gray-400">Tags:</span>*/}
                <div className="flex flex-wrap gap-1 mt-1"> {/* Ensure tags wrap properly */}
                    {tag.map((t, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-500 px-2 py-1 text-xs rounded-full truncate " // Prevent tags from overflowing
                        >
                {t}
            </span>
                    ))}
                </div>
            </div>

        </div>
    </a>
);

export default HardwareCard2;
