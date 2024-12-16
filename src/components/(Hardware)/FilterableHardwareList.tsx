'use client';

import React, { useState, useEffect } from 'react';
import HardwareList from '@/components/HardwareList';
import hardwareData from '../../../data/hardware.json';

interface FilterableHardwareListProps {
    chips: string[]; // Chips 배열을 props로 전달받음
}

const FilterableHardwareList: React.FC<FilterableHardwareListProps> = ({ chips }) => {
    const [filteredItems, setFilteredItems] = useState(hardwareData);

    useEffect(() => {
        const filterHardware = (chips: string[]) => {
            if (chips.length === 0) {
                setFilteredItems(hardwareData); // Chips가 없으면 전체 리스트 반환
                return;
            }

            const filtered = hardwareData.filter((item) => {
                const { title, subTitle, description, tag, slug } = item;
                const content = [title, subTitle, description, ...tag, slug]
                    .join(' ') // 모든 내용을 하나로 합침
                    .toLowerCase(); // 소문자로 변환
                return chips.some((chip) => content.includes(chip.toLowerCase())); // 하나라도 포함하면 true
            });

            setFilteredItems(filtered);
        };

        filterHardware(chips); // Chips가 변경될 때 필터링 수행
    }, [chips]);

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4">
                <h1 className="text-3xl font-bold mb-4">Hardware List</h1>

                {/* 필터링된 HardwareList */}
                <HardwareList items={filteredItems} />
            </div>
        </div>
    );
};

export default FilterableHardwareList;
