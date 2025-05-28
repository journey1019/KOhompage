'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { GoPlus } from "react-icons/go";
import {
    useHardwareTagOptions, useHardwareSolutionTagOptions,
    tagsOptions, solutionTagOptions, categoryOptions,
    useFormHandlers, TagSelector, FileUploader
} from '@/components/(Admin)/(Hardwares)/HardwareFormUtils';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Hardware } from '@/types/hardware';


export default function EditResourcePage() {
    const { id } = useParams();
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
        form,
        setForm,
        handleChange,
        toggleTag
    } = useFormHandlers({
        date: '',
        category: '',
        title: '',
        subtitle: '',
        description: '',
        tags: [],
        hideTag: [],
        solutionTag: [],
        imageSrc: '',
        slug: '',
        path: '',
        use: true,
    });

    // Title 중복 검사
    const [existingResources, setExistingResources] = useState<{ id: string; title: string }[]>([]);
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        fetch(`/api/hardware/${id}`)
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
    }, [id, setForm]);

    // 중복 검사를 위한 전체 리소스 가져옴
    useEffect(() => {
        fetch(`/api/hardware`)
            .then(res => res.json())
            .then(data => setExistingResources(data.map((r: any) => ({ id: r.id, title: r.title }))));
    }, []);


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setForm((prev: typeof form) => ({ ...prev, title: newTitle }));

        // 동일한 title을 가진 다른 리소스가 있는지 검사
        const isDuplicate = existingResources.some(
            (r) => r.title === newTitle && r.id !== id // 본인은 제외
        );

        if (isDuplicate) {
            setTitleError('이미 존재하는 제목입니다.');
        } else {
            setTitleError('');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (titleError) {
            alert('제목 중복을 먼저 해결해주세요.');
            return;
        }

        const payload = {
            ...form,
            tags: form.tags.join(','),
            hideTag: form.hideTag.join(','),
            solutionTag: form.solutionTag.join(','),
        };

        const res = await fetch(`/api/hardware/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push(`/${locale}/admin/hardware`);
        } else {
            const err = await res.json();
            alert(err.message || '수정 중 오류 발생');
        }
    };

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

        const res = await fetch(`/api/tags`, {
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
            <h1 className="text-2xl font-bold mb-8">✏️ 하드웨어 수정</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex items-center gap-4 w-full">
                    {/* 왼쪽: 날짜 필드 */}
                    <div className="w-1/2 flex items-center gap-4">
                        <label className="w-40 font-medium text-gray-700">📅 날짜</label>
                        <div className="flex-1">
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    {/* 오른쪽: createdAt, updatedAt */}
                    <div className="w-1/2 text-sm text-gray-600 space-y-1 text-right">
                        <div>
                            <span className="font-medium text-gray-800">생성일:</span>{' '}
                            {form.createdAt ? new Date(form.createdAt).toLocaleString() : '-'}
                        </div>
                        <div>
                            <span className="font-medium text-gray-800">수정일:</span>{' '}
                            {form.updatedAt ? new Date(form.updatedAt).toLocaleString() : '-'}
                        </div>
                    </div>
                </div>

                {/*<div key="date" className="flex items-center gap-4">*/}
                {/*    <div className="flex w-1/2">*/}
                {/*        <label className="w-40 font-medium text-gray-700">📅 날짜</label>*/}
                {/*        <div className="flex-1 rounded">*/}
                {/*            <input type="date" name="date" value={form.date} onChange={handleChange}*/}
                {/*                   className="w-full border p-2 rounded" />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div>{form.createdAt}</div>*/}
                {/*        <div>{form.updatedAt}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* 공통 입력 행 */}
                {[
                    {
                        label: '📌 제목',
                        field: <div className="w-full">
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleTitleChange}
                                className="w-full border p-2 rounded"
                            />
                            {titleError && (
                                <p className="text-red-500 text-sm mt-1">{titleError}</p>
                            )}
                        </div>
                    },
                    {
                        label: '📝 부제목',
                        field: <input name="subtitle" value={form.subtitle} onChange={handleChange}
                                      className="w-full border p-2 rounded" />,
                    },
                    {
                        label: '📁 카테고리 유형', field: (
                            <select name="category" value={form.category} onChange={handleChange}
                                    className="w-full border p-2 rounded">
                                {categoryOptions.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                        )
                    },
                    // {
                    //     label: '🙈 숨김 태그', field: (
                    //         <textarea
                    //             name="hideTag"
                    //             value={form.hideTag.join(',')}
                    //             onChange={e => setForm(prev => ({
                    //                 ...prev,
                    //                 hideTag: e.target.value.split(',').map(t => t.trim())
                    //             }))}
                    //             className="w-full border p-2 rounded"
                    //         />
                    //     )
                    // },
                    // {
                    //     label: '📄 형식 선택', field: (
                    //         <select name="form" value={form.form} onChange={handleChange}
                    //                 className="w-full border p-2 rounded">
                    //             <option value="pdf">PDF</option>
                    //             <option value="link">Link</option>
                    //         </select>
                    //     )
                    // },
                    // {
                    //     label: '🔗 링크 입력', field: form.form === 'link' && (
                    //         <input name="path" value={form.path} onChange={handleChange}
                    //                className="w-full border p-2 rounded" />
                    //     )
                    // }
                ].map(({ label, field }) => (
                    <div key={label} className="flex items-center gap-4">
                        <label className="w-40 font-medium text-gray-700">{label}</label>
                        <div className="flex-1 rounded">{field}</div>
                    </div>
                ))}

                {/* 대표 태그 선택 영역 */}
                {/*<div className="flex items-start gap-4">*/}
                {/*    <label className="w-40 font-medium pt-2">🏷 대표 태그</label>*/}
                {/*    <div className="flex-1">*/}
                {/*        <TagSelector field="tags" selected={form.tags} onToggle={(tag) => toggleTag('tags', tag)}*/}
                {/*                     options={tagsOptions} />*/}
                {/*    </div>*/}
                {/*    <button className="items-center rounded-full p-1 bg-gray-200"><GoPlus /></button>*/}
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


                {/* 솔루션 태그 선택 영역 */}
                {/*<div className="flex items-start gap-4">*/}
                {/*    <label className="w-40 font-medium pt-2">🧩 솔루션 태그</label>*/}
                {/*    <div className="flex-1">*/}
                {/*        <TagSelector field="solutionTag" selected={form.solutionTag}*/}
                {/*                     onToggle={(tag) => toggleTag('solutionTag', tag)} options={solutionTagOptions} />*/}
                {/*    </div>*/}
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

                <div className="flex items-start gap-4">
                    <label className="w-40 pt-2 font-medium text-gray-700">🙈 숨김 태그</label>
                    <textarea
                        name="hideTag"
                        placeholder="쉼표(,)로 구분"
                        value={form.hideTag.join(',')}
                        onChange={e => setForm((prev: typeof form) => ({
                            ...prev,
                            hideTag: e.target.value.split(',').map(t => t.trim()),
                        }))}
                        className="flex-1 w-full border p-1 rounded"
                    />
                </div>

                {/* 이미지 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 font-medium pt-2">🖼 대표 이미지</label>
                    <div className="flex-1 space-y-2">
                        {form.imageSrc && <img src={form.imageSrc} alt="현재 이미지" className="w-1/2 rounded border" />}
                        <FileUploader label="이미지 업로드" accept="image/*" page="hardware"
                                      onUpload={(url) => setForm((prev: typeof form) => ({ ...prev, imageSrc: url }))} />
                    </div>
                </div>

                {/* Form 형식 */}
                {/*<div className="flex items-center gap-4">*/}
                {/*    <label className="w-40 text-left font-medium text-gray-700">📄 링크 형식</label>*/}
                {/*    <select name="form" value={form.form} onChange={handleChange} className="flex-1 border p-2 rounded">*/}
                {/*        <option value="pdf">PDF</option>*/}
                {/*        <option value="link">Link</option>*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/* PDF 업로드 */}
                <div className="flex items-start gap-4">
                    <label className="w-40 font-medium pt-2">📎 PDF 파일</label>
                    <div className="flex-1 space-y-2">
                        {form.path && (
                            <a href={form.path} target="_blank" className="text-blue-500 text-sm block hover:underline">
                                현재 PDF 보기
                            </a>
                        )}
                        <FileUploader label="PDF 업로드" accept="application/pdf" page="hardware"
                                      onUpload={(url) => setForm((prev: typeof form) => ({ ...prev, path: url }))} />
                    </div>
                </div>
                {/*{form.form === 'pdf' ? (*/}
                {/*    <div className="flex items-start gap-4">*/}
                {/*        <label className="w-40 font-medium pt-2">📎 PDF 파일</label>*/}
                {/*        <div className="flex-1 space-y-2">*/}
                {/*            {form.path && (*/}
                {/*                <a href={form.path} target="_blank" className="text-blue-500 text-sm block hover:underline">현재 PDF*/}
                {/*                    보기</a>*/}
                {/*            )}*/}
                {/*            <FileUploader label="PDF 업로드" accept="application/pdf" onUpload={handlePdfUpload} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className="flex items-center gap-4">*/}
                {/*        <label className="w-40 text-left font-medium text-gray-700">🔗 링크 입력</label>*/}
                {/*        {form.path && (*/}
                {/*            <input name="path" value={form.path} onChange={handleChange}*/}
                {/*                   className="flex-1 border p-2 rounded" />*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* 사용 여부 체크박스 */}
                {/*<div className="flex items-center gap-4">*/}
                {/*    <label className="w-40 font-medium">✅ 노출 설정</label>*/}
                {/*    <input type="checkbox" name="use" checked={form.use} onChange={handleChange} />*/}
                {/*</div>*/}
                <div className="flex items-center gap-4">
                    <label className="w-40 text-left font-medium text-gray-700">✅ 노출 설정</label>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.use}
                                onChange={(e) => setForm((prev: typeof form) => ({ ...prev, use: e.target.checked }))}
                                // onChange={(e) => handleChange({
                                //     target: { name: 'use', value: e.target.checked },
                                // })}
                                color="primary"
                            />
                        }
                        label={form.use ? '사용 중' : '비활성'}
                    />
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                        수정 완료
                    </button>
                </div>
            </form>
        </div>

    );
}