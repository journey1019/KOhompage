"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { UserInfo as fetchUserInfo } from "@/lib/api/userApi";

export default function ProfilePage() {
    const router = useRouter();
    const { locale } = useParams() as { locale: string };

    const [userId, setUserId] = useState<string>("");
    const [userPw, setUserPw] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("paymentUserInfo");
        if (stored) {
            try {
                const info = JSON.parse(stored);
                setUserId(info.userId || "");
            } catch {
                // 파싱 실패시 무시
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userPw.trim()) {
            setErrorMsg("비밀번호를 입력해 주세요.");
            return;
        }

        try {
            setIsLoading(true);
            setErrorMsg("");

            // ✅ 비밀번호 검증(API 호출)
            const user = await fetchUserInfo({ userPw });

            // (선택) 최신 사용자 정보 갱신 저장
            localStorage.setItem("paymentUserInfo", JSON.stringify(user));

            // ✅ 성공: 회원정보 수정 페이지로 이동
            router.push(`/${locale}/myPage/profile/edit`);
        } catch (err: any) {
            // ❌ 실패: 에러 메시지 표시
            setErrorMsg("비밀번호가 일치하지 않습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* 인증 필요 */}
            <h2 className="text-xl font-semibold mb-4">회원정보 확인</h2>
            <p className="mb-6 text-gray-700">
                <span className="text-blue-600 font-semibold">{userId}</span>
                님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.
            </p>

            {/* 표 형태 영역 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">아이디</div>
                    <div className="col-span-2 px-4 py-3">{userId || "-"}</div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-3">
                    <label className="bg-gray-50 px-4 py-3 font-medium text-gray-700" htmlFor="userPw">
                        비밀번호
                    </label>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            id="userPw"
                            type="password"
                            autoComplete="current-password"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                            placeholder="비밀번호 입력"
                            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                                errorMsg
                                    ? "border-red-400 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                        />
                        {/* 에러 메시지 */}
                        {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}

                        {/* 확인 버튼 */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? "확인 중..." : "비밀번호 확인"}
                        </button>

                        {/* 보조 텍스트 */}
                        <p className="mt-2 text-xs text-gray-500">
                            비밀번호 확인 시 회원정보 수정 페이지로 이동합니다.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
