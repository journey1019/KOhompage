"use client";

import { useEffect, useMemo, useState } from "react";

import { postProductEdit, type Product, ProductDetailResponse, ProductPriceItem, ProductRequestBody, uploadProductMainImage } from '@/lib/api/adminApi';
import { calcFinalfee } from '@/module/pgAdminHelper';
import { AdminImagePicker } from '@/components/(Online-Store)/Admin/AdminImagePicker';
import { fetchProductImageObjectUrl, getProductImageUrl } from "@/lib/api/resourceApi";


function AdminProductEdit({
                             selected,
                             detail,
                             onCancel,
                             onSaved,
                         }: {
    selected: Product;
    detail: ProductDetailResponse | null;
    onCancel: () => void;
    onSaved: () => Promise<void> | void;
}) {
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // 초기값은 detail 우선, 없으면 selected 사용
    const [productNm, setProductNm] = useState(detail?.productNm ?? selected.productNm ?? "");
    const [productCategory, setProductCategory] = useState(detail?.productCategory ?? selected.productCategory ?? "");
    const [productType, setProductType] = useState<"device" | "service" | string>(detail?.productType ?? selected.productType ?? "device");
    const [useYn, setUseYn] = useState<"Y" | "N">((detail?.useYn as "Y" | "N") ?? (selected.useYn as "Y" | "N") ?? "Y");
    const [stockQuantity, setStockQuantity] = useState<number>(detail?.stockQuantity ?? 0);

    // availablePurchase(정상 키) 우선, 없으면 서버 오탈자(avaliablePurchase) 고려
    const [availablePurchase, setAvailablePurchase] = useState<number>(
        detail?.availablePurchase ?? (detail as any)?.avaliablePurchase ?? 0
    );

    const initialOptions = detail?.codeOption ?? selected.codeOption ?? [];
    const [codeOptionInput, setCodeOptionInput] = useState(initialOptions.join(", "));
    const codeOption = codeOptionInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const [prices, setPrices] = useState<ProductPriceItem[]>(
        (detail?.productPriceList?.length ? detail.productPriceList : undefined) ?? [
            { roleId: "user", productPrice: 0, taxAddYn: "N", taxAddType: "percent", taxAddValue: 10, finalfee: 0 },
        ]
    );

    // state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageDesc, setImageDesc] = useState(detail?.mainDesc ?? "");
    const [initialImageUrl, setInitialImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        let revoked: string | null = null;
        (async () => {
            if (detail?.productId && detail?.mainImageFileNm) {
                try {
                    const obj = await fetchProductImageObjectUrl(detail.productId, detail.mainImageFileNm);
                    setInitialImageUrl(obj);
                    revoked = obj;
                } catch {
                    setInitialImageUrl(getProductImageUrl(detail?.productId!, detail?.mainImageFileNm!));
                }
            } else {
                setInitialImageUrl(undefined);
            }
        })();
        return () => { if (revoked) URL.revokeObjectURL(revoked); };
    }, [detail?.productId, detail?.mainImageFileNm]);


    const updatePrice = (idx: number, patch: Partial<ProductPriceItem>) => {
        setPrices((prev) => {
            const next = [...prev];
            const merged = { ...next[idx], ...patch } as ProductPriceItem;
            merged.finalfee = calcFinalfee(merged);
            next[idx] = merged;
            return next;
        });
    };

    const addPriceRow = () =>
        setPrices((p) => [...p, { roleId: "user", productPrice: 0, taxAddYn: "N", taxAddType: "percent", taxAddValue: 10, finalfee: 0 }]);

    const removePriceRow = (idx: number) => setPrices((p) => p.filter((_, i) => i !== idx));

    const validate = () => {
        if (!productNm.trim()) return "상품명을 입력하세요.";
        if (!productCategory.trim()) return "상품 분류를 입력하세요.";
        if (!prices.length) return "가격 리스트를 1개 이상 추가하세요.";
        for (const r of prices) {
            if (!r.roleId.trim()) return "가격 항목의 권한(roleId)을 입력하세요.";
            if ((Number(r.productPrice) || 0) < 0) return "가격은 0 이상이어야 합니다.";
            if (r.taxAddYn === "Y" && r.taxAddType === "percent") {
                const v = Number(r.taxAddValue) || 0;
                if (v < 0 || v > 100) return "부가세 비율은 0~100 사이여야 합니다.";
            }
        }
        return null;
    };

    // 저장 핸들러
    const handleSubmit = async () => {
        const v = validate();
        if (v) return setErrorMsg(v);

        const payload: ProductRequestBody = {
            productId: selected.productId,
            productNm: productNm.trim(),
            productCategory: productCategory.trim(),
            productType,
            useYn,
            productPriceList: prices.map((r) => ({ ...r, finalfee: calcFinalfee(r) })),
            codeOption,
            stockQuantity: Number(stockQuantity) || 0,
            availablePurchase: Number(availablePurchase) || 0,
        };

        setSaving(true);
        try {
            await postProductEdit(payload);
            if (imageFile) {
                await uploadProductMainImage(selected.productId, imageFile, imageDesc);
            }
            await onSaved(); // refreshList + 모달 닫기 + (필요시) Drawer detail 재조회
        } catch (e:any) {
            setErrorMsg(e.message || "수정 실패");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <h3 className="mb-3 text-lg font-semibold">상품 수정 – {selected.productNm}</h3>

            {errorMsg && (
                <div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMsg}
                </div>
            )}

            <div className="space-y-4">
                {/* 기본 정보 */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs text-gray-600">상품명 *</label>
                        <input className="w-full rounded border px-3 py-2 text-sm"
                               value={productNm} onChange={(e) => setProductNm(e.target.value)} />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-gray-600">분류 *</label>
                        <input className="w-full rounded border px-3 py-2 text-sm"
                               value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">타입</label>
                        <select className="w-full rounded border px-3 py-2 text-sm"
                                value={productType} onChange={(e) => setProductType(e.target.value)}>
                            <option value="device">device</option>
                            <option value="service">service</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">사용 여부</label>
                        <select className="w-full rounded border px-3 py-2 text-sm"
                                value={useYn} onChange={(e) => setUseYn(e.target.value as "Y" | "N")}>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">재고 수량</label>
                        <input type="number" min={0}
                               className="w-full rounded border px-3 py-2 text-sm text-right"
                               value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">구매 제한 수량</label>
                        <input type="number" min={0}
                               className="w-full rounded border px-3 py-2 text-sm text-right"
                               value={availablePurchase} onChange={(e) => setAvailablePurchase(Number(e.target.value))} />
                    </div>

                    <div className="col-span-2">
                        <label className="mb-1 block text-xs text-gray-600">옵션 코드(쉼표로 구분)</label>
                        <input className="w-full rounded border px-3 py-2 text-sm"
                               value={codeOptionInput} onChange={(e) => setCodeOptionInput(e.target.value)} />
                        {!!codeOption.length && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {codeOption.map((c) => (
                                    <span key={c} className="rounded bg-gray-100 px-2 py-0.5 text-xs">{c}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 상품 이미지 추가/수정 */}
                <AdminImagePicker
                    initialImageUrl={initialImageUrl}
                    initialDesc={imageDesc}
                    onFileChange={setImageFile}
                    onDescChange={setImageDesc}
                />

                {/* 가격 리스트 */}
                <div className="border-t pt-4">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-600">가격 리스트 *</span>
                        <button type="button" onClick={addPriceRow} className="rounded border px-2 py-1 text-xs hover:bg-gray-50">
                            + 항목 추가
                        </button>
                    </div>

                    <div className="space-y-3">
                        {prices.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-6 items-end gap-2 rounded border p-2">
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">권한</label>
                                    <input className="w-full rounded border px-2 py-1 text-xs"
                                           value={row.roleId} onChange={(e) => updatePrice(idx, { roleId: e.target.value })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">기본금액</label>
                                    <input type="number" min={0}
                                           className="w-full rounded border px-2 py-1 text-xs text-right"
                                           value={row.productPrice} onChange={(e) => updatePrice(idx, { productPrice: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">부가세 포함</label>
                                    <select className="w-full rounded border px-2 py-1 text-xs"
                                            value={row.taxAddYn} onChange={(e) => updatePrice(idx, { taxAddYn: e.target.value as "Y" | "N" })}>
                                        <option value="N">N</option>
                                        <option value="Y">Y</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">부가세 타입</label>
                                    <select className="w-full rounded border px-2 py-1 text-xs"
                                            value={row.taxAddType} disabled={row.taxAddYn === "N"}
                                            onChange={(e) => updatePrice(idx, { taxAddType: e.target.value as "percent" | "fee" })}>
                                        <option value="percent">percent</option>
                                        <option value="fee">fee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">값</label>
                                    <input type="number" min={0} disabled={row.taxAddYn === "N"}
                                           className="w-full rounded border px-2 py-1 text-xs text-right"
                                           value={row.taxAddValue} onChange={(e) => updatePrice(idx, { taxAddValue: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">최종요금</label>
                                    <div className="rounded border bg-gray-50 px-2 py-1 text-right text-xs font-semibold">
                                        {calcFinalfee(row).toLocaleString()}
                                    </div>
                                </div>

                                <div className="col-span-6 flex justify-end">
                                    {prices.length > 1 && (
                                        <button type="button" onClick={() => removePriceRow(idx)}
                                                className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 액션 */}
                <div className="flex justify-end gap-2 pt-2">
                    <button className="rounded-md border px-3 py-2 text-sm" onClick={onCancel} disabled={saving}>
                        취소
                    </button>
                    <button
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={saving}
                    >
                        {saving ? "저장 중..." : "저장"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminProductEdit;