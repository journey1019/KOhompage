'use client';
import React, { useState } from 'react';
import hardwareData from '../../../../data/hardware.json'
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

import PageTopImage from '@/components/PageTopImage';
import SearchBar from '@/components/SearchBar';
import HardwareList from '@/components/HardwareList';


const HardwarePage = () => {
    // const t = useTranslations('hardware');
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
            const { title, subTitle, description, tag, slug } = item;
            const content = [title, subTitle, description, ...tag, slug].join(' ').toLowerCase(); // 소문자 변환
            return chips.every((chip) => content.includes(chip.toLowerCase())); // 모든 Chip 포함 여부 확인
        });
        setFilteredItems(filtered);
    };

    return (
        <div className="bg-white">
            <PageTopImage
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                // title={t('pageTop.title')}
                // subtitle={t('pageTop.subTitle')}
                // description={t('pageTop.description')}
                title={`혁신적이고 신뢰할 수 있는 장비`}
                subtitle={`하드웨어 솔루션`}
                description={`연결성과 추적을 가능하게 하는 우리의 하드웨어 제품을 발견하십시오.`}
                textPosition="center"
            />
            <div className="mx-auto max-x-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-lg lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center text-black pb-8">
                    {/*{t('searchSection.title')}*/}
                    하드웨어를 검색 해보세요
                </h2>
                <SearchBar chips={chips} onAddChip={handleAddChip} onRemoveChip={handleRemoveChip} />
            </div>

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <HardwareList items={filteredItems} />
            </div>
        </div>
    );
};

export default HardwarePage;
