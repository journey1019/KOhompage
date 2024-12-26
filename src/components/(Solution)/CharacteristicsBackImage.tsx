import Image from 'next/image';

interface CharacteristicItem {
    icon: string; // 아이콘 이미지 경로
    title: string; // 제목 텍스트
}

interface CharacteristicsProps {
    items: CharacteristicItem[];
    gridCols?: number;
}

export default function CharacteristicsBackImage({ items, gridCols = 4 }: CharacteristicsProps) {
    return (
        <section
            className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/solutions/satellite/WorldMap.png')",
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white bg-opacity-75"></div>

            {/* Content */}
            <div className="relative grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-5 bg-opacity-0 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            className="w-20 h-20 object-contain my-4"
                            width={80}
                            height={80}
                            unoptimized
                        />
                        <h2 className="text-base font-medium text-gray-600 text-center">
                            {item.title}
                        </h2>
                        {/*<p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3">*/}
                        {/*    {item.title}*/}
                        {/*</p>*/}
                    </div>
                ))}
            </div>
        </section>
    )
}