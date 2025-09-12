// src/app/[locale]/online-store/superAdmin/user/_components/AdminUserDetail.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    getUserDetail,
    type UserDetailResponse,
    UserChangePwd,
    UserRole,
    UserUse,
    UserExpired,
} from "@/lib/api/adminApi";
import { formatBirthDate, formatKRPhone } from "@/module/helper";

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1 text-xs text-gray-500">{label}</div>
            <div className="col-span-2 text-sm text-gray-900 break-all">{children ?? "-"}</div>
        </div>
    );
}

export default function AdminUserDetail({
                                            userId,
                                            onAfterChange,
                                        }: {
    userId: string;
    /** 선택: 변경 후 목록 갱신이 필요하면 부모에서 주입 */
    onAfterChange?: () => Promise<void> | void;
}) {
    const [detail, setDetail] = useState<UserDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // 액션 상태
    const [busy, setBusy] = useState(false);
    const [infoMsg, setInfoMsg] = useState<string | null>(null);

    // 권한 변경 UI
    const [roleOpen, setRoleOpen] = useState(false);
    const [roleId, setRoleId] = useState<"admin" | "user">("user");

    // 비밀번호 변경 UI
    const [pwdOpen, setPwdOpen] = useState(false);
    const [newPwd, setNewPwd] = useState("");
    const [newPwd2, setNewPwd2] = useState("");

    // 만료일 연장 UI
    const [expiredOpen, setExpiredOpen] = useState(false);
    const [expiredAt, setExpiredAt] = useState<string>(""); // "YYYY-MM-DDTHH:mm" (input[type=datetime-local])

    const useYnBool = useMemo(() => detail?.useYn === "Y", [detail?.useYn]);

    async function reload() {
        try {
            setLoading(true);
            setErrorMsg(null);
            const res = await getUserDetail(userId);
            setDetail(res);
            // 초기 권한/만료 설정
            if (res?.roleId === "admin" || res?.roleId === "user") {
                setRoleId(res.roleId as "admin" | "user");
            }
            if (res?.userExpired) {
                // 서버 포맷이 "YYYY-MM-DD HH:mm:ss" 라면 datetime-local 입력으로 변환
                const iso = res.userExpired.replace(" ", "T");
                // 초가 없을 때도 고려
                setExpiredAt(iso.length === 16 ? iso : iso.slice(0, 16));
            }
        } catch (e: any) {
            setErrorMsg(e?.message || "상세 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userId) return;
        reload();
    }, [userId]);

    // ---------- 액션들 ----------
    async function handleToggleUse() {
        if (!detail) return;
        try {
            setBusy(true);
            setInfoMsg(null);
            // API는 boolean을 받도록 정의되어 있으므로, Y/N → boolean 변환
            const next = !useYnBool;
            await UserUse({ userId: detail.userId, useYn: next });
            // 로컬 상태 업데이트
            setDetail({ ...detail, useYn: next ? "Y" : "N" } as any);
            setInfoMsg(next ? "계정이 사용 상태로 변경되었습니다." : "계정이 중지되었습니다.");
            await onAfterChange?.();
        } catch (e: any) {
            setErrorMsg(e?.message || "계정 사용 여부 변경 실패");
        } finally {
            setBusy(false);
        }
    }

    async function handleChangeRole() {
        if (!detail) return;
        try {
            setBusy(true);
            setInfoMsg(null);
            await UserRole({ userId: detail.userId, roleId });
            setDetail({ ...detail, roleId, roleNm: roleId === "admin" ? "관리자" : "일반사용자" });
            setInfoMsg("권한이 변경되었습니다.");
            setRoleOpen(false);
            await onAfterChange?.();
        } catch (e: any) {
            setErrorMsg(e?.message || "권한 변경 실패");
        } finally {
            setBusy(false);
        }
    }

    async function handleChangePwd() {
        if (!detail) return;
        if (!newPwd.trim() || !newPwd2.trim()) {
            setErrorMsg("새 비밀번호를 입력해 주세요.");
            return;
        }
        if (newPwd !== newPwd2) {
            setErrorMsg("비밀번호가 일치하지 않습니다.");
            return;
        }
        // (선택) 추가 정책 검사: 길이/영문숫자특수문자 조합 등
        try {
            setBusy(true);
            setInfoMsg(null);
            await UserChangePwd({ userId: detail.userId, userPw: newPwd });
            setInfoMsg("비밀번호가 변경되었습니다.");
            setPwdOpen(false);
            setNewPwd(""); setNewPwd2("");
            await onAfterChange?.();
        } catch (e: any) {
            setErrorMsg(e?.message || "비밀번호 변경 실패");
        } finally {
            setBusy(false);
        }
    }

    async function handleExtendExpired() {
        if (!detail) return;
        if (!expiredAt) {
            setErrorMsg("만료일을 선택해 주세요.");
            return;
        }
        // datetime-local → "YYYY-MM-DD HH:mm:ss"로 변환
        const asText = expiredAt.replace("T", " ") + ":00";
        try {
            setBusy(true);
            setInfoMsg(null);
            // ⚠️ 서버가 문자열을 받는 경우(권장)
            await UserExpired({ userId: detail.userId, userExpired: asText });

            // 만약 서버가 boolean만 받는 사양이면 아래처럼 바꿔 호출하세요:
            // await UserExpired({ userId: detail.userId, userExpired: true as any });

            setDetail({ ...detail, userExpired: asText });
            setInfoMsg("사용 기간이 변경(연장)되었습니다.");
            setExpiredOpen(false);
            await onAfterChange?.();
        } catch (e: any) {
            setErrorMsg(e?.message || "사용 기간 변경 실패");
        } finally {
            setBusy(false);
        }
    }

    // ---------- UI ----------
    if (loading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
                ))}
            </div>
        );
    }
    if (errorMsg && !detail) {
        return (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMsg}
                <div className="mt-2">
                    <button onClick={reload} className="rounded-md border px-2 py-1 text-xs hover:bg-red-100">
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }
    if (!detail) return <div className="text-sm text-gray-500">데이터가 없습니다.</div>;

    return (
        <div className="space-y-4">
            {/* 알림 영역 */}
            {(infoMsg || errorMsg) && (
                <div
                    className={`rounded border p-3 text-sm ${
                        errorMsg ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
                    }`}
                >
                    {errorMsg || infoMsg}
                </div>
            )}

            {/* 기본 정보 */}
            <Row label="아이디">{detail.userId}</Row>
            <Row label="이름">{detail.userNm}</Row>
            <Row label="권한">{detail.roleNm || detail.roleId}</Row>
            <Row label="사용여부">
        <span className={`rounded-md px-2 py-0.5 ring-1 ring-inset ${useYnBool ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
          {useYnBool ? "Y" : "N"}
        </span>
            </Row>

            <div className="border-t pt-2" />

            <Row label="생년월일">{formatBirthDate(detail.privateInfo.birth)}</Row>
            <Row label="이메일">{detail.privateInfo.email}</Row>
            <Row label="휴대폰">{formatKRPhone(detail.privateInfo.phone)}</Row>
            <Row label="보조 번호">{formatKRPhone(detail.privateInfo.telNo)}</Row>
            <Row label="우편번호">{detail.privateInfo.postalCode}</Row>
            <Row label="주소(기본)">{detail.privateInfo.addressMain}</Row>
            <Row label="주소(상세)">{detail.privateInfo.addressSub}</Row>

            <div className="border-t pt-2" />

            <Row label="가입일">{detail.subscribeDate}</Row>
            <Row label="최종수정">{detail.updateDate}</Row>
            <Row label="만료일">{detail.userExpired || "-"}</Row>

            {/* 빠른 작업 */}
            <div className="pt-2">
                <div className="text-xs text-gray-500">빠른 작업</div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {/* 권한 변경 */}
                    <div className="flex items-center gap-2">
                        {!roleOpen ? (
                            <button
                                disabled={busy}
                                onClick={() => setRoleOpen(true)}
                                className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                권한 변경
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <select
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value as "admin" | "user")}
                                    className="rounded-md border px-2 py-1 text-sm"
                                >
                                    <option value="user">일반사용자</option>
                                    <option value="admin">관리자</option>
                                </select>
                                <button
                                    onClick={handleChangeRole}
                                    disabled={busy}
                                    className="rounded-md border border-blue-300 px-3 py-1 text-sm hover:bg-blue-50 disabled:opacity-50"
                                >
                                    적용
                                </button>
                                <button
                                    onClick={() => setRoleOpen(false)}
                                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                                >
                                    취소
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 사용/중지 토글 */}
                    <button
                        disabled={busy}
                        onClick={handleToggleUse}
                        className={`rounded-md px-3 py-1 text-sm ${
                            useYnBool
                                ? "border border-yellow-300 hover:bg-yellow-50"
                                : "border border-green-300 hover:bg-green-50"
                        } disabled:opacity-50`}
                    >
                        {useYnBool ? "사용중지" : "사용재개"}
                    </button>

                    {/* 비밀번호 변경 */}
                    {!pwdOpen ? (
                        <button
                            disabled={busy}
                            onClick={() => setPwdOpen(true)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                        >
                            비밀번호 변경
                        </button>
                    ) : (
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="password"
                                placeholder="새 비밀번호"
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                                className="w-[160px] rounded-md border px-2 py-1 text-sm"
                            />
                            <input
                                type="password"
                                placeholder="새 비밀번호 확인"
                                value={newPwd2}
                                onChange={(e) => setNewPwd2(e.target.value)}
                                className="w-[160px] rounded-md border px-2 py-1 text-sm"
                            />
                            <button
                                onClick={handleChangePwd}
                                disabled={busy}
                                className="rounded-md border border-blue-300 px-3 py-1 text-sm hover:bg-blue-50 disabled:opacity-50"
                            >
                                적용
                            </button>
                            <button onClick={() => { setPwdOpen(false); setNewPwd(""); setNewPwd2(""); }} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">
                                취소
                            </button>
                        </div>
                    )}

                    {/* 만료일 연장 */}
                    {!expiredOpen ? (
                        <button
                            disabled={busy}
                            onClick={() => setExpiredOpen(true)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                        >
                            사용 기간 변경
                        </button>
                    ) : (
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="datetime-local"
                                value={expiredAt}
                                onChange={(e) => setExpiredAt(e.target.value)}
                                className="rounded-md border px-2 py-1 text-sm"
                            />
                            <button
                                onClick={handleExtendExpired}
                                disabled={busy}
                                className="rounded-md border border-blue-300 px-3 py-1 text-sm hover:bg-blue-50 disabled:opacity-50"
                            >
                                적용
                            </button>
                            <button onClick={() => setExpiredOpen(false)} className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
