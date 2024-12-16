'use client';

import React from 'react';
import BoardCard from "@/components/(Resources)/BoardCard";
import getBoardData from "@/service/boardData";
import SameBreadcrumbs from '@/components/SameBreadcrumbs';
import { breadcrumbs } from '@/service/resources';
import Link from 'next/link';

export default function BoardPage() {
    // 데이터 정렬
    const boardData = getBoardData().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const classifications = ["article", "news"];

    const formatCategoryName = (classification: string) => {
        switch (classification) {
            case "article":
                return "Articles";
            case "news":
                return "News";
            default:
                return classification;
        }
    };

    return (
        <section>
            <SameBreadcrumbs items={breadcrumbs} current="board" />
            <div className="mx-auto max-w-7xl p-6">
                <h1 className="text-black text-5xl items-start font-bold pt-5 py-12">Board Home</h1>

                {/* Board Categories */}
                {classifications.map((classification) => (
                    <div key={classification} className="pt-10 py-28">
                        <div className="flex flex-row w-full border-t border-gray-200 border-1 mb-5" />
                        <div className="mb-8 flex justify-between">
                            <h2 className="font-semibold text-5xl">{formatCategoryName(classification)}</h2>
                            <Link
                                className="py-3 px-5 rounded-full border-2 border-red-700 text-red-700 bg-white hover:bg-gray-200"
                                href={`/resources/board/${classification}`}
                            >
                                더보기
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                            {boardData
                                .filter((post) => post.classification === classification)
                                .map((post, index) => (
                                    <BoardCard key={post.path} index={index} {...post} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
