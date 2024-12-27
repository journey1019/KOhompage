'use client';

import React, { useState } from 'react';
import { FilterOptions } from "@/service/hardware/hardware";

// 필터 옵션 상수
const CATEGORY_OPTIONS = ["Container-IoT", "Global-IoT", "Satellite-IoT", "AIS", "Starlink", "Tracking"];
const TYPE_OPTIONS = ["Device", "Module", "Antenna", "Sensor"]
const NETWORK_OPTIONS = [
    "Satellite(ORBCOMM)",
    "Satellite(OGx/IDP)",
    "Satellite(Starlink)",
    "Satellite(NTN)",
    "Cellular(LTE/3G/2G)",
    "Sigfox"
];
const TAG_OPTIONS = ["Tracking", "Container", "Chassis", "Dry", "Reefer", "Maritime", "Asset", "Sensor"];

interface FiltersHardwareProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
}

const FiltersHardware: React.FC<FiltersHardwareProps> = ({ filters, onFilterChange, totalResourcesCount }) => {

    // 상태 업데이트 함수
    const handleCheckboxChange = (
        type: "types" | "categories" | "networks" | "tags",
        value: string
    ) => {
        const updateValues = (currentValues: string[], newValue: string) => {
            return currentValues.includes(newValue)
                ? currentValues.filter((item) => item !== newValue)
                : [...currentValues, newValue];
        };

        const updatedFilters = { ...filters };
        if (type === "types") {
            updatedFilters.types = updateValues(filters.types || [], value);
        } else if (type === "networks") {
            updatedFilters.networks = updateValues(filters.networks || [], value);
        } else if (type === "tags") {
            updatedFilters.tags = updateValues(filters.tags || [], value);
        } else if (type === "categories") {
            updatedFilters.categories = updateValues(filters.categories || [], value);
        }

        onFilterChange(updatedFilters);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <p className="text-gray-600 mb-4">: {totalResourcesCount} hardware found</p>

            {/* Categories 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Category</h3>
                {CATEGORY_OPTIONS.map((category) => (
                    <label key={category} className="block">
                        <input
                            type="checkbox"
                            checked={filters.categories?.includes(category) || false}
                            onChange={() => handleCheckboxChange("categories", category)}
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </div>

            {/* Types 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Types</h3>
                {TYPE_OPTIONS.map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={filters.types?.includes(type) || false}
                            onChange={() => handleCheckboxChange("types", type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Network 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Network</h3>
                {NETWORK_OPTIONS.map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={filters.networks?.includes(type) || false}
                            onChange={() => handleCheckboxChange("networks", type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Tags 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Tags</h3>
                {TAG_OPTIONS.map((tag) => (
                    <label key={tag} className="block">
                        <input
                            type="checkbox"
                            checked={filters.tags?.includes(tag) || false}
                            onChange={() => handleCheckboxChange("tags", tag)}
                            className="mr-2"
                        />
                        {tag}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FiltersHardware;
