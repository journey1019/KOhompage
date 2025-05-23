// 비즈니스 로직을 담당
import path from 'path';
import {readFile} from 'fs/promises';
import {cache} from 'react';

export type Post = {
    title: string;
    description: string;
    date: Date;
    category: string;
    path: string;
    featured: boolean;
}

export type PostData = Post & {
    content: string;
    next: Post | null;
    prev: Post | null;
};

export async function getFeaturedPosts():Promise<Post[]> {
    return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts():Promise<Post[]> {
    return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

// DB에 접근하거나 file을 읽는 함수는 여러번 호출하면 중복방지가 안돼서, 중복을 방지해줄 수 있도록
export const getAllPosts = cache(async () => {
    // console.log('getAllPosts');
    const filePath = path.join(process.cwd(), 'data', 'posts.json');
    return readFile(filePath, 'utf-8')
        .then<Post[]>(JSON.parse)
        .then(posts => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
})

export async function getPostData(fileName: string): Promise<PostData> {
    const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
    const posts = await getAllPosts();
    const post = posts.find((post) => post.path === fileName);
    if(!post) throw new Error(`${fileName}에 해당하는 포스트 찾을 수 없음`);

    const index = posts.indexOf(post);
    const next = index > 0 ? posts[index - 1] : null;
    const prev = index < posts.length ? posts[index + 1] : null;
    const content = await readFile(filePath, 'utf-8');

    return {...post, content, next, prev };
}