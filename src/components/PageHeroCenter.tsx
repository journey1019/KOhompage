import React from 'react';

interface ImageTopPageProps {
    size: string;
    url: string;
    intro: string;
    title: string;
    subtitle: string;
    thirdtitle: string;
}

export default function PageHeroCenter({ size, url, intro, title, subtitle, thirdtitle }: ImageTopPageProps) {
    return (
        <section className={`relative flex items-center justify-center py-36 md:${size}`}>
            {/* 고정된 배경 이미지 */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: `url(${url})`,
                }}
            />

            {/* 안쪽 콘텐츠 */}
            <main className="relative flex flex-col text-center md:text-center text-white z-10 px-5">
                <h1 className="text-lg font-bold mb-3">{intro}</h1>
                <h2 className="text-4xl md:text-5xl font-bold mb-3 pb-2">{title}</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-3 pb-2">{subtitle}</h3>
                <h4 className="text-4xl md:text-5xl font-bold pb-2">{thirdtitle}</h4>
            </main>
        </section>
    );
}
