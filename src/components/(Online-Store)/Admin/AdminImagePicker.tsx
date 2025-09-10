"use client";
import { useEffect, useMemo, useState } from "react";

export function AdminImagePicker({
                                     label = "대표 이미지",
                                     initialImageUrl,
                                     initialDesc = "",
                                     onFileChange,
                                     onDescChange,
                                 }: {
    label?: string;
    initialImageUrl?: string | null;
    initialDesc?: string;
    onFileChange: (file: File | null) => void;
    onDescChange: (desc: string) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [desc, setDesc] = useState(initialDesc ?? "");
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    const previewUrl = useMemo(() => {
        if (file && objectUrl) return objectUrl;
        return initialImageUrl || null;
    }, [file, objectUrl, initialImageUrl]);

    useEffect(() => {
        onDescChange(desc);
    }, [desc, onDescChange]);

    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setObjectUrl(url);
        onFileChange(file);
        return () => {
            URL.revokeObjectURL(url);
            setObjectUrl(null);
        };
    }, [file, onFileChange]);

    const handleClear = () => {
        setFile(null);
        onFileChange(null);
        // 기존 이미지 유지: initialImageUrl은 부모가 들고 있으므로 여기선 nothing
    };

    return (
        <div className="space-y-2">
            <div className="text-xs text-gray-600">{label}</div>
            <div className="flex gap-3">
                <div className="w-28">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="aspect-square w-28 rounded border object-cover"
                        />
                    ) : (
                        <div className="aspect-square w-28 rounded border bg-gray-50 text-center text-xs text-gray-400 grid place-items-center">
                            No Image
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="block w-full text-sm file:mr-3 file:rounded border file:border-0 file:bg-gray-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
                    />
                    {previewUrl && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="rounded border px-2 py-1 text-xs hover:bg-gray-50"
                        >
                            선택 해제
                        </button>
                    )}
                    <div>
                        <label className="mb-1 block text-xs text-gray-600">사진 설명(mainDesx)</label>
                        <input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="w-full rounded border px-3 py-2 text-sm"
                            placeholder="예) 설치 사진, 패키지 구성 등"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
