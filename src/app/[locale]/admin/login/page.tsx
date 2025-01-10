'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 비동기적으로 params 처리
        params.then((resolvedParams) => {
            setLocale(resolvedParams.locale);
        });
    }, [params]);

    useEffect(() => {
        if (locale) {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push(`/${locale}/admin/login`); // Redirect to login page if not authenticated
            }
        }
    }, [locale, router]);

    if (!locale) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
            <p>You are successfully logged in.</p>
        </div>
    );
}
