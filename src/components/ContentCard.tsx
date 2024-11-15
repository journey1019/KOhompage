'use client';

import Image from 'next/image';

interface ContentCardPropsType {
    index: number;
    title: string;
    desc: string;
    img: string;
    url: string;
}

export default function ContentCard({ index, title, desc, img, url }: ContentCardPropsType) {
    return (
        <a href={`/board/${url}`} className="block">
            <div className="relative min-h-[30rem] rounded-xl overflow-hidden grid items-end cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                <Image
                    src={img} alt={title}
                    width={500} height={300} unoptimized
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative p-6 flex flex-col justify-end">
                    {/*<p className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 uppercase">{category}</p>*/}
                    <h3 className="text-3xl font-bold text-white">{title}</h3>
                    <p className="my-2 text-white font-normal">{desc}</p>
                </div>
            </div>
        </a>
    );
}
