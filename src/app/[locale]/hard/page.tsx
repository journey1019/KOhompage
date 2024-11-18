'use client';

// pages/hardware.tsx
import { useState } from 'react';
import HardwareList from '@/components/HardwareList';
import SearchBar from '@/components/SearchBar';
import hardwareData from '../../../../data/hardware.json'

const HardPage = () => {
    const [filteredItems, setFilteredItems] = useState(hardwareData);

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredItems(hardwareData); // 검색어가 없을 때는 모든 아이템을 표시
            return;
        }

        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = hardwareData.filter((item) =>
            item.title.toLowerCase().includes(lowercasedTerm) ||
            item.description.toLowerCase().includes(lowercasedTerm) ||
            item.tag.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
        );

        setFilteredItems(filtered);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Hardware List</h1>
            <SearchBar onSearch={handleSearch} />
            <HardwareList items={filteredItems} />
        </div>
    );
};

export default HardPage;
