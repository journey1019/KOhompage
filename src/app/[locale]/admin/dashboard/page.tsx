'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default async function DashboardPage({ params }: { params: {locale: string}}) {
    const locale = params.locale;
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push(`${locale}/admin/login`); // Redirect to login page if not authenticated
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
            <p>You are successfully logged in.</p>
        </div>
    );
}
