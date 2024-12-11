import { getPostsByTag } from '@/service/blogUtils';
import BlogPost from '@/components/(Blog)/BlogPost';

interface ReferencesProps {
    locale: string; // 사용 중인 로케일
    tag: string; // 필터링할 태그
}

export default async function References({ locale, tag }: ReferencesProps) {
    const posts = await getPostsByTag(tag); // 태그를 기반으로 BlogPost 데이터 가져오기

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">No posts found for tag: {tag}</h2>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-black text-4xl font-bold pb-8">References for Tag: {tag}</h1>
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

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { getPostsByTag } from '@/service/blogUtils';
// import BlogPost from '@/components/(Blog)/BlogPost';
//
// interface ReferencesProps {
//     locale: string; // 사용 중인 로케일
//     tag: string; // 필터링할 태그
// }
//
// interface BlogPost {
//     path: string;
//     title: string;
//     image: string;
//     date: string;
//     category: string[];
//     content?: string;
// }
//
// export const References: React.FC<ReferencesProps> = ({ locale, tag }) => {
//     const [posts, setPosts] = useState<BlogPost[]>([]); // 게시물 상태 (초기값: 빈 배열)
//     const [loading, setLoading] = useState(true); // 로딩 상태
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const data = await getPostsByTag(tag); // 비동기 데이터 로드
//                 setPosts(data || []); // 데이터 설정 (빈 데이터 처리)
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             } finally {
//                 setLoading(false); // 로딩 완료
//             }
//         };
//
//         fetchPosts();
//     }, [tag]); // 태그가 변경될 때마다 데이터 로드
//
//     if (loading) {
//         return (
//             <div className="text-center py-12">
//                 <h2 className="text-2xl font-bold">Loading...</h2>
//             </div>
//         );
//     }
//
//     if (!posts || posts.length === 0) {
//         return (
//             <div className="text-center py-12">
//                 <h2 className="text-2xl font-bold">No posts found for tag: {tag}</h2>
//             </div>
//         );
//     }
//
//     return (
//         <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
//             <h1 className="text-black text-4xl font-bold pb-8">References for Tag: {tag}</h1>
//             <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
//                 {posts.map((post) => {
//                     const primaryCategory = post.category[0]; // 첫 번째 카테고리 사용
//                     return (
//                         <BlogPost
//                             key={post.path}
//                             title={post.title}
//                             image={post.image}
//                             date={post.date}
//                             category={primaryCategory}
//                             href={`/${locale}/blog/${primaryCategory}/${post.path}`}
//                             dangerouslySetInnerHTML={{ __html: post.content || '' }}
//                         />
//                     );
//                 })}
//             </div>
//         </section>
//     );
// };
