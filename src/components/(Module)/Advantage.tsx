import React from "react";
import Image from 'next/image';

interface AdvantageItem {
    imageUrl: string;
    advantage: string;
    description: string;
}
interface AdvantageProps {
    items: AdvantageItem[];
}

const Strength: React.FC<AdvantageProps> = ({ items }) => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:pt-0 sm:pb-24 lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {items.map((item, index) => (
                        <div key={index} className="group relative">
                            <div className="flex-shrink-0 w-20 h-20 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                <Image
                                    src={item.imageUrl}
                                    alt="Example"
                                    width={50}
                                    height={50}
                                    className="object-contain w-full h-full bg-white"
                                    unoptimized
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-700 font-semibold dark:text-gray-200">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {item.advantage}
                                    </h3>
                                    <p className="mt-3 text-sm text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Strength;