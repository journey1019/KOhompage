import PostGrid from '@/components/(Hardware)/PostGrid';
import { getAllPosts } from '@/service/hardware';

export default async function HardwarePage() {
    const posts = await getAllPosts();
    return(
        <section>
            <h2>Hardware Page</h2>
            <PostGrid posts={posts}/>
        </section>
    )
}