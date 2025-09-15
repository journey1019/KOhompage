// src/app/[locale]/online-store/superAdmin/paid/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaidList, type Paid } from "@/lib/api/adminApi";
import { formatCurrency } from "@/lib/utils/payment";
import { toDash, fromDash } from "@/module/helper";
import { formatKST } from '@/module/pgAdminHelper';
import { fmtInputKST, ymdToInput, inputToYmd} from '@/lib/utils/dateUtils';
import { Badge } from '@/components/(Online-Store)/MyPage/Badge';
import { toneByStatus, toneByCategory, toneByMethod, toneByType } from '@/lib/utils/toneMapping';


// ————————————————————————————————————————————————
// Page
// ————————————————————————————————————————————————
export default function PaidPage() {
    const router = useRouter();
    const search = useSearchParams();

    // 상세정보 보기 이동(purchaseId)
    function goDetail(purchaseId: number) {
        // /ko/online-store/superAdmin/paid/17
        router.push(`/ko/online-store/superAdmin/paid/${purchaseId}`);
    }

    // URL ?startDate=YYYYMMDD&endDate=YYYYMMDD
    const startQ = search.get("startDate") || "";
    const endQ = search.get("endDate") || "";

    // ✅ 기본값: end = 오늘(KST), start = 오늘로부터 7일 전(KST)
    const endDefaultInput = fmtInputKST(new Date());                                     // ex) "2025-09-09"
    const startDefaultInput = fmtInputKST(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // ex) "2025-09-02"

    // local state for inputs (use yyyy-MM-dd for native date input)
    const [startInput, setStartInput] = useState<string>(startQ ? ymdToInput(startQ) : startDefaultInput);
    const [endInput, setEndInput]     = useState<string>(endQ   ? ymdToInput(endQ)   : endDefaultInput);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rows, setRows] = useState<Paid[]>([]);

    // pagination (client)
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;

    // compute params for API (항상 값이 존재하도록 보장됨)
    const startYmd = inputToYmd(startInput); // "YYYYMMDD"
    const endYmd   = inputToYmd(endInput);   // "YYYYMMDD"

    // fetch when query changes
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true); setError(null);
                const data = await PaidList(startYmd, endYmd);
                setRows(Array.isArray(data) ? data : []);
                setPage(1);
            } catch (e) {
                console.error(e);
                setError("결제 내역을 불러오지 못했습니다.");
                setRows([]);
            } finally { setIsLoading(false); }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startYmd, endYmd]);

    // sync URL with inputs
    useEffect(() => {
        const params = new URLSearchParams();
        if (startYmd) params.set("startDate", startYmd);
        if (endYmd) params.set("endDate", endYmd);
        const qs = params.toString();
        router.replace(qs ? `?${qs}` : "");
    }, [router, startYmd, endYmd]);

    // totals
    const totals = useMemo(() => {
        const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
        const count = rows.length;
        const totalPrice = sum(rows.map(r => r.price || 0));
        const totalCancelled = sum(rows.map(r => r.cancelledPrice || 0));
        const net = totalPrice - totalCancelled;
        return { count, totalPrice, totalCancelled, net };
    }, [rows]);

    // optional local filters
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [methodFilter, setMethodFilter] = useState<string>("all");
    const [query, setQuery] = useState(""); // userId/orderId/receiptId/productNm

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rows.filter(r => {
            const matchesQ = !q ||
                r.userId?.toLowerCase().includes(q) ||
                r.orderId?.toLowerCase().includes(q) ||
                r.receiptId?.toLowerCase().includes(q) ||
                r.productNm?.toLowerCase().includes(q);
            const matchesS = statusFilter === "all" || r.purchaseStatus === statusFilter || r.statusLocale === statusFilter;
            const matchesM = methodFilter === "all" || r.methodSymbol === methodFilter;
            return matchesQ && matchesS && matchesM;
        });
    }, [rows, query, statusFilter, methodFilter]);

    // sort
    const [sortKey, setSortKey] = useState<"purchasedAt" | "purchaseDate" | "price">("purchasedAt");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const sorted = useMemo(() => {
        const dir = sortDir === "asc" ? 1 : -1;
        return [...filtered].sort((a, b) => {
            if (sortKey === "price") return dir * ((a.price ?? 0) - (b.price ?? 0));
            const av = (a as any)[sortKey] as string | undefined;
            const bv = (b as any)[sortKey] as string | undefined;
            const ta = Date.parse((av ?? "").replace(" ", "T") + "+09:00");
            const tb = Date.parse((bv ?? "").replace(" ", "T") + "+09:00");
            if (!Number.isNaN(ta) && !Number.isNaN(tb)) return dir * (ta - tb);
            return dir * (av ?? "").localeCompare(bv ?? "");
        });
    }, [filtered, sortKey, sortDir]);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="mx-auto max-w-6xl p-6 overflow-x-hidden">{/* 페이지 수준 가로 스크롤 차단 */}
            {/* Header */}
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">결제 이력</h1>
                    <p className="mt-1 text-sm text-gray-600">기간 선택 후 해당 기간 내 결제 내역 조회</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Badge tone="blue">건수 {totals.count}</Badge>
                    <Badge tone="green">결제 {formatCurrency(totals.totalPrice)}</Badge>
                    <Badge tone="yellow">취소 {formatCurrency(totals.totalCancelled)}</Badge>
                    <Badge tone="gray">순액 {formatCurrency(totals.net)}</Badge>
                </div>
            </header>

            {/* Filters */}
            <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-8">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">시작일</label>
                        <input type="date" value={startInput} onChange={(e) => setStartInput(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">종료일</label>
                        <input type="date" value={endInput} onChange={(e) => setEndInput(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">검색</label>
                        <input value={query} onChange={(e)=>{ setQuery(e.target.value); setPage(1); }} placeholder="userId, 주문ID, 결제ID, 상품명" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">상태</label>
                        <select value={statusFilter} onChange={(e)=>{ setStatusFilter(e.target.value); setPage(1); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            <option value="all">전체</option>
                            <option value="PAID">결제완료</option>
                            <option value="CANCELLED">취소</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">결제수단</label>
                        <select value={methodFilter} onChange={(e)=>{ setMethodFilter(e.target.value); setPage(1); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            <option value="all">전체</option>
                            <option value="card">card</option>
                            <option value="vbank">vbank</option>
                            <option value="bank">bank</option>
                            <option value="phone">phone</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">정렬</label>
                        <div className="flex gap-2">
                            <select value={sortKey} onChange={(e)=>setSortKey(e.target.value as any)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                                <option value="purchasedAt">결제일시</option>
                                <option value="purchaseDate">구매일</option>
                                <option value="price">결제금액</option>
                            </select>
                            <button type="button" onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")} className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
                                {sortDir === "desc" ? "내림차순" : "오름차순"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table (horizontal scroll inside only) */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="relative max-w-full overflow-x-auto overscroll-x-contain touch-pan-x">
                    <table className="w-max min-w-max divide-y divide-gray-200 table-auto">
                        <thead className="bg-gray-50">
                        <tr className="text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                            <th className="p-3 sticky left-0 z-30 bg-gray-50 w-[80px]">구매ID</th>
                            <th className="p-3 sticky left-[80px] z-30 bg-gray-50 w-[150px]">계정ID</th>
                            <th className="p-3 w-[180px]">주문ID</th>
                            <th className="p-3 w-[180px]">결제ID</th>
                            <th className="p-3 w-[120px]">상태</th>
                            <th className="p-3 w-[100px]">결제수단</th>
                            <th className="p-3 w-[160px]">결제금액</th>
                            <th className="p-3 w-[160px]">취소금액</th>
                            <th className="p-3 w-[200px]">결제일시</th>
                            <th className="p-3 w-[80px]">상품ID</th>
                            <th className="p-3 w-[150px]">상품명</th>
                            <th className="p-3 w-[160px]">분류</th>
                            <th className="p-3 w-[160px]">타입</th>
                            <th className="p-3 w-[100px]">상세정보</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm whitespace-nowrap">
                        {isLoading && Array.from({ length: 8 }).map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                {Array.from({ length: 13 }).map((_, j) => (
                                    <td key={j} className="p-3"><div className="h-4 w-full rounded bg-gray-200"/></td>
                                ))}
                            </tr>
                        ))}

                        {!isLoading && pageData.length === 0 && (
                            <tr>
                                <td colSpan={13} className="p-6 text-center text-gray-500">해당 조건의 결제 이력이 없습니다.</td>
                            </tr>
                        )}

                        {!isLoading && pageData.map((r) => (
                            <tr key={`${r.purchaseId}-${r.orderId}`} className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => goDetail(r.purchaseId)}>
                                <td className="p-3 sticky left-0 z-20 bg-white w-[80px] truncate">{r.purchaseId}</td>
                                <td className="p-3 sticky left-[80px] z-20 bg-white w-[150px] truncate">{r.userId}</td>
                                <td className="p-3 w-[180px] truncate">{r.orderId}</td>
                                <td className="p-3 w-[180px] truncate">{r.receiptId}</td>
                                <td className="p-3 w-[120px]">
                                    <Badge tone={toneByStatus(r.statusLocale, r.purchaseStatus, r.cancelledPrice)}>
                                        {r.statusLocale || r.purchaseStatus || '상태미확인'}
                                    </Badge>
                                </td>
                                <td className="p-3 w-[100px]">
                                    <Badge tone={toneByMethod(r.methodSymbol)}>
                                        {r.methodSymbol?.toUpperCase() || '-'}
                                    </Badge>
                                </td>
                                <td className="p-3 w-[160px] font-medium">{formatCurrency(r.price || 0)}</td>
                                <td className="p-3 w-[160px]">{formatCurrency(r.cancelledPrice || 0)}</td>
                                <td className="p-3 w-[200px] text-gray-700">{formatKST(r.purchasedAt)}</td>
                                <td className="p-3 w-[80px]">{r.productId}</td>
                                <td className="p-3 w-[150px] truncate">{r.productNm}</td>
                                <td className="p-3 w-[160px]">
                                    <Badge tone={toneByCategory(r.productCategory)}>
                                        {r.productCategory || '-'}
                                    </Badge>
                                </td>
                                <td className="p-3 w-[160px]">
                                    <Badge tone={toneByType(r.productType)}>
                                        {r.productType || '-'}
                                    </Badge>
                                </td>
                                <td className="p-3 w-[100px]">
                                    <button onClick={() => goDetail(r.purchaseId)}
                                            className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">
                                        보러가기
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3 text-sm">
                    <span className="text-gray-600">총 <b>{total}</b>건 · 페이지 <b>{page}</b> / {totalPages}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">이전</button>
                        <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">다음</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
