/** 각 Hardware Slug 페이지의 Footer 에서 관련 하드웨어 리스트가 보여지도록 */
'use client';

import React from "react";
import { getHardwareByKeywords, HardwareProps } from "@/service/hardware/hardwareData";
import HardwareCard2 from '@/components/(Hardware)/HardwareCard2';
import Carousel from "@/components/Carousel";

interface FilterHardwareCarouselProps {
    keywords?: string[]; // Keywords to filter hardware by (optional)
}

const AllFilterHardwareCarousel: React.FC<FilterHardwareCarouselProps> = ({ keywords = [] }) => {
    const filteredHardware: HardwareProps[] = getHardwareByKeywords(keywords);

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Related Hardware
            </h2>
            {filteredHardware.length > 0 ? (
                <Carousel itemsCount={filteredHardware.length}>
                    {filteredHardware.map((hardware) => (
                        <HardwareCard2 key={hardware.slug} {...hardware} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">No hardwares match the provided keywords.</p>
            )}
        </div>
    );
};

export default AllFilterHardwareCarousel;
