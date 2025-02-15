import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PageHero from '@/components/PageHero';
import Advantage from '@/components/(Hard)/Advantage';
import TagFilterBlog from '@/components/(Resources)/TagFilterBlog';

interface PageProps {
    params: { locale: string; slug: string };
}

export default function HardwareDetail({ params }: PageProps) {
    const { slug } = params;

    // Markdown 파일 경로 설정
    const markdownPath = path.join(process.cwd(), 'data', 'hardware', `${slug}.md`);
    const fileContent = fs.readFileSync(markdownPath, 'utf-8');
    const { content, data } = matter(fileContent);

    // 데이터 유효성 검증
    if (!content) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Markdown Not Found</h2>
                <p>Could not find the requested content.</p>
            </div>
        );
    }

    return (
        <section className="bg-white">
            <PageHero
                size="py-36"
                url="/images/header/Cargo.jpg"
                intro=""
                title={slug.toUpperCase()}
                subtitle="Simple, Low-Cost, Reliable"
                opacity={50}
            />
            {/*<div className="mx-auto max-w-7xl px-6 py-16">*/}
            {/*    /!*<h1 className="text-3xl font-bold mb-6">{data.title || slug}</h1>*!/*/}
            {/*    <ReactMarkdown*/}
            {/*        remarkPlugins={[remarkGfm]} // 타입 캐스팅*/}
            {/*        rehypePlugins={[rehypeRaw]}*/}
            {/*        className="prose prose-lg max-w-none"*/}
            {/*    >*/}
            {/*        {content}*/}
            {/*    </ReactMarkdown>*/}
            {/*</div>*/}
            <Advantage />
            {/*<CaseStudies/>*/}
            {/*<Resources />*/}
            {/*<BlogSlider />*/}
            <div className="p-6 mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold mb-4">Filter by {slug}</h1>
                <TagFilterBlog initialTags={[`${slug}`]} />
            </div>
        </section>
);
}
