import { readFile } from 'fs/promises';
import path from 'path';

export type Post = {
    title: string;
    description: string;
    brochure: string;
    devkit: string;
    category: string;
    tag: string[];
    path: string;
    featured: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
    const filePath = path.join(process.cwd(), 'data', 'hardwarePosts.json');
    return readFile(filePath, 'utf-8')
        .then<Post[]>(data => JSON.parse(data)) // .then(JSON.parse)
}