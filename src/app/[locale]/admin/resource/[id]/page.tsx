
// app/[locale]/resource/[id]/page.tsx
'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Resource } from '@/types/resource';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa";
import { router } from 'next/client';
import Link from 'next/link';


export default function ResourceDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const locale = usePathname().split('/')[1];
    const [resource, setResource] = useState<Resource | null>(null);

    useEffect(() => {
        fetch(`/api/resource/${id}`)
            .then((res) => res.json())
            .then((data) => setResource(data));
    }, [id]);

    if (!resource) return <p className="text-center py-20">로딩 중...</p>;

    if (resource.form !== 'page') {
        return <p className="text-center py-20 text-red-500">이 리소스는 HTML 페이지 형식이 아닙니다.</p>;
    }

    const date = new Date(resource.date);
    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }); // 👉 "May 16, 2025"

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        await fetch(`/api/resource/${id}`, { method: "DELETE" });

        // 삭제 후 이동 등 처리
        router.push(`/${locale}/admin/resource`) // 예: 목록으로 이동
    };

    return (
        <>
            <PageHero
                size="py-28"
                url={resource.image}
                intro={resource?.subtitle}
                title={resource.title}
                subtitle={formatted}
            />
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-end border-b space-x-4">
                <Link href={`/${locale}/admin/resource/edit/${id}`}
                      className="bg-blue-500 rounded-full text-white px-4 py-2"
                >
                    ✏️ Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 rounded-full text-white px-4 py-2"
                >
                    🗑️ Delete
                </button>
            </div>
            <div className="max-w-4xl mx-auto px-4 py-28">
                <div
                    className="prose max-w-full"
                    dangerouslySetInnerHTML={{ __html: resource.html || '' }}
                />

                <div className="w-full border-b border-neutral-300 pt-12"/>
                <div className="py-12 space-y-6">
                    <span className="font-bold">📞 지금 무료 상담을 신청하시고, 귀사의 해상 물류 안전성을 확보하세요.</span>
                    <div className="flex flex-col">
                        <Link href="https://pf.kakao.com/_FHxajn" target="_blank" className="text-blue-500 hover:text-blue-600">👈 코리아오브컴 카카오톡</Link>
                        <Link href={`/${locale}/contact-us`} className="text-blue-500 hover:text-blue-600">📨 코리아오브컴 도입문의</Link>
                    </div>
                </div>

                {/* 돌아가기 버튼 */}
                <div className="pt-12 w-full flex justify-center">
                    <button
                        onClick={() => router.push(`/${locale}/admin/resource`)}
                        className="flex flex-row py-2 px-4 space-x-2 rounded-md items-center bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <FaArrowLeft />
                        <span>돌아가기</span>
                    </button>
                </div>
            </div>
        </>
    );
}
