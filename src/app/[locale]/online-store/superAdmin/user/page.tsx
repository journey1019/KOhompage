// src/app/[locale]/online-store/superAdmin/user/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { UserList, type User, UserRole, UserUse } from "@/lib/api/adminApi";
import AdminUserDetail from '@/app/[locale]/online-store/superAdmin/user/_components/AdminUserDetail';
import { formatKST } from '@/module/pgAdminHelper';

// ————————————————————————————————————————————————————————
// Small UI atoms (pure Tailwind, no external deps)
// ————————————————————————————————————————————————————————
function Badge({
                   children,
                   tone = "gray",
               }: {
    children: React.ReactNode;
    tone?: "green" | "red" | "yellow" | "blue" | "gray";
}) {
    const map: Record<string, string> = {
        green: "bg-green-50 text-green-700 ring-green-600/20",
        red: "bg-red-50 text-red-700 ring-red-600/20",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
        gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
    };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`}>
      {children}
    </span>
    );
}

function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
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

// ————————————————————————————————————————————————————————
// Page
// ————————————————————————————————————————————————————————
export default function UserPage() {
    type ViewMode = "table" | "scroller";
    const [viewMode, setViewMode] = useState<ViewMode>("table");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // UI state
    const [query, setQuery] = useState(""); // 검색 (userId, userNm)
    const [role, setRole] = useState<"all" | "admin" | "user">("all");
    const [useYn, setUseYn] = useState<"all" | "Y" | "N">("all");
    const [delYn, setDelYn] = useState<"all" | "Y" | "N">("all");
    const [sortKey, setSortKey] = useState<"updateDate" | "subscribeDate" | "userId">("updateDate");
    const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

    // Drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selected, setSelected] = useState<User | null>(null);

    // Pagination (client-side)
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    // 행 단위 로딩 상태
    const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await UserList();
                setUsers(Array.isArray(data) ? data : []);
            } catch (e: any) {
                console.error(e);
                setError("사용자 목록을 불러오지 못했습니다.");
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    // 권한 토글 (admin <-> user)
    async function toggleRole(u: User) {
        if (!u?.userId) return;
        const userId = u.userId;
        const nextRole = u.roleId === "admin" ? "user" : "admin";

        setRowBusy((m) => ({ ...m, [userId]: true }));
        // 낙관적 업데이트
        setUsers((list) =>
            list.map((x) => (x.userId === userId ? { ...x, roleId: nextRole } : x))
        );
        try {
            await UserRole({ userId, roleId: nextRole });
            // 성공 시 그대로 유지
            alert(`"${nextRole}"로 권한 변경 성공`);
        } catch (e: any) {
            // 실패 시 롤백
            setUsers((list) =>
                list.map((x) => (x.userId === userId ? { ...x, roleId: u.roleId } : x))
            );
            alert(e?.message || "권한 변경 실패");
        } finally {
            setRowBusy((m) => ({ ...m, [userId]: false }));
        }
    }

    // 사용여부 토글 (Y <-> N)
    async function toggleUse(u: User) {
        if (!u?.userId) return;
        const userId = u.userId;
        const nextUseYn = u.useYn === "Y" ? "N" : "Y";

        setRowBusy((m) => ({ ...m, [userId]: true }));
        // 낙관적 업데이트
        setUsers((list) =>
            list.map((x) => (x.userId === userId ? { ...x, useYn: nextUseYn } : x))
        );
        try {
            await UserUse({ userId, useYn: nextUseYn === "Y" });
        } catch (e: any) {
            // 실패 시 롤백
            setUsers((list) =>
                list.map((x) => (x.userId === userId ? { ...x, useYn: u.useYn } : x))
            );
            alert(e?.message || "계정 사용 여부 변경 실패");
        } finally {
            setRowBusy((m) => ({ ...m, [userId]: false }));
        }
    }

    // Derived list: filter + sort
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return users.filter((u) => {
            const matchesQ = !q ||
                u.userId?.toLowerCase().includes(q) ||
                u.userNm?.toLowerCase().includes(q);
            const matchesRole = role === "all" || u.roleId === role;
            const matchesUse = useYn === "all" || u.useYn === useYn;
            const matchesDel = delYn === "all" || u.delYn === delYn;
            return matchesQ && matchesRole && matchesUse && matchesDel;
        });
    }, [users, query, role, useYn, delYn]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        arr.sort((a, b) => {
            let va: string = "";
            let vb: string = "";
            if (sortKey === "userId") {
                va = a.userId ?? ""; vb = b.userId ?? "";
                return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            if (sortKey === "subscribeDate" || sortKey === "updateDate") {
                va = (a as any)[sortKey] ?? "";
                vb = (b as any)[sortKey] ?? "";
                // compare as time. fall back to string compare if invalid
                const ta = Date.parse((va as string).replace(" ", "T") + "+09:00");
                const tb = Date.parse((vb as string).replace(" ", "T") + "+09:00");
                const diff = (Number.isNaN(tb) || Number.isNaN(ta)) ? vb.localeCompare(va) : tb - ta;
                return sortDir === "asc" ? -diff : diff;
            }
            return 0;
        });
        return arr;
    }, [filtered, sortKey, sortDir]);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function toggleSort(key: typeof sortKey) {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    }

    function openDrawer(user: User) {
        setSelected(user);
        setIsDrawerOpen(true);
    }

    function closeDrawer() {
        setIsDrawerOpen(false);
        setSelected(null);
    }

    // ————————————————————————————————————————————————————————
    // Render
    // ————————————————————————————————————————————————————————
    return (
        <div className="mx-auto max-w-6xl p-6 overflow-x-hidden">
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">관리자 사용자 목록</h1>
                    <p className="mt-1 text-sm text-gray-600">슈퍼관리자 페이지 · 사용자 계정 현황/관리</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Badge tone="blue">총 {users.length}명</Badge>
                        <Badge tone="green">활성 {users.filter(u => u.useYn === "Y").length}</Badge>
                        <Badge tone="red">삭제 {users.filter(u => u.delYn === "Y").length}</Badge>
                    </div>
                    <div className="ml-2 inline-flex overflow-hidden rounded-lg border">
                        <button
                            onClick={() => setViewMode("table")}
                            className={`px-3 py-1 text-sm ${viewMode === "table" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                            title="가로 스크롤 테이블"
                        >
                            테이블
                        </button>
                        <button
                            onClick={() => setViewMode("scroller")}
                            className={`px-3 py-1 text-sm ${viewMode === "scroller" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                            title="행 내부 가로 스크롤"
                        >
                            스크롤러
                        </button>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">검색</label>
                        <input
                            value={query}
                            onChange={(e) => {
                                setPage(1);
                                setQuery(e.target.value);
                            }}
                            placeholder="ID, 이름으로 검색"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">권한</label>
                        <select
                            value={role}
                            onChange={(e) => {
                                setPage(1);
                                setRole(e.target.value as any);
                            }}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="all">전체</option>
                            <option value="admin">관리자</option>
                            <option value="user">일반사용자</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">사용 여부</label>
                        <select
                            value={useYn}
                            onChange={(e) => {
                                setPage(1);
                                setUseYn(e.target.value as any);
                            }}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="all">전체</option>
                            <option value="Y">사용(Y)</option>
                            <option value="N">중지(N)</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">삭제 여부</label>
                        <select
                            value={delYn}
                            onChange={(e) => {
                                setPage(1);
                                setDelYn(e.target.value as any);
                            }}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="all">전체</option>
                            <option value="N">정상(N)</option>
                            <option value="Y">삭제(Y)</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">정렬</label>
                        <div className="flex gap-2">
                            <select
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value as any)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="updateDate">최종수정일</option>
                                <option value="subscribeDate">가입일</option>
                                <option value="userId">아이디</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                                className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                                title="정렬 방향"
                            >
                                {sortDir === "desc" ? "내림차순" : "오름차순"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table (horizontal scroll) */}
            {viewMode === "table" && (
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="relative max-w-full overflow-x-auto overscroll-x-contain touch-pan-x">
                        <table className="w-max min-w-max divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50">
                            <tr className="text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                                {/* sticky 1: ID */}
                                <th className="p-3 lg:sticky lg:left-0 lg:z-30 bg-gray-50 w-[100px]">아이디</th>
                                {/* sticky 2: 이름 (left는 ID의 폭과 일치) */}
                                <th className="p-3 lg:sticky lg:left-[100px] lg:z-30 bg-gray-50 w-[150px]">이름</th>

                                <th className="p-3 w-[120px]">권한</th>
                                <th className="p-3 w-[96px]">사용</th>
                                <th className="p-3 w-[96px]">삭제</th>
                                <th
                                    className="p-3 w-[200px] cursor-pointer"
                                    onClick={() => toggleSort('subscribeDate')}
                                >
                                    가입일
                                </th>
                                <th
                                    className="p-3 w-[200px] cursor-pointer"
                                    onClick={() => toggleSort('updateDate')}
                                >
                                    최종수정
                                </th>
                                <th className="p-3 w-[200px]">동작</th>
                            </tr>
                            </thead>

                            {/* ❗️tbody는 하나만 */}
                            <tbody className="divide-y divide-gray-100 text-sm whitespace-nowrap">
                            {isLoading && (
                                <>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <SkeletonRow key={i} />
                                    ))}
                                </>
                            )}

                            {!isLoading && pageData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-6 text-center text-gray-500">
                                        검색/필터 조건에 해당하는 사용자가 없습니다.
                                    </td>
                                </tr>
                            )}

                            {!isLoading &&
                                pageData.map((u) => {
                                    const busy = !!rowBusy[u.userId];
                                    return (
                                        <tr key={u.userId} className="hover:bg-gray-50">
                                            <td className="p-3 lg:sticky lg:left-0 lg:z-20 bg-white w-[100px] truncate">
                                                {u.userId}
                                            </td>
                                            <td className="p-3 lg:sticky lg:left-[100px] lg:z-20 bg-white w-[150px] truncate">
                                                {u.userNm}
                                            </td>

                                            <td className="p-3 w-[120px]">
                                            {u.roleId === 'admin' ? (
                                                    <Badge tone="blue">관리자</Badge>
                                                ) : (
                                                    <Badge tone="gray">일반사용자</Badge>
                                                )}
                                            </td>
                                            <td className="p-3 w-[96px]">
                                                {u.useYn === 'Y' ? (
                                                    <Badge tone="green">Y</Badge>
                                                ) : (
                                                    <Badge tone="red">N</Badge>
                                                )}
                                            </td>
                                            <td className="p-3 w-[96px]">
                                                {u.delYn === 'Y' ? (
                                                    <Badge tone="red">Y</Badge>
                                                ) : (
                                                    <Badge tone="gray">N</Badge>
                                                )}
                                            </td>
                                            <td className="p-3 w-[200px] text-gray-700">
                                                {formatKST(u.subscribeDate)}
                                            </td>
                                            <td className="p-3 w-[200px] text-gray-700">
                                                {formatKST(u.updateDate)}
                                            </td>
                                            <td className="p-3 w-[200px]">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openDrawer(u)}
                                                        className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                                                    >
                                                        상세
                                                    </button>

                                                    {/* 권한 전환 버튼 */}
                                                    <button
                                                        type="button"
                                                        disabled={busy}
                                                        onClick={() => toggleRole(u)}
                                                        className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
                                                        title="관리자/일반사용자 전환"
                                                    >
                                                        권한전환
                                                    </button>

                                                    {/* 사용/중지 토글 */}
                                                    <button
                                                        type="button"
                                                        disabled={busy}
                                                        onClick={() => toggleUse(u)}
                                                        className={classNames(
                                                            'rounded-md px-2 py-1 text-xs disabled:opacity-50',
                                                            u.useYn === 'Y'
                                                                ? 'border border-yellow-300 hover:bg-yellow-50'
                                                                : 'border border-green-300 hover:bg-green-50',
                                                        )}
                                                    >
                                                        {u.useYn === 'Y' ? '사용중지' : '사용재개'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer: pagination & error */}
                    <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3 text-sm">
                        <div className="text-gray-600">
                            {error ? (
                                <span className="text-red-600">{error}</span>
                            ) : (
                                <span>
            총 <b>{total}</b>건 · 페이지 <b>{page}</b> / {totalPages}
          </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                이전
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                다음
                            </button>
                        </div>
                    </div>
                </section>
            )}


            {/* Scroller view: single-line chips per row with horizontal scroll & snap */}
            {viewMode === 'scroller' && (
                <section className="space-y-2">
                    {isLoading && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">로딩 중…</div>
                    )}
                    {!isLoading && pageData.length === 0 && (
                        <div
                            className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-sm">검색/필터
                            조건에 해당하는 사용자가 없습니다.</div>
                    )}

                    {!isLoading && pageData.map((u) => {
                        const busy = !!rowBusy[u.userId];
                        return (
                            <div key={u.userId} className="group rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex items-center gap-2 border-b p-2 text-xs text-gray-600">
                                    <span className="font-medium text-gray-900">{u.userId}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{u.userNm}</span>
                                    <span className="ml-auto hidden pr-2 group-hover:block">
                      <button onClick={() => openDrawer(u)} className="rounded-md border px-2 py-1">상세</button>
                    </span>
                                </div>
                                <div className="flex snap-x snap-mandatory overflow-x-auto px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none]">
                                    {/* ... 칩 정보 그대로 ... */}

                                    <div className="ml-2 inline-flex items-center gap-2">
                                        {/* 권한 전환 */}
                                        <button
                                            disabled={busy}
                                            onClick={() => toggleRole(u)}
                                            className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            권한전환
                                        </button>

                                        {/* 사용/중지 토글 */}
                                        <button
                                            disabled={busy}
                                            onClick={() => toggleUse(u)}
                                            className={classNames(
                                                "rounded-md px-2 py-1 text-xs disabled:opacity-50",
                                                u.useYn === "Y"
                                                    ? "border border-yellow-300 hover:bg-yellow-50"
                                                    : "border border-green-300 hover:bg-green-50"
                                            )}
                                        >
                                            {u.useYn === "Y" ? "사용중지" : "사용재개"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* pager for scroller view */}
                    <div className="flex items-center justify-between gap-2 p-1 text-sm">
                        <span className="text-gray-600">총 <b>{total}</b>건 · 페이지 <b>{page}</b> / {totalPages}</span>
                        <div className="flex items-center gap-2">
                            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">이전
                            </button>
                            <button disabled={page >= totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="rounded-md border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">다음
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Right Drawer */}
            <div
                className={classNames(
                    "fixed inset-y-0 right-0 z-40 w-full max-w-md transform bg-white shadow-xl transition-transform",
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!isDrawerOpen}
            >
                {/* Header */}
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-base font-semibold">사용자 상세</h2>
                        <button onClick={closeDrawer} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">
                            닫기
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        {!selected ? (
                            <p className="text-sm text-gray-500">선택된 사용자가 없습니다.</p>
                        ) : (
                            <AdminUserDetail
                                key={selected.userId}
                                userId={selected.userId}
                                onAfterChange={async () => {
                                    // 간단 재조회 (필요 시 debounce)
                                    try {
                                        const data = await UserList();
                                        setUsers(Array.isArray(data) ? data : []);
                                    } catch {/* ignore */
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer backdrop */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
                    onClick={closeDrawer}
                />
            )}
        </div>
    );
}
