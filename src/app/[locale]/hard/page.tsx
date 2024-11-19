'use client';

import React, { useState } from 'react';
import hardwareData from '../../../../data/hardware.json'

import PageTopImage from '@/components/PageTopImage';
import SearchBar from '@/components/SearchBar';
import HardwareList from '@/components/HardwareList';


const HardPage = () => {
    const [chips, setChips] = useState<string[]>([]); // Chip 상태 관리
    const [filteredItems, setFilteredItems] = useState(hardwareData);

    const handleAddChip = (newChip: string) => {
        if(!chips.includes(newChip.toLowerCase())) {
            const updatedChips = [...chips, newChip.toLowerCase()];
            setChips(updatedChips);
            filterHardware(updatedChips);
        }
    }
    const handleRemoveChip = (chipToRemove: string) => {
        const updatedChips = chips.filter((chip) => chip !== chipToRemove.toLowerCase());
        setChips(updatedChips);
        filterHardware(updatedChips);
    }

    const filterHardware = (chips: string[]) => {
        if (chips.length === 0) {
            setFilteredItems(hardwareData); // 검색어가 없으면 전체 리스트 표시
            return;
        }

        const filtered = hardwareData.filter((item) => {
            const { title, subTitle, description, tag, path } = item;
            const content = [title, subTitle, description, ...tag, path].join(' ').toLowerCase(); // 소문자 변환
            return chips.every((chip) => content.includes(chip.toLowerCase())); // 모든 Chip 포함 여부 확인
        });

        setFilteredItems(filtered);
    };

    return (
        <div className="bg-white">
            <PageTopImage
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                title="KOREAORBCOMM FOR FINANCIAL SERVICES"
                subtitle="글로벌 통신으로 경험을 향상시키세요"
                description="이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다."
                textPosition="center"
            />
            <div className="mx-auto max-x-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-lg lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center text-black pb-8">
                    제품정보, 증상을 찾아보세요
                </h2>
                <SearchBar chips={chips} onAddChip={handleAddChip} onRemoveChip={handleRemoveChip} />
            </div>

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-2xl font-bold mb-4">Hardware List</h1>
                <HardwareList items={filteredItems} />
            </div>
        </div>
    );
};

export default HardPage;
