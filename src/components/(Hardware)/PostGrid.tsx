import { Post } from '@/service/hardware';

type Props = { posts: Post[] };

export default function PostGrid({posts}: Props) {
    return(
        <ul>
            {posts.map((post) => <li key={post.path}>{post.title}</li>)}
        </ul>
    )
}