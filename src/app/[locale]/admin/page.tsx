'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    if (session?.user?.role === 'ADMIN') {
        console.log('관리자입니다.');
    } else {
        console.log('일반 사용자입니다.');
    }

    // 비동기적으로 params 처리
    useEffect(() => {
        if (status === "loading") return; // 세션 확인 중이면 아무것도 안함
        if (!session) {
            router.push(`/ko/auth/signin`); // 로그인 안 되어 있으면 /signin으로 이동
        }
    }, [session, status, router]);

    if (status === "loading" || !session) {
        return <div>로딩 중...</div>;
    }

    const handleLogout = () => {
        // JWT 토큰 삭제 및 리다이렉션
        localStorage.removeItem('token');
        router.push(`/ko/auth/signin`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                    <p>You are successfully logged in.</p>
                    <p>Test.</p>
                </div>

                <form action={`/api/auth/logout`} method="POST">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </form>
                {/*<button*/}
                {/*    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"*/}
                {/*    onClick={handleLogout}*/}
                {/*>*/}
                {/*    Logout*/}
                {/*</button>*/}
            </div>

            <div className="flex pt-10">
                <button
                    className="px-6 py-3 bg-white text-red-700 border-2 border-red-700 hover:bg-neutral-100 rounded-md">
                    Resource
                </button>
            </div>
        </div>
    );
}
