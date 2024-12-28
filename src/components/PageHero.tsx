import React from 'react';

interface ImageTopPageProps {
    size: string;
    url: string;
    intro: string;
    title: string;
    subtitle: string;
    solutionButton?: string;
    solutionUrl?: string;
    textPosition?: 'left' | 'center' | 'right'; // 텍스트 위치 조정 가능
    opacity?: number;
}


export default function PageHero({size, url, intro, title, subtitle, solutionButton, solutionUrl, textPosition = 'left', opacity = 30}: ImageTopPageProps) {
    const getTextPositionClass = () => {
        switch(textPosition) {
            case 'center':
                return 'items-center text-center';
            case 'right':
                return 'items-end text-right';
            default:
                return 'items-start text-left'
        }
    }

    return (
        <>
            {/* md 해상도 이전 (모바일 및 작은 해상도) */}
            <section className={`relative flex py-36 md:${size}`}>
                {/* 고정된 배경 이미지 */}
                <div className="absolute inset-0 bg-fixed bg-cover bg-center">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${url})`,
                        }}
                    />
                    {/* 어두운 오버레이 */}
                    <div
                        className="absolute inset-0 bg-black"
                        style={{
                            backgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
                        }}
                    />
                </div>

                {/* 안쪽 콘텐츠 */}
                <main
                    className="relative flex flex-col justify-center items-start text-white z-10 p-5 text-center md:text-start md:ml-16 lg:ml-32">
                    <h1 className="text-lg font-bold mb-5">{intro}</h1>
                    <h1 className="text-5xl md:text-6xl font-bold mb-5">{title}</h1>
                    <p className="text-base mb-5">{subtitle}</p>
                    {solutionUrl && (
                        <a
                            href={solutionUrl}
                            target="_blank"
                            rel="noopener"
                            className="py-3 text-lg font-medium items-start text-start text-white bg-red-700 border-2 border-red-700 rounded-md px-7 lg:px-10 hover:bg-red-800 hover:text-white hover:border-2 hover:border-red-700"
                        >
                            {solutionButton}
                        </a>
                    )}
                </main>
            </section>
        </>
    );
}