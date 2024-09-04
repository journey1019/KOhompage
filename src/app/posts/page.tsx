import { getAllPosts } from '@/service/posts';
import FilterablePosts from '@/components/FilterablePosts';

export default async function PostsPage() {
    const posts = await getAllPosts();
    // @ts-ignore
    const categories = [...new Set(posts.map(post=>post.category))]; // 중복제거
    return(
        <FilterablePosts posts={posts} categories={categories} />
    )
}