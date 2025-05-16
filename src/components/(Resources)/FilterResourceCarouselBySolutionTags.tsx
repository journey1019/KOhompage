'use client';

import React, { useState, useEffect } from "react";
import { Resource } from '@/types/resource';
import { getResourceByKeywordsInPage } from '@/service/resources/resourceData';
import ResourceCard from "@/components/(Resources)/ResourceCard";
import Carousel from "@/components/Carousel";

interface FilterReferenceCarouselProps {
    keywords: string[]; // Keywords to filter resources by
}

const FilterResourceCarouselBySolutionTags: React.FC<FilterReferenceCarouselProps> = ({ keywords }) => {
    const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFiltered = async () => {
            setLoading(true);
            const result = await getResourceByKeywordsInPage(keywords);
            setFilteredResources(result);
            setLoading(false);
        };

        fetchFiltered();
    }, [keywords]);

    if (loading) {
        return <p className="text-gray-400">로딩 중...</p>;
    }
    console.log(filteredResources)
    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-4 sm:px-6 py-4 sm:py-8">
            {/*<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">*/}
            {/*    Filtered Resource*/}
            {/*</h2>*/}
            {filteredResources.length > 0 ? (
                <Carousel itemsCount={filteredResources.length}>
                    {filteredResources.map((resource) => (
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
