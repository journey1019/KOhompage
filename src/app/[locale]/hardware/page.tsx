'use client';

import hardwareData from '@/service/hardwarePageData';
import React, { useState, useEffect } from "react";
import {
    getAllHardware,
    getFilteredHardwaresByQueryAndFilters,
    FilterOptions
} from '@/service/hardware/hardware';
import HardwareCard2 from '@/components/(Hardware)/HardwareCard2'; // Page 이동
import HardwareCardPDF from '@/components/(Hardware)/HardwareCardPDF'; // PDF 다운
import SearchBar from '@/components/(Hardware)/SearchBar';
import FiltersHardware from '@/components/(Hardware)/FilterHardware';
import PageHero from '@/components/PageHero';
import { useParams } from 'next/navigation';


const HardwarePage = () => {
    const params = useParams(); // params를 가져옴
    const [locale, setLocale] = useState<string>('en'); // 기본값 설정
    const [data, setData] = useState(hardwareData[locale]); // 초기 데이터 설정

    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [hardware, setHardware] = useState(getAllHardware()); // 초기 데이터
    const [totalResourcesCount, setTotalResourcesCount] = useState(hardware.length); // 전체 게시글 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 드로어 상태

    // Local Page 설정
    useEffect(() => {
        if (params && params.locale) {
            const newLocale = params.locale as string; // locale 값을 가져옴
            setLocale(newLocale);
            setData(hardwareData[newLocale] || hardwareData['en']); // 해당 언어 데이터 로드
        }
    }, [params]);


    useEffect(() => {
        const filteredResources = getFilteredHardwaresByQueryAndFilters(searchQuery, filters);
        setHardware(filteredResources); // 필터링된 게시글 업데이트
        setTotalResourcesCount(filteredResources.length); // 게시글 개수 업데이트
    }, [searchQuery, filters]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    return (
        <div className="bg-white">
            <PageHero
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                intro={data.pageTopImageIntro}
                title={data.pageTopImageTitle}
                subtitle={data.pageTopImageSubtitle}
                textPosition="center"
            />

            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Hardware</h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* Left Section: SearchBar and Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <SearchBar onSearch={setSearchQuery} /> {/* 검색어 전달 */}

                        {/* 모바일: Filters 버튼 */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleDrawer}
                                className="py-2 mb-5 px-4 bg-white border-red-700 border-2 text-red-700 rounded-md w-full"
                            >
                                Filters
                            </button>
                        </div>

                        {/* 웹: FilterResource */}
                        <div className="hidden lg:block">
                            <FiltersHardware
                                filters={filters}
                                onFilterChange={setFilters}
                                totalResourcesCount={totalResourcesCount} // 게시글 개수 전달
                            />
                        </div>
                    </div>

                    {/* Right Section: Resource List */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {hardware.length > 0 ? (
                                hardware.map((post) => (
                                    <HardwareCardPDF key={post.slug} {...post} />
                                ))
                            ) : (
                                <p className="text-gray-500">No hardware match your criteria.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters Drawer */}
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
                        <div className="bg-white w-3/4 max-w-md p-6 overflow-y-auto">
                            <button
                                onClick={toggleDrawer}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                Close
                            </button>
                            <FiltersHardware
                                filters={filters}
                                onFilterChange={setFilters}
                                totalResourcesCount={totalResourcesCount}
                            />
                        </div>
                        <div
                            className="flex-1"
                            onClick={toggleDrawer} // 배경 클릭 시 드로어 닫기
                        ></div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default HardwarePage;