'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BoardPostType {
    id: number;
    title: string;
    img: string;
    desc: string;
    content: string;
}

const BoardIndexPage = () => {
    const [boardPosts, setBoardPosts] = useState<BoardPostType[]>([]);

    // useEffect(() => {
    //     fetch('/data/boardPosts.json')
    //         .then((response) => response.json())
    //         .then((data) => setBoardPosts(data));
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/boardPosts.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoardPosts(data);
            } catch (error) {
                console.error('Failed to fetch board posts:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-8 py-10">
            <h1 className="text-3xl font-bold mb-6">Case Studies Contents</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {boardPosts.map((post) => (
                    <Link key={post.id} href={`/board/${post.id}`}>
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

export default BoardIndexPage;
