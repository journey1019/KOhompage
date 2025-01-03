'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useParams를 사용하여 params를 처리
import hardwareData from '@/service/hardwarePageData';
import { getHardwareData, getFilterHardwareByChips } from '@/service/hardwareData';
import PageHero from '@/components/PageHero';
import SearchBar from '@/components/SearchBar';
import HardwareList from '@/components/HardwareList';

const HardwarePage = () => {
    const params = useParams(); // params를 가져옴
    const [locale, setLocale] = useState<string>('en'); // 기본값 설정
    const [data, setData] = useState(hardwareData['en']); // 초기 데이터 설정
    const [chips, setChips] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState(getHardwareData());

    useEffect(() => {
        if (params && params.locale) {
            const newLocale = params.locale as string; // locale 값을 가져옴
            setLocale(newLocale);
            setData(hardwareData[newLocale] || hardwareData['en']); // 해당 언어 데이터 로드
        }
    }, [params]);

    const handleAddChip = (newChip: string) => {
        if (!chips.includes(newChip.toLowerCase())) {
            const updatedChips = [...chips, newChip.toLowerCase()];
            setChips(updatedChips);
            setFilteredItems(getFilterHardwareByChips(updatedChips));
        }
    };

    const handleRemoveChip = (chipToRemove: string) => {
        const updatedChips = chips.filter((chip) => chip !== chipToRemove.toLowerCase());
        setChips(updatedChips);
        setFilteredItems(getFilterHardwareByChips(updatedChips));
    };

    return (
        <div className="bg-white">
            <PageHero
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                intro={data.pageTopImageIntro}
                title={data.pageTopImageTitle}
                subtitle={data.pageTopImageSubtitle}
            />
            <div className="mx-auto max-x-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-lg lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center text-black pb-8">
                    {data.searchBarTitle}
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
