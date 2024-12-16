"use client";

import React, { useState } from "react";
import getBlogData from "@/service/blogData"
import BlogCard from "@/components/(Resources)/BlogCard";

interface TagFilterProps {
    initialTags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ initialTags }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const blogData = getBlogData();

    const filteredData = blogData.filter((item) =>
        selectedTag ? item.tags.includes(selectedTag) : initialTags.some((tag) => item.tags.includes(tag))
    );
    // 세 개까지만 표시
    // const filteredData = blogData
    //     .filter((item) => {
    //         if(selectedTag) {
    //             // 특정 태그가 선택된 경우
    //             return item.tags.includes(selectedTag);
    //         }
    //         if(initialTags.length === 0) {
    //             // 초기 태그가 비어있는 경우 모든 데이터 반환
    //             return true;
    //         }
    //         // 초기 태그에 포함된 데이터만 반환
    //         return initialTags.some((tag) => item.tags.includes(tag));
    //     })
    //     .slice(0, 3); // 최대 3개까지만 표시

    return (
        <div className="p-6 mx-auto max-w-7xl">
            {/*<h1 className="text-3xl font-bold mb-4">Filter by Tags</h1>*/}

            {/* Tag Buttons */}
            {/*<div className="flex flex-wrap gap-2 mb-6">*/}
            {/*    {initialTags.map((tag) => (*/}
            {/*        <button*/}
            {/*            key={tag}*/}
            {/*            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}*/}
            {/*            className={`px-4 py-2 text-sm rounded ${*/}
            {/*                selectedTag === tag ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            {tag}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Filtered Blog Cards */}
            <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                {filteredData.map((item) => (
                    <BlogCard key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
};

export default TagFilter;
