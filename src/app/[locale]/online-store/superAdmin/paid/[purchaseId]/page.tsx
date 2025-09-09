"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPaidDetail } from "@/lib/api/historyApi";
import type { PaidDetail } from "@/lib/api/adminApi"; // 아래 타입 참고(이미 있다면 이 줄만 맞춰서)

function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "green"|"red"|"yellow"|"blue"|"gray" }) {
    const map: Record<string, string> = {
        green: "bg-green-50 text-green-700 ring-green-600/20",
        red: "bg-red-50 text-red-700 ring-red-600/20",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
        gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
    };
    return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`}>{children}</span>;
}

const fmtKST = (s?: string) => {
    if (!s) return "-";
    const d = new Date(s.replace(" ", "T") + "+09:00");
    if (Number.isNaN(d.getTime())) return s;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const money = (n?: number) => (n ?? 0).toLocaleString("ko-KR");

export default function PaidDetailPage() {
    const router = useRouter();
    const params = useParams<{ purchaseId: string; locale: string }>();
    const purchaseId = Number(params?.purchaseId);
    const [data, setData] = useState<PaidDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        if (!purchaseId || Number.isNaN(purchaseId)) {
            setErr("유효하지 않은 결제 ID 입니다.");
            setLoading(false);
            return;
        }
        (async () => {
            try {
                setLoading(true);
                setErr(null);
                const res = await getPaidDetail(purchaseId);
                setData(res);
            } catch (e: any) {
                setErr(e?.message || "결제 상세 조회에 실패했습니다.");
            } finally {
                setLoading(false);
            }
        })();
    }, [purchaseId]);

    if (loading) return <div className="p-6 text-sm text-gray-600">불러오는 중…</div>;

    if (err) {
        return (
            <div className="p-6">
                <p className="mb-4 text-red-600">{err}</p>
                <button onClick={() => router.back()} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">뒤로</button>
            </div>
        );
    }

    if (!data) return null;

    const {
        purchaseId: pid,
        userId,
        productId,
        productInfo,
        orderId,
        purchaseStatus,
        purchaseDate,
        purchaseType,
        purchaseFee,
        purchaseQuantity,
        productPrice,
        taxYn,
        taxAddType,
        taxAddValue,
        dateIndex,
        orderOption,
        purchaseDetailInfo,
        purchaseDelivery,
    } = data;

    return (
        <div className="mx-auto max-w-5xl p-6 space-y-6">
            {/* 헤더 */}
            <header className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-semibold">결제 상세</h1>
                    <p className="mt-1 text-sm text-gray-600">구매 ID: {pid} · 주문번호: {orderId}</p>
                </div>
                <div className="flex gap-2 text-xs">
                    <Badge tone="blue">{purchaseType}</Badge>
                    <Badge tone={purchaseStatus === "Y" ? "green" : "red"}>상태: {purchaseStatus}</Badge>
                </div>
            </header>

            {/* 요약 카드 */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-4">
                    <div className="text-xs text-gray-500">결제 금액(예정/실결제/취소)</div>
                    <div className="mt-1 text-sm">
                        예정 {money(purchaseFee)}원 · 실결제 {money(purchaseDetailInfo?.price)}원 · 취소 {money(purchaseDetailInfo?.cancelledPrice)}원
                    </div>
                    <div className="mt-2 text-xs text-gray-500">결제 일시</div>
                    <div className="text-sm">{fmtKST(purchaseDetailInfo?.purchasedAt)}</div>
                </div>
                <div className="rounded-xl border p-4">
                    <div className="text-xs text-gray-500">구매자/계정</div>
                    <div className="mt-1 text-sm">{userId}</div>
                    <div className="mt-2 text-xs text-gray-500">주문/결제 ID</div>
                    <div className="text-sm truncate">{orderId}</div>
                    <div className="text-sm truncate">{purchaseDetailInfo?.receiptId}</div>
                </div>
                <div className="rounded-xl border p-4">
                    <div className="text-xs text-gray-500">수량/단가</div>
                    <div className="mt-1 text-sm">{purchaseQuantity}개 × {money(productPrice)}원</div>
                    <div className="mt-2 text-xs text-gray-500">부가세</div>
                    <div className="text-sm">{taxYn} ({taxAddType} {taxAddValue})</div>
                </div>
            </section>

            {/* 상품 정보 */}
            <section className="rounded-xl border p-4">
                <h2 className="mb-3 text-sm font-semibold">상품</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-xs text-gray-500">상품명</div>
                        <div className="text-sm">{productInfo?.productNm}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">상품ID / 카테고리 / 타입</div>
                        <div className="text-sm">{productId} / {productInfo?.productCategory} / {productInfo?.productType}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">개당 결제 금액(현재)</div>
                        <div className="text-sm">{money(productInfo?.finalPrice)}원</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">옵션</div>
                        <div className="text-sm">{productInfo?.codeOption?.join(", ") || "없음"}</div>
                    </div>
                </div>
                {orderOption?.length ? (
                    <div className="mt-3">
                        <div className="text-xs text-gray-500">선택 옵션</div>
                        <ul className="mt-1 list-inside list-disc text-sm">
                            {orderOption.map((o, idx) => (
                                <li key={idx}>
                                    <span className="text-gray-600">{o.key}</span>: {o.value} <span className="text-gray-400">({o.codeId})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </section>

            {/* 결제/PG 정보 */}
            <section className="rounded-xl border p-4">
                <h2 className="mb-3 text-sm font-semibold">결제/PG</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <div className="text-xs text-gray-500">PG사</div>
                        <div className="text-sm">{purchaseDetailInfo?.pgCompany}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">카드사/유형/소유</div>
                        <div className="text-sm">{purchaseDetailInfo?.cardCompany} / {purchaseDetailInfo?.cardType} / {purchaseDetailInfo?.cardOwnerType}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">카드번호</div>
                        <div className="text-sm">{purchaseDetailInfo?.cardNo}</div>
                    </div>
                </div>
                {purchaseDetailInfo?.receiptUrl ? (
                    <a href={purchaseDetailInfo.receiptUrl} target="_blank" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
                        영수증 보기
                    </a>
                ) : null}
            </section>

            {/* 배송 정보 */}
            <section className="rounded-xl border p-4">
                <h2 className="mb-3 text-sm font-semibold">배송</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-xs text-gray-500">수령인</div>
                        <div className="text-sm">{purchaseDelivery?.recipient}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">연락처</div>
                        <div className="text-sm">{purchaseDelivery?.phone}</div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="text-xs text-gray-500">주소</div>
                        <div className="text-sm">{purchaseDelivery?.addressMain} {purchaseDelivery?.addressSub ? `, ${purchaseDelivery?.addressSub}` : ""} ({purchaseDelivery?.postalCode})</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">배송 상태</div>
                        <div className="text-sm">{purchaseDelivery?.deliveryStatus}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">송장/배송사</div>
                        <div className="text-sm">
                            {purchaseDelivery?.deliveryCompany || "-"} / {purchaseDelivery?.deliveryCode || "-"}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">업데이트</div>
                        <div className="text-sm">{fmtKST(purchaseDelivery?.updateDate)}</div>
                    </div>
                </div>
            </section>

            <div className="pt-2">
                <button onClick={() => router.back()} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">뒤로</button>
            </div>
        </div>
    );
}
