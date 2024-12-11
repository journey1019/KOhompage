import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// JSON 파일 경로
const BLOG_JSON_PATH = path.join(process.cwd(), 'data/blog.json');
// Markdown 파일 경로
const BLOG_CONTENT_PATH = path.join(process.cwd(), 'data/blog');

interface BlogPost {
    index: number;
    title: string;
    image: string;
    date: string;
    kind: string;
    category: string[];
    tags: string[];
    path: string;
    featured: boolean;
    content?: string | null; // Markdown 콘텐츠 추가
}

// JSON 데이터를 로드
export async function getBlogMetadata(): Promise<BlogPost[]> {
    const fileContent = await fs.readFile(BLOG_JSON_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

// Markdown 파일에서 콘텐츠 로드 및 HTML 변환
export async function getBlogContent(slug: string): Promise<string | null> {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { content } = matter(fileContent); // Markdown 파일 파싱
        const processedContent = await remark().use(html).process(content); // Markdown을 HTML로 변환
        return processedContent.toString();
    } catch (error) {
        console.error(`Error loading markdown content for slug "${slug}":`, error);
        return null;
    }
}

// 특정 카테고리의 글 목록 가져오기
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await getBlogMetadata();
    return posts.filter((post) => post.category.includes(category));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getBlogMetadata();
    const post = posts.find((p) => p.path === slug);
    if (!post) return null;

    const content = await getBlogContent(slug); // Markdown HTML로 변환
    return { ...post, content };
}

// 특정 태그의 글 목록 가져오기
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await getBlogMetadata();
    return posts.filter((post) => post.tags.includes(tag));
}


// 슬러그를 기반으로 글 정보와 콘텐츠 가져오기
// export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
//     const posts = await getBlogMetadata();
//     const post = posts.find((p) => p.path === slug);
//     if (!post) return null;
//
//     // Markdown 파일 경로
//     const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
//     if (!fs.existsSync(filePath)) return null;
//
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const { content } = matter(fileContent); // Markdown 파싱
//
//     return { ...post, content };
// }