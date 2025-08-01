"use client";

import React from "react";
import Image from "next/image";
import { Hardware } from "@/types/hardware";

const FilteredHardwarePDFCard: React.FC<Hardware> = ({
                                                             title,
                                                             subtitle,
                                                             description,
                                                             category,
                                                             imageSrc,
                                                             tags,
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
            <h3 className="text-xs md:text-base font-normal maxWeb:text-lg mt-2 text-gray-500 text-center md:text-start">{subtitle}</h3>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-lg md:text-2xl maxWeb:text-3xl font-bold text-center md:text-start">
                {title}
            </h2>
        </div>
    </a>
);

export default FilteredHardwarePDFCard;
