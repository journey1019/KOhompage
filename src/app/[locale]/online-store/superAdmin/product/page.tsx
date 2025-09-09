// src/app/[locale]/online-store/superAdmin/product/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductList, type Product } from "@/lib/api/adminApi";

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

    // Pagination
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    useEffect(() => {
        (async () => {
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
        })();
    }, []);

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
            <div className={classNames("fixed inset-y-0 right-0 z-40 w-full max-w-md transform bg-white shadow-xl transition-transform", drawerOpen ? "translate-x-0" : "translate-x-full")}>
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-base font-semibold">상품 상세</h2>
                    <button onClick={closeDrawer} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">닫기</button>
                </div>
                <div className="space-y-3 p-4 text-sm">
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
            {drawerOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]" onClick={closeDrawer} />}

            {/* Modals (UI only) */}
            {modalMode && (
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setModalMode(null)} />
                    <div className="relative w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
                        {modalMode === "create" && (
                            <>
                                <h3 className="mb-3 text-lg font-semibold">새 상품 생성</h3>
                                <p className="mb-4 text-sm text-gray-600">상품 생성 폼을 여기에 구성하세요. (상품명/분류/타입/사용여부/옵션 등)</p>
                                <div className="flex justify-end gap-2">
                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setModalMode(null)}>취소</button>
                                    <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800">저장</button>
                                </div>
                            </>
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
