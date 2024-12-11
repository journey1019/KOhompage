// import BlogCard from '@/components/(Blog)/BlogCard';
// import BlogHome from '@/components/(Blog)/BlogHome';
// import BlogRecent from '@/components/(Blog)/BlogRecent';
// import KOBlog from '@/components/(Blog)/KOBlog';
//
// export default function BlogPage() {
//     return (
//         <section className="bg-white dark:bg-gray-900">
//             <BlogHome/>
//             <BlogCard/>
//             <BlogRecent/>
//             <KOBlog/>
//         </section>
//     )
// }
import { getBlogMetadata } from '@/service/blogUtils';
import BlogPost from '@/components/(Blog)/BlogPost';
import Link from 'next/link';

function formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
    const { locale } = params; // 비동기 작업 후 안전하게 할당
    const posts = await getBlogMetadata();

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">No blog posts available.</h2>
            </div>
        );
    }

    const categories = [...new Set(posts.flatMap((post) => post.category))];

    return (
        <section>
            <div className="group mx-auto max-w-6xl sm:px-6 lg:px-8 py-12">
                <h1 className="text-black text-5xl items-start font-bold pt-5 py-12">블로그 홈</h1>

                {categories.map((category) => (
                    <div key={category} className="pt-10 py-28">
                        <div className="mb-8 flex justify-between">
                            <h2 className="font-semibold text-5xl">{formatCategoryName(category)}</h2>
                            <Link
                                className="py-3 px-5 rounded-full border-2 border-red-700 text-red-700 bg-white hover:bg-gray-200"
                                href={`/${locale}/blog/${category}`} // params.locale을 안전하게 사용
                            >
                                더보기
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
                            {posts
                                .filter((post) => post.category.includes(category))
                                .map((post) => (
                                    <BlogPost
                                        key={post.path}
                                        title={post.title}
                                        image={post.image}
                                        category={category}
                                        date={post.date}
                                        href={`/${locale}/blog/${category}/${post.path}`} // locale 사용
                                        dangerouslySetInnerHTML={{ __html: post.content || '' }} // HTML 렌더링
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}