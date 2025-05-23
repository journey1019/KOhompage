'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'

const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

const contentTypeOptions = [
    'Article',
    'Brochure',
    'Datasheet',
    'Video',
    'Newsletter',
    'Content',
    'KaKaoTalk',
]

const solutionTagsOptions = [
    'Container-IoT',
    'Maritime',
    'Global-IoT',
    'VMS',
    'NMS',
    'Satellite',
    'OGx/IDP',
    'LowEarthOrbit',
    'Starlink',
    'AIS',
]

export default function ContentsAdd() {
    const [formState, setFormState] = useState({
        date: today,
        contentType: 'Article',
        form: 'link',
        title: '',
        subtitle: '',
        path: '',
        image: '',
        tags: [] as string[],        // ✅ 배열로 유지
        hideTag: [] as string[],
        solutionTag: [] as string[],
        use: true,
    })
    const [preview, setPreview] = useState<string | null>(null)

    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const tagsArray = value.split(',').map((t) => t.trim()).filter(Boolean)

        setFormState((prev) => ({
            ...prev,
            [name]: tagsArray,
        }))
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, multiple, selectedOptions } = e.target as HTMLSelectElement

        // 다중 선택 처리
        if (multiple) {
            const values = Array.from(selectedOptions).map((opt) => opt.value)
            setFormState((prev) => ({
                ...prev,
                [name]: values,
            }))
            return
        }

        setFormState((prev) => ({
            ...prev,
            [name]: value,
            form: ['Brochure', 'Datasheet'].includes(name === 'contentType' ? value : prev.contentType)
                ? 'pdf'
                : 'link',
        }))
    }


    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('image', file)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'x-content-type': formState.contentType, // contentType 기반으로 디렉토리 지정
            },
        })

        if (res.ok) {
            const { imagePath } = await res.json()
            setFormState((prev) => ({
                ...prev,
                image: imagePath, // 이미지 경로 반영
            }))
            setPreview(URL.createObjectURL(file))
        } else {
            alert('이미지 업로드 실패')
        }
    }

    const handleSubmit = async () => {
        // const dataToSend = {
        //     ...formState,
        //     tags: typeof formState.tags === 'string'
        //         ? formState.tags.split(',').map((t) => t.trim()).filter(Boolean)
        //         : formState.tags,
        //     hideTag: typeof formState.hideTag === 'string'
        //         ? formState.hideTag.split(',').map((t) => t.trim()).filter(Boolean)
        //         : formState.hideTag,
        //     solutionTag: formState.solutionTag, // ✅ 배열 그대로 유지
        // }

        const res = await fetch('/api/resources', {
            method: 'POST',
            body: JSON.stringify(formState),
        })

        if (res.ok) alert('성공적으로 저장되었습니다!')
        else alert('저장 실패!')
    }

    // console.log(formState)

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">리소스 등록</h2>

            <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">부제목</label>
                <input
                    type="text"
                    name="subtitle"
                    value={formState.subtitle}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-row w-full space-x-4">
                <div className="w-full">
                    <label className="block text-sm font-medium mb-1">콘텐츠 유형</label>
                    <select
                        name="contentType"
                        value={formState.contentType}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        {contentTypeOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium mb-1">콘텐츠 폼</label>
                    <input
                        type="text"
                        name="form"
                        value={formState.form}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        disabled
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">이미지 경로</label>
                <input
                    type="text"
                    name="image"
                    value={formState.image}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="/images/resources/..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {formState.form === 'pdf' ? 'PDF 파일 경로' : '링크 주소'}
                </label>
                <input
                    type="text"
                    name="path"
                    value={formState.path}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">태그</label>
                <input
                    type="text"
                    name="tags"
                    value={formState.tags.join(', ')} // ✅ 배열 → 문자열
                    onChange={handleTagsChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="예: container-iot, global-iot"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">숨김 태그</label>
                <input
                    type="text"
                    name="hideTag"
                    value={formState.hideTag.join(', ')}
                    onChange={handleTagsChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="예: maritime, onboard"
                />
            </div>


            <div>
                <label className="block text-sm font-medium mb-1">솔루션 태그</label>
                <select
                    multiple
                    name="solutionTag"
                    value={formState.solutionTag}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 h-40"
                >
                    {solutionTagsOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                    선택됨: {formState.solutionTag.join(', ')}
                </p>
            </div>


            <input type="file" accept="image/*" onChange={handleImageUpload} className="input" />
            {preview && <Image src={preview} alt="미리보기" width={300} height={180} className="rounded" />}

            <div className="text-sm text-gray-500">
                ✅ `form`은 자동 설정됨: <span className="font-mono">{formState.form}</span> <br />
                ✅ `use`는 항상 <code>true</code>로 설정됨 <br />
                ✅ `date`는 오늘 날짜: <code>{formState.date}</code>
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                리소스 등록
            </button>
        </div>
    )
}
