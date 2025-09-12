"use client";

import { useEffect, useState } from "react";
import { PaidCancel as callPaidCancel, type PaidCancelResponse } from "@/lib/api/paidApi";

type Props = {
    purchaseId: number;
    receiptId?: string;               // 상세에서 받은 값이 있으면 주입(수정 잠금)
    defaultMessage?: string;          // 기본 취소 사유
    cancellable?: boolean;            // 외부에서 취소 가능여부 판단해 내려주면 그 값 사용
    disabledReason?: string;          // 비활성화 이유(툴팁)
    onSuccess?: (resp: PaidCancelResponse) => void | Promise<void>;
    onError?: (err: any) => void;
    buttonText?: string;
    className?: string;
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

export default function PaidCancelUser({
                                           purchaseId,
                                           receiptId,
                                           defaultMessage = "",
                                           cancellable = true,
                                           disabledReason,
                                           onSuccess,
                                           onError,
                                           buttonText = "결제 취소",
                                           className,
                                       }: Props) {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [toast, setToast] = useState<{ msg: string; tone: "success" | "error" | "info" } | null>(null);

    const [formReceiptId, setFormReceiptId] = useState(receiptId ?? "");
    const [message, setMessage] = useState(defaultMessage);

    useEffect(() => {
        if (open) {
            setFormReceiptId(receiptId ?? "");
            setMessage(defaultMessage);
            setErr(null);
        }
    }, [open, receiptId, defaultMessage]);

    const disabled = !cancellable || busy;

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
            setToast({ msg: resp.orderMessage || "결제가 취소되었습니다.", tone: resp.status ? "success" : "info" });
            setOpen(false);
            await onSuccess?.(resp);
        } catch (e: any) {
            setErr(e?.message || "결제 취소에 실패했습니다.");
            setToast({ msg: e?.message || "결제 취소에 실패했습니다.", tone: "error" });
            onError?.(e);
        } finally {
            setBusy(false);
            setTimeout(() => setToast(null), 1800);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                disabled={disabled}
                title={disabled ? (disabledReason || "취소할 수 없습니다.") : ""}
                className={
                    className ??
                    "rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                }
            >
                {buttonText}
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30" onClick={() => !busy && setOpen(false)} />
                    <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-base font-semibold">결제 취소</h3>
                            <button
                                onClick={() => !busy && setOpen(false)}
                                className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                            >
                                닫기
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            {/*<div>*/}
                            {/*    <div className="mb-1 text-xs text-gray-600">구매 ID</div>*/}
                            {/*    <div className="rounded-md border bg-gray-50 px-2 py-1">{purchaseId}</div>*/}
                            {/*</div>*/}

                            {/*<div>*/}
                            {/*    <label className="mb-1 block text-xs font-medium text-gray-600">영수증(Receipt) ID</label>*/}
                            {/*    <input*/}
                            {/*        value={formReceiptId}*/}
                            {/*        onChange={(e) => setFormReceiptId(e.target.value)}*/}
                            {/*        disabled={!!receiptId}*/}
                            {/*        placeholder="예: 61asa~"*/}
                            {/*        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"*/}
                            {/*    />*/}
                            {/*    {receiptId && <p className="mt-1 text-xs text-gray-500">주문 상세의 영수증 번호를 사용합니다.</p>}*/}
                            {/*</div>*/}

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">취소 사유</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    placeholder="예: 단순 변심"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            {err && <p className="text-sm text-red-600">{err}</p>}

                            <div className="flex justify-end gap-2 pt-1">
                                <button
                                    onClick={() => !busy && setOpen(false)}
                                    disabled={busy}
                                    className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={submit}
                                    disabled={busy}
                                    className={`rounded-md px-3 py-2 text-sm text-white ${
                                        busy ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                                    }`}
                                >
                                    {busy ? "처리 중…" : "결제 취소 실행"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast && <Toast msg={toast.msg} tone={toast.tone} />}
        </>
    );
}
