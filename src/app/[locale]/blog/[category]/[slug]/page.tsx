import Image from 'next/image';
import { getPostBySlug } from '@/service/blogUtils';
import { notFound } from 'next/navigation';

type PostPageProps = {
    params: { locale: string; category: string; slug: string };
};

export default async function PostPage({ params }: { params: { locale: string; category: string; slug: string } }) {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-16 bg-white antialiased">
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