"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownOnSquareIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ResourceCardProps {
    date: string;
    contentType: string; // Video / Guide / Brochures / DataSheets
    title: string;
    subtitle?: string;
    tags: string[];
    form: string;
    image: string; // 대표 이미지 경로
    path: string; // 링크 및 페이지
    use: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ date, contentType, title, subtitle, tags, form, image, path, use }) => {
    const handleOpenPDF = () => {
        if (form === "pdf") {
            window.open(path, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="group flex flex-col border rounded-lg p-4 shadow-lg hover:shadow-xl h-full">
            {/* 이미지 섹션 */}
            <div className="relative overflow-hidden rounded-xl">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={300}
                    unoptimized
                />
                {/* Classification */}
                <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white border border-gray-200 text-xs px-3 py-1 rounded-full shadow-md">
                    {contentType}
                </div>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="flex-grow">
                {/* Date */}
                {/*<p className="text-sm text-gray-500 mt-2 text-right">{date}</p>*/}
                {/*<p className="text-sm text-gray-500 mt-4 font-semibold text-left">{classification}</p>*/}

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{subtitle}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="mt-4">
                {form === 'link' ? (
                    <a
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center justify-end text-red-500 hover:underline text-end pr-2"
                    >
                        View More
                        <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-5 w-5 ml-2" />
                    </a>
                ) : (
                    <button
                        onClick={handleOpenPDF}
                        className="flex flex-row w-full items-center justify-end text-red-500 hover:underline text-end pr-2"
                    >
                        Open PDF
                        <ArrowDownOnSquareIcon aria-hidden="true" className="h-5 w-5 ml-2" />
                    </button>
                )}
            </div>
        </div>

    );
};

export default ResourceCard;
