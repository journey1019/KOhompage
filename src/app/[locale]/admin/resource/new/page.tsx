'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GoPlus } from "react-icons/go";
import {
    contentTypeOptions,
    useTagOptions, useSolutionTagOptions,
    useFormHandlers, TagSelector, FileUploader
} from '@/components/(Admin)/(Resources)/ResourceFormUtils';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TiptapEditor from '@/components/(Admin)/(Resources)/Tiptap/TipTapEditor';
import { Resource } from "@/types/resource";

export default function NewResourcePage() {
    const router = useRouter();
    const locale = usePathname().split('/')[1];

    const {
        tags: tagOptions,
        loading: tagsLoading,
        error: tagsError,
        setTags: setTagOptions,
        refresh: refreshTags,
    } = useTagOptions();

    const {
        tags: solutionTagOptions,
        loading: solutionTagsLoading,
        error: solutionTagsError,
        setTags: setSolutionTagOptions,
        refresh: refreshSolutionTag,
    } = useSolutionTagOptions();

    const {
        form, setForm, handleChange, toggleTag
    } = useFormHandlers({
        id: 0,
        date: new Date().toISOString().split('T')[0],
        contentType: 'Brochure',
        title: '',
        subtitle: '',
        tags: [],           // ✅ string[]
        hideTag: [],        // ✅ string[]
        solutionTag: [],    // ✅ string[]
        form: 'pdf',
        image: '',
        path: '',
        use: true,
        html: ''
    });

    const [existingTitles, setExistingTitles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/resource`)
            .then(res => res.json())
            .then(data => setExistingTitles(data.map((r: any) => r.title)));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingTitles.includes(form.title)) {
            setError('동일한 제목의 리소스가 이미 존재합니다.');
            return;
        }

        const payload: Resource = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(','),
            html:form.html
        };

        const res = await fetch(`/api/resource`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push(`/${locale}/admin/resource`);
        } else {
            const err = await res.json();
            setError(err.message || '등록 중 오류 발생');
        }
    };

    const handleAddDynamicTag = async ({
                                           type,
                                           scope,
                                           tagOptions,
                                           setTagOptions,
                                           formField,
                                       }: {
        type: 'tags' | 'solutionTag';
        scope: 'resource' | 'hardware';
        tagOptions: string[];
        setTagOptions: React.Dispatch<React.SetStateAction<string[]>>;
        formField: 'tags' | 'solutionTag';
    }) => {
        const promptText = type === 'tags' ? '추가할 태그 이름을 입력하세요:' : '새 솔루션 태그를 입력하세요:';
        const newTag = prompt(promptText)?.trim();

        if (!newTag) return;

        if (tagOptions.includes(newTag)) {
            alert("이미 존재하는 태그입니다.");
            return;
        }

        const res = await fetch(`/api/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newTag, type, scope: scope }),
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err?.error || "태그 추가 실패");
            return;
        }

        setTagOptions(prev => [...prev, newTag]);
        setForm(prev => ({
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
        const res = await fetch(`/api/tags/${encodeURIComponent(name)}?type=${type}&scope=${scope}`, {
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
            <h1 className="text-2xl font-bold mb-8">📄 새 리소스 등록</h1>
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

                {/* 콘텐츠 유형 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📁 콘텐츠 유형</label>
                    <select name="contentType" value={form.contentType} onChange={handleChange}
                            className="flex-1 border p-2 rounded">
                        {contentTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>

                {/* 대표 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🏷 대표 태그</label>
                    <div className="flex-1">
                        {tagsLoading ? (
                            <div className="text-gray-500 text-sm">태그를 불러오는 중...</div>
                        ) : tagsError ? (
                            <div className="text-red-500 text-sm">{tagsError}</div>
                        ) : (
                            <TagSelector
                                field="tags"
                                selected={form.tags}
                                onToggle={tag => toggleTag('tags', tag)}
                                onDelete={(tag) =>
                                    handleDeleteTag({
                                        name: tag,
                                        type: 'tags',
                                        scope: 'resource',
                                        setOptions: setSolutionTagOptions,
                                        setFormField: setForm,
                                        refresh: refreshTags
                                    })
                                }
                                options={tagOptions}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="p-1 bg-gray-100 rounded-full text-gray-700"
                        onClick={() =>
                            handleAddDynamicTag({
                                type: 'tags',
                                scope: 'resource',
                                tagOptions,
                                setTagOptions,
                                formField: 'tags',
                            })
                        }
                    >
                        <GoPlus />
                    </button>
                </div>

                {/* 솔루션 태그 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 text-left pt-2 font-medium text-gray-700">🧩 솔루션 태그</label>
                    <div className="flex-1">
                        {solutionTagsLoading ? (
                            <div className="text-gray-500 text-sm">솔루션 태그를 불러오는 중...</div>
                        ) : solutionTagsError ? (
                            <div className="text-red-500 text-sm">{solutionTagsError}</div>
                        ) : (
                            <TagSelector
                                field="solutionTag"
                                selected={form.solutionTag}
                                onToggle={tag => toggleTag('solutionTag', tag)}
                                onDelete={(tag) =>
                                    handleDeleteTag({
                                        name: tag,
                                        type: 'solutionTag',
                                        scope: 'resource',
                                        setOptions: setSolutionTagOptions,
                                        setFormField: setForm,
                                        refresh: refreshSolutionTag,
                                    })
                                }
                                options={solutionTagOptions}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="p-1 bg-gray-100 rounded-full text-gray-700"
                        onClick={() =>
                            handleAddDynamicTag({
                                type: 'solutionTag',
                                scope: 'resource',
                                tagOptions: solutionTagOptions,
                                setTagOptions: setSolutionTagOptions,
                                formField: 'solutionTag',
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
                        {form.image && <img src={form.image} alt="현재 이미지" className="w-1/2 rounded border" />}
                        <FileUploader label="이미지 업로드" accept="image/*" page="resources" onUpload={(url) => setForm(prev => ({ ...prev, image: url }))} />
                    </div>
                </div>

                {/* 링크 형식 선택 */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">📄 링크 형식</label>
                    <select name="form" value={form.form} onChange={handleChange} className="flex-1 border p-2 rounded">
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                        <option value="page">Page</option>
                    </select>
                </div>

                {/* PDF 또는 링크 업로드 */}
                {form.form === 'pdf' ? (
                    <div className="flex items-start gap-4">
                        <label className="w-40 text-left pt-2 font-medium text-gray-700">📎 PDF 업로드</label>
                        <div className="flex-1">
                            {form.path && (
                                <a href={form.path} target="_blank" className="text-blue-500 text-sm block hover:underline">현재 PDF
                                    보기</a>
                            )}
                            <FileUploader label="PDF 업로드" accept="application/pdf" page="resources" onUpload={(url) => setForm(prev => ({...prev, image: url}))} />
                        </div>
                    </div>
                ) : form.form === 'link' ? (
                    <div className="flex items-center gap-4">
                        <label className="w-40 text-left font-medium text-gray-700">🔗 링크 입력</label>
                        <input name="path" value={form.path} onChange={handleChange}
                               className="flex-1 border p-2 rounded" />
                    </div>
                ) : (
                    <>
                        {/*<TiptapEditor/>*/}
                        <TiptapEditor
                            content={form.html ?? ''}
                            onChange={(newHtml) => setForm(prev => ({ ...prev, html: newHtml }))}
                        />
                    </>
                )}

                {/* 사용 여부 - Toggle */}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">✅ 노출 설정</label>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.use}
                                onChange={(e) => setForm(prev => ({ ...prev, use: e.target.checked }))}
                                // onChange={(e) => handleChange({
                                //     target: { name: 'use', value: e.target.checked },
                                // })}
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
