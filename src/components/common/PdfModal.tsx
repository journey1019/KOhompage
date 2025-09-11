"use client";

import { useEffect } from "react";

type PdfModalProps = {
    open: boolean;
    title: string;
    src: string | null;
    onClose: () => void;
};

export default function PdfModal({ open, title, src, onClose }: PdfModalProps) {
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute inset-0 grid place-items-center p-4">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-3">
                        <h3 className="text-base font-semibold">{title}</h3>
                        <button
                            aria-label="닫기"
                            onClick={onClose}
                            className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                            title="닫기"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="h-[75vh]">
                        {src ? (
                            <iframe src={src} className="h-full w-full" />
                        ) : (
                            <div className="p-6 text-sm text-gray-600">문서를 불러올 수 없습니다.</div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 border-t p-3">
                        {src && (
                            <a
                                href={src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 underline"
                            >
                                새 탭에서 열기
                            </a>
                        )}
                        <button onClick={onClose} className="rounded-md border px-3 py-1 text-sm">
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
