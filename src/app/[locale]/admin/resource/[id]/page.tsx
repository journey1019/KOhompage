'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { GoPlus } from "react-icons/go";

const tagOptions = [
    'Container-IoT', 'Global-IoT', 'Satellite', 'AIS', 'Cellular', 'Door', 'Cargo',
    'Dry', 'Reefer', 'NTN', 'OGx/IDP'
];

const solutionTagOptions = [
    'Container-IoT', 'Maritime', 'Global-IoT', 'NMS', 'VMS',
    'Satellite', 'OGx/IDP', 'LowEarthOrbit', 'Starlink', 'AIS'
];

const contentTypeOptions = [
    'Article', 'Datasheet', 'Newsletter', 'Video', 'Brochure'
];

export default function EditResourcePage() {
    const { id } = useParams();
    const router = useRouter();
    const locale = usePathname().split('/')[1];

    const [form, setForm] = useState({
        date: '',
        contentType: '',
        title: '',
        subtitle: '',
        tags: [] as string[],
        hideTag: [] as string[],
        solutionTag: [] as string[],
        form: 'pdf',
        image: '',
        path: '',
        use: true,
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/resource/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    ...data,
                    date: data.date?.split('T')[0],
                    tags: data.tags.split(','),
                    hideTag: data.hideTag.split(','),
                    solutionTag: data.solutionTag.split(','),
                });
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleTag = (tag: string) => {
        setForm(prev => {
            const tags = prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag];
            return { ...prev, tags };
        });
    };

    const toggleSolutionTag = (tag: string) => {
        setForm(prev => {
            const tags = prev.solutionTag.includes(tag) ? prev.solutionTag.filter(t => t !== tag) : [...prev.solutionTag, tag];
            return { ...prev, solutionTag: tags };
        });
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload/image', { method: 'POST', body: formData });
        const data = await res.json();
        return data.url;
    };

    const handlePdfUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload/pdf', { method: 'POST', body: formData });
        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const payload = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(',')
        };
        const res = await fetch(`/api/resource/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push(`/${locale}/admin/resource`);
        } else {
            const err = await res.json();
            setError(err.message || '수정 중 오류 발생');
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">리소스 수정</h1>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-base font-semibold">날짜</label>
                <input type="date" name="date" value={form.date} onChange={handleChange}
                       className="w-full border p-2" />

                <label className="block text-base font-semibold">제목</label>
                <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2" />

                <label className="block text-base font-semibold">부제목</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border p-2" />

                <label className="block text-base font-semibold">콘텐츠 유형</label>
                <select name="contentType" value={form.contentType} onChange={handleChange}
                        className="w-full border p-2">
                    {contentTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>

                <label className="block text-base font-semibold">대표 태그</label>
                <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full border text-sm ${form.tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >{tag}</button>
                    ))}
                </div>

                <label className="block text-base font-semibold">솔루션 태그</label>
                <div className="flex flex-wrap gap-2">
                    {solutionTagOptions.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => toggleSolutionTag(tag)}
                            className={`px-3 py-1 rounded-full border text-sm ${form.solutionTag.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >{tag}</button>
                    ))}
                </div>

                <label className="block text-base font-semibold">숨김 태그 (쉼표로 구분)</label>
                <textarea name="hideTag" value={form.hideTag.join(',')}
                          onChange={e => setForm(prev => ({ ...prev, hideTag: e.target.value.split(',') }))}
                          className="w-full border p-2" />

                <label className="block text-base font-semibold">대표 이미지</label>
                {form.image && <img src={form.image} alt="현재 이미지" className="mb-2 w-full rounded" />}
                <input type="file" accept="image/*" onChange={async e => {
                    if (e.target.files?.[0]) {
                        const url = await handleImageUpload(e.target.files[0]);
                        setForm(prev => ({ ...prev, image: url }));
                    }
                }} className="w-full" />

                <label className="block text-base font-semibold">PDF 또는 링크</label>
                {form.form === 'pdf' ? (
                    <>
                        {form.path &&
                            <a href={form.path} target="_blank" className="text-blue-500 text-sm block mb-2">현재 PDF
                                보기</a>}
                        <input type="file" accept="application/pdf" onChange={async e => {
                            if (e.target.files?.[0]) {
                                const url = await handlePdfUpload(e.target.files[0]);
                                setForm(prev => ({ ...prev, path: url }));
                            }
                        }} className="w-full" />
                    </>
                ) : (
                    <input name="path" value={form.path} onChange={handleChange} className="w-full border p-2" />
                )}

                <select name="form" value={form.form} onChange={handleChange} className="w-full border p-2">
                    <option value="pdf">PDF</option>
                    <option value="link">Link</option>
                </select>

                <label className="block">
                    <input type="checkbox" name="use" checked={form.use} onChange={handleChange} /> 사용 여부
                </label>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">수정 완료
                </button>
            </form>
        </div>
    );
}
