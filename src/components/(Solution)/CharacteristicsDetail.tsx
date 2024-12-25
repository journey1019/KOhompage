import Image from 'next/image';

interface CharacteristicItem {
    icon: string; // 아이콘 이미지 경로
    title: string; // 제목 텍스트
    subtitle: string // 설명
}

interface CharacteristicsProps {
    items: CharacteristicItem[];
    gridCols?: number;
}

export default function Characteristics({ items, gridCols = 4 }: CharacteristicsProps) {
    return(
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
            <div className={`grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-${gridCols} max-w-7xl mx-auto px-6`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-5 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                        <Image
                            src={item.icon}
                            alt="Advantage Icon"
                            className="w-20 h-20 object-contain my-4"
                            width={80}
                            height={80}
                            unoptimized
                        />
                        <h2 className="text-lg text-gray-600 text-center font-semibold">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3">
                            {item.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}