import Image from 'next/image';

interface BlogPostProps {
    title: string;
    image: string;
    category: string;
    date: string;
    href: string;
    dangerouslySetInnerHTML: { __html: string };
}

export default function BlogPost({ title, image, category, date, href, dangerouslySetInnerHTML }: BlogPostProps) {
    return (
        <div className="group w-full border border-gray-300 rounded-2xl">
            <a href={href} className="block">
                <div className="flex items-center">
                    <Image
                        src={image}
                        alt={title}
                        className="rounded-t-2xl w-full object-cover"
                        width={500}
                        height={300}
                        unoptimized
                    />
                </div>
                <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                    <span className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">
                        {category}
                    </span>
                    <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5">
                        {title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{date}</p>
                    <div dangerouslySetInnerHTML={dangerouslySetInnerHTML}/>
                    <span className="cursor-pointer text-lg text-indigo-600 font-semibold">
                        Read more...
                    </span>
                </div>
            </a>
        </div>
    );
}
