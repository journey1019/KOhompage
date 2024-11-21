import Image from 'next/image';
import { getPostBySlug } from '@/service/blogUtils';
import { notFound } from 'next/navigation';

export default function PostPage({
                                     params,
                                 }: {
    params: { category: string; slug: string };
}) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound(); // 글이 없으면 404 페이지 처리
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
                unoptimized
            />
            <p>{post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
    );
}
