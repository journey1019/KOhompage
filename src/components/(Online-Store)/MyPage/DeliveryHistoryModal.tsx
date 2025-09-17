/** src/components/online-store/myPage/DeliveryHistoryModal.tsx */
"use client";

import { useEffect, useMemo, useState } from "react";
import { getDeliveryHistory, type DeliveryHistoryItem } from "@/lib/api/historyApi";

type Props = {
    open: boolean;
    purchaseId: number | null;
    onClose: () => void;
};

function badgeClass(tone: "gray" | "green" | "blue" | "amber" | "red") {
    const map: Record<typeof tone, string> = {
        gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
        green: "bg-green-50 text-green-700 ring-green-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
        amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
        red: "bg-red-50 text-red-700 ring-red-600/20",
    } as any;
    return `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`;
}

function processTypeLabel(p: DeliveryHistoryItem["processType"]) {
    switch (p) {
        case "purchase": return "주문 생성";
        case "update":   return "배송 업데이트";
        case "change":   return "주소/정보 변경";
        default:         return p;
    }
}
function processTypeTone(p: DeliveryHistoryItem["processType"]): "blue" | "amber" | "gray" {
    if (p === "purchase") return "blue";
    if (p === "change")   return "amber";
    return "gray";
}

// 백엔드가 W/P/D 외에도 S(집화/발송), I(배송중 같은 의미) 등 줄 수 있으니 넓게 매핑
function statusLabel(s: string) {
    switch (s) {
        case "W": return "배송대기";
        case "P":
        case "I": return "배송중";
        case "D": return "배송완료";
        case "C": return "취소";
        case "S": return "집화/발송";
        default:  return s || "-";
    }
}
function statusTone(s: string): "green"|"amber"|"red"|"gray" {
    if (s === "D") return "green";
    if (s === "P" || s === "I" || s === "S") return "amber";
    if (s === "C") return "red";
    return "gray";
}

const fmtKST = (s?: string) => {
    if (!s) return "-";
    const d = new Date(s.replace(" ", "T") + "+09:00");
    if (Number.isNaN(d.getTime())) return s;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export default function DeliveryHistoryModal({ open, purchaseId, onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<DeliveryHistoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open || !purchaseId) return;
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getDeliveryHistory(purchaseId);
                if (alive) setRows(Array.isArray(res) ? res : []);
            } catch (e: any) {
                if (alive) setError(e?.message || "배송 이력 조회에 실패했습니다.");
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [open, purchaseId]);

    // 최신순 정렬
    const sorted = useMemo(() => {
        return [...rows].sort((a, b) => {
            const ta = new Date(a.updateDate.replace(" ", "T")).getTime();
            const tb = new Date(b.updateDate.replace(" ", "T")).getTime();
            return tb - ta;
        });
    }, [rows]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />

            <div className="absolute inset-x-0 top-10 mx-auto w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                {/* header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-base font-semibold">배송 이력 {purchaseId ? `· #${purchaseId}` : ""}</h3>
                    <button onClick={onClose} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">
                        닫기
                    </button>
                </div>

                {/* body */}
                <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
                    {loading && (
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {!loading && !error && sorted.length === 0 && (
                        <div className="rounded-md border bg-gray-50 p-4 text-sm text-gray-600">
                            배송 이력이 없습니다.
                        </div>
                    )}

                    {!loading && !error && sorted.length > 0 && (
                        <ul className="relative ml-2">
                            {/* 타임라인 수직선 */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />
                            {sorted.map((h, idx) => (
                                <li key={`${h.updateDate}-${idx}`} className="relative mb-4 pl-6">
                                    {/* 점 */}
                                    <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gray-400 ring-4 ring-white" />
                                    {/* 콘텐츠 카드 */}
                                    <div className="rounded-lg border p-3">
                                        {/* 상단행: 시간 / 타입 / 상태 */}
                                        <div className="mb-1 flex flex-wrap items-center gap-2">
                                            <span className="text-xs text-gray-500">{fmtKST(h.updateDate)}</span>
                                            <span className={badgeClass(processTypeTone(h.processType))}>
                        {processTypeLabel(h.processType)}
                      </span>
                                            <span className={badgeClass(statusTone(h.deliveryStatus))}>
                        {statusLabel(h.deliveryStatus)}
                      </span>
                                        </div>

                                        {/* 송장/배송사 */}
                                        <div className="text-sm">
                                            <div className="mb-1 text-gray-900">
                                                <span className="text-gray-600">배송사</span>{" "}
                                                <b>{h.companyName ?? h.deliveryCompany ?? "-"}</b>
                                                {"  "}
                                                <span className="ml-2 text-gray-600">송장</span>{" "}
                                                <b>{h.deliveryCode ?? "-"}</b>
                                                {h.linkUrl && (
                                                    <a
                                                        href={h.linkUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="ml-2 inline-block text-xs text-blue-600 underline"
                                                    >
                                                        배송추적
                                                    </a>
                                                )}
                                            </div>

                                            {/* 주소/수령인 */}
                                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                                <div className="text-xs text-gray-600">수령인</div>
                                                <div className="text-sm">{h.recipient}</div>

                                                <div className="text-xs text-gray-600">연락처</div>
                                                <div className="text-sm">{h.phone}</div>

                                                <div className="text-xs text-gray-600">주소</div>
                                                <div className="text-sm break-all">
                                                    {h.addressMain}
                                                    {h.addressSub ? `, ${h.addressSub}` : ""} {h.postalCode ? `(${h.postalCode})` : ""}
                                                </div>

                                                {h.deliveryDesc && (
                                                    <>
                                                        <div className="text-xs text-gray-600">배송메모</div>
                                                        <div className="text-sm">{h.deliveryDesc}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* footer */}
                <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                    <button onClick={onClose} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
