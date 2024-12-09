import Image from 'next/image';

type BlogCardProps = {
    title: string;
    description: string;
    imageUrl: string;
};

export default function BlogCard({ title, description, imageUrl }: BlogCardProps) {
    return (
        <div className="group bg-white shadow-lg rounded-2xl overflow-hidden">
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={500}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
            />
            <div className="p-6">
                <h3 className="text-xl text-gray-900 font-medium leading-8 mb-4 group-hover:text-indigo-600">{title}</h3>
                <p className="text-gray-500 mb-4">{description}</p>
                <a href="#" className="text-indigo-600 font-medium hover:underline">
                    Read more
                </a>
            </div>
        </div>
    );
}
