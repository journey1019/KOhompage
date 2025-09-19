"use client";

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import MyPageSidebar from '@/components/(MyPage)/MyPageSidebar';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import TokenCountdownTimer from '@/components/(Shop)/TokenCountdownTimer';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { LogOut } from '@/lib/api/authApi';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
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
            await LogOut();
            localStorage.removeItem("userToken");
            localStorage.removeItem("tokenExpired");
            sessionStorage.clear();
            localStorage.clear();
            router.push("/ko/online-store/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    return (
        <section>
            {/* 모바일에선 Hero 크기 축소 */}
            <div className="hidden md:block">
                <PageHero size="py-40" url="/images/shop/shop2.png" intro="" title="마이페이지" subtitle="" />
            </div>
            <div className="md:hidden">
                <PageHero size="py-16" url="/images/shop/shop2.png" intro="" title="마이페이지" subtitle="" />
            </div>

            {/* 컨테이너 패딩/최대폭 조절 */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-8">
                {/* Top toolbar: 모바일에선 두 줄/아이콘 위주, 데스크탑에선 가로 배치 */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={() => router.push('/ko/online-store')}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <IoIosArrowBack className="text-lg" />
                        <span className="text-sm sm:text-base">상품 목록 페이지로 가기</span>
                    </button>

                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                        {/* 토큰 만료: 모바일에선 아이콘+짧은 텍스트/ md+에선 전체 */}
                        {tokenExpired && (
                            <div className="shrink-0">
                                <TokenCountdownTimer tokenExpired={tokenExpired} />
                            </div>
                        )}

                        {/* Admin 버튼: 모바일에선 텍스트 짧게 */}
                        {isAdmin && (
                            <Link href="/ko/online-store/superAdmin" className="shrink-0">
                                <button
                                    className="px-3 py-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                                    aria-label="관리자 페이지"
                                >
                                    <span className="hidden sm:inline">관리자 페이지</span>
                                    <span className="sm:hidden">관리자</span>
                                </button>
                            </Link>
                        )}

                        {/* 마이페이지 아이콘 */}
                        <button
                            onClick={() => router.push('/ko/online-store/myPage/orders')}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                            aria-label="마이페이지"
                            title="마이페이지"
                        >
                            <FaRegUserCircle className="w-6 h-6 text-gray-800" />
                        </button>

                        {/* 로그아웃 아이콘 */}
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                            aria-label="로그아웃"
                            title="로그아웃"
                        >
                            <RiLogoutCircleRLine className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>
                </div>

                {/* 제목: 모바일에선 크기 축소 */}
                <h1 className="mt-3 md:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8">
                    My Page
                </h1>

                {/* 레이아웃:
            - md 이상: 좌측 사이드바 + 우측 컨텐츠 2열
            - 모바일: 상단 가로 탭(사이드바 대체) + 컨텐츠 1열 */}
                <div className="flex flex-col md:flex-row md:gap-6">
                    {/* 모바일 가로 탭 네비게이션 (MyPageSidebar 내부에서 재사용 가능하도록 prop 제공) */}
                    <div className="md:hidden mb-4">
                        <MyPageSidebar variant="tabs" />
                    </div>

                    {/* 좌측 사이드바: md 이상에서만 표시 */}
                    <div className="hidden md:block">
                        <MyPageSidebar />
                    </div>

                    {/* 본문 컨텐츠 */}
                    <div className="flex-1 bg-white rounded-md border border-gray-200 p-4 sm:p-5 md:p-6 min-h-[420px] md:min-h-[600px]">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
