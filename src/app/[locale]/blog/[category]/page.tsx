import { getPostsByCategory } from '@/service/blogUtils';
import BlogPost from '@/components/(Blog)/BlogPost';

export default function CategoryPage({ params }: { params: { locale: string; category: string } }) {
    const { locale, category } = params;
    const posts = getPostsByCategory(category);

    return (
        <div className="group mx-auto max-w-6xl sm:px-6 lg:px-8 py-12">
            <h1 className="text-5xl font-bold mb-8">{category}</h1>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.path}>
                        <BlogPost
                            title={post.title}
                            image={post.image}
                            category={category}
                            date={post.date}
                            href={`/${locale}/blog/${category}/${post.path}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}