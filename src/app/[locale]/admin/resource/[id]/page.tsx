
// app/[locale]/resource/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Resource } from '@/types/resource';

export default function ResourceDetailPage() {
    const { id } = useParams();
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
            <h2 className="text-lg text-gray-600 mb-6">{resource.subtitle}</h2>
            <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: resource.html || '' }}
            />
        </div>
    );
}
