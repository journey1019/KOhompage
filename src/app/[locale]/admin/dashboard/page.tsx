'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = useState<string | null>(null);
    const router = useRouter();

    // 비동기적으로 params 처리
    useEffect(() => {
        let isMounted = true;

        const fetchParams = async () => {
            const resolvedParams = await params;
            if (isMounted) {
                setLocale(resolvedParams.locale);
            }
        };

        fetchParams();

        return () => {
            isMounted = false;
        };
    }, [params]);

    // 인증 및 리다이렉션
    useEffect(() => {
        if (!locale) return;

        const token = localStorage.getItem('token');
        if (!token) {
            router.push(`/${locale}/admin/login`);
        }
    }, [locale, router]);

    // 로딩 상태 표시
    if (!locale) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        // JWT 토큰 삭제 및 리다이렉션
        localStorage.removeItem('token');
        router.push(`/${locale}/admin/login`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
            <p>You are successfully logged in.</p>
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
