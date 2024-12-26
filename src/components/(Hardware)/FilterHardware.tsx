'use client';

import React, { useState } from 'react';
import { FilterOptions } from "@/service/hardware/hardware";

// 필터 옵션 상수
const TYPE_OPTIONS = ["Device", "Modem", "Antenna", "Sensor"]
const CATEGORY_OPTIONS = ["Container-IoT", "Global-IoT", "Satellite", "AIS"];
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
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
}

const FiltersHardware: React.FC<FiltersHardwareProps> = ({ onFilterChange, totalResourcesCount }) => {
    const [types, setTypes] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [networks, setNetworks] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    // 상태 업데이트 함수
    const handleCheckboxChange = (
        type: "types" | "category" | "networks" | "tags",
        value: string
    ) => {
        const updateValues = (currentValues: string[], newValue: string) => {
            return currentValues.includes(newValue)
                ? currentValues.filter((item) => item !== newValue)
                : [...currentValues, newValue];
        };

        // 필터 업데이트
        if (type === "types") {
            const updatedTypes = updateValues(types, value);
            setTypes(updatedTypes);
            onFilterChange({ types: updatedTypes, networks, tags});
        } else if (type === "networks") {
            const updatedNetworks = updateValues(networks, value);
            setNetworks(updatedNetworks);
            onFilterChange({ types, networks: updatedNetworks, tags });
        } else if (type === "tags") {
            const updatedTags = updateValues(tags, value);
            setTags(updatedTags);
            onFilterChange({ types, networks, tags: updatedTags });
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <p className="text-gray-600 mb-4">: {totalResourcesCount} hardware found</p>

            {/* Types 필터 */}
            <div className="mb-4">
                <h3 className="font-semibold">Types</h3>
                {TYPE_OPTIONS.map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={types.includes(type)}
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
                            checked={networks.includes(type)}
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
                            checked={tags.includes(tag)}
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
