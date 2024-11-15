import Image from 'next/image';

interface ImageCardProps {
    src: string;
    alt: string;
    title: string;
    description: string;
}

const ImageCard = ({ src, alt, title, description }: ImageCardProps) => (
    <div className="flex flex-col relative transform transition-all duration-300 ease-out border-2 border-transparent border-gray-200 rounded-lg px-2">
        <Image
            src={src}
            alt={alt}
            className="rounded-xl w-auto h-[300px]" // 고정된 높이
            width={300}
            height={500}
            unoptimized
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white py-5">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
    </div>
);

export default ImageCard;