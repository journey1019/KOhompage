import Image from 'next/image';

type ProductProps = {
    id: number;
    name: string;
    href: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
};

export const ProductCard = ({ id, name, href, price, imageSrc, imageAlt }: ProductProps) => {
    return (
        <a key={id} href={href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    alt={imageAlt}
                    src={imageSrc}
                    width={500} // 적절한 값으로 조정하세요
                    height={500} // 적절한 값으로 조정하세요
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    unoptimized
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-400">{name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{price}</p>
        </a>
    );
};
