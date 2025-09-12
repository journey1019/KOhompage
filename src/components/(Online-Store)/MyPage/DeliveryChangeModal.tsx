/** src/components/(Online-Store)/MyPage/DeliveryChangeModal.tsx */
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { postDeliveryChange, type DeliveryChangeRequestBody } from "@/lib/api/historyApi";
import AddressSearchButton from '@/components/common/AddressSearchButton';

type Props = {
    open: boolean;
    purchaseId: number;
    onClose: () => void;
    /** 현재 상세에 표시된 배송정보를 프리필 */
    initial?: Partial<Pick<
        DeliveryChangeRequestBody,
        "recipient" | "addressMain" | "addressSub" | "postalCode" | "phone" | "telNo" | "deliveryDesc"
    >>;
    /** 저장 성공 시(모달 내부는 닫힘) */
    onSuccess?: () => Promise<void> | void;
};

export default function DeliveryChangeModal({ open, purchaseId, onClose, initial, onSuccess }: Props) {
    const [form, setForm] = useState<DeliveryChangeRequestBody>({
        purchaseId,
        recipient: "",
        addressMain: "",
        addressSub: "",
        postalCode: "",
        phone: "",
        telNo: "",
        deliveryDesc: "",
    });
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [ok, setOk] = useState<string | null>(null);

    const addrSubRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!open) return;
        setErr(null);
        setOk(null);
        setForm((f) => ({
            ...f,
            purchaseId,
            recipient: initial?.recipient ?? "",
            addressMain: initial?.addressMain ?? "",
            addressSub: initial?.addressSub ?? "",
            postalCode: initial?.postalCode ?? "",
            phone: initial?.phone ?? "",
            telNo: initial?.telNo ?? "",
            deliveryDesc: initial?.deliveryDesc ?? "",
        }));
    }, [open, purchaseId, initial]);

    const valid = useMemo(() => {
        const p = form;
        if (!p.recipient.trim()) return { ok: false, reason: "수령인을 입력해 주세요." };
        if (!p.addressMain.trim()) return { ok: false, reason: "주소(기본)를 입력해 주세요." };
        if (!p.postalCode.trim()) return { ok: false, reason: "우편번호를 입력해 주세요." };
        if (!p.phone.trim()) return { ok: false, reason: "연락처를 입력해 주세요." };
        // 간단한 전화번호 검사(숫자/하이픈)
        if (!/^[0-9\-+]{7,20}$/.test(p.phone.trim())) return { ok: false, reason: "연락처 형식이 올바르지 않습니다." };
        return { ok: true as const };
    }, [form]);

    function set<K extends keyof DeliveryChangeRequestBody>(k: K) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm((s) => ({ ...s, [k]: e.target.value }));
    }

    // ▷ 다음 주소찾기 완료 콜백
    function handleAddressComplete(payload: { postalCode: string; addressMain: string }) {
        setForm((s) => ({
            ...s,
            postalCode: payload.postalCode,
            addressMain: payload.addressMain,
        }));
        // 상세주소로 포커스 이동
        setTimeout(() => addrSubRef.current?.focus(), 0);
    }

    async function submit() {
        if (!valid.ok) { setErr(valid.reason!); return; }
        try {
            setSaving(true);
            setErr(null);
            setOk(null);
            await postDeliveryChange({
                ...form,
                recipient: form.recipient.trim(),
                addressMain: form.addressMain.trim(),
                addressSub: form.addressSub.trim(),
                postalCode: form.postalCode.trim(),
                phone: form.phone.trim(),
                telNo: form.telNo?.trim() || null,
                deliveryDesc: form.deliveryDesc?.trim() || null,
            });
            setOk("배송지 변경이 저장되었습니다.");
            // 약간의 UX 딜레이 후 닫고 부모 onSuccess 호출
            setTimeout(async () => {
                onClose();
                await onSuccess?.();
            }, 350);
        } catch (e: any) {
            setErr(e?.message || "배송지 변경 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30" onClick={() => !saving && onClose()} />
            <div className="absolute inset-x-0 top-10 mx-auto w-full max-w-xl rounded-xl bg-white shadow-2xl">
                {/* header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-base font-semibold">배송지 변경</h3>
                    <button
                        onClick={() => !saving && onClose()}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
                        disabled={saving}
                    >
                        닫기
                    </button>
                </div>

                {/* body */}
                <div className="max-h-[70vh] overflow-y-auto px-4 py-4 space-y-3">
                    {err && <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}
                    {ok &&  <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">{ok}</div>}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs text-gray-600">수령인</label>
                            <input className="w-full rounded border px-3 py-2 text-sm" value={form.recipient} onChange={set("recipient")} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs text-gray-600">연락처</label>
                            <input className="w-full rounded border px-3 py-2 text-sm" value={form.phone} onChange={set("phone")} placeholder="010-1234-5678" />
                        </div>

                        {/* 우편번호 + 주소찾기 버튼 */}
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs text-gray-600">우편번호</label>
                            <div className="flex gap-2">
                                <input
                                    className="w-40 rounded border px-3 py-2 text-sm"
                                    value={form.postalCode}
                                    onChange={set("postalCode")}
                                    placeholder="예) 06536"
                                />
                                <AddressSearchButton onComplete={handleAddressComplete} />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs text-gray-600">주소(기본)</label>
                            <input
                                className="w-full rounded border px-3 py-2 text-sm"
                                value={form.addressMain}
                                onChange={set("addressMain")}
                                placeholder="도로명 주소"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs text-gray-600">주소(상세)</label>
                            <input
                                ref={addrSubRef}
                                className="w-full rounded border px-3 py-2 text-sm"
                                value={form.addressSub}
                                onChange={set("addressSub")}
                                placeholder="상세 주소를 입력하세요"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs text-gray-600">보조 연락처</label>
                            <input className="w-full rounded border px-3 py-2 text-sm" value={form.telNo ?? ""} onChange={set("telNo")} />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs text-gray-600">배송메모</label>
                            <textarea className="w-full min-h-[72px] rounded border px-3 py-2 text-sm" value={form.deliveryDesc ?? ""} onChange={set("deliveryDesc")} />
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                    <button
                        onClick={() => !saving && onClose()}
                        className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                        disabled={saving}
                    >
                        취소
                    </button>
                    <button
                        onClick={submit}
                        className={`rounded-md px-3 py-2 text-sm text-white ${saving ? "bg-gray-400" : "bg-gray-900 hover:bg-gray-800"}`}
                        disabled={saving}
                    >
                        {saving ? "저장 중…" : "저장"}
                    </button>
                </div>
            </div>
        </div>
    );
}
