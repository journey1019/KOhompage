'use client';

import { use } from 'react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarDrawer from '@/components/(Admin)/SidebarDrawer';

interface Props {
    params: Promise<{ locale: string }>;
}

export default function AdminPage({ params }: Props) {
    const { locale } = use(params); // ✅ Promise 해제

    // 로그인 여부 확인
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user?.role !== 'ADMIN') {
            alert('관리자만 접근할 수 있습니다.');
            router.push(`/${locale}/auth/signin`);
        }
    }, [session, status, router, locale]);

    if (status === 'loading' || !session || session.user?.role !== 'ADMIN') {
        return <div>관리자 계정 검사 로딩 중...</div>;
    }

    console.log(session)//
    const handleLogout = () => {
        // JWT 토큰 삭제 및 리다이렉션
        localStorage.removeItem('token');
        router.push(`/ko/auth/signin`);
    };

    return (
        <>
        </>
        // <div className="max-w-7xl mx-auto p-6">
        //     <div className="flex flex-row justify-between items-center">
        //         <div className="flex flex-col">
        //             <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        //             <p>You are successfully logged in.</p>
        //             <p>Test.</p>
        //         </div>
        //
        //         <form action={`/api/auth/logout`} method="POST">
        //             <button
        //                 type="submit"
        //                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        //             >
        //                 Logout
        //             </button>
        //         </form>
        //         {/*<button*/}
        //         {/*    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"*/}
        //         {/*    onClick={handleLogout}*/}
        //         {/*>*/}
        //         {/*    Logout*/}
        //         {/*</button>*/}
        //     </div>
        //
        //     <div className="flex pt-10">
        //         <button
        //             className="px-6 py-3 bg-white text-red-700 border-2 border-red-700 hover:bg-neutral-100 rounded-md">
        //             Resource
        //         </button>
        //     </div>
        // </div>
    );
}
