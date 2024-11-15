import { Hardware } from '@/service/movie';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    movie: Hardware;
}
export function HardwareCard({title, description, brochure, devkit, category, tag, featured, path}: Hardware) {
    return(
        <Link href={`/movies/${path}`} className="group">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image className="w-full bg-white" src={`/images/hardware/${path}.png`} alt={title} width={150}
                       height={100} unoptimized />
            </div>
            {tag.map(ta => (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{ta}</span>
            ))}
            <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-400">{title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white w-full truncate text-center">{description}</p>
        </Link>
    )
}