/** src/app/[locale]/myPage/profile/edit/page.tsx */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserInfoChange, PwdChange } from '@/lib/api/userApi';
import { formatKRPhone, formatBirthDate } from '@/module/helper';
import Agreement from '@/components/(Online-Store)/MyPage/Agreement';
import DaumPostcodeModal from "@/components/common/DaumPostcodeModal";


function onlyDigits(s: string) { return (s || '').replace(/\D/g, ''); }
function toPayloadBirth(s: string) {
    const d = onlyDigits(s);
    return d.length === 8 ? d : '';
}

const ProfileEditPage = () => {
    const router = useRouter();
    const { locale } = useParams() as { locale: string };

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string>('');

    // 화면/폼 상태
    const [storedUser, setStoredUser] = useState<any>(null);

    const [userNm, setUserNm] = useState<string>('');
    const [birth, setBirth] = useState<string>('');           // YYYY-MM-DD
    const [userEmail, setUserEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');           // 입력은 자유, API 전송 시 숫자만
    const [telNo, setTelNo] = useState<string>('');
    const [addressMain, setAddressMain] = useState<string>('');
    const [addressSub, setAddressSub] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');

    // 비밀번호 변경 상태
    const [currentPw, setCurrentPw] = useState<string>('');
    const [newPw, setNewPw] = useState<string>('');
    const [confirmPw, setConfirmPw] = useState<string>('');
    const [pwError, setPwError] = useState<string>('');
    const [pwSaving, setPwSaving] = useState(false);

    // 주소 상태 추가
    const [addrModalOpen, setAddrModalOpen] = useState(false);
    const addressSubRef = useRef<HTMLInputElement | null>(null);

    // 로컬 스토리지에서 사용자 정보 적재 & 폼 초기화
    useEffect(() => {
        try {
            const raw = localStorage.getItem('paymentUserInfo');
            const parsed = raw ? JSON.parse(raw) : null;
            setStoredUser(parsed);

            setUserNm(parsed?.userNm ?? '');
            setBirth(formatBirthDate(parsed?.privateInfo?.birth ?? '') || ''); // 19870815 -> 1987-08-15
            setUserEmail(parsed?.privateInfo?.email ?? '');
            setPhone(parsed?.privateInfo?.phone ?? '');
            setTelNo(parsed?.privateInfo?.telNo ?? '');
            setPostalCode(parsed?.privateInfo?.postalCode ?? '');
            setAddressMain(parsed?.privateInfo?.addressMain ?? '');
            setAddressSub(parsed?.privateInfo?.addressSub ?? '');
        } catch {}
        setLoading(false);
    }, []);

    // 회원정보 저장
    async function handleSaveUserInfo(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!userNm.trim()) return setError('이름을 입력해 주세요.');
        const birth8 = toPayloadBirth(birth); // YYYYMMDD
        if (!birth8) return setError('생년월일을 8자리(YYYYMMDD)로 입력해 주세요.');
        if (!userEmail.trim()) return setError('이메일을 입력해 주세요.');

        setSaving(true);
        try {
            const payload = {
                userNm: userNm.trim(),
                userPrivateDTO: {
                    birth: birth8,
                    email: userEmail.trim(),
                    phone: onlyDigits(phone),
                    telNo: onlyDigits(telNo),
                    addressMain: addressMain.trim(),
                    addressSub: addressSub.trim(),
                    postalCode: postalCode.trim(),
                },
            };
            const updated = await UserInfoChange(payload);

            // API가 전체 객체를 반환하지 않는 경우를 대비해 로컬 병합 저장
            const merged = {
                ...(storedUser ?? {}),
                userNm: payload.userNm,
                privateInfo: {
                    ...(storedUser?.privateInfo ?? {}),
                    ...payload.userPrivateDTO,
                },
                // 선택: 마지막 수정일자 로컬 업데이트
                updateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            };
            localStorage.setItem('paymentUserInfo', JSON.stringify(merged));

            alert('회원정보가 저장되었습니다.');
            router.push(`/${locale}/myPage/profile`);
        } catch (err: any) {
            setError(err?.message || '저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    }

    // 비밀번호 규칙 예시 (원하면 강화 가능)
    function validatePw(pw: string) {
        if (pw.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
        if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return '영문과 숫자를 포함해야 합니다.';
        return '';
    }

    // 비밀번호 변경
    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        setPwError('');

        if (!currentPw) return setPwError('현재 비밀번호를 입력해 주세요.');
        if (!newPw) return setPwError('새 비밀번호를 입력해 주세요.');
        const rule = validatePw(newPw);
        if (rule) return setPwError(rule);
        if (newPw !== confirmPw) return setPwError('새 비밀번호가 일치하지 않습니다.');
        if (newPw === currentPw) return setPwError('현재 비밀번호와 다른 비밀번호를 사용해 주세요.');

        setPwSaving(true);
        try {
            const res = await PwdChange({ beforeUserPw: currentPw, newUserPw: newPw });
            if (res?.status) {
                alert('비밀번호가 변경되었습니다. 다시 로그인해야 할 수 있습니다.');
                setCurrentPw(''); setNewPw(''); setConfirmPw('');
                router.push(`/${locale}/myPage/profile`);
            } else {
                setPwError('비밀번호 변경에 실패했습니다.');
            }
        } catch (err: any) {
            setPwError(err?.message || '비밀번호 변경 중 오류가 발생했습니다.');
        } finally {
            setPwSaving(false);
        }
    }

    if (loading) return <div>불러오는 중…</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">회원정보 수정</h2>
                <div className="flex flex-row space-x-1">
                    <span className="text-sm text-gray-500">마지막 수정 일자: </span>
                    <span className="text-sm text-gray-500">{storedUser?.updateDate || '-'}</span>
                </div>
            </div>

            {/* 표 형태 영역 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* 아이디 (읽기 전용) */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">아이디</div>
                    <div className="col-span-2 px-4 py-3">{storedUser?.userId || "-"}</div>
                </div>

                {/* 비밀번호 변경 */}
                <form onSubmit={handleChangePassword} className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">비밀번호 변경</div>
                    <div className="flex flex-col col-span-2 px-4 py-3 space-y-2">
                        <div className="grid grid-cols-3 items-center gap-2">
                            <label className="col-span-1">현재 비밀번호</label>
                            <div className="col-span-2">
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    value={currentPw}
                                    onChange={(e) => setCurrentPw(e.target.value)}
                                    placeholder="현재 비밀번호"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-2">
                            <label className="col-span-1">새 비밀번호</label>
                            <div className="col-span-2">
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                    placeholder="새 비밀번호"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-2">
                            <label className="col-span-1">비밀번호 다시 입력</label>
                            <div className="col-span-2">
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                    placeholder="새 비밀번호 확인"
                                    className={`w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </div>
                        </div>
                        {pwError && <p className="text-sm text-red-600">{pwError}</p>}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={pwSaving}
                                className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                {pwSaving ? '변경 중…' : '비밀번호 변경'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* 이름 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">이름</div>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            value={userNm}
                            onChange={(e) => setUserNm(e.target.value)}
                            className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* 생년월일 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">생년월일</div>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                            placeholder="YYYY-MM-DD"
                            className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* 이메일 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">이메일</div>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            type="email"
                            className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* 휴대폰 번호 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">휴대폰 번호</div>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="010-1234-5678"
                            className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">저장 시 숫자만 전송됩니다. 현재: {formatKRPhone(phone)}</p>
                    </div>
                </div>

                {/* 보조 번호 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">보조 번호</div>
                    <div className="col-span-2 px-4 py-3">
                        <input
                            value={telNo}
                            onChange={(e) => setTelNo(e.target.value)}
                            placeholder="02-123-4567"
                            className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">저장 시 숫자만 전송됩니다. 현재: {formatKRPhone(telNo)}</p>
                    </div>
                </div>

                {/* 기본 배송지 */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">기본 배송지</div>
                    <div className="col-span-2 px-4 py-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <input
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="우편번호"
                                className="w-32 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setAddrModalOpen(true)}
                                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                            >
                                주소검색
                            </button>
                        </div>
                        <input
                            value={addressMain}
                            onChange={(e) => setAddressMain(e.target.value)}
                            placeholder="기본 주소"
                            className="block w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                        <input
                            ref={addressSubRef}
                            value={addressSub}
                            onChange={(e) => setAddressSub(e.target.value)}
                            placeholder="상세 주소"
                            className="block w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* 약관 동의 (표시는 그대로, 실제 API 전송은 현재 스펙에 없음) */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 font-medium text-gray-700">약관 동의</div>
                    <div className="col-span-2 px-4 py-3 space-y-4">
                        <Agreement />
                    </div>
                </div>
            </div>

            {/* 에러/저장 버튼 영역 */}
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-4 flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={() => router.push(`/${locale}/myPage`)}
                    className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                >
                    취소
                </button>
                <button
                    type="button"
                    onClick={handleSaveUserInfo}
                    disabled={saving}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {saving ? '저장 중…' : '저장'}
                </button>
            </div>


            <DaumPostcodeModal
                isOpen={addrModalOpen}
                onClose={() => setAddrModalOpen(false)}
                onSelect={({ zonecode, address }) => {
                    setPostalCode(zonecode);
                    setAddressMain(address);
                    // 상세주소 포커스
                    setTimeout(() => addressSubRef.current?.focus(), 0);
                }}
            />


            <div className="mt-auto pt-4 flex justify-end items-center text-center gap-2 bottom-0 float-end">
                <p className="text-xs text-gray-400">
                    탈퇴를 원하시면 우측의 회원탈퇴 버튼을 눌러주세요.
                </p>
                <button className="bg-gray-400 text-xs text-white rounded-md border-black py-1 px-2">
                    회원탈퇴
                </button>
            </div>
        </div>
    );
};

export default ProfileEditPage;
