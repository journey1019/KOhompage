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
                    layout="fill"
                    objectFit="contain"
                    className="bg-white"
                    unoptimized
                />
            </div>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-lg font-bold mt-4">{title}</h2>
            <p className="text-sm text-gray-600 mt-2">{subTitle}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>
            <div className="mt-2">
                <span className="text-xs text-gray-400">Tags:</span>
                {tag.map((t, index) => (
                    <span key={index} className="text-xs text-blue-500 ml-2">
                    {t}
                </span>
                ))}
            </div>
        </div>
    </a>
);

export default HardwareCard;
