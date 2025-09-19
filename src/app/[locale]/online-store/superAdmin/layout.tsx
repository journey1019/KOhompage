"use client";

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import AdminPageSidebar from '@/components/(Online-Store)/Admin/AdminPageSidebar';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import TokenCountdownTimer from '@/components/(Shop)/TokenCountdownTimer';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { LogOut } from '@/lib/api/authApi';


export default function AdminPageLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

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

    return (
        <section>
            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-4 sm:px-6 py-6 lg:px-8">
                {/* Top bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* 뒤로가기: 모바일 전체폭 */}
                    <button
                        onClick={() => router.push('/ko/online-store')}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors pb-2 sm:pb-0"
                    >
                        <IoIosArrowBack className="text-lg" />
                        <span className="text-sm sm:text-base">상품 목록 페이지로 가기</span>
                    </button>

                    {/* 우측 액션들 */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        {/* 토큰 타이머 */}
                        {tokenExpired && (
                            <TokenCountdownTimer tokenExpired={tokenExpired} />
                        )}

                        {/* Admin 버튼 */}
                        {isAdmin && (
                            <div className="relative group">
                                <Link href="/ko/online-store/superAdmin">
                                    <button className="px-3 py-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
                                        관리자 페이지
                                    </button>
                                </Link>
                                {/* 모바일에선 툴팁 비표시(터치 환경 배려) */}
                                <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    Admin Only
                                </div>
                            </div>
                        )}

                        {/* 마이페이지 */}
                        <div className="relative group">
                            <button
                                onClick={() => router.push('/ko/online-store/myPage')}
                                className="hover:bg-gray-100 p-2 rounded-full transition"
                                aria-label="마이페이지"
                            >
                                <FaRegUserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                            </button>
                            <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                마이페이지
                            </div>
                        </div>

                        {/* 로그아웃 */}
                        <div className="relative group">
                            <button
                                onClick={handleLogout}
                                className="hover:bg-gray-100 p-2 rounded-full transition"
                                aria-label="로그아웃"
                            >
                                <RiLogoutCircleRLine className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                            </button>
                            <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                로그아웃
                            </div>
                        </div>
                    </div>
                </div>

                {/* 타이틀: 모바일 여백 조정 */}
                <h1 className="text-3xl sm:text-4xl maxWeb:text-5xl font-bold text-gray-800 mt-2 mb-4 sm:mb-8">
                    관리자 페이지
                </h1>

                {/* 본문 레이아웃: 모바일 세로, md↑ 가로 */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* 사이드바: 모바일에선 상단에 쌓임 */}
                    <div className="md:shrink-0">
                        <AdminPageSidebar />
                    </div>

                    {/* 컨텐츠 영역 */}
                    <div className="flex-1 min-w-0 bg-white overflow-x-hidden rounded-lg md:rounded-xl">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}