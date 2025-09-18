"use client";

import PageHero from '@/components/PageHero';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/(Payment)/ProductCard';
import { FilterOptions } from '@/service/shop/shopData'
import FilterResource from '@/components/(Resources)/FilterResource';
import Pagination from '@/components/(Resources)/Pagination';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import TokenCountdownTimer from '@/components/(Shop)/TokenCountdownTimer';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { LogOut, SafeLogOut } from '@/lib/api/authApi';
import { ProductList, Product } from '@/lib/api/productApi';


const OnlineStorePage = () => {
    const router = useRouter();

    /** Login 토큰 만료시 Login Page 이동 */
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const tokenExpired = localStorage.getItem("tokenExpired");
        // 현재 시간
        const now = new Date();
        // tokenExpired 문자열 → Date 객체 변환
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(" ", "T")) : null;

        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push("/ko/online-store/login");
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            await LogOut(); // 로그아웃 API 호출

            // 🔑 토큰, 사용자 정보 제거
            localStorage.removeItem("userToken");
            localStorage.removeItem("tokenExpired");
            sessionStorage.clear();
            localStorage.clear();

            // 로그인 페이지로 이동
            router.push("/ko/online-store/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProductsCount, setTotalProductsCount] = useState(products.length);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const itemsPerPage = 9; // 페이지당 항목 수

    const [tokenExpired, setTokenExpired] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('paymentUserInfo');
        if (stored) {
            try {
                const userInfo = JSON.parse(stored);
                setTokenExpired(userInfo.tokenExpired);
                setIsAdmin(userInfo.roleId === 'admin');
            } catch {}
        }
    }, []);

    // ✅ 상품 목록 API 호출
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await ProductList();
                setProducts(data);
                setTotalProductsCount(data.length); // ⚠️ total count는 API에서 totalCount를 내려주면 거기 값 사용
            } catch (error) {
                console.error("상품 불러오기 실패:", error);
                setProducts([]);
                setTotalProductsCount(0);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage]);

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

            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h1 className="text-3xl sm:text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-4 sm:mb-8">
                        제품
                    </h1>

                    <div className="flex flex-row items-center space-x-2 sm:space-x-6">
                        {/* 로그인 토큰 만료시간 */}
                        {tokenExpired && (
                            <TokenCountdownTimer tokenExpired={tokenExpired} />
                        )}

                        {/* 🔹 Admin 전용 버튼 */}
                        {isAdmin && (
                            <div className="relative group">
                                <Link href="/ko/online-store/superAdmin">
                                    <button
                                        className="hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
                                        관리자 페이지
                                    </button>
                                </Link>
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    Admin Only
                                </div>
                            </div>
                        )}

                        {/* 마이페이지 버튼 */}
                        <div className="relative group">
                            <button
                                onClick={() => router.push('/ko/online-store/myPage')}
                                className="hover:bg-gray-200 p-2 rounded-full transition"
                            >
                                <FaRegUserCircle className="w-6 h-6 text-gray-800" />
                            </button>
                            <div
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                마이페이지
                            </div>
                        </div>

                        {/* 로그아웃 버튼 */}
                        <div className="relative group">
                            <button
                                onClick={SafeLogOut}
                                className="hover:bg-gray-200 p-2 rounded-full transition"
                            >
                                <RiLogoutCircleRLine className="w-6 h-6 text-gray-800" />
                            </button>
                            <div
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                로그아웃
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* Right Section: Products */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
                                </div>
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.productId} {...product} />
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