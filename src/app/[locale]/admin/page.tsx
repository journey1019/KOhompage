'use client';

import { use } from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                    <p>You are successfully logged in.</p>
                </div>

                <div className="flex py-8 space-x-6">
                    <Link href="admin/resource" className="flex items-center text-xl font-semibold text-purple-500 py-4 px-6 border-purple-500 border-2 rounded-md hover:bg-gray-100 hover:border-purple-600">
                        Resource
                    </Link>
                    <Link href="admin/hardware" className="flex items-center text-xl font-semibold text-blue-500 py-4 px-6 border-blue-500 border-2 rounded-md hover:bg-gray-100 hover:border-blue-600">
                        Hardware
                    </Link>
                </div>
            </div>
        </div>
    );
}
