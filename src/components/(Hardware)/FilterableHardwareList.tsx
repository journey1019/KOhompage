'use client';

import React, { useEffect, useState } from 'react';
import HardwareList from '@/components/HardwareList';
import { getFilteredByKeywords } from '@/service/hardwareData';

interface FilterableHardwareListProps {
    chips: string[]; // Chips 배열을 props로 전달받음
}

const FilterableHardwareList: React.FC<FilterableHardwareListProps> = ({ chips }) => {
    const [filteredItems, setFilteredItems] = useState(getFilteredByKeywords([])); // 초기 데이터는 전체 리스트

    useEffect(() => {
        // Chips가 변경될 때 데이터를 필터링
        setFilteredItems(getFilteredByKeywords(chips));
    }, [chips]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl p-6">
                <h1 className="text-3xl font-bold mb-4">Hardware List</h1>

                {/* 필터링된 HardwareList */}
                <HardwareList items={filteredItems} />
            </div>
        </div>
    );
};

export default FilterableHardwareList;
