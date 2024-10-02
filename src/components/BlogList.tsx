// components/BlogList.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogPostType {
    id: number;
    title: string;
    img: string;
    desc: string;
}

export default function BlogList() {
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/blogPosts.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">All Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                    <Link key={post.id} href={`/blog/blog_${post.id}`}>
                        <div className="relative min-h-[20rem] rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                            <img src={post.img} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/70" />
                            <div className="relative p-6 flex flex-col justify-end">
                                <h3 className="text-3xl font-bold text-white">{post.title}</h3>
                                <p className="my-2 text-white">{post.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
