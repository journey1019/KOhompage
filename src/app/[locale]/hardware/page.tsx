'use client';

import hardwareData from '@/service/hardwarePageData';
import React, { useState, useEffect } from "react";
import {
    getAllHardware,
    getFilteredHardwaresByQueryAndFilters,
    FilterOptions,
    HardwareProps
} from '@/service/hardware/hardwareData';
import HardwareCardPDF from '@/components/(Hardware)/HardwareCardPDF';
import SearchBar from '@/components/(Hardware)/SearchBar';
import FiltersHardware from '@/components/(Hardware)/FilterHardware';
import PageHero from '@/components/PageHero';
import { useSearchParams, useRouter, useParams } from 'next/navigation';

const HardwarePage = () => {
    const params = useParams(); // URL 파라미터 (언어 코드 등)
    const searchParams = useSearchParams(); // URL 쿼리스트링 파라미터
    const router = useRouter();

    const [locale, setLocale] = useState<string>('ko'); // 기본 언어 설정
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({
        categories: searchParams.get('categories')?.split(',') || [],
        tags: searchParams.get('tags')?.split(',') || [],
        networks: searchParams.get('networks')?.split(',') || [],
        types: searchParams.get('types')?.split(',') || [],
    }); // 필터 상태
    const [hardware, setHardware] = useState<HardwareProps[]>(getAllHardware()); // 필터링된 하드웨어 목록
    const [totalResourcesCount, setTotalResourcesCount] = useState<number>(hardware.length); // 총 하드웨어 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 모바일 필터 Drawer 상태

    const data = hardwareData[locale];

    // URL params 기반으로 언어 설정
    useEffect(() => {
        if (params?.locale) {
            const newLocale = params.locale as string;
            setLocale(newLocale);
        }
    }, [params]);

    // URL 쿼리스트링 변경 시 필터 업데이트
    useEffect(() => {
        const updatedFilters: FilterOptions = {
            categories: searchParams.get('categories')?.split(',') || [],
            tags: searchParams.get('tags')?.split(',') || [],
            networks: searchParams.get('networks')?.split(',') || [],
            types: searchParams.get('types')?.split(',') || [],
        };
        setFilters(updatedFilters);
    }, [searchParams]);

    // 검색 및 필터링 적용
    useEffect(() => {
        const filteredResources = getFilteredHardwaresByQueryAndFilters(searchQuery, filters);
        setHardware(filteredResources); // 필터링 결과 업데이트
        setTotalResourcesCount(filteredResources.length); // 총 개수 업데이트
    }, [searchQuery, filters]);

    // 필터 변경 시 URL 업데이트
    const handleFilterChange = (updatedFilters: FilterOptions) => {
        setFilters(updatedFilters);

        const queryParams = new URLSearchParams();
        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value && value.length > 0) {
                queryParams.set(key, value.join(','));
            }
        });
        router.push(`/hardware?${queryParams.toString()}`);
    };

    // Drawer 토글
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="bg-white">
            {/* 페이지 상단 배너 */}
            <PageHero
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                intro={data.pageTopImageIntro}
                title={data.pageTopImageTitle}
                subtitle={data.pageTopImageSubtitle}
                textPosition="center"
            />

            {/* 페이지 콘텐츠 */}
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Hardware</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* 검색 및 필터 섹션 */}
                    <div className="lg:col-span-1 space-y-6">
                        <SearchBar onSearch={setSearchQuery} />

                        {/* 모바일 필터 버튼 */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleDrawer}
                                className="py-2 mb-5 px-4 bg-white border-red-700 border-2 text-red-700 rounded-md w-full"
                            >
                                Filters
                            </button>
                        </div>

                        {/* 데스크톱 필터 */}
                        <div className="hidden lg:block">
                            <FiltersHardware
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                totalResourcesCount={totalResourcesCount}
                            />
                        </div>
                    </div>

                    {/* 하드웨어 리스트 섹션 */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hardware.length > 0 ? (
                                hardware.map((item) => (
                                    <HardwareCardPDF key={item.slug} {...item} />
                                ))
                            ) : (
                                <p className="text-gray-500">No hardware matches your criteria.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 모바일 필터 Drawer */}
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
                                onFilterChange={handleFilterChange}
                                totalResourcesCount={totalResourcesCount}
                            />
                        </div>
                        <div className="flex-1" onClick={toggleDrawer}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HardwarePage;
