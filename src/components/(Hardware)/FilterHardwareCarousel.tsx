'use client';

import React from "react";
import { getHardwareByKeywords, HardwareProps } from "@/service/hardware/hardware";
import HardwareCard2 from '@/components/(Hardware)/HardwareCard2';
import Carousel from "@/components/Carousel";
import FilteredHardwareCard from '@/components/(Hardware)/FilteredHardwareCard';

interface FilterHardwareCarouselProps {
    keywords: string[]; // Keywords to filter hardware by
}

const FilterHardwareCarousel: React.FC<FilterHardwareCarouselProps> = ({ keywords }) => {
    const filteredHardware: HardwareProps[] = getHardwareByKeywords(keywords);

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Hardware
            </h2>
            {filteredHardware.length > 0 ? (
                <Carousel itemsCount={filteredHardware.length}>
                    {filteredHardware.map((hardware) => (
                        <FilteredHardwareCard key={hardware.slug} {...hardware} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">No hardwares match the provided keywords.</p>
            )}
        </div>
    );
};

export default FilterHardwareCarousel;
