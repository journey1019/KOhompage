'use client';

import React from 'react';
import { FilterOptions } from "@/service/hardware/hardwareData";

// 필터 옵션 상수
const CATEGORY_OPTIONS = ["Container-IoT", "Global-IoT", "Satellite-IoT", "AIS", "Starlink", "Tracking"];
const TYPE_OPTIONS = ["Device", "Module", "Antenna", "Sensor"];
const NETWORK_OPTIONS = [
    "Satellite(ORBCOMM)",
    "Satellite(OGx/IDP)",
    "Satellite(Starlink)",
    "Satellite(NTN)",
    "Cellular(LTE/3G/2G)",
    "Sigfox",
];

interface FiltersHardwareProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
}

const FiltersHardware: React.FC<FiltersHardwareProps> = ({ filters, onFilterChange, totalResourcesCount }) => {
    const handleCheckboxChange = (type: keyof FilterOptions, value: string) => {
        const updatedFilters = { ...filters };
        const currentValues = filters[type] || [];
        updatedFilters[type] = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];
        onFilterChange(updatedFilters);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <p className="text-gray-600 mb-4">{totalResourcesCount} hardware found</p>

            {/* Categories 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Category</h3>
                {CATEGORY_OPTIONS.map((category) => (
                    <label key={category} className="block">
                        <input
                            type="checkbox"
                            checked={filters.categories?.includes(category) || false}
                            onChange={() => handleCheckboxChange('categories', category)}
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </div>

            {/* Types 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Type</h3>
                {TYPE_OPTIONS.map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={filters.types?.includes(type) || false}
                            onChange={() => handleCheckboxChange('types', type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Networks 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Network</h3>
                {NETWORK_OPTIONS.map((network) => (
                    <label key={network} className="block">
                        <input
                            type="checkbox"
                            checked={filters.networks?.includes(network) || false}
                            onChange={() => handleCheckboxChange('networks', network)}
                            className="mr-2"
                        />
                        {network}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FiltersHardware;
