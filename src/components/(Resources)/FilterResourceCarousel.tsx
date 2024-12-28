'use client';

import React from "react";
import { getResourcesByKeywords, ResourcesProps } from "@/service/references/resourceData";
import ResourceCard from "@/components/(Resources)/ResourceCard";
import Carousel from "@/components/Carousel";

interface FilterResourceCarouselProps {
    keywords: string[]; // Keywords to filter resources by
}

const FilterResourceCarousel: React.FC<FilterResourceCarouselProps> = ({ keywords }) => {
    const filteredResources: ResourcesProps[] = getResourcesByKeywords(keywords);

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Resources
            </h2>
            {filteredResources.length > 0 ? (
                <Carousel itemsCount={filteredResources.length}>
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.path} {...resource} />
                    ))}
                </Carousel>
            ) : (
                <p className="text-gray-500">No resources match the provided keywords.</p>
            )}
        </div>
    );
};

export default FilterResourceCarousel;
