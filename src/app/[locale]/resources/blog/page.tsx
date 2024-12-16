'use client';

import React from 'react';
import BlogCard from "@/components/(Resources)/BlogCard"
import getBlogData from "@/service/blogData";
import Link from 'next/link';
import { breadcrumbs } from '@/service/resources';
import SameBreadcrumbs from '@/components/SameBreadcrumbs';

/**
 * @description: PDF 자료 & Video & Brochures
 * @constructor: Datasheet & Brochure & Video
 * */

const BlogPage = () => {
    // const blogData = getBlogData();
    const blogData = getBlogData().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const classifications = ["video", "brochure", "datasheet"];
    const tags = Array.from(new Set(blogData.flatMap((item) => item.tags)));

    const formatCategoryName = (classification: string) => {
        switch (classification) {
            case "video":
                return "Videos";
            case "brochure":
                return "Brochures";
            case "datasheet":
                return "Datasheets";
            default:
                return classification;
        }
    };

    return (
        <section>
            <SameBreadcrumbs items={breadcrumbs} current="blog" />
            <div className="mx-auto max-w-7xl p-6">
                <h1 className="text-5xl font-bold mb-4">Blog</h1>

                {/* Blog Categories */}
                {classifications.map((classification) => (
                    <div key={classification} className="pt-10 py-28">
                        <div className="flex flex-row w-full border-t border-gray-200 border-1 mb-5" />
                        <div className="mb-8 flex justify-between">
                            <h2 className="font-semibold text-5xl">{formatCategoryName(classification)}</h2>
                            <Link
                                className="py-3 px-5 rounded-full border-2 border-red-700 text-red-700 bg-white hover:bg-gray-200"
                                href={`/resources/blog/${classification}`}
                            >
                                더보기
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                            {blogData
                                .filter((post) => post.classification === classification)
                                .map((post) => (
                                    <BlogCard key={post.path} {...post} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogPage;





// <section>
//     <h1 className="text-black text-5xl items-start font-bold pt-5 py-12">Blog Home</h1>
//     <span>Video</span>
//
//
//     <span>brochure</span>
//
//
//     <span>datasheets</span>
//
//     <p>Hardware</p>
//     <p>Device</p>
//     <p>Modem</p>
//     <p>Development Kits</p>
//     <p>Sensors and Gateways</p>
//
//     <p>Applications</p>
//     <p>Web Applications</p>
//     <p>Enterprise Applications</p>
//     <p>Terminal Apps</p>
// </section>