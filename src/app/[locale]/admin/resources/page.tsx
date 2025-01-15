'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormData = {
    date: '',
    contentType: '',
    title: '',
    subtitle: '',
    tags: '',
    solutionTag: '',
    form: '',
    image: '',
    path: '',
    use: true,
};

const requiredFields = ['date', 'contentType', 'title', 'form', 'image', 'path'];

export default function AddResourcePage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialFormData);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // 비동기적으로 `locale` 설정
    useEffect(() => {
        let isMounted = true;

        const fetchParams = async () => {
            const resolvedParams = await params;
            if (isMounted) {
                setLocale(resolvedParams.locale || 'ko'); // 기본값 설정
            }
        };

        fetchParams();
        return () => {
            isMounted = false;
        };
    }, [params]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value.trim(),
        }));
    };

    const validateForm = () => {
        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);
        if (missingFields.length > 0) {
            setAlert({
                type: 'error',
                message: `Please fill out all required fields: ${missingFields.join(', ')}`,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!locale) {
            setAlert({ type: 'error', message: 'Locale not loaded yet.' });
            return;
        }

        if (!validateForm()) return;

        try {
            await axios.post(`/${locale}/api/resources/add`, formData);

            setAlert({ type: 'success', message: 'Resource added successfully!' });

            // 입력 필드 초기화
            setFormData(initialFormData);
        } catch {
            setAlert({ type: 'error', message: 'Failed to add resource. Please try again.' });
        } finally {
            // 3초 후 알림 숨김
            setTimeout(() => setAlert(null), 3000);
        }
    };

    if (!locale) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Resource</h1>

            {/* Alert Messages */}
            {alert && (
                <div
                    className={`fixed top-24 right-4 flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg ${
                        alert.type === 'success'
                            ? 'bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400'
                            : 'bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400'
                    }`}
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>
                        <span className="font-medium">{alert.type === 'success' ? 'Success!' : 'Failed!'}</span>{' '}
                        {alert.message}
                    </div>
                </div>
            )}

            {/* Resources Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    {/* ContentType */}
                    <div>
                        <label className="block mb-2">Content Type</label>
                        <select
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select Content Type</option>
                            <option value="Article">Article</option>
                            <option value="Brochure">Brochure</option>
                            <option value="Datasheet">Datasheet</option>
                            <option value="Newsletter">Newsletter</option>
                            <option value="Video">Video</option>
                        </select>
                    </div>

                    {/* Form */}
                    <div>
                        <label className="block mb-2">Form</label>
                        <select
                            name="form"
                            value={formData.form}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select Form</option>
                            <option value="link">Link</option>
                            <option value="pdf">PDF</option>
                            <option value="page">Page</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {/* Title */}
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="e.g., Satellite, Global-IoT"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>


                {/* Subtitle */}
                <div>
                    <label className="block mb-2">Subtitle</label>
                    <textarea
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Solution Tags */}
                <div>
                    <label className="block mb-2">Solution Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="solutionTag"
                        placeholder="e.g., Maritime, VMS"
                        value={formData.solutionTag}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Image path */}
                <div>
                    <label className="block mb-2">Image Path</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="/images/example.jpg"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                {/* Resources Path (Slug) */}
                <div>
                    <label className="block mb-2">Resource Path</label>
                    <input
                        type="text"
                        name="path"
                        placeholder="URL or page path"
                        value={formData.path}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                {/* Use CheckBox */}
                <div>
                    <label className="block mb-2">Use</label>
                    <input
                        type="checkbox"
                        name="use"
                        checked={formData.use}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                    />
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Add Resource
                </button>
            </form>
        </div>
    );
}
