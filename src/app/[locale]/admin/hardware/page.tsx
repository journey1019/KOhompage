'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Hardware } from '@/types/hardware';
import {
    getFilteredHardwaresByQueryAndFilters,
    FilterOptions
} from '@/service/hardware/hardwareData';
import HardwareCardPDFAdmin from '@/components/(Hardware)/HardwareCardPDFAdmin';
import SearchBar from '@/components/(Hardware)/SearchBar';
import FiltersHardware from '@/components/(Hardware)/FilterHardware';
import Pagination from '@/components/(Resources)/Pagination';


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const HardwarePage = () => {
    const [hardwares, setHardwares] = useState<Hardware[]>([]); // 초기 데이터
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [totalHardwaresCount, setTotalHardwaresCount] = useState<number>(hardwares.length); // 전체 게시글 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 드로어 상태

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    useEffect(() => {
        fetch(`${baseUrl}/api/hardware`)
            .then(res => res.json())
            .then(data => setHardwares(data))
    }, []);

    useEffect(() => {
        setIsLoading(true); // 시작 시 로딩
        const fetchFilteredResources = async () => {
            const filterHardwares = await getFilteredHardwaresByQueryAndFilters(searchQuery, filters);

            // const sortedHardwares = filterHardwares.sort((a, b) => {
            //     return new Date(b.date).getTime() - new Date(a.date).getTime();
            // });
            const sortedHardwares = filterHardwares.sort((a, b) => {
                // 1. use가 false인 항목 우선
                // if (a.use !== b.use) {
                //     return a.use ? -1 : 1; // a가 true이면 뒤로
                // }
                // 2. 날짜 기준 정렬 (내림차순)
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            setHardwares(sortedHardwares);
            setTotalHardwaresCount(sortedHardwares.length);
            setCurrentPage(1);
            setIsLoading(false); // 데이터 세팅 후 로딩 끝
        };
        fetchFilteredResources();
    }, [searchQuery, filters]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    // 현재 페이지에 표시할 리소스 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResources = hardwares.slice(startIndex, startIndex + itemsPerPage);

    // 하드웨어 수정
    const handleEdit = (id: number) => {
        router.push(`/${locale}/admin/hardware/${id}`);
    };

    // 하드웨어 삭제
    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/hardware/${id}`, { method: 'DELETE' });
        setHardwares(hardwares.filter(r => r.id !== id));
    };

    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">📱 장비 관리</h1>
                <Link href={`/${locale}/admin/hardware/new`} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">새 하드웨어 추가</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
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
                            totalResourcesCount={totalHardwaresCount} // 게시글 개수 전달
                            isAdmin={true}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {isLoading ? (
                            <div className="col-span-full flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                            </div>
                        ) : currentResources.length > 0 ? (
                            currentResources.map((post) => (
                                <HardwareCardPDFAdmin key={post.id} {...post} onDelete={handleDelete} onEdit={handleEdit} isAdmin/>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-10">
                                No hardwares match your criteria.
                            </p>
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalHardwaresCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

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
                            totalResourcesCount={totalHardwaresCount} // 게시글 개수 전달
                            isAdmin={true}
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
}

export default HardwarePage;