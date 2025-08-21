"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// import { updateUserInfo } from '@/lib/api/userApi'; // 아래 2) 참조
import { formatKRPhone, formatBirthDate } from '@/module/helper';
import { IoIosArrowForward } from "react-icons/io";
import Agreement from '@/components/(Online-Store)/MyPage/Agreement';

type FormState = {
    userId: string;
    userNm: string;
    birth: string;          // "YYYY-MM-DD" (입력 편의)
    email: string;
    phone: string;
    telNo: string;
    postalCode: string;
    addressMain: string;
    addressSub: string;

    termsAgreeYn: string;
    termsAgreeDate?: string;
    privateAgreeYn: string;
    privateAgreeDate?: string;
    locationAgreeYn: string;
    locationAgreeDate?: string;
    exchangeRefundYn: string;
    exchangeRefundDate?: string;
};


const ProfileEditPage = () => {
    const router = useRouter();
    const { locale } = useParams() as { locale: string };

    const stored = localStorage.getItem('paymentUserInfo');
    const userInfo = JSON.parse(stored);
    console.log(userInfo);

    const [form, setForm] = useState<FormState | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string>('');

    const [userNm, setUserNm] = useState();
    const [birth, setBirth] = useState();
    const [userEmail, setUserEmail] = useState();
    const [phone, setPhone] = useState();
    const [telNo, setTelNo] = useState();
    const [addressMain, setAddressMain] = useState();
    const [addressSub, setAddressSub] = useState();
    const [postalCode, setPostalCode] = useState();


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!form) return;
        //
        // // 간단 유효성 검증
        // if (!form.userNm.trim()) return setError('이름을 입력해 주세요.');
        // if (!form.email.trim()) return setError('이메일을 입력해 주세요.');
        // if (!/^\d{8}$/.test(toPayloadBirth(form.birth) || '')) return setError('생년월일을 8자리로 입력해 주세요.');
        //
        // setError('');
        // setSaving(true);
        // try {
        //     // 서버 페이로드로 직렬화
        //     const payload = {
        //         userId: form.userId,
        //         userNm: form.userNm,
        //         privateInfo: {
        //             birth: toPayloadBirth(form.birth),
        //             email: form.email,
        //             phone: form.phone,
        //             telNo: form.telNo,
        //             addressSub: form.addressSub,
        //             postalCode: form.postalCode,
        //             addressMain: form.addressMain,
        //         },
        //         termsAgreeYn: form.termsAgreeYn,
        //         termsAgreeDate: form.termsAgreeDate || nowKST(),
        //         privateAgreeYn: form.privateAgreeYn,
        //         privateAgreeDate: form.privateAgreeDate || nowKST(),
        //         locationAgreeYn: form.locationAgreeYn,
        //         locationAgreeDate: form.locationAgreeDate || nowKST(),
        //         exchangeRefundYn: form.exchangeRefundYn,
        //         exchangeRefundDate: form.exchangeRefundDate || nowKST(),
        //     };
        //
        //     const updated = await updateUserInfo(payload); // 아래 2) 참고
        //     // 성공 시 최신값 저장
        //     localStorage.setItem('paymentUserInfo', JSON.stringify(updated));
        //     alert('회원정보가 저장되었습니다.');
        //     router.push(`/${locale}/myPage`);
        // } catch (err: any) {
        //     setError(err?.message || '저장 중 오류가 발생했습니다.');
        // } finally {
        //     setSaving(false);
        // }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!userPw.trim()) {
        //     setErrorMsg("비밀번호를 입력해 주세요.");
        //     return;
        // }
        //
        // try {
        //     setIsLoading(true);
        //     setErrorMsg("");
        //
        //     // ✅ 비밀번호 검증(API 호출)
        //     const user = await fetchUserInfo({ userPw });
        //
        //     // (선택) 최신 사용자 정보 갱신 저장
        //     localStorage.setItem("paymentUserInfo", JSON.stringify(user));
        //
        //     // ✅ 성공: 회원정보 수정 페이지로 이동
        //     router.push(`/${locale}/myPage/profile/edit`);
        // } catch (err: any) {
        //     // ❌ 실패: 에러 메시지 표시
        //     setErrorMsg(err?.message || "비밀번호가 일치하지 않습니다.");
        // } finally {
        //     setIsLoading(false);
        // }
    };
    console.log(userInfo)

    const [userPw, setUserPw] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    return(
        <>
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">회원정보 수정</h2>
                <div className="flex flex-row space-x-1">
                    <span className="text-sm text-gray-500">마지막 수정 일자: </span>
                    <span className="text-sm text-gray-500">{userInfo.updateDate}</span>
                </div>
            </div>

            {/* 표 형태 영역 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">아이디</div>
                    <div className="col-span-2 px-4 py-3">{userInfo.userId || "-"}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">비밀번호 변경</div>
                    <div className="flex flex-col col-span-2 px-4 py-3 space-y-2">
                        <div className="flex grid grid-cols-3">
                            <div className="flex col-span-1">
                                현재 비밀번호
                            </div>
                            <div className="flex col-span-2">
                                <input
                                    id="userPw"
                                    type="password"
                                    autoComplete="current-password"
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    placeholder="비밀번호 입력"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                                        errorMsg
                                            ? 'border-red-400 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="flex grid grid-cols-3">
                            <div className="flex col-span-1">
                                새 비밀번호
                            </div>
                            <div className="flex col-span-2">
                                <input
                                    id="userPw"
                                    type="password"
                                    autoComplete="current-password"
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    placeholder="비밀번호 입력"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                                        errorMsg
                                            ? 'border-red-400 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="flex grid grid-cols-3">
                            <div className="flex col-span-1">
                                비밀번호 다시 입력
                            </div>
                            <div className="flex col-span-2">
                                <input
                                    id="userPw"
                                    type="password"
                                    autoComplete="current-password"
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    placeholder="비밀번호 입력"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                                        errorMsg
                                            ? 'border-red-400 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">이름</div>
                    <div className="col-span-2 px-4 py-3">{userInfo.userNm || '-'}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">생년월일</div>
                    <div className="col-span-2 px-4 py-3">{formatBirthDate(userInfo.privateInfo.birth) || '-'}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">이메일</div>
                    <div className="col-span-2 px-4 py-3">{userInfo.privateInfo.email || '-'}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">휴대폰 번호</div>
                    <div className="col-span-2 px-4 py-3">{formatKRPhone(userInfo.privateInfo.phone) || "-"}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">보조 번호</div>
                    <div className="col-span-2 px-4 py-3">{formatKRPhone(userInfo.privateInfo.telNo) || "-"}</div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">기본 배송지</div>
                    <div className="flex flex-col col-span-2 px-4 py-3 space-y-2">
                        <span>{userInfo.privateInfo.postalCode || '-'}</span>
                        <span>{userInfo.privateInfo.addressMain || '-'},{userInfo.privateInfo.addressSub || '-'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">약관 동의</div>
                    <div className="col-span-2 px-4 py-3 space-y-4">
                        <Agreement />
                    </div>
                </div>
            </div>

            <div className="flex flex-row float-right items-center text-center pt-2 space-x-2">
                <h2 className="text-xs text-gray-400">탈퇴를 원하시면 우측의 회원탈퇴 버튼을 눌러주세요.</h2>
                <button className="bg-gray-400 text-xs text-white rounded-md border-black py-1 px-2">
                    회원탈퇴
                </button>
            </div>
        </>
    )
}

export default ProfileEditPage;