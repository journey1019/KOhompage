import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// JSON 파일 경로
const BLOG_JSON_PATH = path.join(process.cwd(), 'data/blog.json');
// Markdown 파일 경로
const BLOG_CONTENT_PATH = path.join(process.cwd(), 'data/blog');

interface BlogPost {
    index: number;
    title: string;
    image: string;
    date: string;
    category: string[];
    tags: string[];
    path: string;
    featured: boolean;
    content?: string; // Markdown 콘텐츠 추가
}

// JSON 데이터를 로드
export function getBlogMetadata(): BlogPost[] {
    const fileContent = fs.readFileSync(BLOG_JSON_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

// Markdown 파일에서 콘텐츠 로드
export function getBlogContent(slug: string): string | null {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(fileContent); // Markdown 파싱
    return content;
}

// 특정 카테고리의 글 목록 가져오기
export function getPostsByCategory(category: string): BlogPost[] {
    const posts = getBlogMetadata();
    return posts.filter((post) => post.category.includes(category));
}

// 슬러그를 기반으로 글 정보와 콘텐츠 가져오기
export function getPostBySlug(slug: string): BlogPost | null {
    const posts = getBlogMetadata();
    const post = posts.find((p) => p.path === slug);
    if (!post) return null;

    const content = getBlogContent(slug);
    return { ...post, content };
}
