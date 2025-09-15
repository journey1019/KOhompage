'use client';

import { useEffect, useState } from 'react';
import { fetchDeliveryList, type DeliveryManageListItem } from '@/lib/api/delivery';

type Props = {
    open: boolean;
    onClose: () => void;
    onSelect: (item: DeliveryManageListItem) => void; // 선택 시 콜백
};

export default function DeliverySelectModal({ open, onClose, onSelect }: Props) {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<DeliveryManageListItem[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        if (!open) return;
        let alive = true;
        setLoading(true); setErr(null);
        fetchDeliveryList()
            .then(list => { if (alive) setRows(Array.isArray(list) ? list : []); })
            .catch(e => { if (alive) setErr(e?.message ?? '배송지 목록을 불러오지 못했습니다.'); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [open]);

    // Esc로 닫기
    useEffect(() => {
        function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
        if (open) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* dialog */}
            <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h2 className="text-base font-semibold">배송지 선택</h2>
                    <button onClick={onClose} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">닫기</button>
                </div>

                <div className="max-h-[70vh] overflow-auto p-4 space-y-3">
                    {loading && <div className="p-4 rounded border bg-gray-50">불러오는 중…</div>}
                    {err && <div className="p-4 rounded border bg-red-50 text-red-700">{err}</div>}
                    {!loading && !err && rows.length === 0 && (
                        <div className="p-4 rounded border bg-gray-50">
                            등록된 배송지가 없습니다. 마이페이지에서 배송지를 먼저 등록해 주세요.
                        </div>
                    )}

                    {!loading && !err && rows.map(item => (
                        <label
                            key={item.addressIndex}
                            className="flex gap-3 rounded-lg border p-3 hover:bg-gray-50 cursor-pointer"
                        >
                            <input
                                type="radio"
                                className="mt-1"
                                name="delivery-select"
                                checked={selected === item.addressIndex}
                                onChange={() => setSelected(item.addressIndex)}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.alias || '배송지'}</span>
                                    {item.useYn === 'Y' && (
                                        <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] text-green-700 ring-1 ring-inset ring-green-600/20">기본</span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-700 mt-1">
                                    {item.recipient} · {item.phone}
                                </div>
                                <div className="text-sm text-gray-600 truncate">
                                    [{item.postalCode}] {item.addressMain} {item.addressSub}
                                </div>
                                {item.deliveryDesc && (
                                    <div className="text-xs text-gray-500 mt-1">메모: {item.deliveryDesc}</div>
                                )}
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                    <button onClick={onClose} className="rounded-md border px-3 py-2 text-sm">취소</button>
                    <button
                        onClick={() => {
                            const chosen = rows.find(r => r.addressIndex === selected);
                            if (!chosen) return;
                            onSelect(chosen);
                            onClose();
                        }}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
                        disabled={!selected}
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}
