/** src/app/[locale]/online-store/superadmin/page.tsx - 임시 관리자 페이지 */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TokenCountdownTimer from '@/components/(Shop)/TokenCountdownTimer';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { LogOut } from '@/lib/api/authApi';
import DeliveryCompanies from "@/components/(Online-Store)/Admin/DeliveryCompanies";
import RoleTable from '@/components/(Online-Store)/Admin/RoleTable';

export default function PaymentAdminHomePage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const [ready, setReady] = useState(false);
    const [forbidden, setForbidden] = useState(false);


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

    useEffect(() => {
        // 토큰 만료 및 역할 확인
        const raw = localStorage.getItem('paymentUserInfo');
        const token = localStorage.getItem('userToken');
        const tokenExpired = localStorage.getItem('tokenExpired');

        const now = new Date();
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(' ', 'T')) : null;

        let isAdmin = false;
        if (raw) {
            try {
                const info = JSON.parse(raw);
                isAdmin = info?.roleId === 'admin';
            } catch {}
        }

        // 토큰 없음/만료시 로그인으로
        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.replace(`/${locale}/login`);
            return;
        }

        if (!isAdmin) {
            setForbidden(true);
            // 일반 유저는 온라인 스토어로 돌려보내기
            router.replace(`/${locale}/online-store`);
            return;
        }

        setReady(true);
    }, [router, locale]);

    if (!ready && !forbidden) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">로딩 중…</h1>
            </div>
        );
    }

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
        <div className="max-w-7xl mx-auto p-3">
            <h1 className="text-2xl font-semibold mb-4">관리자 대시보드</h1>
            <p className="text-gray-600 mb-6">관리자만 접근 가능한 페이지입니다.</p>

            {/* 다른 대시보드 카드들 ... */}

            <div className="mt-6 space-y-6">
                {/* 배송사 섹션 */}
                <DeliveryCompanies />
                <RoleTable />
            </div>
        </div>
    );
}
