"use client";

import { useEffect, useState } from "react";
import { getUserDetail, type UserDetailResponse } from "@/lib/api/adminApi";
import { formatBirthDate, formatKRPhone } from "@/module/helper";

function Line({ label, children }: { label: string; children?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1 text-xs text-gray-500">{label}</div>
            <div className="col-span-2 text-sm text-gray-900 break-all">{children ?? "-"}</div>
        </div>
    );
}

export default function AdminUserDetail({
                                            userId,
                                        }: {
    userId: string;
}) {
    const [detail, setDetail] = useState<UserDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function load() {
        try {
            setLoading(true);
            setErrorMsg(null);
            const res = await getUserDetail(userId);
            setDetail(res);
        } catch (e: any) {
            setErrorMsg(e?.message || "상세 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userId) return;
        load();
        // userId가 바뀌면 새로 로딩
    }, [userId]);

    if (loading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
                ))}
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMsg}
                <div className="mt-2">
                    <button onClick={load} className="rounded-md border px-2 py-1 text-xs hover:bg-red-100">
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    if (!detail) return <div className="text-sm text-gray-500">데이터가 없습니다.</div>;

    const { privateInfo } = detail;

    return (
        <div className="space-y-3">
            <Line label="아이디">{detail.userId}</Line>
            <Line label="이름">{detail.userNm}</Line>
            <div className="grid grid-cols-3 gap-2">
                <div className="text-xs text-gray-500">상태</div>
                <div className="col-span-2 flex gap-3 text-sm">
          <span className={`rounded-md px-2 py-0.5 ring-1 ring-inset ${detail.useYn === "Y" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
            사용 {detail.useYn}
          </span>
                    <span className={`rounded-md px-2 py-0.5 ring-1 ring-inset ${detail.delYn === "Y" ? "bg-red-50 text-red-700 ring-red-600/20" : "bg-gray-50 text-gray-700 ring-gray-600/20"}`}>
            삭제 {detail.delYn}
          </span>
                </div>
            </div>
            <Line label="권한">{detail.roleNm || detail.roleId}</Line>

            <div className="pt-2 border-t" />

            <Line label="생년월일">{formatBirthDate(privateInfo?.birth)}</Line>
            <Line label="이메일">{privateInfo?.email}</Line>
            <Line label="휴대폰">{formatKRPhone(privateInfo?.phone)}</Line>
            <Line label="보조 번호">{formatKRPhone(privateInfo?.telNo)}</Line>
            <Line label="우편번호">{privateInfo?.postalCode}</Line>
            <Line label="주소(기본)">{privateInfo?.addressMain}</Line>
            <Line label="주소(상세)">{privateInfo?.addressSub}</Line>

            <div className="pt-2 border-t" />

            <Line label="약관 동의">{detail.termsAgreeYn} {detail.termsAgreeDate ? `(${detail.termsAgreeDate})` : ""}</Line>
            <Line label="개인정보 동의">{detail.privateAgreeYn} {detail.privateAgreeDate ? `(${detail.privateAgreeDate})` : ""}</Line>
            <Line label="위치정보 동의">{detail.locationAgreeYn} {detail.locationAgreeDate ? `(${detail.locationAgreeDate})` : ""}</Line>
            <Line label="교환/환불 동의">{detail.exchangeRefundYn} {detail.exchangeRefundDate ? `(${detail.exchangeRefundDate})` : ""}</Line>

            <div className="pt-2 border-t" />

            <Line label="가입일">{detail.subscribeDate}</Line>
            <Line label="최종수정">{detail.updateDate}</Line>
        </div>
    );
}
