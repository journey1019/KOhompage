import { getPostsByCategory } from '@/service/blogUtils';
import BlogPost from '@/components/(Blog)/BlogPost';

export default async function CategoryPage({ params }: { params: { locale: string; category: string } }) {
    const posts = await getPostsByCategory(params.category);

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">No posts found in this category.</h2>
            </div>
        );
    }

    return (
        <div className="group mx-auto max-w-6xl sm:px-6 lg:px-8 py-12">
            <h1 className="text-5xl font-bold mb-8">{params.category}</h1>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.path}>
                        <BlogPost
                            title={post.title}
                            image={post.image}
                            category={params.category}
                            date={post.date}
                            href={`/${params.locale}/blog/${params.category}/${post.path}`}
                            dangerouslySetInnerHTML={{ __html: post.content || '' }} // HTML 렌더링
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
