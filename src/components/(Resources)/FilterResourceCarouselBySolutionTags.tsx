'use client';

import React from "react";
import { getResourceByKeywordsInPage, ResourcesProps } from '@/service/resources/resourceData';
import ResourceCard from "@/components/(Resources)/ResourceCard";
import Carousel from "@/components/Carousel";

interface FilterReferenceCarouselProps {
    keywords: string[]; // Keywords to filter resources by
}

const FilterResourceCarouselBySolutionTags: React.FC<FilterReferenceCarouselProps> = ({ keywords }) => {
    const filteredResource: ResourcesProps[] = getResourceByKeywordsInPage(keywords);

    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-4 sm:px-6 py-4 sm:py-8">
            {/*<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">*/}
            {/*    Filtered Resource*/}
            {/*</h2>*/}
            {filteredResource.length > 0 ? (
                <Carousel itemsCount={filteredResource.length}>
                    {filteredResource.map((resource) => (
                        <ResourceCard key={resource.path} {...resource} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">No resource matches the provided keywords.</p>
            )}
        </div>
    );
};

export default FilterResourceCarouselBySolutionTags;
