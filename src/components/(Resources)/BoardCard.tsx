"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface BoardCardProps {
    index: number;
    title: string;
    description: string;
    images: string;
    date: string;
    classification: string;
    form: "link" | "page";
    path: string;
    tags: string[];
}

const BoardCard: React.FC<BoardCardProps> = ({ index, title, description, classification, images, path, form, tags }) => {
    const router = useRouter();

    const handleNavigation = () => {
        if (form === "link") {
            window.open(path, "_blank", "noopener,noreferrer");
        } else {
            router.push(`/resources/board/${index}`);
        }
    };

    return (
        <div
            onClick={handleNavigation} // 컴포넌트 전체를 클릭 가능하도록 설정
            className="group flex flex-col border rounded-lg p-4 shadow-lg hover:shadow-xl h-full cursor-pointer"
        >
            {/* 이미지 섹션 */}
            <div className="relative overflow-hidden rounded-xl">
                <Image
                    src={images}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={300}
                    unoptimized
                />
                {/* Classification */}
                <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white border border-gray-200 text-xs px-3 py-1 rounded-full shadow-md">
                    {classification}
                </div>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="flex-grow">
                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>

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
            <div className="mt-4 flex justify-end items-center text-red-500">
                {form === "link" ? (
                    <div className="flex flex-row items-center">
                        <span className="pr-3">View More</span>
                        <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-5 w-5" />
                    </div>
                ) : (
                    <>
                        <span className="pr-3">Open Page</span>
                        <ArrowRightOnRectangleIcon aria-hidden="true" className="h-5 w-5" />
                    </>
                )}
            </div>
        </div>
    );
};

export default BoardCard;
