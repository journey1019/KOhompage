"use client";

import React from "react";

type Props = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children?: React.ReactNode; // 항목별 다른 전문 내용 주입
};

export default function TermsModal({ open, title, onClose, children }: Props) {
    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-5 py-3">
                    <h3 className="text-lg font-semibold">{title ?? "전문보기"}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                    >
                        닫기
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-auto px-5 py-4 text-sm leading-6 text-gray-700">
                    {children}
                </div>

                <div className="flex justify-end gap-2 border-t px-5 py-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
