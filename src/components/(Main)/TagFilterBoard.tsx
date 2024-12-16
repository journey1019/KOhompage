"use client";

import React, { useState } from "react";
import getBoardData from "@/service/boardData"
import BoardCard from "@/components/(Resources)/BoardCard";

interface TagFilterProps {
    initialTags: string[];
}

const TagFilterBoard: React.FC<TagFilterProps> = ({ initialTags }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const blogData = getBoardData();

    const filteredData = blogData
        .filter((item) => {
            if(selectedTag) {
                // 특정 태그가 선택된 경우
                return item.tags.includes(selectedTag);
            }
            if(initialTags.length === 0) {
                // 초기 태그가 비어있는 경우 모든 데이터 반환
                return true;
            }
            // 초기 태그에 포함된 데이터만 반환
            return initialTags.some((tag) => item.tags.includes(tag));
        })
        .slice(0, 3); // 최대 3개까지만 표시

    return (
        <div className="p-6 mx-auto max-w-7xl">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 pb-10">BOARD</h2>

            {/* More Blog 버튼 (오른쪽 정렬) */}
            <div className="flex justify-end mb-6">
                <a
                    href="/resources/board"
                    type="button"
                    className="border focus:outline-none focus:ring-4 focus:ring-red-100 font-medium rounded-full text-sm lg:text-md px-5 py-3 me-2 bg-white text-red-700 border-red-600 hover:border-red-700 hover:bg-red-700 hover:text-white transition"
                >
                    More Board
                </a>
            </div>

            {/* Filtered Blog Cards */}
            <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                {filteredData.map((item, index) => (
                    <BoardCard key={item.title} index={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default TagFilterBoard;
