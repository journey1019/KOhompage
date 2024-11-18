import { getAllPosts } from '@/service/posts';
import FilterablePosts from '@/components/FilterablePosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Posts',
    description: 'Korea ORBCOMM 의 Posts'
}

export default async function PostsPage() {
    const posts = await getAllPosts();
    // @ts-ignore
    const categories = [...new Set(posts.map(post=>post.category))]; // 중복제거
    return(
        <FilterablePosts posts={posts} categories={categories} />
    )
}