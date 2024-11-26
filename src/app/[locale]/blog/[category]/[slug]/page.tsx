import Image from 'next/image';
import { getPostBySlug } from '@/service/blogUtils';
import { notFound } from 'next/navigation';

type PostPageProps = {
    params: { category: string; slug: string };
}
export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound(); // 글이 없으면 404 페이지 처리
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-lg"
                unoptimized
            />
            <p className="text-sm text-gray-500 mb-4">{post.date}</p>
            <div className="prose dark:prose-dark" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
    );
}
