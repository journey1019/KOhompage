import React from "react";
import BoardCard from "@/components/(Resources)/BoardCard";
import { getBoardData } from "@/service/boardData";
import { breadcrumbs } from '@/service/resources';
import SameBreadcrumbs from '@/components/SameBreadcrumbs';

interface Props {
    params: {
        classification: string;
    };
}

const ClassificationPage = ({ params }: Props) => {
    const { classification } = params;
    const boardData = getBoardData().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const filteredData = boardData.filter((item) => item.classification === classification);

    return (
        <>
            <SameBreadcrumbs items={breadcrumbs} current="board" />
            <div className="p-6 mx-auto max-w-7xl">
                <h1 className="text-5xl font-bold mb-32">{classification.toUpperCase()} Blogs</h1>
                <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredData
                        .filter((post) => post.classification === classification)
                        .map((item, index) => (
                            <BoardCard key={item.title} index={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ClassificationPage;