'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GoPlus } from "react-icons/go";
import {
    tagsOptions, solutionTagOptions, categoryOptions,
    useFormHandlers, TagSelector, FileUploader
} from '@/components/(Admin)/(Hardwares)/HardwareFormUtils';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function NewHardwarePage() {
    const router = useRouter();
    const locale = usePathname().split('/')[1];

    const {
        form, setForm, handleChange, toggleTag
    } = useFormHandlers({
        date: new Date().toISOString().split('T')[0],
        category: 'Device',
        title: '',
        subtitle: '',
        description: '',
        tags: [],
        hideTag: [],
        solutionTag: [],
        slug: '',
        imageSrc: '',
        path: '',
        use: true,
    });

    const [existingTitles, setExistingTitles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     fetch('/api/hardware')
    //         .then(res => res.json())
    //         .then(data => setExistingTitles(data.map((r: any) => r.title)));
    // }, []);
    useEffect(() => {
        fetch('/api/hardware')
            .then(async res => {
                if (!res.ok) throw new Error('응답 실패');
                const contentType = res.headers.get('Content-Type');
                if (contentType?.includes('application/json')) {
                    const data = await res.json();
                    setExistingTitles(data.map((r: any) => r.title));
                } else {
                    throw new Error('JSON이 아닌 응답입니다.');
                }
            })
            .catch(err => {
                console.error('❌ /api/hardware 응답 오류:', err);
            });
    }, []);


    const handleImageUpload = async (file: File, page: 'hardware') => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('page', page);

        const res = await fetch('/api/upload/image', { method: 'POST', body: formData });
        const data = await res.json();
        setForm(prev => ({ ...prev, image: data.url }));
    };

    const handlePdfUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload/pdf', { method: 'POST', body: formData });
        const data = await res.json();
        setForm(prev => ({ ...prev, path: data.url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingTitles.includes(form.title)) {
            setError('동일한 제목의 하드웨어가 이미 존재합니다.');
            return;
        }

        const payload = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(','),
        };

        const res = await fetch('/api/hardware', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push(`/${locale}/admin/hardware`);
        } else {
            const err = await res.json();
            setError(err.message || '등록 중 오류 발생');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">📄 새 하드웨어 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* 날짜 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📆 게시 날짜</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange}
                           className="flex-1 border p-2 rounded" />
                </div>

                {/* 제목 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📌 제목</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="제목 입력"
                           className="flex-1 border p-2 rounded" />
                </div>

                {/* 부제목 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📝 부제목</label>
                    <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="부제목 입력"
                           className="flex-1 border p-2 rounded" />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700"> 설명</label>
                    <input name="description" value={form.description} onChange={handleChange} placeholder="설명 입력"
                           className="flex-1 border p-2 rounded" />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">Slug</label>
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="장비 ID 입력"
                           className="flex-1 border p-2 rounded" />
                </div>

                {/* 타입 유형 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📁 타입 유형</label>
                    <select name="category" value={form.category} onChange={handleChange}
                            className="flex-1 border p-2 rounded">
                        {categoryOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>

                {/* 대표 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🏷 대표 태그</label>
                    <div className="flex-1"><TagSelector field="tags" selected={form.tags}
                                                         onToggle={tag => toggleTag('tags', tag)}
                                                         options={tagsOptions} /></div>
                </div>

                {/* 솔루션 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🧩 솔루션 태그</label>
                    <div className="flex-1"><TagSelector field="solutionTag" selected={form.solutionTag}
                                                         onToggle={tag => toggleTag('solutionTag', tag)}
                                                         options={solutionTagOptions} /></div>
                </div>

                {/* 숨김 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🙈 숨김 태그</label>
                    <textarea
                        name="hideTag"
                        placeholder="쉼표(,)로 구분"
                        value={form.hideTag.join(',')}
                        onChange={e => setForm(prev => ({
                            ...prev,
                            hideTag: e.target.value.split(',').map(t => t.trim()),
                        }))}
                        className="flex-1 border p-2 rounded"
                    />
                </div>

                {/* 이미지 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🖼 대표 이미지</label>
                    <div className="flex-1">
                        {form.imageSrc && <img src={form.imageSrc} alt="현재 이미지" className="w-1/2 rounded border" />}
                        <FileUploader label="이미지 업로드" accept="image/*" page="hardware"
                                      onUpload={(url) => setForm(prev => ({ ...prev, imageSrc: url }))} />
                    </div>
                </div>

                {/* 링크 형식 선택 */}
                {/*<div className="flex items-center gap-4">*/}
                {/*    <label className="w-40 text-left font-medium text-gray-700">📄 링크 형식</label>*/}
                {/*    <select name="form" value={form.form} onChange={handleChange} className="flex-1 border p-2 rounded">*/}
                {/*        <option value="pdf">PDF</option>*/}
                {/*        <option value="link">Link</option>*/}
                {/*    </select>*/}
                {/*</div>*/}


                {/* PDF 또는 링크 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">📎 PDF 업로드</label>
                    <div className="flex-1">
                        {form.path && (
                            <a href={form.path} target="_blank"
                               className="text-blue-500 text-sm block hover:underline">현재 PDF 보기</a>
                        )}
                        <FileUploader label="PDF 업로드" accept="application/pdf" page="hardware"
                                      onUpload={(url) => setForm(prev => ({ ...prev, path: url }))} />
                    </div>
                </div>
                {/*{form.form === 'pdf' ? (*/}
                {/*    <div className="flex items-start gap-4">*/}
                {/*        <label className="w-40 text-left pt-2 font-medium text-gray-700">📎 PDF 업로드</label>*/}
                {/*        <div className="flex-1">*/}
                {/*            {form.path && (*/}
                {/*                <a href={form.path} target="_blank"*/}
                {/*                   className="text-blue-500 text-sm block hover:underline">현재 PDF*/}
                {/*                    보기</a>*/}
                {/*            )}*/}
                {/*            <FileUploader label="PDF 업로드" accept="application/pdf" onUpload={handlePdfUpload} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className="flex items-center gap-4">*/}
                {/*        <label className="w-40 text-left font-medium text-gray-700">🔗 링크 입력</label>*/}
                {/*        <input name="path" value={form.path} onChange={handleChange}*/}
                {/*               className="flex-1 border p-2 rounded" />*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* 사용 여부 - Checkbox */}
                {/*<div className="flex items-center gap-4">*/}
                {/*    <label className="w-40 text-left font-medium text-gray-700">✅ 사용 여부</label>*/}
                {/*    <input type="checkbox" name="use" checked={form.use} onChange={handleChange}/>*/}
                {/*</div>*/}
                {/* 사용 여부 - Toggle */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">✅ 노출 설정</label>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.use}
                                onChange={(e) => handleChange({
                                    target: { name: 'use', value: e.target.checked },
                                })}
                                color="primary"
                            />
                        }
                        label={form.use ? '사용 중' : '비활성'}
                    />
                </div>


                {/* 에러 메시지 */}
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                    <button type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
                        ✅ 리소스 등록
                    </button>
                </div>
            </form>
        </div>
    );
}
