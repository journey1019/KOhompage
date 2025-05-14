'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Resource } from '@/types/resource';
import ResourceCardAdmin from "@/components/(Resources)/ResourceCardAdmin";

export default function ResourceListPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    useEffect(() => {
        fetch('/api/resource')
            .then(res => res.json())
            .then(data => setResources(data));
    }, []);

    const handleEdit = (id: number) => {
        router.push(`/${locale}/admin/resource/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/resource/${id}`, { method: 'DELETE' });
        setResources(resources.filter(r => r.id !== id));
    };

    return (
        <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">📂 리소스 관리</h1>
                <Link href={`/${locale}/admin/resource/new`} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">새 리소스 추가</Link>
            </div>

            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {resources.length > 0 ? (
                        resources.map((post) => (
                            <ResourceCardAdmin key={post.id} {...post} onDelete={handleDelete} onEdit={handleEdit}/>
                        ))
                    ) : (
                        <p className="text-gray-500">No resources match your criteria.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
