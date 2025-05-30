'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoIosClose } from 'react-icons/io';

const tagsOptions = [
    'Global-IoT', 'Container-IoT', 'Dry', 'Reefer', 'Satellite', 'AIS', 'Sigfox', 'Starlink', 'OGx/IDP', 'NTN'
];

const networkOptions = [
    'ORBCOMM', 'OGx/IDP', 'Starlink', 'NTN', 'Cellular', 'Tracking', 'Asset'
];

const solutionTagOptions = [
    'Container-IoT', 'Maritime', 'Global-IoT', 'NMS', 'VMS',
    'Satellite', 'OGx/IDP', 'LowEarthOrbit', 'Starlink', 'AIS'
];

const categoryOptions = [
    'Module', 'Device', 'Antenna', 'Sensor'
];

// ✅ Hardware에서 태그를 가져오는 Hook
export const useHardwareTagOptions = (): {
    tags: string[];
    loading: boolean;
    error: string | null;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    refresh: () => Promise<void>; // 추가됨
} => {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tags?type=tags&scope=hardware`);
            const data = await res.json();
            setTags(data.map((t: any) => t.name));
            setLoading(false);
        } catch (err) {
            console.error('하드웨어 태그 로딩 실패:', err);
            setError('하드웨어 태그를 불러오는 데 실패했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return { tags, loading, error, setTags, refresh: fetchTags };
};


export const useHardwareSolutionTagOptions = (): {
    tags: string[];
    loading: boolean;
    error: string | null;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    refresh: () => Promise<void>; // 추가됨
} => {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tags?type=solutionTag&scope=hardware`);
            const data = await res.json();
            setTags(data.map((t: any) => t.name));
            setLoading(false);
        } catch (err) {
            console.error('하드웨어 솔루션 태그 로딩 실패:', err);
            setError('하드웨어 솔루션 태그를 불러오는 데 실패했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return { tags, loading, error, setTags, refresh: fetchTags };
};



const useFormHandlers = (initialState: any) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setForm((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleTag = (field: 'tags' | 'solutionTag', tag: string) => {
        setForm((prev: any) => {
            const list = prev[field].includes(tag)
                ? prev[field].filter((t: string) => t !== tag)
                : [...prev[field], tag];
            return { ...prev, [field]: list };
        });
    };

    return { form, setForm, handleChange, toggleTag };
};

const TagSelector = ({ field, selected, onToggle, onDelete, options }: {
    field: 'tags' | 'solutionTag',
    selected: string[],
    onToggle: (tag: string) => void,
    onDelete?: (tag: string) => void, // 삭제룔 콜백 추가
    options: string[]
}) => (
    <div className="flex flex-wrap gap-2">
        {options.map(tag => (
            <div key={tag} className="relative inline-flex items-center">
                <button
                    type="button"
                    onClick={() => onToggle(tag)}
                    className={`px-3 py-1 pr-6 rounded-full border text-sm flex items-center gap-1 ${
                        selected.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                >
                    {tag}
                </button>
                {onDelete && (
                    <IoIosClose
                        className="absolute right-1 top-1.5 cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`'${tag}' 태그를 정말 삭제할까요?`)) {
                                onDelete(tag);
                            }
                        }}
                    />
                )}
            </div>
        ))}
    </div>
);

const FileUploader = ({
                          label,
                          accept,
                          page,
                          onUpload,
                      }: {
    label: string;
    accept: string;
    page: 'resources' | 'hardware';
    onUpload: (url: string) => void;
}) => {
    const endpoint = accept.includes('pdf') ? '/api/upload/pdf' : '/api/upload/image';

    // accept 예: "image/jpeg,image/png" 또는 "image/*"
    // 허용 확장자 배열 생성 (image/*인 경우 기본 확장자 리스트 표시)
    const acceptedFormats = accept === 'image/*'
        ? ['jpg', 'jpeg', 'png', 'gif', 'webp']
        : accept
            .split(',')
            .map((type) => type.split('/')[1] || '')
            .filter(Boolean);

    const maxFileSizeMB = 5; // 예: 5MB 권장
    const recommendedWidth = 258;  // 권장 가로 픽셀
    const recommendedHeight = 258;  // 권장 세로 픽셀

    return (
        <div>
            <label className="block font-medium">{label}</label>
            <input
                type="file"
                accept={accept}
                onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > maxFileSizeMB * 1024 * 1024) {
                        alert(`파일 크기는 최대 ${maxFileSizeMB}MB 이하로 업로드해주세요.`);
                        return;
                    }

                    // 이미지 사이즈 검사 (이미지 파일인 경우만)
                    if (file.type.startsWith('image/')) {
                        const img = new Image();
                        img.onload = () => {
                            if (img.width > recommendedWidth || img.height > recommendedHeight) {
                                alert(`이미지 크기는 최대 ${recommendedWidth}x${recommendedHeight} 픽셀 권장입니다.`);
                                // 권고사항일 뿐 업로드는 계속 진행할 수도 있음
                            }
                        };
                        img.onerror = () => {
                            alert("이미지 크기 확인에 실패했습니다.");
                        };
                        img.src = URL.createObjectURL(file);
                    }

                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('page', page);

                    const res = await fetch(endpoint, { method: 'POST', body: formData });
                    const data = await res.json();

                    if (data.url) onUpload(data.url);
                }}
                className="w-full"
            />

            <p className="mt-1 text-sm text-gray-500">
                권장 용량: 최대 {maxFileSizeMB}MB | 지원 형식: {acceptedFormats.join(', ')}
                {accept === 'image/*' && (
                    <> | 권장 크기: {recommendedWidth}x{recommendedHeight} px</>
                )}
            </p>
        </div>
    )
}


export { tagsOptions, solutionTagOptions, categoryOptions, useFormHandlers, TagSelector, FileUploader };
