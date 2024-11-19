'use client';

import React, { useState } from 'react';
import hardwareData from '../../../../data/hardware.json'

import PageTopImage from '@/components/PageTopImage';
import SearchBar from '@/components/SearchBar';
import HardwareList from '@/components/HardwareList';
import { ProductCard } from '@/components/ProductCard';


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
            item.subTitle.toLowerCase().includes(lowercasedTerm) ||
            item.description.toLowerCase().includes(lowercasedTerm) ||
            item.path.toLowerCase().includes(lowercasedTerm) ||
            item.tag.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
        );

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
                <SearchBar onSearch={handleSearch} />
                <div className="flex relative justify-evenly text-gray-600 py-3">
                    {/*버튼 형식으로 변경하여 Search에 삽입*/}
                    <p>#Satellite</p>
                    <p>#ST6100</p>
                    <p>#Maritime</p>
                    <p>#Container</p>
                    <p>#NMS</p>
                    <p>#AIS</p>
                    <p>#Trail Tracking</p>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-2xl font-bold mb-4">Hardware List</h1>
                <HardwareList items={filteredItems} />
            </div>
        </div>
    );
};

export default HardPage;
