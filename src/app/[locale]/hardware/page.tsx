'use client';

import hardwareData from '@/service/hardwarePageData';
import React, { useState, useEffect } from "react";
import { Hardware } from "@/types/hardware";
import {
    getFilteredHardwaresByQueryAndFilters,
    FilterOptions,
} from '@/service/hardware/hardwareData';
import HardwareCardPDF from '@/components/(Hardware)/HardwareCardPDF'; // PDF 다운
import SearchBar from '@/components/(Hardware)/SearchBar';
import FiltersHardware from '@/components/(Hardware)/FilterHardware';
import PageHero from '@/components/PageHero';
import { useRouter, useSearchParams } from 'next/navigation';
import { Resource } from '@/types/resource';
import HardwareCardPDFAdmin from '@/components/(Hardware)/HardwareCardPDFAdmin';

const HardwarePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [locale, setLocale] = useState<string>('ko');
    const [data, setData] = useState(hardwareData[locale]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filters, setFilters] = useState<FilterOptions>({
        categories: [],
        types: [],
        networks: [],
        tags: [],
    });
    const [hardware, setHardware] = useState<Hardware[]>([]);
    const [totalResourcesCount, setTotalResourcesCount] = useState<number>(hardware.length);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 모바일 필터 Drawer 상태
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/hardware')
            .then(res => res.json())
            .then(data => {
                const activeResources = data.filter((item: Resource) => item.use === true);
                setHardware(activeResources);
            });
    }, []);

    // URL params 기반으로 초기 필터 설정
    useEffect(() => {
        const initialFilters: FilterOptions = {
            categories: searchParams.getAll('categories') || [],
            types: searchParams.getAll('types') || [],
            networks: searchParams.getAll('networks') || [],
            tags: searchParams.getAll('tags') || [],
        };
        setFilters(initialFilters);
    }, [searchParams]);

    // 검색 및 필터링 동작
    useEffect(() => {
        setIsLoading(true);
        const fetchFilteredHardwares = async () => {
            const filtered = await getFilteredHardwaresByQueryAndFilters(searchQuery, filters);

            const sorted = filtered
                .filter(h => h.use) // ✅ use: true만
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setHardware(sorted);
            setTotalResourcesCount(sorted.length);

            const query = new URLSearchParams();
            if (searchQuery) query.set('query', searchQuery);
            // console.log(filters)
            Object.entries(filters).forEach(([key, values]) => {
                if (values) values.forEach((value: string) => query.append(key, value));
            });
            setIsLoading(false);

            router.replace(`/${locale}/hardware?${query.toString()}`, { scroll: false });
        };

        fetchFilteredHardwares();
    }, [searchQuery, filters, locale]);


    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    return (
        <div className="bg-white">
            <PageHero
                size="py-28"
                url="/images/header/Hardware.jpg"
                intro={data.pageTopImageIntro}
                title={data.pageTopImageTitle}
                subtitle={data.pageTopImageSubtitle}
            />

            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">Hardware</h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* Left Section: SearchBar and Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <SearchBar onSearch={setSearchQuery} />

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
                                totalResourcesCount={totalResourcesCount}
                            />
                        </div>
                    </div>

                    {/* Right Section: Hardware List */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                                </div>
                            ) : hardware.length > 0 ? (
                                hardware.map((post) => (
                                    <HardwareCardPDF key={post.id} {...post}  />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-10">
                                    No hardwares match your criteria.
                                </p>
                            )}
                            {/*{hardware.length > 0 ? (*/}
                            {/*    hardware.map((post) => (*/}
                            {/*        <HardwareCardPDF key={post.id} {...post} />*/}
                            {/*    ))*/}
                            {/*) : (*/}
                            {/*    <p className="text-gray-500">No hardware matches your criteria.</p>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>

                {/* Mobile Filters Drawer */}
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
                        <div className="flex-1" onClick={toggleDrawer}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HardwarePage;
