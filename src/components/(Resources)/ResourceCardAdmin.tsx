"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownOnSquareIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ResourceCardProps {
    id: number;
    date: string;
    contentType: string; // Video / Guide / Brochures / DataSheets
    title: string;
    subtitle?: string;
    tags: string;
    form: string;
    image: string; // 대표 이미지 경로
    path: string; // 링크 및 페이지
    use: boolean;
    onDelete: (id: number) => void; // ✅ 추가
    onEdit: (id: number) => void; // ✅ 추가
}

const ResourceCardAdmin: React.FC<ResourceCardProps> = ({ id, date, contentType, title, subtitle, tags, form, image, path, use, onDelete, onEdit }) => {
    const router = useRouter();
    const handleOpenPDF = () => {
        if (form === "pdf") {
            window.open(path, "_blank", "noopener,noreferrer");
        }
    };
    const handlePageNavigation = () => {
        if (form === "page") {
            router.push(path); // Next.js 라우팅
        }
    }

    return (
        <div className="group flex flex-col border rounded-lg p-4 shadow-lg hover:shadow-xl h-full">
            {/* 이미지 섹션 */}
            <div className="relative overflow-hidden rounded-xl">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                        width={500}
                        height={300}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">이미지 없음</span>
                    </div>
                )}
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
                <h3 className="mt-3 text-lg maxWeb:text-xl font-semibold">{title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm maxWeb:text-lg text-gray-600 line-clamp-2">{subtitle}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.split(',').map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="mt-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row space-x-4">
                        <button onClick={() => onEdit(id)} className="px-3 py-1 rounded-full bg-blue-300 group-hover:bg-blue-500 text-white">Edit</button>
                        <button onClick={() => onDelete(id)} className="px-3 py-1 rounded-full bg-red-300 group-hover:bg-red-500 text-white">Delete</button>
                    </div>
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
                    ) : form === 'page' ? (
                        <button
                            onClick={handlePageNavigation}
                            className="flex flex-row w-full items-center justify-end text-red-500 hover:underline text-end pr-2"
                        >
                            Go to Page
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-5 w-5 ml-2" />
                        </button>
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
        </div>

    );
};

export default ResourceCardAdmin;
