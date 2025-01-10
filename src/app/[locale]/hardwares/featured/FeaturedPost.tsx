import PostGrid from '@/components/(Hardware)/PostGrid';
import { getFeaturedPosts } from '@/service/hardware';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: {
        default: 'HARDWARE',
        template: 'KOREA ORBCOMM | %s'
    },
    description: 'KOREA ORBCOMM의 하드웨어',
    icons: {
        icon: '/favicon.ico',
    }
}

export default async function HardwarePage() {
    const posts = await getFeaturedPosts();
    return(
        <section>
            <h2>Hardware Page</h2>
            <PostGrid posts={posts}/>
        </section>
    )
}