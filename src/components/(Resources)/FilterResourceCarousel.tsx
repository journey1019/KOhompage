'use client';

import React from "react";
import { getResourcesByKeywords, ResourcesProps } from "@/service/references/referencesData";
import ResourceCard from "@/components/(Resources)/ResourceCard";
import Carousel from "@/components/Carousel";

interface FilterReferenceCarouselProps {
    keywords: string[]; // Keywords to filter resources by
}

const FilterReferenceCarousel: React.FC<FilterReferenceCarouselProps> = ({ keywords }) => {
    const filteredResources: ResourcesProps[] = getResourcesByKeywords(keywords);

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                References Matching Keywords
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

export default FilterReferenceCarousel;
