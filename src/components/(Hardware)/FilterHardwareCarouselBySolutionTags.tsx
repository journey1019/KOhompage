/** SolutionTags 와 매칭한 Hardware List Carousel */
'use client';

import React, { useEffect, useState } from "react";
import { Hardware } from "@/types/hardware";
import { getHardwareByKeywordsInPage } from "@/service/hardware/hardwareData";
import Carousel from "@/components/Carousel";
import FilteredHardwareCard from '@/components/(Hardware)/FilteredHardwareCard';
import FilteredHardwarePDFCard from '@/components/(Hardware)/FilteredHardwarePDFCard';

interface FilterHardwareProps {
    keywords: string[]; // Keywords to filter hardware by
}

const FilterHardwareCarouselBySolutionTags: React.FC<FilterHardwareProps> = ({ keywords }) => {
    const [filteredHardware, setFilteredHardware] = useState<Hardware[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getHardwareByKeywordsInPage(keywords);
            setFilteredHardware(data);
            setLoading(false);
        }
        fetchData();
    }, [keywords]);

    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-4 sm:px-6 py-4 sm:py-8">
            {/*<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">*/}
            {/*    Filtered Hardware*/}
            {/*</h2>*/}
            {loading ? (
                <p className="text-gray-400">하드웨어를 불러오는 중...</p>
            ) : filteredHardware.length > 0 ? (
                <Carousel itemsCount={filteredHardware.length}>
                    {filteredHardware.map((hardware) => (
                        <FilteredHardwarePDFCard key={hardware.slug} {...hardware} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">조건에 맞는 하드웨어가 없습니다.</p>
            )}
            {/*{filteredHardware.length > 0 ? (*/}
            {/*    <Carousel itemsCount={filteredHardware.length}>*/}
            {/*        {filteredHardware.map((hardware) => (*/}
            {/*            <FilteredHardwarePDFCard key={hardware.slug} {...hardware} />*/}
            {/*        ))}*/}
            {/*    </Carousel>*/}
            {/*) : (*/}
            {/*    <p className="text-gray-500">No hardware matches the provided keywords.</p>*/}
            {/*)}*/}
        </div>
    );
};

export default FilterHardwareCarouselBySolutionTags;
