import { getPostsByTag } from '@/service/blogUtils';
import BlogPost from '@/components/(Blog)/BlogPost';

interface ReferencesProps {
    locale: string;
    tag: string; // 필터링할 태그
}

export default async function References({ locale, tag }: ReferencesProps) {
    const posts = await getPostsByTag(tag);

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">No posts found for tag: {tag}</h2>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-black text-4xl font-bold pb-8">References for: {tag}</h1>
            <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => {
                    const primaryCategory = post.category[0]; // 첫 번째 카테고리 사용
                    return (
                        <BlogPost
                            key={post.path}
                            title={post.title}
                            image={post.image}
                            date={post.date}
                            category={primaryCategory}
                            href={`/${locale}/blog/${primaryCategory}/${post.path}`}
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />
                    );
                })}
            </div>
        </section>
    );
}
