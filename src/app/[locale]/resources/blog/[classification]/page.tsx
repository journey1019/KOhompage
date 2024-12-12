"use client";

import React from "react";
import { useRouter } from "next/router";
import blogData from "../../../../../../data/resources/blog.json";
import BlogCard from "@/components/(Resources)/BlogCard";
import Link from 'next/link';
import BlogPost from '@/components/(Blog)/BlogPost';


interface Props {
    params: Promise<{
        classification: string;
    }>;
}
const ClassificationPage = async ({ params }: Props) => {
    const { classification } = await params;

    const filteredData = blogData.filter((item) => item.classification === classification);

    return (
        <div className="p-6 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-4">{classification.toUpperCase()} Blogs</h1>
            <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                {filteredData.map((item) => (
                    <BlogCard key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ClassificationPage;