import Image from 'next/image';

interface KindItem {
    title: string;
    image: string;
}

interface KindProps {
    items: KindItem[];
}

const Kind: React.FC<KindProps> = ({ items }) => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* 이미지 */}
                            <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                                <Image
                                    alt={item.title}
                                    src={item.image}
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                    unoptimized
                                />
                            </div>
                            {/* 제목 */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Kind;
