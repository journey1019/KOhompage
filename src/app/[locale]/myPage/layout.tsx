"use client";

import React from "react";
import PageHero from '@/components/PageHero';
import MyPageSidebar from '@/components/(MyPage)/MyPageSidebar';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';


export default function MyPageLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <section>
            <PageHero
                size="py-52"
                url="/images/shop/shop2.png"
                intro=""
                title="마이페이지"
                subtitle=""
            />
            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-8 lg:px-8">
                <button
                    onClick={() => router.push('/ko/online-store')}
                    className="flex flex-row items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200 pb-4"
                >
                    <IoIosArrowBack className="text-lg" />
                    <span>상품 목록 페이지로 가기</span>
                </button>
                <div className="flex">
                    {/* 좌측 사이드바 */}
                    <MyPageSidebar />

                    {/* 우측 컨텐츠 */}
                    <div className="flex-1 bg-white p-6 min-h-[600px]">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
