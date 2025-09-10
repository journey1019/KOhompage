// src/app/[locale]/online-store/superAdmin/product/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductList, type Product, getProductDetail, type ProductDetailResponse } from "@/lib/api/adminApi";
import { postProductAdd, type ProductPriceItem, type ProductRequestBody } from "@/lib/api/adminApi";

import { fetchProductImageObjectUrl, getProductImageUrl } from '@/lib/api/resourceApi';

// ————————————————————————————————————————————————
// Small UI atoms
// ————————————————————————————————————————————————
function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "green" | "red" | "yellow" | "blue" | "gray" }) {
    const map: Record<string, string> = {
        green: "bg-green-50 text-green-700 ring-green-600/20",
        red: "bg-red-50 text-red-700 ring-red-600/20",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
        gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
    };
    return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`}>{children}</span>;
}

function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: 9 }).map((_, i) => (
                <td key={i} className="p-3">
                    <div className="h-4 w-full rounded bg-gray-200" />
                </td>
            ))}
        </tr>
    );
}

function classNames(...xs: (string | false | null | undefined)[]) {
    return xs.filter(Boolean).join(" ");
}

function formatKST(datetimeStr?: string) {
    if (!datetimeStr) return "-";
    const iso = datetimeStr.replace(" ", "T") + "+09:00";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return datetimeStr;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// ————————————————————————————————————————————————
// Main Page
// ————————————————————————————————————————————————
export default function ProductPage() {
    type ViewMode = "table" | "scroller";
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [query, setQuery] = useState(""); // productNm / productId
    const [category, setCategory] = useState<string>("all");
    const [type, setType] = useState<string>("all");
    const [useYn, setUseYn] = useState<"all" | "Y" | "N">("all");
    const [hasOption, setHasOption] = useState<"all" | "yes" | "no">("all");

    // Sort
    const [sortKey, setSortKey] = useState<"updateDate" | "createDate" | "productId" | "productNm">("updateDate");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    // Drawer / Modal state (UI only; wire to API later)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selected, setSelected] = useState<Product | null>(null);
    const [modalMode, setModalMode] = useState<null | "create" | "edit" | "deleteConfirm">(null);

    // Detail (drawer content)
    const [detail, setDetail] = useState<ProductDetailResponse | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState<string | null>(null);

    const fallbackSrc = '/images/DefaultImage.png';
    const [imageUrl, setImageUrl] = useState<string>(fallbackSrc);

    // Pagination
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             setIsLoading(true);
    //             setError(null);
    //             const list = await ProductList();
    //             setProducts(Array.isArray(list) ? list : []);
    //         } catch (e) {
    //             console.error(e);
    //             setError("상품 목록을 불러오지 못했습니다.");
    //             setProducts([]);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     })();
    // }, []);
    async function refreshList() {
        try {
            setIsLoading(true);
            setError(null);
            const list = await ProductList();
            setProducts(Array.isArray(list) ? list : []);
        } catch (e) {
            console.error(e);
            setError("상품 목록을 불러오지 못했습니다.");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        refreshList();
    }, []);


    // 이미지 로드
    useEffect(() => {
        let revoked: string | null = null;
        async function load() {
            try {
                if (detail?.mainImageFileNm) {
                    const objUrl = await fetchProductImageObjectUrl(detail?.productId, detail?.mainImageFileNm);
                    setImageUrl(objUrl);
                    revoked = objUrl;
                } else {
                    setImageUrl(fallbackSrc);
                }
            } catch {
                setImageUrl(getProductImageUrl(detail?.productId, detail?.mainImageFileNm) || fallbackSrc);
            }
        }
        load();
        return () => { if (revoked) URL.revokeObjectURL(revoked); };
    }, [detail?.productId, detail?.mainImageFileNm]);


    const categories = useMemo(() => {
        const s = new Set<string>();
        products.forEach((p) => p.productCategory && s.add(p.productCategory));
        return ["all", ...Array.from(s)];
    }, [products]);

    const types = useMemo(() => {
        const s = new Set<string>();
        products.forEach((p) => p.productType && s.add(p.productType));
        return ["all", ...Array.from(s)];
    }, [products]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter((p) => {
            const matchesQ = !q || String(p.productId).includes(q) || p.productNm?.toLowerCase().includes(q);
            const matchesCat = category === "all" || p.productCategory === category;
            const matchesType = type === "all" || p.productType === type;
            const matchesUse = useYn === "all" || p.useYn === useYn;
            const matchesOpt =
                hasOption === "all" || (hasOption === "yes" ? (p.codeOption?.length ?? 0) > 0 : (p.codeOption?.length ?? 0) === 0);
            return matchesQ && matchesCat && matchesType && matchesUse && matchesOpt;
        });
    }, [products, query, category, type, useYn, hasOption]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        arr.sort((a, b) => {
            const dir = sortDir === "asc" ? 1 : -1;
            if (sortKey === "productId") return dir * ((a.productId ?? 0) - (b.productId ?? 0));
            if (sortKey === "productNm") return dir * (a.productNm ?? "").localeCompare(b.productNm ?? "");
            const av = (a as any)[sortKey] as string | undefined;
            const bv = (b as any)[sortKey] as string | undefined;
            const ta = Date.parse((av ?? "").replace(" ", "T") + "+09:00");
            const tb = Date.parse((bv ?? "").replace(" ", "T") + "+09:00");
            if (!Number.isNaN(ta) && !Number.isNaN(tb)) return dir * (ta - tb);
            return dir * (av ?? "").localeCompare(bv ?? "");
        });
        return arr;
    }, [filtered, sortKey, sortDir]);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function openDrawer(p: Product) { setSelected(p); setDrawerOpen(true); }
    function closeDrawer() { setSelected(null); setDrawerOpen(false); }

    useEffect(() => {
        const fetchDetail = async (productId: number) => {
            try {
                setDetailLoading(true);
                setDetailError(null);
                const res = await getProductDetail(productId);

                // 백엔드 오탈자 보정: avaliablePurchase / purchaseWatingList
                const normalized: ProductDetailResponse = {
                    ...res,
                    availablePurchase:
                        res.availablePurchase ??
                        (res as any).avaliablePurchase ??
                        0,
                    purchaseWatingList: res.purchaseWatingList ?? (res as any).purchaseWatingList, // 혹시 다른 철자일 대비
                };

                setDetail(normalized);
            } catch (e) {
                console.error(e);
                setDetail(null);
                setDetailError("상세 정보를 불러오지 못했습니다.");
            } finally {
                setDetailLoading(false);
            }
        };

        if (drawerOpen && selected?.productId) {
            // 선택이 바뀔 때마다 새로 로딩
            setDetail(null);
            fetchDetail(selected.productId);
        }
    }, [drawerOpen, selected?.productId]);

    // ————————————————————————————————————————————————
    // UI
    // ————————————————————————————————————————————————
    return (
        <div className="mx-auto max-w-6xl p-6 overflow-x-hidden">
            {/* Header */}
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">관리자 상품 목록</h1>
                    <p className="mt-1 text-sm text-gray-600">슈퍼관리자 페이지 · 상품 생성/수정/삭제</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setModalMode("create")}
                        className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        + 새 상품
                    </button>
                    <div className="ml-2 inline-flex overflow-hidden rounded-lg border">
                        <button
                            onClick={() => setViewMode("table")}
                            className={classNames("px-3 py-1 text-sm", viewMode === "table" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50")}
                        >
                            테이블
                        </button>
                        <button
                            onClick={() => setViewMode("scroller")}
                            className={classNames("px-3 py-1 text-sm", viewMode === "scroller" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50")}
                        >
                            스크롤러
                        </button>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-8">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">검색</label>
                        <input
                            value={query}
                            onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                            placeholder="상품명, 상품ID 검색"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">분류</label>
                        <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            {categories.map((c) => (<option key={c} value={c}>{c === "all" ? "전체" : c}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">타입</label>
                        <select value={type} onChange={(e) => { setPage(1); setType(e.target.value); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            {types.map((t) => (<option key={t} value={t}>{t === "all" ? "전체" : t}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">사용 여부</label>
                        <select value={useYn} onChange={(e) => { setPage(1); setUseYn(e.target.value as any); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            <option value="all">전체</option>
                            <option value="Y">사용(Y)</option>
                            <option value="N">중지(N)</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">구매옵션</label>
                        <select value={hasOption} onChange={(e) => { setPage(1); setHasOption(e.target.value as any); }} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                            <option value="all">전체</option>
                            <option value="yes">있음</option>
                            <option value="no">없음</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">정렬</label>
                        <div className="flex gap-2">
                            <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200">
                                <option value="updateDate">최종수정일</option>
                                <option value="createDate">생성일</option>
                                <option value="productId">상품ID</option>
                                <option value="productNm">상품명</option>
                            </select>
                            <button type="button" onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))} className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
                                {sortDir === "desc" ? "내림차순" : "오름차순"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table view */}
            {viewMode === "table" && (
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="relative max-w-full overflow-x-auto overscroll-x-contain touch-pan-x">
                        <table className="w-max min-w-max divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50">
                            <tr className="text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                                <th className="p-3 sticky left-0 z-30 bg-gray-50 w-[120px]">상품ID</th>
                                <th className="p-3 sticky left-[120px] z-30 bg-gray-50 w-[240px]">상품명</th>
                                <th className="p-3 w-[160px]">분류</th>
                                <th className="p-3 w-[140px]">타입</th>
                                <th className="p-3 w-[100px]">사용</th>
                                <th className="p-3 w-[140px]">구매옵션</th>
                                <th className="p-3 w-[140px]">생성자</th>
                                <th className="p-3 w-[200px]">생성일</th>
                                <th className="p-3 w-[140px]">수정자</th>
                                <th className="p-3 w-[200px]">최종수정</th>
                                <th className="p-3 w-[280px]">동작</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm whitespace-nowrap">
                            {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
                            {!isLoading && pageData.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="p-6 text-center text-gray-500">검색/필터 조건에 해당하는 상품이 없습니다.</td>
                                </tr>
                            )}

                            {!isLoading && pageData.map((p) => (
                                <tr key={p.productId} className="hover:bg-gray-50">
                                    <td className="p-3 sticky left-0 z-20 bg-white w-[120px] truncate">{p.productId}</td>
                                    <td className="p-3 sticky left-[120px] z-20 bg-white w-[240px] truncate">{p.productNm}</td>

                                    <td className="p-3 w-[160px]">{p.productCategory}</td>
                                    <td className="p-3 w-[140px]">{p.productType}</td>
                                    <td className="p-3 w-[100px]">{p.useYn === "Y" ? <Badge tone="green">Y</Badge> : <Badge tone="red">N</Badge>}</td>
                                    <td className="p-3 w-[140px]">{(p.codeOption?.length ?? 0) > 0 ? <Badge tone="blue">있음</Badge> : <Badge tone="gray">없음</Badge>}</td>

                                    <td className="p-3 w-[140px]">{p.createId}</td>
                                    <td className="p-3 w-[200px] text-gray-700">{formatKST(p.createDate)}</td>
                                    <td className="p-3 w-[140px]">{p.updateId}</td>
                                    <td className="p-3 w-[200px] text-gray-700">{formatKST(p.updateDate)}</td>

                                    <td className="p-3 w-[280px]">
                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => { setSelected(p); setModalMode("edit"); }} className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">수정</button>
                                            <button onClick={() => { setSelected(p); setModalMode("deleteConfirm"); }} className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50">삭제</button>
                                            <button onClick={() => openDrawer(p)} className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">상세</button>
                                            <button className={classNames("rounded-md px-2 py-1 text-xs", p.useYn === "Y" ? "border border-yellow-300 hover:bg-yellow-50" : "border border-green-300 hover:bg-green-50")}>{p.useYn === "Y" ? "사용중지" : "사용재개"}</button>
                                        </div>
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
            )}

            {/* Scroller view: chips */}
            {viewMode === "scroller" && (
                <section className="space-y-2">
                    {isLoading && <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">로딩 중…</div>}
                    {!isLoading && pageData.length === 0 && <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-sm">검색/필터 조건에 해당하는 상품이 없습니다.</div>}

                    {!isLoading && pageData.map((p) => (
                        <div key={p.productId} className="group rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center gap-2 border-b p-2 text-xs text-gray-600">
                                <span className="font-medium text-gray-900">{p.productId}</span>
                                <span className="text-gray-300">•</span>
                                <span className="truncate">{p.productNm}</span>
                                <span className="ml-auto hidden pr-2 group-hover:block">
                  <button onClick={() => openDrawer(p)} className="rounded-md border px-2 py-1">상세</button>
                </span>
                            </div>
                            <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto flex-nowrap px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x" style={{ scrollbarWidth: "none" }}>
                                <style jsx global>{`
                  .no-scrollbar::-webkit-scrollbar{ display:none }
                  .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none }
                `}</style>
                                {[{label:"분류",val:p.productCategory},{label:"타입",val:p.productType},{label:"사용",val:p.useYn},{label:"구매옵션",val:(p.codeOption?.length??0)>0?"있음":"없음"},{label:"생성자",val:p.createId},{label:"생성일",val:formatKST(p.createDate)},{label:"수정자",val:p.updateId},{label:"최종수정",val:formatKST(p.updateDate)}].map((it,idx)=> (
                                    <div key={idx} className="snap-start">
                                        <div className="mx-1 inline-flex min-w-[160px] items-center justify-between rounded-lg border px-3 py-2 text-sm">
                                            <span className="text-gray-500">{it.label}</span>
                                            <span className="ml-3 font-medium text-gray-900">{it.val}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="ml-2 inline-flex items-center gap-2">
                                    <button onClick={() => { setSelected(p); setModalMode("edit"); }} className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">수정</button>
                                    <button onClick={() => { setSelected(p); setModalMode("deleteConfirm"); }} className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50">삭제</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between gap-2 p-1 text-sm">
                        <span className="text-gray-600">총 <b>{total}</b>건 · 페이지 <b>{page}</b> / {totalPages}</span>
                        <div className="flex items-center gap-2">
                            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">이전</button>
                            <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">다음</button>
                        </div>
                    </div>
                </section>
            )}

            {/* Right Drawer (detail) */}
            <div
                className={classNames(
                    "fixed right-0 z-40 w-full max-w-md transform bg-white shadow-xl transition-transform",
                    // iOS 주소창 높이 변화 대응: dvh 사용 (지원 안되면 inset-y-0로 충분)
                    "h-dvh md:inset-y-0 md:h-full",
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                )}
                role="dialog"
                aria-modal="true"
            >
                {/* 세로 플렉스 컨테이너 */}
                <div className="flex h-full flex-col">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
                        <h2 className="text-base font-semibold">상품 상세</h2>
                        <button onClick={closeDrawer} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">닫기</button>
                    </div>

                    {/* Scrollable Body */}
                    <div
                        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-3 text-sm"
                        style={{ scrollbarGutter: "stable" }} // 스크롤바 등장 시 레이아웃 흔들림 방지(옵션)
                    >
                        {!selected ? (
                            <p className="text-gray-500">선택된 상품이 없습니다.</p>
                        ) : (
                            <>
                                <div>
                                    <div className="text-xs text-gray-500">상품ID</div>
                                    <div className="font-medium">{selected.productId}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">상품명</div>
                                    <div>{selected.productNm}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <div className="text-xs text-gray-500">분류</div>
                                        <div>{selected.productCategory}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">타입</div>
                                        <div>{selected.productType}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">사용</div>
                                        <div>{selected.useYn}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">구매옵션</div>
                                    <div>{(selected.codeOption?.length ?? 0) > 0 ? selected.codeOption?.join(", ") : "없음"}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-gray-500">생성자</div>
                                        <div>{selected.createId}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">수정자</div>
                                        <div>{selected.updateId}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-gray-500">생성일</div>
                                        <div>{formatKST(selected.createDate)}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">최종수정</div>
                                        <div>{formatKST(selected.updateDate)}</div>
                                    </div>
                                </div>

                                {/* 상세 데이터: 로딩/에러/콘텐츠 */}
                                <div className="pt-3 border-t mt-3">
                                    <div className="mb-2 text-xs text-gray-500">상세 정보</div>

                                    {detailLoading && (
                                        <div className="space-y-2">
                                            <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
                                            <div className="h-4 w-48 rounded bg-gray-100 animate-pulse" />
                                            <div className="h-24 w-full rounded bg-gray-100 animate-pulse" />
                                        </div>
                                    )}

                                    {detailError && (
                                        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                                            {detailError}
                                        </div>
                                    )}

                                    {detail && (
                                        <div className="space-y-4">
                                            {/* 메인이미지 & 설명 */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="col-span-1">
                                                    <div className="text-xs text-gray-500">메인 이미지</div>
                                                    {detail.mainImagePath ? (
                                                        // 서버 경로일 수 있으니 우선 그대로 노출
                                                        <img
                                                            src={imageUrl}
                                                            alt={detail.mainImageFileNm ?? detail.productNm}
                                                            className="mt-1 aspect-square w-full rounded border object-cover"
                                                        />
                                                    ) : (
                                                        <div className="mt-1 rounded border bg-gray-50 p-4 text-center text-gray-400">
                                                            이미지 없음
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="text-xs text-gray-500">설명</div>
                                                    <div className="mt-1 whitespace-pre-wrap">
                                                        {detail.mainDesc ?? "—"}
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-3 gap-3">
                                                        <div>
                                                            <div className="text-xs text-gray-500">재고 수량</div>
                                                            <div className="font-medium">{detail.stockQuantity}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500">구매 제한</div>
                                                            <div className="font-medium">
                                                                {detail.availablePurchase ?? (detail as any).avaliablePurchase ?? 0}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500">옵션 코드</div>
                                                            <div className="truncate">
                                                                {(detail.codeOption?.length ?? 0) > 0
                                                                    ? detail.codeOption?.join(", ")
                                                                    : "없음"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 가격 리스트 */}
                                            <div>
                                                <div className="text-xs text-gray-500">가격 리스트</div>
                                                {detail.productPriceList?.length ? (
                                                    <div className="mt-2 overflow-hidden rounded border">
                                                        <table className="w-full text-xs">
                                                            <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-2 py-1 text-left font-medium">권한</th>
                                                                <th className="px-2 py-1 text-right font-medium">기본금액</th>
                                                                <th className="px-2 py-1 text-center font-medium">부가세</th>
                                                                <th className="px-2 py-1 text-center font-medium">타입</th>
                                                                <th className="px-2 py-1 text-right font-medium">값</th>
                                                                <th className="px-2 py-1 text-right font-medium">최종요금</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {detail.productPriceList.map((it, i) => (
                                                                <tr key={i} className="border-t">
                                                                    <td className="px-2 py-1">{it.roleId}</td>
                                                                    <td className="px-2 py-1 text-right">
                                                                        {it.productPrice.toLocaleString()}
                                                                    </td>
                                                                    <td className="px-2 py-1 text-center">{it.taxAddYn}</td>
                                                                    <td className="px-2 py-1 text-center">{it.taxAddType}</td>
                                                                    <td className="px-2 py-1 text-right">
                                                                        {it.taxAddType === "percent"
                                                                            ? `${it.taxAddValue}%`
                                                                            : it.taxAddValue.toLocaleString()}
                                                                    </td>
                                                                    <td className="px-2 py-1 text-right font-semibold">
                                                                        {it.finalfee.toLocaleString()}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="mt-1 rounded border bg-gray-50 p-3 text-gray-500">
                                                        가격 정보 없음
                                                    </div>
                                                )}
                                            </div>

                                            {/* 구매 대기 목록 */}
                                            <div>
                                                <div className="text-xs text-gray-500">구매 대기 목록</div>
                                                {detail.purchaseWatingList?.length ? (
                                                    <div className="mt-2 overflow-hidden rounded border">
                                                        <table className="w-full text-xs">
                                                            <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-2 py-1 text-left font-medium">Idx</th>
                                                                <th className="px-2 py-1 text-left font-medium">구매자</th>
                                                                <th className="px-2 py-1 text-center font-medium">상태</th>
                                                                <th className="px-2 py-1 text-right font-medium">수량</th>
                                                                <th className="px-2 py-1 text-center font-medium">만료시각</th>
                                                                <th className="px-2 py-1 text-center font-medium">만료인덱스</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {detail.purchaseWatingList.map((w) => (
                                                                <tr key={w.purchaseIndex} className="border-t">
                                                                    <td className="px-2 py-1">{w.purchaseIndex}</td>
                                                                    <td className="px-2 py-1">{w.userId}</td>
                                                                    <td className="px-2 py-1 text-center">
                                                                        <Badge tone={w.purchaseYn === "Y" ? "green" : w.purchaseYn === "N" ? "red" : "yellow"}>
                                                                            {w.purchaseYn}
                                                                        </Badge>
                                                                    </td>
                                                                    <td className="px-2 py-1 text-right">{w.purchaseQuantity}</td>
                                                                    <td className="px-2 py-1 text-center">{formatKST(w.purchaseExpired)}</td>
                                                                    <td className="px-2 py-1 text-center">{w.expiredIndex}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="mt-1 rounded border bg-gray-50 p-3 text-gray-500">
                                                        대기 내역 없음
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <div className="text-xs text-gray-500">빠른 작업</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <button onClick={() => { setSelected(selected); setModalMode("edit"); }} className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50">수정</button>
                                        <button onClick={() => { setSelected(selected); setModalMode("deleteConfirm"); }} className="rounded-md border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50">삭제</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {drawerOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]" onClick={closeDrawer} />}

            {/* Modals (UI only) */}
            {modalMode && (
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setModalMode(null)} />
                    <div className="relative w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
                        {modalMode === "create" && (
                            <CreateProductForm
                                onCancel={() => setModalMode(null)}
                                onCreated={async () => {
                                    await refreshList();
                                    setModalMode(null);
                                }}
                            />
                            // <>
                            //     <h3 className="mb-3 text-lg font-semibold">새 상품 생성</h3>
                            //     <p className="mb-4 text-sm text-gray-600">상품 생성 폼을 여기에 구성하세요. (상품명/분류/타입/사용여부/옵션 등)</p>
                            //     <div className="flex justify-end gap-2">
                            //         <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setModalMode(null)}>취소</button>
                            //         <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800">저장</button>
                            //     </div>
                            // </>
                        )}

                        {modalMode === "edit" && selected && (
                            <>
                                <h3 className="mb-3 text-lg font-semibold">상품 수정 – {selected.productNm}</h3>
                                <p className="mb-4 text-sm text-gray-600">수정 폼을 여기에 구성하세요. (필요 시 기본값 바인딩)</p>
                                <div className="flex justify-end gap-2">
                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setModalMode(null)}>취소</button>
                                    <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800">저장</button>
                                </div>
                            </>
                        )}

                        {modalMode === "deleteConfirm" && selected && (
                            <>
                                <h3 className="mb-3 text-lg font-semibold">삭제 확인</h3>
                                <p className="mb-4 text-sm text-gray-600">정말로 <b>{selected.productNm}</b> (ID: {selected.productId})을(를) 삭제하시겠습니까?</p>
                                <div className="flex justify-end gap-2">
                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setModalMode(null)}>취소</button>
                                    <button className="rounded-md border border-red-300 bg-red-600/10 px-3 py-2 text-sm text-red-700 hover:bg-red-600/20">삭제</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


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


function CreateProductForm({
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
