/** src/app/[locale]/online-store/superadmin/page.tsx - 임시 관리자 페이지 */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DeliveryCompanies from "@/components/(Online-Store)/Admin/DeliveryCompanies";
import RoleTable from '@/components/(Online-Store)/Admin/RoleTable';
import { IoIosArrowBack } from "react-icons/io";


export default function PaymentAdminHomePage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const [ready, setReady] = useState(false);
    const [forbidden, setForbidden] = useState(false);

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
            router.replace(`/${locale}/online-store/login`);
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


    return (
        <div className="mx-auto max-w-7xl">
            <div className="space-y-4 sm:space-y-6">
                <DeliveryCompanies />
                <RoleTable />
            </div>
        </div>
    );

}
