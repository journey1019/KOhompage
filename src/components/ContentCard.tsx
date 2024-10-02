'use client';

interface ContentCardPropsType {
    img: string;
    title: string;
    desc: string;
    index: number;
}

export default function ContentCard({ img, title, desc, index }: ContentCardPropsType) {

    return (
        <a href={`/blog/blog_${index}`} className="block">
            <div className="relative min-h-[30rem] rounded-xl overflow-hidden grid items-end cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500">
                <img
                    src={img}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white">{title}</h3>
                    <p className="my-2 text-white font-normal">{desc}</p>
                </div>
            </div>
        </a>
    );
}
