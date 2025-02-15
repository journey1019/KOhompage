import { getAllPosts } from '@/service/hardware';
import FilterableHardware from '@/components/(Hardware)/FilterableHardware';
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
    const posts = await getAllPosts();
    // @ts-ignore
    const tags = [...new Set(posts.map((post) => post.tag))]; // 중복 허용 X -> 고유한 tags
    console.log(tags)
    return(
        <FilterableHardware posts={posts} tags={tags}/>
    )
}