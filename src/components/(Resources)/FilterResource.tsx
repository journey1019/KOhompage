'use client';

import React from 'react';
import { FilterOptions } from "@/service/resources/resourceData";

interface FiltersResourcesProps {
    filters: FilterOptions,
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
}

const FilterResource: React.FC<FiltersResourcesProps> = ({ filters, onFilterChange, totalResourcesCount }) => {
    const handleCheckboxChange = (
        category: "contentType" | "form" | "solutions",
        value: string
    ) => {
        const updateValues = (currentValues: string[] = [], newValue: string) => {
            return currentValues.includes(newValue)
                ? currentValues.filter((item) => item !== newValue)
                : [...currentValues, newValue];
        };

        const updatedFilters: FilterOptions = { ...filters };

        // 필터 항목 업데이트
        if (category === "contentType") {
            updatedFilters.contentType = updateValues(filters.contentType, value);
        } else if (category === "form") {
            updatedFilters.form = updateValues(filters.form, value);
        } else if (category === "solutions") {
            updatedFilters.solutions = updateValues(filters.solutions, value);
        }

        onFilterChange(updatedFilters); // 상위 컴포넌트로 업데이트된 필터 전달
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <p className="text-gray-600 mb-4">{totalResourcesCount} resources found</p>

            {/* Content Type 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Content Type</h3>
                {["Article", "Brochure", "Datasheet", "Video"].map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={filters.contentType?.includes(type) || false}
                            onChange={() => handleCheckboxChange("contentType", type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Form 필터 */}
            {/*<div className="mb-4">*/}
            {/*    <h3 className="font-semibold">Form</h3>*/}
            {/*    {["link", "pdf", "page"].map((type) => (*/}
            {/*        <label key={type} className="block">*/}
            {/*            <input*/}
            {/*                type="checkbox"*/}
            {/*                checked={filters.form?.includes(type) || false}*/}
            {/*                onChange={() => handleCheckboxChange("form", type)}*/}
            {/*                className="mr-2"*/}
            {/*            />*/}
            {/*            {type}*/}
            {/*        </label>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Solutions 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Solutions</h3>
                {["Container-IoT", "Global-IoT", "Satellite", "AIS"].map((solution) => (
                    <label key={solution} className="block">
                        <input
                            type="checkbox"
                            checked={filters.solutions?.includes(solution) || false}
                            onChange={() => handleCheckboxChange("solutions", solution)}
                            className="mr-2"
                        />
                        {solution}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterResource;
