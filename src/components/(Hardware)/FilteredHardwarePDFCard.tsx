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
    path: string;
}

const FilteredHardwarePDFCard: React.FC<HardwareItem> = ({ title, subTitle, description, category, imageSrc, tag, slug, path }) => (
    <a
        className="group"
        href={path} // PDF 파일 경로로 설정
        target="_blank" // 새로운 탭에서 열기
        rel="noopener noreferrer" // 보안상 설정
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
            <h3 className="text-base font-normal mt-4 text-gray-500">{subTitle}</h3>
            <h2 className="group-hover:text-blue-500 transition duration-300 text-2xl font-bold ">{title}</h2>
        </div>
    </a>
);

export default FilteredHardwarePDFCard;
