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
            router.push("/ko/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    return (
        <section>
            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-8 lg:px-8">
                <div className="flex flex-row justify-between items-center">
                    <button
                        onClick={() => router.push('/ko/online-store')}
                        className="flex flex-row space-x-2 items-center text-blue-500 hover:text-blue-700 transition-colors duration-200 pb-4"
                    >
                        <IoIosArrowBack className="text-lg" />
                        <span>상품 목록 페이지로 가기</span>
                    </button>

                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center space-x-6">
                            {/* 로그인 토큰 만료시간 */}
                            {tokenExpired && (
                                <TokenCountdownTimer
                                    tokenExpired={tokenExpired}
                                />
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
                                <button onClick={handleLogout}
                                        className="hover:bg-gray-200 p-2 rounded-full transition">
                                    <RiLogoutCircleRLine className="w-6 h-6 text-gray-800" />
                                </button>
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    로그아웃
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">관리자 페이지</h1>

                <div className="flex">
                    {/* 좌측 사이드바 */}
                    <AdminPageSidebar />

                    {/* 우측 컨텐츠 */}
                    <div className="flex-1 min-w-0 bg-white p-6 min-h-[600px] overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
