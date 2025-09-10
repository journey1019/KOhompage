import { postProductAdd, ProductPriceItem, ProductRequestBody } from '@/lib/api/adminApi';
import { useState } from 'react';

// 최종가 계산 유틸
function calcFinalfee(row: ProductPriceItem) {
    const base = Number(row.productPrice) || 0;
    if (row.taxAddYn === "Y") {
        if (row.taxAddType === "percent") {
            return Math.round(base * (1 + (Number(row.taxAddValue) || 0) / 100));
        }
        return base + (Number(row.taxAddValue) || 0);
    }
    return base;
}


export function CreateProductForm({
                               onCancel,
                               onCreated,
                           }: {
    onCancel: () => void;
    onCreated: () => Promise<void> | void;
}) {
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [productNm, setProductNm] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productType, setProductType] = useState<"device" | "service" | string>("device");
    const [useYn, setUseYn] = useState<"Y" | "N">("Y");
    const [stockQuantity, setStockQuantity] = useState<number>(0);
    const [avaliablePurchase, setAvaliablePurchase] = useState<number>(0); // 서버 오탈자 키

    const [codeOptionInput, setCodeOptionInput] = useState("");
    const codeOption = codeOptionInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const [prices, setPrices] = useState<ProductPriceItem[]>([
        { roleId: "user", productPrice: 0, taxAddYn: "N", taxAddType: "percent", taxAddValue: 10, finalfee: 0 },
    ]);

    const updatePrice = (idx: number, patch: Partial<ProductPriceItem>) => {
        setPrices((prev) => {
            const next = [...prev];
            const merged = { ...next[idx], ...patch };
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
            if (r.taxAddYn === "Y") {
                if (r.taxAddType === "percent" && ((Number(r.taxAddValue) || 0) < 0 || (Number(r.taxAddValue) || 0) > 100)) {
                    return "부가세 비율은 0~100 사이여야 합니다.";
                }
            }
        }
        return null;
    };

    const handleSubmit = async () => {
        const v = validate();
        if (v) {
            setErrorMsg(v);
            return;
        }
        setErrorMsg(null);

        const payload: ProductRequestBody = {
            // productId는 신규 생성 시 보통 서버가 발급 → 생략
            productNm: productNm.trim(),
            productCategory: productCategory.trim(),
            productType,
            useYn,
            productPriceList: prices.map((r) => ({ ...r, finalfee: calcFinalfee(r) })),
            codeOption,
            stockQuantity: Number(stockQuantity) || 0,
            availablePurchase: Number(avaliablePurchase) || 0, // ⚠️ 서버 오탈자 키 사용
        };

        try {
            setSaving(true);
            await postProductAdd(payload);
            await onCreated();
        } catch (e: any) {
            console.error(e);
            setErrorMsg(e?.message || "상품 생성 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <h3 className="mb-3 text-lg font-semibold">새 상품 생성</h3>

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
                        <input
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={productNm}
                            onChange={(e) => setProductNm(e.target.value)}
                            placeholder="예) ST6100 패키지"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-gray-600">분류 *</label>
                        <input
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            placeholder="예) inmarsat / starlink / accessory"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">타입</label>
                        <select
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <option value="device">device</option>
                            <option value="service">service</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">사용 여부</label>
                        <select
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={useYn}
                            onChange={(e) => setUseYn(e.target.value as "Y" | "N")}
                        >
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">재고 수량</label>
                        <input
                            type="number"
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(Number(e.target.value))}
                            min={0}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-600">구매 제한 수량 (avaliablePurchase)</label>
                        <input
                            type="number"
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={avaliablePurchase}
                            onChange={(e) => setAvaliablePurchase(Number(e.target.value))}
                            min={0}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="mb-1 block text-xs text-gray-600">옵션 코드(쉼표로 구분)</label>
                        <input
                            className="w-full rounded border px-3 py-2 text-sm"
                            value={codeOptionInput}
                            onChange={(e) => setCodeOptionInput(e.target.value)}
                            placeholder="예) PLAN_BASIC, PLAN_PRO, COLOR_BLACK"
                        />
                        {!!codeOption.length && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {codeOption.map((c) => (
                                    <span key={c} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                    {c}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

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
                                    <input
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={row.roleId}
                                        onChange={(e) => updatePrice(idx, { roleId: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">기본금액</label>
                                    <input
                                        type="number"
                                        className="w-full rounded border px-2 py-1 text-xs text-right"
                                        value={row.productPrice}
                                        onChange={(e) => updatePrice(idx, { productPrice: Number(e.target.value) })}
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">부가세 포함</label>
                                    <select
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={row.taxAddYn}
                                        onChange={(e) => updatePrice(idx, { taxAddYn: e.target.value as "Y" | "N" })}
                                    >
                                        <option value="N">N</option>
                                        <option value="Y">Y</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">부가세 타입</label>
                                    <select
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={row.taxAddType}
                                        onChange={(e) => updatePrice(idx, { taxAddType: e.target.value as "percent" | "fee" })}
                                        disabled={row.taxAddYn === "N"}
                                    >
                                        <option value="percent">percent</option>
                                        <option value="fee">fee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">값</label>
                                    <input
                                        type="number"
                                        className="w-full rounded border px-2 py-1 text-xs text-right"
                                        value={row.taxAddValue}
                                        onChange={(e) => updatePrice(idx, { taxAddValue: Number(e.target.value) })}
                                        disabled={row.taxAddYn === "N"}
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] text-gray-600">최종요금</label>
                                    <div className="rounded border bg-gray-50 px-2 py-1 text-right text-xs font-semibold">
                                        {calcFinalfee(row).toLocaleString()}
                                    </div>
                                </div>

                                <div className="col-span-6 flex justify-end">
                                    {prices.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePriceRow(idx)}
                                            className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                        >
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
