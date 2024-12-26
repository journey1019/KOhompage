'use client';

import React from "react";
import { getResourcesByKeywords, ResourcesProps } from "@/service/references/referencesData";
import ResourceCard from "@/components/(Resources)/ResourceCard";

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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.path} {...resource} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No resources match the provided keywords.</p>
            )}
        </div>
    );
};

export default FilterReferenceCarousel;
