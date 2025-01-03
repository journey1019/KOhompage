"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/BreadCrumbs';

/**
 * @description:
 * */

interface Notice {
    id: string;
    title: string;
    date: string;
    category: string;
    contents: string;
}
const NoticeDetailPage = ({params}: { params: Promise<{ id: string }>}) => {
    const [notice, setNotice] = useState<Notice | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchNotice = async () => {
            const resolvedParams = await params;
            const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
            const foundNotice = storedNotices.find((n: Notice) => n.id === resolvedParams.id);
            if (foundNotice) {
                setNotice(foundNotice);
            } else {
                router.push('/resources/notice');
            }
        };

        fetchNotice();
    }, [params, router]);

    if (!notice) {
        return <div>Loading...</div>;
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Resources', href: '/resources' },
        { label: 'Notice', href: '/resources/notice' },
        { label: `${notice.title}`, href: `/resources/notice/${notice.id}` },
    ]

    return(
        <section>
            <PageHero
                size="py-28"
                url="/images/header/News.jpg"
                intro="Notice"
                title={notice.title}
                subtitle={notice.category}
            />
            <Breadcrumbs items={breadcrumbs}/>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>
                <p className="text-gray-600 mb-2">{new Date(notice.date).toLocaleDateString()}</p>
                <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mb-4">
                    {notice.category}
                </span>
                <div dangerouslySetInnerHTML={{ __html: notice.contents }} className="prose" />
            </div>
        </section>
    )
}

export default NoticeDetailPage;