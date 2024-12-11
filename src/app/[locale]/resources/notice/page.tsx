"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTopImage from '@/components/PageTopImage';
import { SectionTitle } from '@/components/SectionTitle';

/**
 * @description: 공지사항 & 이용약관 & 버전 업데이트 등등(게시글||QnA 포맷)
 * @constructor: 각 페이지를 만들긴해야할듯?
 * */


interface Notice {
    id: string;
    title: string;
    date: string;
    category: string;
    contents: string;
}

const NoticePage = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Replace this with actual API call or data fetching logic
        const fetchData = async () => {
            const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
            setNotices(storedNotices);
        };

        fetchData();
    }, []);

    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewNotice = (id: string) => {
        router.push(`/resources/notice/${id}`)
    }

    return (
        <section>
            <PageTopImage
                size="py-48"
                url="/images/header/News.jpg"
                title=""
                subtitle="Notice"
                description="공지사항 및 이용약관 등 정보를 전해드립니다."
                textPosition="center"
            />
            <SectionTitle preTitle="FAQ" title="공지사항">
                공지사항 및 이용약관에 관한 게시물입니다.
            </SectionTitle>
            <div className="container mx-auto p-4 max-w-7xl">
                <h1 className="text-2xl font-bold mb-4">Notice Board</h1>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border mb-4 rounded"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
                    {filteredNotices.map((notice) => (
                        <div
                            key={notice.id}
                            className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white"
                        >
                            <h2 className="text-lg font-bold text-blue-600 mb-2 truncate">{notice.title}</h2>
                            <p className="text-sm text-gray-500 mb-2">{new Date(notice.date).toLocaleDateString()}</p>
                            <span
                                className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                                {notice.category}
                            </span>
                            <p className="text-gray-700 text-sm line-clamp-3">{notice.contents}</p>
                        </div>
                    ))}
                </div>

                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border-t border-b border-gray-300 px-4 py-4">Title</th>
                        <th className="border-t border-b border-gray-300 px-4 py-4">Date</th>
                        <th className="border-t border-b border-gray-300 px-1 py-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredNotices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-gray-100">
                            <td className="border-t border-b border-gray-300 px-6 py-6 cursor-pointer">{notice.title}</td>
                            <td className="border-t border-b border-gray-300 px-6 py-6 cursor-pointer text-center">{new Date(notice.date).toLocaleDateString()}</td>
                            <td className="border-t border-b border-gray-300 px-1 py-6 cursor-pointer text-center">
                                <button
                                    onClick={() => handleViewNotice(notice.id)}
                                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
                                >
                                    더보기
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default NoticePage;