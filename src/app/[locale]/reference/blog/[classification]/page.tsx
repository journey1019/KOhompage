import React from "react";
import BlogCard from "@/components/(Resources)/BlogCard";
import { getBlogData } from "@/service/blogData";
import { breadcrumbs } from '@/service/resources';
import SameBreadcrumbs from '@/components/SameBreadcrumbs';

interface Props {
    params: {
        classification: string;
    };
}

const ClassificationPage = ({ params }: Props) => {
    const { classification } = params;
    const blogData = getBlogData();

    const filteredData = blogData.filter((item) => item.classification === classification);

    return (
        <>
            <SameBreadcrumbs items={breadcrumbs} current="blog" />
            <div className="p-6 mx-auto max-w-7xl">
                <h1 className="text-5xl font-bold mb-32">{classification.toUpperCase()} BLOGS</h1>
                <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredData.map((item) => (
                        <BlogCard key={item.title} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ClassificationPage;