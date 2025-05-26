/** HardwarePage 에서 각 하드웨어 컴포넌트로, 선택하면 해당 브로셔 새 창 열림 */
'use client';

import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface HardwareItem {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    category: string;
    imageSrc: string;
    tags: string;
    slug?: string;
    path: string;
    use: boolean;
    isAdmin?: boolean;
    onDelete: (id: number) => void; // ✅ 추가
    onEdit: (id: number) => void; // ✅ 추가
}

const HardwareCardPDFAdmin: React.FC<HardwareItem> = ({ id, title, subtitle, description, category, imageSrc, tags, slug, path, use, onDelete, onEdit, isAdmin = false }) => (
    <div className={`group border rounded-lg shadow p-4 transition hover:shadow-md ${!use ? 'bg-gray-300' : 'bg-white'}`}>
        <div className="relative w-full h-60 overflow-hidden rounded-lg border-2 border-gray-200">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={slug || 'hardware-image'}
                    fill
                    style={{ objectFit: "contain" }}
                    className="bg-white transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    unoptimized
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-gray-100">
                    이미지 없음
                </div>
            )}
            <div
                className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white border border-gray-200 text-xs px-3 py-1 rounded-full shadow-md">
                {category}
            </div>
        </div>

        <div className="mt-4 flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold group-hover:text-blue-500 transition">{title}</h2>
            <button
                onClick={() => window.open(path, '_blank', 'noopener,noreferrer')}
                className="flex flex-row px-3 py-1 space-x-2 rounded-full hover:underline text-red-500 text-md items-center"
            >
                <span>PDF 보기</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4"/>
            </button>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
            {(typeof tags === 'string' ? tags.split(',') : Array.isArray(tags) ? tags : []).map((tag, index) => (
                <span
                    key={index}
                    className="bg-blue-100 text-blue-500 px-2 py-1 text-xs rounded-full truncate"
                >
                    {tag}
                </span>
            ))}
        </div>

        <div className="flex flex-row flex-wrap gap-3 mt-4">
            <button
                onClick={() => onEdit(id)}
                className="px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            >
                ✏️ Edit
            </button>

            <button
                onClick={() => onDelete(id)}
                className="px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
                🗑 Delete
            </button>
        </div>
    </div>
);

export default HardwareCardPDFAdmin;
