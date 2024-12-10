'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string; // Make sure this is a string
    category: string;
    tags: string[];
    content: string;
    thumbnail: string;
    href: string;
    comments: {
        commentId: number;
        author: string;
        content: string;
        date: string;
    }[];
}

const blogData: BlogPost[] = require('../../data/blogData.json');

export default function Board() {
    const [latestPost, setLatestPost] = useState<BlogPost | null>(null); // Explicitly typing as BlogPost | null
    const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]); // You can also specify type here

    useEffect(() => {
        // 최신순으로 데이터 정렬
        const sortedData = blogData.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // Sort in descending order
        });

        // 상단에 가장 최신 데이터, 그 다음 3개를 저장
        setLatestPost(sortedData[0]);
        setOtherPosts(sortedData.slice(1, 4)); // 세 개의 다른 항목을 배열로 저장
    }, []);

    if (!latestPost || otherPosts.length === 0) return <p>Loading...</p>;

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">Resources</h2>
                    <div className="flex justify-center">
                        <p className="font-manrope text-lg max-w-lg text-gray-500 dark:text-gray-400 mb-16 text-center">
                            Read all the latest KOREAORBCOMM news from press releases to company announcements and more.
                        </p>
                    </div>

                    {/* 상단의 최신 데이터 */}
                    <div
                        className="border border-gray-300 rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row justify-between">
                        <div className="flex flex-col lg:w-1/2">
                        <span
                            className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">{latestPost.category}</span>
                            <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5">{latestPost.title}</h4>
                            <p className="text-gray-500 leading-6 mb-10">{latestPost.content}</p>
                            <a href={latestPost.href} type="button" target="_blank"
                               className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-center">
                                Read More
                            </a>
                        </div>
                        <Image
                            className="h-full w-full lg:h-1/3 lg:w-1/2 rounded-lg mt-5 lg:mt-0 object-fill"
                            src={latestPost.thumbnail}
                            alt={latestPost.title}
                            width={300} height={200} unoptimized
                        />
                    </div>

                    {/* 나머지 세 개의 컴포넌트 */}
                    <div
                        className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
                        {otherPosts.map((post) => (
                            <div key={post.id}
                                 className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
                                {/* 이미지 */}
                                <div className="flex items-center h-48 overflow-hidden">
                                    <Image src={post.thumbnail} alt={post.title}
                                           className="rounded-t-2xl w-full h-full object-cover"
                                           width={300} height={200} unoptimized
                                    />
                                </div>
                                {/* 내용 */}
                                <div
                                    className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                    <span
                                        className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">{post.category}</span>

                                    {/* 제목 */}
                                    <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5 line-clamp-2">
                                        {post.title}
                                    </h4>

                                    {/* 내용 */}
                                    <p className="text-gray-500 leading-6 mb-10 line-clamp-3">
                                        {post.content}
                                    </p>

                                    <a href={post.href} target="_blank"
                                       className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
