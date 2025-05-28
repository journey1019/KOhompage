'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Resource } from '@/types/resource';
import ResourceCardAdmin from "@/components/(Resources)/ResourceCardAdmin";
import SearchBar from '@/components/(Resources)/SearchBar';
import {
    getAllResources,
    FilterOptions,
    getFilteredResourcesByQueryAndFilters,
} from '@/service/resources/resourceData';
import FilterResource from '@/components/(Resources)/FilterResource';
import Pagination from '@/components/(Resources)/Pagination';
import { IoMdClose } from "react-icons/io";


export default function ResourceListPage() {
    const [resources, setResources] = useState<Resource[]>([]); // 초기 데이터
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [totalResourcesCount, setTotalResourcesCount] = useState<number>(resources.length); // 전체 게시글 개수
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // 드로어 상태

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    // 리소스 불러오기
    // useEffect(() => {
    //     const fetchInitialResources = async () => {
    //         setIsLoading(true);
    //         const all = await getAllResources();
    //         setResources(all);
    //         setTotalResourcesCount(all.length);
    //         setIsLoading(false);
    //     };
    //     fetchInitialResources();
    // }, []);
    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            try {
                const all = await getAllResources();
                setResources(all);
                setTotalResourcesCount(all.length);
            } catch (e) {
                console.error('리소스 로드 실패:', e);
                alert('리소스 로드 중 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, []);


    useEffect(() => {
        setIsLoading(true); // 시작 시 로딩
        const fetchFilteredResources = async () => {
            const filteredResources = await getFilteredResourcesByQueryAndFilters(searchQuery, filters);

            const sortedResources = filteredResources.sort((a, b) => {
                // 1. use가 false인 항목 우선
                // if (a.use !== b.use) {
                //     return a.use ? -1 : 1; // a가 true이면 뒤로
                // }
                // 2. 날짜 기준 정렬 (내림차순)
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

    const handleEdit = (id: number) => {
        router.push(`/${locale}/admin/resource/edit/${id}`);
    };

    // 리소스 삭제
    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/resource/${id}`, { method: 'DELETE' });
        setResources(resources.filter(r => r.id !== id));
    };

    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">📂 리소스 관리</h1>
                <Link href={`/${locale}/admin/resource/new`} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">새 리소스 추가</Link>
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
                        <FilterResource
                            filters={filters}
                            onFilterChange={setFilters}
                            totalResourcesCount={totalResourcesCount} // 게시글 개수 전달
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
                                <ResourceCardAdmin key={post.id} {...post} onDelete={handleDelete} onEdit={handleEdit} isAdmin/>
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

            {isDrawerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
                    <div className="bg-white w-3/4 max-w-md p-6 overflow-y-auto">
                        <button
                            onClick={toggleDrawer}
                            className="text-gray-500 hover:text-gray-800"
                        >
                            <IoMdClose className="w-5 h-5" />
                        </button>
                        <FilterResource
                            filters={filters}
                            onFilterChange={setFilters}
                            totalResourcesCount={totalResourcesCount}
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
