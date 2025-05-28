'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { GoPlus } from 'react-icons/go';
import { XMarkIcon } from '@heroicons/react/24/solid';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
export default function TagEditorDialog({ tagOptions, setTagOptions }: {
    tagOptions: string[],
    setTagOptions: (tags: string[]) => void
}) {
    const [open, setOpen] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setNewTag('');
        setOpen(false);
    };

    const handleDelete = (tagToDelete: string) => {
        setTagOptions(tagOptions.filter(tag => tag !== tagToDelete));
        // 👉 필요 시 삭제 API 호출
        // await fetch('/api/tags/' + tagToDelete, { method: 'DELETE' });
    };

    const handleAddTag = async () => {
        if (!newTag.trim()) return;

        const clean = newTag.trim();
        if (tagOptions.includes(clean)) return;

        // 👉 POST API 호출 (예: /api/tags)
        const res = await fetch(`${baseUrl}/api/tags`, {
            method: 'POST',
            body: JSON.stringify({ tag: clean }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            setTagOptions([...tagOptions, clean]);
            setNewTag('');
        } else {
            alert('태그 추가 실패');
        }
    };

    return (
        <>
            <button onClick={handleOpen} className="items-center rounded-full p-1 bg-gray-200">
                <GoPlus />
            </button>

            <Dialog open={open} onClose={handleClose} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-white rounded-lg max-w-md w-full shadow-lg p-6 space-y-4">
                        <Dialog.Title className="text-lg font-bold">태그 편집</Dialog.Title>

                        <div className="flex flex-wrap gap-2">
                            {tagOptions.map(tag => (
                                <span
                                    key={tag}
                                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                  {tag}
                                    <button
                                        onClick={() => handleDelete(tag)}
                                        className="ml-2 text-blue-800 hover:text-red-600"
                                    >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                placeholder="새 태그 입력"
                                className="flex-1 border p-2 rounded"
                            />
                            <button
                                onClick={handleAddTag}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                추가
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleClose} className="text-gray-500 hover:text-black">닫기</button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
