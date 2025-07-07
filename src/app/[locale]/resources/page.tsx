'use client';

import { useState, useEffect } from "react";

import { Resource } from '@/types/resource';
import { getAllResources, getFilteredResourcesByQueryAndFilters, FilterOptions } from "@/service/resources/resourceData";

import ResourceCard from "@/components/(Resources)/ResourceCard";
import SearchBar from "@/components/(Resources)/SearchBar";
import FilterResource from "@/components/(Resources)/FilterResource";
import Pagination from "@/components/(Resources)/Pagination";
import ResourceCardAdmin from '@/components/(Resources)/ResourceCardAdmin';

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [resources, setResources] = useState<Resource[]>([]); // 초기 데이터
    const [totalResourcesCount, setTotalResourcesCount] = useState<number>(resources.length); // 전체 게시글 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 드로어 상태
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    // useEffect(() => {
    //     fetch('/api/resource')
    //         .then(res => res.json())
    //         .then(data => {
    //             const activeResources = data.filter((item: Resource) => item.use === true);
    //             setResources(activeResources);
    //         });
    // }, []);
    useEffect(() => {
        const fetchInitialResources = async () => {
            setIsLoading(true);
            const all = await getAllResources();
            setResources(all);
            setTotalResourcesCount(all.length);
            setIsLoading(false);
        };
        fetchInitialResources();
    }, []);

    // useEffect(() => {
    //     const fetchFilteredResources = async () => {
    //         const filteredResources = await getFilteredResourcesByQueryAndFilters(searchQuery, filters);
    //
    //         const sortedResources = filteredResources
    //             .filter((item: Resource) => item.use === true)
    //             .sort((a, b) => {
    //             return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //
    //         setResources(sortedResources);
    //         setTotalResourcesCount(sortedResources.length);
    //         setCurrentPage(1);
    //     };
    //     fetchFilteredResources();
    // }, [searchQuery, filters]);

    useEffect(() => {
        setIsLoading(true); // 시작 시 로딩
        const fetchFilteredResources = async () => {
            const filteredResources = await getFilteredResourcesByQueryAndFilters(searchQuery, filters);

            // const sortedResources = filteredResources.sort((a, b) => {
            //     return new Date(b.date).getTime() - new Date(a.date).getTime();
            // });
            const sortedResources = filteredResources
                // 1. use == true
                .filter((item: Resource) => item.use === true)
                // 2. 날짜 기준 정렬(내림차순)
                .sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

            setResources(sortedResources);
            setTotalResourcesCount(sortedResources.length);
            setCurrentPage(1);
            setIsLoading(false); // 시작 시 로딩
        };
        fetchFilteredResources();
    }, [searchQuery, filters]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    // 현재 페이지에 표시할 리소스 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResources = resources.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
            <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">Resources</h1>

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
                        <FilterResource
                            filters={filters}
                            onFilterChange={setFilters}
                            totalResourcesCount={totalResourcesCount} // 게시글 개수 전달
                        />
                    </div>
                </div>

                {/* Right Section: Resource List */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/*{currentResources.length > 0 ? (*/}
                        {/*    currentResources.map((post) => (*/}
                        {/*        <ResourceCard key={post.id} {...post} />*/}
                        {/*    ))*/}
                        {/*) : (*/}
                        {/*    <p className="text-gray-500">No resources match your criteria.</p>*/}
                        {/*)}*/}
                        {isLoading ? (
                            <div className="col-span-full flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                            </div>
                        ) : currentResources.length > 0 ? (
                            currentResources.map((post) => (
                                <ResourceCard key={post.id} {...post} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-10">
                                No resource match your criteria.
                            </p>
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalResourcesCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
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
                        <FilterResource
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
    );
};

export default ResourcesPage;
