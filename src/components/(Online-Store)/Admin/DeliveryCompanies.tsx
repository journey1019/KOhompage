"use client";

import { useEffect, useMemo, useState } from "react";
import {
    DeliveryList,
    type Delivery,
    DeliveryAdd,
    DeliveryUpdate,
    type DeliveryMinimum,
    RemoveDeliveryCompany,
} from "@/lib/api/adminApi";
import { TiPlus } from "react-icons/ti";
import { fmtKST } from '@/module/pgAdminHelper'

function classNames(...xs: (string | false | null | undefined)[]) {
    return xs.filter(Boolean).join(" ");
}

type FormMode = "add" | "edit";

export default function DeliveryCompanies() {
    const [rows, setRows] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // local filters
    const [q, setQ] = useState(""); // 회사명/도메인 검색

    // modal state
    const [mode, setMode] = useState<FormMode | null>(null);
    const [initial, setInitial] = useState<DeliveryMinimum | null>(null);
    const [saving, setSaving] = useState(false);
    const [formErr, setFormErr] = useState<string | null>(null);

    // form local state
    const [deliveryCompany, setDeliveryCompany] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [mainDomainUrl, setMainDomainUrl] = useState("");
    const [fullUrl, setFullUrl] = useState("");
    const [codeLength, setCodeLength] = useState<number | "">("");

    // 삭제 확인 모달 상태
    const [removeOpen, setRemoveOpen] = useState(false);
    const [removeTarget, setRemoveTarget] = useState<Delivery | null>(null);
    const [removing, setRemoving] = useState(false);
    const [removeErr, setRemoveErr] = useState<string | null>(null);


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setErr(null);
                const list = await DeliveryList();
                setRows(Array.isArray(list) ? list : []);
            } catch (e: any) {
                setErr(e?.message || "배송사 정보를 불러오지 못했습니다.");
                setRows([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        if (!qq) return rows;
        return rows.filter(
            (r) =>
                r.companyName?.toLowerCase().includes(qq) ||
                r.deliveryCompany?.toLowerCase().includes(qq) ||
                r.mainDomainUrl?.toLowerCase().includes(qq) ||
                r.fullUrl?.toLowerCase().includes(qq)
        );
    }, [rows, q]);

    /** 모달 열기 (추가) */
    const openAdd = () => {
        setMode("add");
        setInitial(null);
        setFormErr(null);
        setDeliveryCompany("");
        setCompanyName("");
        setMainDomainUrl("");
        setFullUrl("");
        setCodeLength("");
    };

    /** 모달 열기 (수정) */
    const openEdit = (r: Delivery) => {
        setMode("edit");
        setInitial({
            deliveryCompany: r.deliveryCompany,
            companyName: r.companyName,
            mainDomainUrl: r.mainDomainUrl,
            fullUrl: r.fullUrl,
            codeLength: r.codeLength,
        });
        setFormErr(null);
        setDeliveryCompany(r.deliveryCompany);
        setCompanyName(r.companyName);
        setMainDomainUrl(r.mainDomainUrl);
        setFullUrl(r.fullUrl);
        setCodeLength(r.codeLength);
    };

    const closeModal = () => {
        if (saving) return;
        setMode(null);
        setInitial(null);
        setFormErr(null);
    };

    /** 간단 유효성 검사 */
    const validate = (): string | null => {
        if (!deliveryCompany.trim()) return "코드(deliveryCompany)는 필수입니다.";
        if (!companyName.trim()) return "회사명(companyName)은 필수입니다.";
        if (!mainDomainUrl.trim()) return "메인 도메인은 필수입니다.";
        if (!fullUrl.trim()) return "추적 URL(fullUrl)은 필수입니다.";
        if (codeLength === "" || Number.isNaN(Number(codeLength)))
            return "코드 길이는 숫자여야 합니다.";
        if (Number(codeLength) <= 0) return "코드 길이는 1 이상이어야 합니다.";
        return null;
    };

    /** 저장 처리: add/update */
    const onSubmit = async () => {
        const msg = validate();
        if (msg) {
            setFormErr(msg);
            return;
        }
        const payload: DeliveryMinimum = {
            deliveryCompany: deliveryCompany.trim(),
            companyName: companyName.trim(),
            mainDomainUrl: mainDomainUrl.trim(),
            fullUrl: fullUrl.trim(),
            codeLength: Number(codeLength),
        };

        try {
            setSaving(true);
            setFormErr(null);

            if (mode === "add") {
                await DeliveryAdd(payload);

                // 낙관적 추가: 생성자/일자 등은 백엔드에서 내려오지 않으므로 임시값 처리
                const now = new Date().toISOString().slice(0, 19).replace("T", " ");
                const newRow: Delivery = {
                    ...payload,
                    createId: "-",
                    createDate: now,
                    updateId: null,
                    updateDate: null,
                } as Delivery;

                setRows((prev) => {
                    // 동일 코드가 이미 있으면 교체
                    const exists = prev.find((x) => x.deliveryCompany === payload.deliveryCompany);
                    return exists
                        ? prev.map((x) => (x.deliveryCompany === payload.deliveryCompany ? { ...newRow } : x))
                        : [newRow, ...prev];
                });
            } else if (mode === "edit") {
                await DeliveryUpdate(payload);

                // 낙관적 수정
                const now = new Date().toISOString().slice(0, 19).replace("T", " ");
                setRows((prev) =>
                    prev.map((x) =>
                        x.deliveryCompany === payload.deliveryCompany
                            ? {
                                ...x,
                                companyName: payload.companyName,
                                mainDomainUrl: payload.mainDomainUrl,
                                fullUrl: payload.fullUrl,
                                codeLength: payload.codeLength,
                                updateId: "-", // 필요시 로그인 사용자 ID로 대체
                                updateDate: now,
                            }
                            : x
                    )
                );
            }

            closeModal();
        } catch (e: any) {
            setFormErr(e?.message || "저장 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    };

    /** 삭제 확인 모달 열기 */
    const openRemove = (r: Delivery) => {
        setRemoveTarget(r);
        setRemoveErr(null);
        setRemoveOpen(true);
    };
    const closeRemove = () => {
        if (removing) return;
        setRemoveOpen(false);
        setRemoveTarget(null);
        setRemoveErr(null);
    };

    /** 실제 삭제 처리 */
    const doRemove = async () => {
        if (!removeTarget) return;
        try {
            setRemoving(true);
            setRemoveErr(null);
            const res = await RemoveDeliveryCompany(removeTarget.deliveryCompany);
            if (res && res.status === false) {
                throw new Error("삭제 요청이 거절되었습니다.");
            }
            // 낙관적 갱신
            setRows((prev) => prev.filter((x) => x.deliveryCompany !== removeTarget.deliveryCompany));
            closeRemove();
        } catch (e: any) {
            setRemoveErr(e?.message || "삭제 중 오류가 발생했습니다.");
        } finally {
            setRemoving(false);
        }
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header / Controls */}
            <div className="flex items-end justify-between gap-2 p-4">
                <div>
                    <h2 className="text-base font-semibold">배송사 리스트</h2>
                    <p className="mt-1 text-xs text-gray-600">관리자용 · 배송사/추적 URL/코드 길이</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="회사명/도메인/코드 검색"
                        className="w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                        onClick={openAdd}
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                        title="배송사 추가"
                    >
                        <TiPlus className="text-lg" />
                        추가
                    </button>
                </div>
            </div>

            {/* Table (이 섹션 내부에서만 가로 스크롤) */}
            <div className="relative max-w-full overflow-x-auto overscroll-x-contain touch-pan-x">
                <table className="w-max min-w-max table-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                        <th className="sticky left-0 z-30 bg-gray-50 p-3 w-[180px]">회사명</th>
                        <th className="sticky left-[180px] z-30 bg-gray-50 p-3 w-[160px]">코드</th>
                        <th className="p-3 w-[260px]">메인 도메인</th>
                        <th className="p-3 w-[400px]">추적 URL (fullUrl)</th>
                        <th className="p-3 w-[160px]">코드 길이</th>
                        <th className="p-3 w-[200px]">생성자/일자</th>
                        <th className="p-3 w-[200px]">수정자/일자</th>
                        <th className="p-3 w-[200px]">동작</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm whitespace-nowrap">
                    {loading && (
                        <>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {Array.from({ length: 8 }).map((_, j) => (
                                        <td key={j} className="p-3">
                                            <div className="h-4 w-full rounded bg-gray-200" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </>
                    )}

                    {!loading && err && (
                        <tr>
                            <td className="p-6 text-center text-red-600" colSpan={8}>
                                {err}
                            </td>
                        </tr>
                    )}

                    {!loading && !err && filtered.length === 0 && (
                        <tr>
                            <td className="p-6 text-center text-gray-500" colSpan={8}>
                                해당 조건의 배송사가 없습니다.
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        !err &&
                        filtered.map((r) => (
                            <tr key={`${r.deliveryCompany}-${r.companyName}`} className="hover:bg-gray-50">
                                {/* sticky 2컬럼 */}
                                <td className="sticky left-0 z-20 bg-white p-3 w-[180px] truncate">
                                    {r.companyName}
                                </td>
                                <td className="sticky left-[180px] z-20 bg-white p-3 w-[160px] truncate">
                                    {r.deliveryCompany}
                                </td>

                                <td className="p-3 w-[260px] truncate">
                                    {r.mainDomainUrl ? (
                                        <a
                                            href={r.mainDomainUrl}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {r.mainDomainUrl}
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="p-3 w-[400px] truncate">
                                    {r.fullUrl ? (
                                        <a
                                            href={r.fullUrl}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {r.fullUrl}
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="p-3 w-[160px]">{r.codeLength}</td>
                                <td className="p-3 w-[200px]">
                                    <div className="truncate">{r.createId}</div>
                                    <div className="text-xs text-gray-500">{fmtKST(r.createDate)}</div>
                                </td>
                                <td className="p-3 w-[200px]">
                                    <div className="truncate">{r.updateId ?? "-"}</div>
                                    <div className="text-xs text-gray-500">{fmtKST(r.updateDate)}</div>
                                </td>
                                <td className="p-3 w-[200px]">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                // 행 데이터로 수정 모달 오픈
                                                openEdit(r);
                                            }}
                                            className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(r.fullUrl)}
                                            className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                                        >
                                            URL 복사
                                        </button>
                                        {r.fullUrl && (
                                            <a
                                                href={r.fullUrl}
                                                target="_blank"
                                                className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                                            >
                                                추적
                                            </a>
                                        )}
                                        <button
                                            onClick={() => openRemove(r)}
                                            className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                            title="배송사 삭제"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3 text-sm">
        <span className="text-gray-600">
          총 <b>{filtered.length}</b>개 배송사
        </span>
            </div>

            {/* Add/Edit Modal */}
            {mode && (
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                    <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
                    <div className="relative w-full max-w-xl rounded-xl bg-white p-5 shadow-xl">
                        <h3 className="mb-3 text-lg font-semibold">
                            {mode === "add" ? "배송사 추가" : "배송사 수정"}
                        </h3>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    코드 (deliveryCompany) *
                                </label>
                                <input
                                    value={deliveryCompany}
                                    onChange={(e) => setDeliveryCompany(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                    placeholder="예: CJ"
                                    // 식별자로 사용한다면 수정 금지 권장
                                    disabled={mode === "edit"}
                                />
                            </div>

                            <div className="sm:col-span-1">
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    회사명 (companyName) *
                                </label>
                                <input
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                    placeholder="예: 씨제이대한통운"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    메인 도메인 (mainDomainUrl) *
                                </label>
                                <input
                                    value={mainDomainUrl}
                                    onChange={(e) => setMainDomainUrl(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                    placeholder="https://www.example.com"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    추적 URL (fullUrl) *
                                </label>
                                <input
                                    value={fullUrl}
                                    onChange={(e) => setFullUrl(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                    placeholder="https://track.example.com/{invoice}"
                                />
                            </div>

                            <div className="sm:col-span-1">
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    송장 번호 자릿수 (codeLength) *
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={codeLength}
                                    onChange={(e) => setCodeLength(e.target.value === "" ? "" : Number(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                    placeholder="예: 12"
                                />
                            </div>
                        </div>

                        {formErr && <p className="mt-3 text-sm text-red-600">{formErr}</p>}

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                disabled={saving}
                                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={onSubmit}
                                disabled={saving}
                                className={classNames(
                                    "rounded-md px-3 py-2 text-sm text-white",
                                    saving ? "bg-gray-400" : "bg-gray-900 hover:bg-gray-800"
                                )}
                            >
                                {saving ? "저장 중…" : "저장"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
