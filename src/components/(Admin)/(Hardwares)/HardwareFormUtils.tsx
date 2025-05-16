'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';

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

const useFormHandlers = (initialState: any) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
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

const TagSelector = ({ field, selected, onToggle, options }: {
    field: 'tags' | 'solutionTag',
    selected: string[],
    onToggle: (tag: string) => void,
    options: string[]
}) => (
    <div className="flex flex-wrap gap-2">
        {options.map(tag => (
            <button
                key={tag}
                type="button"
                onClick={() => onToggle(tag)}
                className={`px-3 py-1 rounded-full border text-sm ${selected.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >{tag}</button>
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
