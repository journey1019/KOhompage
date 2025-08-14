'use client';

import PageHero from '@/components/PageHero';
import React, { useState, useEffect } from 'react';
import AuthComponent from '@/components/(Shop)/Auth';
import { productsList } from '@/data/products';
import ProductCard from '@/components/(Shop)/ProductCard';
import { Product } from '@/types/product';
import { getAllProducts, getFilteredProductsByQueryAndFilters, FilterOptions } from '@/service/shop/shopData'
import SearchBar from '@/components/(Resources)/SearchBar';
import FilterResource from '@/components/(Resources)/FilterResource';
import Pagination from '@/components/(Resources)/Pagination';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import TokenCountdownTimer from '@/components/(Shop)/TokenCountdownTimer';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { LogOut } from '@/lib/api/authApi';

import Swal from "sweetalert2";

const OnlineStorePage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            router.push("/ko/login");
            // Swal.fire({
            //     icon: "warning",
            //     title: "로그인이 필요합니다.",
            //     text: "로그인 페이지로 이동합니다.",
            //     confirmButtonText: "확인",
            // }).then(() => {
            //     router.push("/ko/login");
            // });
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            await LogOut(); // 로그아웃 API 호출

            // 🔑 토큰, 사용자 정보 제거
            localStorage.removeItem("userToken");
            localStorage.removeItem("tokenExpired");
            sessionStorage.clear();

            // 로그인 페이지로 이동
            router.push("/ko/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [products, setProducts] = useState<Product[]>(productsList);
    const [totalProductsCount, setTotalProductsCount] = useState(productsList.length);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    const [tokenExpired, setTokenExpired] = useState<string | null>(null);
    useEffect(() => {
        const stored = localStorage.getItem('paymentUserInfo');
        if (stored) {
            const userInfo = JSON.parse(stored);
            setTokenExpired(userInfo.tokenExpired);
        }
    }, []);

    // useEffect(() => {
    //     setIsLoading(true); // 시작 시 로딩
    //     const fetchFilteredProduces = async () => {
    //         const filteredProducts = await getFilteredProductsByQueryAndFilters(searchQuery, filters)
    //         const sortedProducts = filteredProducts
    //             // .filter((item: Product) => item.use === true)
    //             // .sort((a, b) => {
    //             //     return new Date(b.date).getTime() - new Date(a.date).getTime();
    //             // });
    //
    //         // setProducts(sortedProducts);
    //         setTotalProductsCount(sortedProducts.length);
    //         setCurrentPage(1);
    //         setIsLoading(false);
    //     }
    //     fetchFilteredProduces();
    // }, [searchQuery, filters])

    // 현재 페이지에 표시할 리소스 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResources = products.slice(startIndex, startIndex + itemsPerPage);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // 드로어 상태 토글
    };

    return(
        <section>
            <PageHero
                size="py-52"
                url="/images/shop/shop2.png"
                intro=""
                title="온라인 스토어"
                subtitle=""
            />
            <AuthComponent />

            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">제품</h1>
                    <div className="flex flex-row items-center space-x-6">
                        {/* 로그인 토큰 만료시간 */}
                        {tokenExpired && (
                            <TokenCountdownTimer
                                tokenExpired={tokenExpired}
                            />
                        )}
                        {/*마이페이지 버튼*/}
                        <div className="relative group">
                            <button onClick={() => router.push('/ko/myPage')}
                                    className="hover:bg-gray-200 p-2 rounded-full transition">
                                <FaRegUserCircle className="w-6 h-6 text-gray-800" />
                            </button>
                            <div
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                마이페이지
                            </div>
                        </div>

                        {/*로그아웃 버튼*/}
                        <div className="relative group">
                            <button onClick={handleLogout} className="hover:bg-gray-200 p-2 rounded-full transition">
                                <RiLogoutCircleRLine className="w-6 h-6 text-gray-800" />
                            </button>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                로그아웃
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* Left Section: SearchBar & Filtering */}
                    {/*<div className="lg:col-span-1 space-y-6">*/}
                    {/*    <SearchBar onSearch={setSearchQuery} /> /!* 검색어 전달 *!/*/}

                    {/*    /!* 모바일: Filters 버튼 *!/*/}
                    {/*    <div className="lg:hidden">*/}
                    {/*        <button*/}
                    {/*            onClick={toggleDrawer}*/}
                    {/*            className="py-2 mb-5 px-4 bg-white border-red-700 border-2 text-red-700 rounded-md w-full"*/}
                    {/*        >*/}
                    {/*            Filters*/}
                    {/*        </button>*/}
                    {/*    </div>*/}


                    {/*    /!* 웹: FilterResource *!/*/}
                    {/*    <div className="hidden lg:block">*/}
                    {/*        <FilterResource*/}
                    {/*            filters={filters}*/}
                    {/*            onFilterChange={setFilters}*/}
                    {/*            totalResourcesCount={totalProductsCount} // 게시글 개수 전달*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Right Section: Products */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
                                </div>
                            ) : productsList.length > 0 ? (
                                productsList.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-10">
                                    No products available.
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalProductsCount}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
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
                        <FilterResource
                            filters={filters}
                            onFilterChange={setFilters}
                            totalResourcesCount={totalProductsCount}
                        />
                    </div>
                    <div
                        className="flex-1"
                        onClick={toggleDrawer} // 배경 클릭 시 드로어 닫기
                    ></div>
                </div>
            )}
        </section>
    )
}

export default OnlineStorePage;