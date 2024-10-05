'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import content from '../../../../data/blogData.json'
import Image from 'next/image';

export default function BlogDetail() {
    const router = useRouter();
    const { category, id } = router.query; // URL에서 category와 id 추출

    const [post, setPost] = useState(null);

    useEffect(() => {
        if (category && id) {
            const blogPost = content.find((post) => post.category === category && post.id === Number(id));
            setPost(blogPost);
        }
    }, [category, id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-500">{post.author} | {post.date}</p>
                <div className="my-4">
                    <Image width={500} height={300} src={post.thumbnail} alt={post.title} className="w-full h-auto rounded-lg" unoptimized/>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose max-w-none"></div>
            </div>
        </div>
    );
}
