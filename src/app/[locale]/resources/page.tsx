'use client';

import { useState, useEffect } from "react";
import {
    getAllResources,
    getFilteredResourcesByQueryAndFilters,
    FilterOptions,
} from "@/service/resources/resourceData";
import ResourceCard from "@/components/(Resources)/ResourceCard";
import SearchBar from "@/components/(Resources)/SearchBar";
import FilterResource from "@/components/(Resources)/FilterResource";
import Pagination from "@/components/(Resources)/Pagination";

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [resources, setResources] = useState(getAllResources()); // 초기 데이터
    const [totalResourcesCount, setTotalResourcesCount] = useState<number>(resources.length); // 전체 게시글 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 드로어 상태

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    useEffect(() => {
        const filteredResources = getFilteredResourcesByQueryAndFilters(searchQuery, filters);
        setResources(filteredResources); // 필터링된 게시글 업데이트
        setTotalResourcesCount(filteredResources.length); // 게시글 개수 업데이트
        setCurrentPage(1); // 필터링 시 첫 번째 페이지로 이동
    }, [searchQuery, filters]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    // 현재 페이지에 표시할 리소스 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResources = resources.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl px-6 py-12 lg:px-8">
            <h1 className="text-4xl 2xl:text-5xl font-bold text-gray-800 mb-8">Resources</h1>

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
                        {currentResources.length > 0 ? (
                            currentResources.map((post) => (
                                <ResourceCard key={post.path} {...post} />
                            ))
                        ) : (
                            <p className="text-gray-500">No resources match your criteria.</p>
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
