import { getFeaturedPosts, getPostData } from '@/service/posts';
import Image from 'next/image';
import PostContent from '@/components/PostContent';
import AdjacentPostCard from '@/components/AdjacentPostCard';
import { Metadata } from 'next';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: {slug} }: Props): Promise<Metadata> {
    const { title, description } = await getPostData(slug);
    return {
        title,
        description
    }
}

export default async function PostPage({ params: {slug} }: Props) {
    const post = await getPostData(slug);
    const { title, path, next, prev }= post;

    return(
        <article className='rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4'>
            `<Image className='w-full h-1/5 max-h-[500px]' src={`/images/posts/${path}.png`} alt={title} width={760} height={420} unoptimized/>`
            {/*<PostContent post={post} />*/}
            <section className='flex shadow-md'>
                {prev && <AdjacentPostCard post={prev} type='prev' />}
                {next && <AdjacentPostCard post={next} type='next' />}
            </section>
        </article>
    )
}

// 모든걸 SSR(ServerSideRendering) 으로 client 에서 만드는 게 아니라,
// 원하는 slug 에 한해서 미리 만들어두고 싶음
export async function generateStaticParams() {
    const posts = await getFeaturedPosts();
    return posts.map((post) => ({
        slug: post.path,
    }))
}