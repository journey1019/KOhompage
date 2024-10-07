import { Post } from '@/service/hardware';
import Link from 'next/link';
import Image from 'next/image';

type Props = { post: Post }

export default function PostCard({post: {title, description, brochure, devkit, category, tag, path, featured}}: Props) {
    return(
        <Link href={`/hardware/${path}`}>
            <article className="rounded-md overflow-hidden shadow-lg">
                <Image src={`/images/hardware/${path}.png`} className="w-full py-12 px-2"
                       alt={title} width={300} height={200} unoptimized
                />
                <div className="flex flex-col items-start p-4">
                    <span className="self-end">{category}</span>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="w-full truncate text-start">{description}</p>
                    {tag.map(ta => (
                        <div key={ta} className="flex flex-row text-sm rounded-lg bg-red-100 px-2 my-2">
                            {ta}
                        </div>
                        // <div key={ta} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        //     {ta}
                        // </div>
                    ))}
                </div>
            </article>
        </Link>
    )
}