'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlogPostType {
    id: number;
    title: string;
    img: string;
    desc: string;
    content: string;
}

const BlogIndexPage = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);

    // useEffect(() => {
    //     fetch('/data/blogPosts.json')
    //         .then((response) => response.json())
    //         .then((data) => setBlogPosts(data));
    // }, []);
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
        <div className="container mx-auto px-8 py-10">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
                            <Image src={post.img} alt={post.title} className="w-full h-48 object-cover" width={500} height={300}/>
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{post.title}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogIndexPage;
