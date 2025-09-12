"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Role,
    RoleList,
    postRoleAdd,
    postRoleEdit,
} from "@/lib/api/adminApi";

type Props = {
    className?: string;
    /** 저장/수정 후 상위에서 무언가 갱신하고 싶을 때 옵션 */
    onAfterChange?: () => Promise<void> | void;
};

type RowBusyMap = Record<string, boolean>;

function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "green" | "red" | "yellow" | "blue" | "gray" }) {
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

// 아주 얇은 토스트 훅
function useToast() {
    const [toast, setToast] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);
    const show = (msg: string, type: "success" | "error" | "info" = "success") => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 1800);
    };
    const clear = () => setToast(null);
    return { toast, show, clear };
}

// JSON 입력 필드(검증/자동정렬 버튼)
function JsonEditor({
                        value,
                        onChange,
                        disabled,
                        rows = 4,
                    }: {
    value: string;
    onChange: (s: string) => void;
    disabled?: boolean;
    rows?: number;
}) {
    const [local, setLocal] = useState(value);
    const [valid, setValid] = useState(true);

    useEffect(() => { setLocal(value); }, [value]);

    function validate(s: string) {
        try {
            JSON.parse(s || "{}");
            setValid(true);
        } catch {
            setValid(false);
        }
    }
    function handleChange(s: string) {
        setLocal(s);
        validate(s);
        onChange(s); // 상위가 최종 검증
    }
    function format() {
        try {
            const obj = JSON.parse(local || "{}");
            const pretty = JSON.stringify(obj, null, 2);
            setLocal(pretty);
            onChange(pretty);
            setValid(true);
        } catch {
            setValid(false);
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1">
        <span className={`text-xs ${valid ? "text-gray-500" : "text-red-600"}`}>
          {valid ? "JSON" : "JSON 형식이 올바르지 않습니다."}
        </span>
                <button type="button" onClick={format} disabled={disabled} className="text-xs rounded border px-2 py-0.5 hover:bg-gray-50 disabled:opacity-50">
                    정렬
                </button>
            </div>
            <textarea
                value={local}
                onChange={(e) => handleChange(e.target.value)}
                rows={rows}
                disabled={disabled}
                className={`w-full rounded border px-2 py-1 text-sm font-mono ${valid ? "border-gray-300" : "border-red-400"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder='예: { "canEdit": true }'
            />
        </div>
    );
}

export default function RoleTable({ className, onAfterChange }: Props) {
    const { toast, show } = useToast();

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const [rowBusy, setRowBusy] = useState<RowBusyMap>({});
    const [editId, setEditId] = useState<string | null>(null);

    // 추가 폼
    const [addOpen, setAddOpen] = useState(false);
    const [addRoleId, setAddRoleId] = useState("");
    const [addRoleNm, setAddRoleNm] = useState("");
    const [addUseYn, setAddUseYn] = useState<"Y" | "N">("Y");
    const [addInfo, setAddInfo] = useState("{\n  \n}");

    // 편집 폼
    const editing = useMemo(() => roles.find((r) => r.roleId === editId) || null, [editId, roles]);
    const [editRoleNm, setEditRoleNm] = useState("");
    const [editUseYn, setEditUseYn] = useState<"Y" | "N">("Y");
    const [editInfo, setEditInfo] = useState("{}");

    async function reload() {
        try {
            setLoading(true);
            setErr(null);
            const list = await RoleList();
            setRoles(Array.isArray(list) ? list : []);
        } catch (e: any) {
            setErr(e?.message || "권한 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { reload(); }, []);

    // 편집 시작
    function startEdit(r: Role) {
        setEditId(r.roleId);
        setEditRoleNm(r.roleNm ?? "");
        setEditUseYn((r.useYn as "Y" | "N") ?? "Y");
        setEditInfo(JSON.stringify(r.roleUsedInfo ?? {}, null, 2));
    }
    function cancelEdit() {
        setEditId(null);
    }

    // 편집 저장
    async function saveEdit() {
        if (!editing) return;
        const rid = editing.roleId;
        let infoObj: any = {};
        try {
            infoObj = editInfo ? JSON.parse(editInfo) : {};
        } catch {
            show("권한 설정(JSON) 형식이 올바르지 않습니다.", "error");
            return;
        }
        const payload = {
            roleId: rid,
            roleNm: editRoleNm.trim(),
            useYn: editUseYn,
            roleUsedInfo: infoObj,
        };
        setRowBusy((m) => ({ ...m, [rid]: true }));
        // 낙관적 업데이트
        const prev = roles;
        const next = roles.map((r) => (r.roleId === rid ? { ...r, ...payload } : r));
        setRoles(next);
        try {
            await postRoleEdit(payload);
            show("권한이 수정되었습니다.", "success");
            setEditId(null);
            await onAfterChange?.();
        } catch (e: any) {
            setRoles(prev); // 롤백
            show(e?.message || "권한 수정 실패", "error");
        } finally {
            setRowBusy((m) => ({ ...m, [rid]: false }));
        }
    }

    // 권한 추가
    async function addRole() {
        if (!addRoleId.trim()) return show("권한 ID를 입력해 주세요.", "error");
        if (!addRoleNm.trim()) return show("권한 이름을 입력해 주세요.", "error");
        let infoObj: any = {};
        try {
            infoObj = addInfo ? JSON.parse(addInfo) : {};
        } catch {
            return show("권한 설정(JSON) 형식이 올바르지 않습니다.", "error");
        }
        const payload = {
            roleId: addRoleId.trim(),
            roleNm: addRoleNm.trim(),
            useYn: addUseYn,
            roleUsedInfo: infoObj,
        };
        setRowBusy((m) => ({ ...m, ["__add__"]: true }));
        try {
            await postRoleAdd(payload);
            show("권한이 추가되었습니다.", "success");
            // 목록에 추가
            setRoles((rs) => [{ ...payload }, ...rs]);
            // 입력 초기화
            setAddRoleId(""); setAddRoleNm(""); setAddUseYn("Y"); setAddInfo("{\n  \n}");
            setAddOpen(false);
            await onAfterChange?.();
        } catch (e: any) {
            show(e?.message || "권한 추가 실패", "error");
        } finally {
            setRowBusy((m) => ({ ...m, ["__add__"]: false }));
        }
    }

    return (
        <div className={className}>
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold">권한 관리</h2>
                    <p className="text-xs text-gray-500">권한 종류를 조회/추가/수정합니다.</p>
                </div>
                <button
                    onClick={() => setAddOpen((v) => !v)}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                >
                    {addOpen ? "추가 취소" : "새 권한 추가"}
                </button>
            </div>

            {/* 추가 폼 */}
            {addOpen && (
                <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">권한 ID</label>
                            <input
                                value={addRoleId}
                                onChange={(e) => setAddRoleId(e.target.value)}
                                placeholder="예: manager"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">권한 이름</label>
                            <input
                                value={addRoleNm}
                                onChange={(e) => setAddRoleNm(e.target.value)}
                                placeholder="예: 매니저"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">사용 여부</label>
                            <select
                                value={addUseYn}
                                onChange={(e) => setAddUseYn(e.target.value as "Y" | "N")}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="Y">Y (사용)</option>
                                <option value="N">N (중지)</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">권한 설정(JSON)</label>
                            <JsonEditor value={addInfo} onChange={setAddInfo} disabled={rowBusy["__add__"]} rows={6} />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                        <button
                            disabled={rowBusy["__add__"]}
                            onClick={addRole}
                            className="rounded-md border border-blue-300 px-3 py-1 text-sm hover:bg-blue-50 disabled:opacity-50"
                        >
                            추가
                        </button>
                        <button
                            onClick={() => setAddOpen(false)}
                            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}

            {/* 목록 */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-max min-w-full table-auto divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
                        <tr>
                            <th className="p-3 w-[160px]">권한 ID</th>
                            <th className="p-3 w-[200px]">권한 이름</th>
                            <th className="p-3 w-[120px]">사용</th>
                            <th className="p-3 w-[480px]">권한 설정(JSON)</th>
                            <th className="p-3 w-[180px]">동작</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                        {loading && (
                            <>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: 5 }).map((_, j) => (
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
                                <td colSpan={5} className="p-6 text-center text-red-600">{err}</td>
                            </tr>
                        )}

                        {!loading && !err && roles.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500">권한이 없습니다.</td>
                            </tr>
                        )}

                        {!loading && !err && roles.map((r) => {
                            const busy = !!rowBusy[r.roleId];
                            const isEdit = editId === r.roleId;
                            return (
                                <tr key={r.roleId} className="hover:bg-gray-50">
                                    {/* 권한 ID(고정) */}
                                    <td className="p-3 font-mono text-xs">{r.roleId}</td>

                                    {/* 권한 이름 */}
                                    <td className="p-3">
                                        {!isEdit ? (
                                            <span>{r.roleNm}</span>
                                        ) : (
                                            <input
                                                value={editRoleNm}
                                                onChange={(e) => setEditRoleNm(e.target.value)}
                                                className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-200"
                                            />
                                        )}
                                    </td>

                                    {/* 사용 여부 */}
                                    <td className="p-3">
                                        {!isEdit ? (
                                            r.useYn === "Y" ? <Badge tone="green">Y</Badge> : <Badge tone="red">N</Badge>
                                        ) : (
                                            <select
                                                value={editUseYn}
                                                onChange={(e) => setEditUseYn(e.target.value as "Y" | "N")}
                                                className="rounded border border-gray-300 px-2 py-1 text-sm"
                                            >
                                                <option value="Y">Y (사용)</option>
                                                <option value="N">N (중지)</option>
                                            </select>
                                        )}
                                    </td>

                                    {/* roleUsedInfo */}
                                    <td className="p-3 align-top">
                                        {!isEdit ? (
                                            <div className="max-w-[540px]">
                          <pre className="max-h-28 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-700">
{JSON.stringify(r.roleUsedInfo ?? {}, null, 2)}
                          </pre>
                                            </div>
                                        ) : (
                                            <JsonEditor value={editInfo} onChange={setEditInfo} disabled={busy} rows={6} />
                                        )}
                                    </td>

                                    {/* 동작 */}
                                    <td className="p-3">
                                        {!isEdit ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEdit(r)}
                                                    className="rounded-md border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                                                >
                                                    수정
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    disabled={busy}
                                                    onClick={saveEdit}
                                                    className="rounded-md border border-blue-300 px-3 py-1 text-xs hover:bg-blue-50 disabled:opacity-50"
                                                >
                                                    저장
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="rounded-md border px-3 py-1 text-xs hover:bg-gray-50"
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 토스트 */}
            {toast && (
                <div
                    className={
                        "fixed top-4 right-4 z-[60] rounded-lg px-4 py-3 text-sm shadow-lg ring-1 " +
                        (toast.type === "success"
                            ? "bg-green-50 text-green-800 ring-green-600/20"
                            : toast.type === "error"
                                ? "bg-red-50 text-red-700 ring-red-600/20"
                                : "bg-gray-50 text-gray-700 ring-gray-600/20")
                    }
                    role="status"
                >
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
