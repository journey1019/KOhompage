/** SolutionTags 와 매칭한 Hardware List Carousel */
'use client';

import React from "react";
import { getHardwareByKeywordsInPage, HardwareProps } from "@/service/hardware/hardwareData";
import Carousel from "@/components/Carousel";
import FilteredHardwareCard from '@/components/(Hardware)/FilteredHardwareCard';

interface FilterHardwareProps {
    keywords: string[]; // Keywords to filter hardware by
}

const FilterHardwareCarouselBySolutionTags: React.FC<FilterHardwareProps> = ({ keywords }) => {
    const filteredHardware: HardwareProps[] = getHardwareByKeywordsInPage(keywords);

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Filtered Hardware
            </h2>
            {filteredHardware.length > 0 ? (
                <Carousel itemsCount={filteredHardware.length}>
                    {filteredHardware.map((hardware) => (
                        <FilteredHardwareCard key={hardware.slug} {...hardware} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">No hardware matches the provided keywords.</p>
            )}
        </div>
    );
};

export default FilterHardwareCarouselBySolutionTags;