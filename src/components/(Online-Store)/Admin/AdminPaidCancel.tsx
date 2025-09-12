"use client";

import { useEffect, useState } from "react";
import { PaidCancel as callPaidCancel, type PaidCancelResponse } from "@/lib/api/adminApi";

type Props = {
    purchaseId: number;
    /** 영수증 ID(알고 있다면 주입). 미주입 시 입력 필드가 표시됩니다. */
    receiptId?: string;
    /** 모달 열릴 때 기본 메시지 */
    defaultMessage?: string;
    /** 성공 후 상위에서 재조회/갱신 등을 하고 싶을 때 */
    onSuccess?: (resp: PaidCancelResponse) => void | Promise<void>;
    onError?: (err: any) => void;
    /** 버튼 라벨/스타일 */
    buttonText?: string;
    className?: string;
    /** 이미 취소됨 등으로 버튼을 비활성화할 때 */
    disabled?: boolean | 0;
};

function Toast({ msg, tone = "success" }: { msg: string; tone?: "success" | "error" | "info" }) {
    const toneCls =
        tone === "success"
            ? "bg-green-50 text-green-800 ring-green-600/20"
            : tone === "error"
                ? "bg-red-50 text-red-700 ring-red-600/20"
                : "bg-gray-50 text-gray-700 ring-gray-600/20";
    return (
        <div className={`fixed top-4 right-4 z-[60] rounded-lg px-4 py-3 text-sm shadow-lg ring-1 ${toneCls}`}>
            {msg}
        </div>
    );
}

export default function AdminPaidCancel({
                                       purchaseId,
                                       receiptId,
                                       defaultMessage = "",
                                       onSuccess,
                                       onError,
                                       buttonText = "결제 취소",
                                       className,
                                       disabled,
                                   }: Props) {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [toast, setToast] = useState<{ msg: string; tone: "success" | "error" | "info" } | null>(null);

    const [formReceiptId, setFormReceiptId] = useState(receiptId ?? "");
    const [message, setMessage] = useState(defaultMessage);

    useEffect(() => {
        // 모달 열릴 때 최신 props를 반영
        if (open) {
            setFormReceiptId(receiptId ?? "");
            setMessage(defaultMessage);
            setErr(null);
        }
    }, [open, receiptId, defaultMessage]);

    function close() {
        if (busy) return;
        setOpen(false);
        setErr(null);
    }

    async function submit() {
        if (!formReceiptId.trim()) return setErr("영수증(Receipt) ID를 입력하세요.");
        if (!message.trim()) return setErr("취소 사유를 입력하세요.");

        try {
            setBusy(true);
            setErr(null);
            const resp = await callPaidCancel({
                purchaseId,
                receiptId: formReceiptId.trim(),
                cancelMessage: message.trim(),
            });
            // 서버 메시지 피드백
            setToast({ msg: resp.orderMessage || "결제가 취소되었습니다.", tone: resp.status ? "success" : "info" });
            setOpen(false);
            await onSuccess?.(resp);
        } catch (e: any) {
            setErr(e?.message || "결제 취소에 실패했습니다.");
            setToast({ msg: e?.message || "결제 취소에 실패했습니다.", tone: "error" });
            onError?.(e);
        } finally {
            setBusy(false);
            // 토스트 자동 제거
            setTimeout(() => setToast(null), 1800);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                disabled={disabled || undefined}
                className={className ?? "rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"}
            >
                {buttonText}
            </button>

            {/* 모달 */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* backdrop */}
                    <div className="absolute inset-0 bg-black/30" onClick={close} />
                    {/* dialog */}
                    <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-base font-semibold">결제 취소</h3>
                            <button onClick={close} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">
                                닫기
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="mb-1 text-xs text-gray-600">구매 ID</div>
                                <div className="rounded-md border bg-gray-50 px-2 py-1">{purchaseId}</div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">영수증(Receipt) ID</label>
                                <input
                                    value={formReceiptId}
                                    onChange={(e) => setFormReceiptId(e.target.value)}
                                    disabled={!!receiptId} // 부모가 내려준 값 있으면 수정 잠금 (원하면 제거)
                                    placeholder="예: 61asa~"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                                />
                                {receiptId && (
                                    <p className="mt-1 text-xs text-gray-500">상세 정보의 영수증 번호를 사용합니다.</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">취소 사유</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    placeholder="예: 고객 요청 취소"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            {err && <p className="text-sm text-red-600">{err}</p>}

                            <div className="flex justify-end gap-2 pt-1">
                                <button onClick={close} disabled={busy} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50">
                                    취소
                                </button>
                                <button
                                    onClick={submit}
                                    disabled={busy}
                                    className={`rounded-md px-3 py-2 text-sm text-white ${busy ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
                                >
                                    {busy ? "처리 중…" : "결제 취소 실행"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {toast && <Toast msg={toast.msg} tone={toast.tone} />}
        </>
    );
}
