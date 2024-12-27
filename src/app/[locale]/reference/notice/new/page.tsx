"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Correctly import TinyMCE Editor
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });

const NewNoticePage = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [contents, setContents] = useState('');
    const router = useRouter();

    const handleSave = () => {
        const newNotice = {
            id: `${Date.now()}`,
            title,
            date,
            category,
            contents,
        };
        const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
        storedNotices.push(newNotice);
        localStorage.setItem('notices', JSON.stringify(storedNotices));

        router.push('/resources/notice');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Notice</h1>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Contents</label>
                {typeof window !== 'undefined' && (
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} // Use environment variable for security
                        value={contents}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | help',
                            content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={(content) => setContents(content)}
                    />
                )}
            </div>
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Save Notice
            </button>
        </div>
    );
};

export default NewNoticePage;