/** HardwarePage 에서 각 하드웨어 컴포넌트로, 선택하면 해당 브로셔 새 창 열림 */
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

const HardwareCardPDF: React.FC<HardwareItem> = ({ title, subTitle, description, category, imageSrc, tag, slug, path }) => (
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
                {/* Category */}
                <div
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white border border-gray-200 text-xs px-3 py-1 rounded-full shadow-md">
                    {category}
                </div>
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

export default HardwareCardPDF;
