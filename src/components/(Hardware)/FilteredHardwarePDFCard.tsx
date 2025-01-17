"use client";

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
    path: string;
}

const FilteredHardwarePDFCard: React.FC<HardwareItem> = ({
                                                             title,
                                                             subTitle,
                                                             description,
                                                             category,
                                                             imageSrc,
                                                             tag,
                                                             slug,
                                                             path,
                                                         }) => (
    <a
        className="group"
        href={path}
        target="_blank"
        rel="noopener noreferrer"
    >
        <div className="pb-2">
            <div className="relative w-full h-48 overflow-hidden rounded-md border border-gray-200">
                <Image
                    alt={slug}
                    src={imageSrc}
                    fill
                    style={{ objectFit: "contain" }}
                    className="bg-white transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    unoptimized
                />
            </div>
            <h3 className="text-xs md:text-base font-normal 2xl:text-lg mt-2 text-gray-500 text-center md:text-start">{subTitle}</h3>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-lg md:text-2xl 2xl:text-3xl font-bold text-center md:text-start">
                {title}
            </h2>
        </div>
    </a>
);

export default FilteredHardwarePDFCard;
