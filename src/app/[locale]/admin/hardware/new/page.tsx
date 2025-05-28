'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GoPlus } from "react-icons/go";
import {
    useHardwareTagOptions, useHardwareSolutionTagOptions,
    tagsOptions, solutionTagOptions, categoryOptions,
    useFormHandlers, TagSelector, FileUploader
} from '@/components/(Admin)/(Hardwares)/HardwareFormUtils';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Hardware } from '@/types/hardware';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function NewHardwarePage() {
    const router = useRouter();
    const locale = usePathname().split('/')[1];


    const {
        tags: hardwareTagOptions,
        setTags: setHardwareTagOptions,
        loading: hardwareTagsLoading,
        error: hardwareTagsError,
        refresh: refreshTags,
    } = useHardwareTagOptions();

    const {
        tags: hardwareSolutionTagOptions,
        setTags: setHardwareSolutionTagOptions,
        loading: hardwareSolutionTagsLoading,
        error: hardwareSolutionTagsError,
        refresh: refreshSolutionTag,
    } = useHardwareSolutionTagOptions();

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
        fetch(`${baseUrl}/api/hardware`)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingTitles.includes(form.title)) {
            setError('동일한 제목의 하드웨어가 이미 존재합니다.');
            return;
        }

        const payload: Hardware = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(','),
        };

        const res = await fetch(`${baseUrl}/api/hardware`, {
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

    // Hardware Tags + SolutionTag 추가
    const handleAddDynamicTag = async ({
                                           type,
                                           tagOptions,
                                           setTagOptions,
                                           formField,
                                           scopeField,
                                       }: {
        type: string; // 'tags' | 'solutionTag'
        tagOptions: string[];
        setTagOptions: React.Dispatch<React.SetStateAction<string[]>>;
        formField: 'tags' | 'solutionTag';
        scopeField: 'resource' | 'hardware';
    }) => {
        const newTag = prompt("새 태그를 입력하세요:")?.trim();
        if (!newTag) return;

        if (tagOptions.includes(newTag)) {
            alert("이미 존재하는 태그입니다.");
            return;
        }

        const res = await fetch(`${baseUrl}/api/hardware`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newTag, type, scope: scopeField }), // ✅ scope 포함
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err?.error || "태그 추가 실패");
            return;
        }

        setTagOptions(prev => [...prev, newTag]);
        setForm((prev: typeof form) => ({
            ...prev,
            [formField]: [...prev[formField], newTag],
        }));
    };
    const handleDeleteTag = async ({
                                       name,
                                       type,
                                       scope,
                                       setOptions,
                                       setFormField,
                                       refresh,
                                   }: {
        name: string;
        type: 'tags' | 'solutionTag';
        scope: 'resource' | 'hardware';
        setOptions: React.Dispatch<React.SetStateAction<string[]>>;
        setFormField: (updater: (prev: any) => any) => void;
        refresh: () => Promise<void>;
    }) => {
        const res = await fetch(`${baseUrl}/api/tags/${encodeURIComponent(name)}?type=${type}&scope=${scope}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err.error || '삭제 실패');
            return;
        }

        setOptions(prev => prev.filter(t => t !== name));
        setFormField(prev => ({
            ...prev,
            [type]: prev[type].filter((t: string) => t !== name),
        }));

        // ✅ 실제 서버 상태도 반영
        await refresh();
    };




    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">📄 새 하드웨어 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* 날짜 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📆 날짜</label>
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
                    <label className="w-40 text-left font-medium text-gray-700">🗣️ 설명</label>
                    <input name="description" value={form.description} onChange={handleChange} placeholder="설명 입력"
                           className="flex-1 border p-2 rounded" />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">🪪 Slug</label>
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
                {/*<div className="flex items-start gap-4">*/}
                {/*    <label className="w-40 text-left pt-2 font-medium text-gray-700">🏷 대표 태그</label>*/}
                {/*    <div className="flex-1"><TagSelector field="tags" selected={form.tags}*/}
                {/*                                         onToggle={tag => toggleTag('tags', tag)}*/}
                {/*                                         options={tagsOptions} /></div>*/}
                {/*    <GoPlus/>*/}
                {/*</div>*/}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🏷 대표 태그</label>
                    <div className="flex-1">
                        {hardwareTagsLoading ? (
                            <div className="text-gray-500 text-sm">태그를 불러오는 중...</div>
                        ) : hardwareTagsError ? (
                            <div className="text-red-500 text-sm">{hardwareTagsError}</div>
                        ) : (
                            <TagSelector
                                field="tags"
                                selected={form.tags}
                                onToggle={tag => toggleTag('tags', tag)}
                                onDelete={(tag) =>
                                    handleDeleteTag({
                                        name: tag,
                                        type: 'tags',
                                        scope: 'hardware',
                                        setOptions: setHardwareTagOptions,
                                        setFormField: setForm,
                                        refresh: refreshTags,
                                    })
                                }
                                options={hardwareTagOptions}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="p-1 bg-gray-100 rounded-full text-gray-700"
                        onClick={() =>
                            handleAddDynamicTag({
                                type: 'tags',
                                tagOptions: hardwareTagOptions,
                                setTagOptions: setHardwareTagOptions,
                                formField: 'tags',
                                scopeField: 'hardware'
                            })
                        }
                    >
                        <GoPlus />
                    </button>
                </div>

                {/*/!* 솔루션 태그 *!/*/}
                {/*<div className="flex items-start gap-4">*/}
                {/*    <label className="w-40 text-left pt-2 font-medium text-gray-700">🧩 솔루션 태그</label>*/}
                {/*    <div className="flex-1"><TagSelector field="solutionTag" selected={form.solutionTag}*/}
                {/*                                         onToggle={tag => toggleTag('solutionTag', tag)}*/}
                {/*                                         options={solutionTagOptions} /></div>*/}
                {/*    <GoPlus/>*/}
                {/*</div>*/}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🧩 솔루션 태그</label>
                    <div className="flex-1">
                        {hardwareSolutionTagsLoading ? (
                            <div className="text-gray-500 text-sm">솔루션 태그를 불러오는 중...</div>
                        ) : hardwareSolutionTagsError ? (
                            <div className="text-red-500 text-sm">{hardwareSolutionTagsError}</div>
                        ) : (
                            <TagSelector
                                field="solutionTag"
                                selected={form.solutionTag}
                                onToggle={tag => toggleTag('solutionTag', tag)}
                                onDelete={(tag) =>
                                    handleDeleteTag({
                                        name: tag,
                                        type: 'solutionTag',
                                        scope: 'hardware',
                                        setOptions: setHardwareSolutionTagOptions,
                                        setFormField: setForm,
                                        refresh: refreshSolutionTag,
                                    })
                                }
                                options={hardwareSolutionTagOptions}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="p-1 bg-gray-100 rounded-full text-gray-700"
                        onClick={() =>
                            handleAddDynamicTag({
                                type: 'solutionTag',
                                tagOptions: hardwareSolutionTagOptions,
                                setTagOptions: setHardwareSolutionTagOptions,
                                formField: 'solutionTag',
                                scopeField: 'hardware'
                            })
                        }
                    >
                        <GoPlus />
                    </button>
                </div>

                {/* 숨김 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🙈 숨김 태그</label>
                    <textarea
                        name="hideTag"
                        placeholder="쉼표(,)로 구분"
                        value={form.hideTag.join(',')}
                        onChange={e =>
                            setForm((prev: typeof form) => ({
                                ...prev,
                                hideTag: e.target.value.split(',').map(t => t.trim()),
                            }))
                        }
                        className="flex-1 border p-2 rounded"
                    />
                </div>

                {/* 이미지 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🖼 대표 이미지</label>
                    <div className="flex-1">
                        {form.imageSrc && <img src={form.imageSrc} alt="현재 이미지" className="w-1/2 rounded border" />}
                        <FileUploader label="이미지 업로드" accept="image/*" page="hardware"
                                      onUpload={(url) => setForm((prev: typeof form) => ({
                                          ...prev,
                                          imageSrc: url
                                      }))} />
                    </div>
                </div>

                {/* PDF 또는 링크 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">📎 PDF 업로드</label>
                    <div className="flex-1">
                        {form.path && (
                            <a href={form.path} target="_blank"
                               className="text-blue-500 text-sm block hover:underline">현재 PDF 보기</a>
                        )}
                        <FileUploader label="PDF 업로드" accept="application/pdf" page="hardware"
                                      onUpload={(url) => setForm((prev: typeof form) => ({ ...prev, path: url }))} />
                    </div>
                </div>

                {/* 사용 여부 - Toggle */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">✅ 노출 설정</label>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.use}
                                onChange={(e) =>
                                    setForm((prev: typeof form) => ({
                                        ...prev,
                                        use: e.target.checked,
                                    }))
                                }
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
