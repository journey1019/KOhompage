'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

export default function NewResourcePage() {
    const router = useRouter();
    const locale = usePathname().split('/')[1];

    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        contentType: 'Brochure',
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

    const [existingTitles, setExistingTitles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/resource')
            .then(res => res.json())
            .then(data => setExistingTitles(data.map((r: any) => r.title)));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleTag = (tag: string) => {
        setForm(prev => {
            const tags = prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag];
            return { ...prev, tags };
        });
    };

    const toggleSolutionTag = (tag: string) => {
        setForm(prev => {
            const tags = prev.solutionTag.includes(tag)
                ? prev.solutionTag.filter(t => t !== tag)
                : [...prev.solutionTag, tag];
            return { ...prev, solutionTag: tags };
        });
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload/image', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('이미지 업로드 실패');
            const data = await res.json();
            return data.url;
        } catch (err) {
            console.error('❌ 이미지 업로드 실패', err);
            alert('이미지 업로드에 실패했습니다.');
            return '';
        }
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
        if (existingTitles.includes(form.title)) {
            setError('동일한 제목의 리소스가 이미 존재합니다.');
            return;
        }
        setError(null);
        const payload = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(','),
        };
        try {
            const res = await fetch('/api/resource', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                const errorRes = await res.json();
                setError(errorRes.message || '리소스 생성 중 오류가 발생했습니다.');
                return;
            }
            router.push(`/${locale}/admin/resource`);
        } catch (err) {
            console.error('❌ 리소스 생성 실패:', err);
            setError('서버와 통신 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📄 새 리소스 등록</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">📆 게시 날짜</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block font-medium">📌 제목</label>
                    <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="제목 입력" />
                </div>
                <div>
                    <label className="block font-medium">📝 부제목</label>
                    <input name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border p-2 rounded" placeholder="부제목 입력" />
                </div>
                <div>
                    <label className="block font-medium">📁 콘텐츠 유형</label>
                    <select name="contentType" value={form.contentType} onChange={handleChange} className="w-full border p-2 rounded">
                        {contentTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block font-medium">🏷 대표 태그</label>
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
                </div>
                <div>
                    <label className="block font-medium">🧩 솔루션 태그</label>
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
                </div>
                <div>
                    <label className="block font-medium">🙈 숨김 태그 (쉼표 구분)</label>
                    <textarea
                        name="hideTag"
                        value={form.hideTag.join(',')}
                        onChange={e => setForm(prev => ({ ...prev, hideTag: e.target.value.split(',').map(t => t.trim()) }))}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">🖼 대표 이미지</label>
                    <input type="file" accept="image/*" onChange={async e => {
                        if (!e.target.files) return;
                        const url = await handleImageUpload(e.target.files[0]);
                        setForm(prev => ({ ...prev, image: url }));
                    }} />
                </div>
                <div>
                    <label className="block font-medium">📎 파일 또는 링크</label>
                    {form.form === 'pdf' ? (
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={async e => {
                                if (!e.target.files) return;
                                const url = await handlePdfUpload(e.target.files[0]);
                                setForm(prev => ({ ...prev, path: url }));
                            }}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <input
                            name="path"
                            placeholder="링크 입력"
                            value={form.path}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    )}
                </div>
                <div>
                    <label className="block font-medium">🔗 링크 형식</label>
                    <select name="form" value={form.form} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="use" checked={form.use} onChange={handleChange} />
                    <label htmlFor="use">사용 여부</label>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    ✅ 리소스 등록
                </button>
            </form>
        </div>
    );
}
