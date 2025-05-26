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
            const res = await fetch('/api/tags?type=tags&scope=hardware');
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
            const res = await fetch('/api/tags?type=solutionTag&scope=hardware');
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

    return (
        <div>
            <label className="block font-medium">{label}</label>
            <input
                type="file"
                accept={accept}
                onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('page', page);

                    const res = await fetch(endpoint, { method: 'POST', body: formData });
                    const data = await res.json();
                    if (data.url) onUpload(data.url);
                }}
                className="w-full"
            />
        </div>
    )
}


export { tagsOptions, solutionTagOptions, categoryOptions, useFormHandlers, TagSelector, FileUploader };
