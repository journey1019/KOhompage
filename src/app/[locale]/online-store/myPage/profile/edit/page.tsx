"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserInfoChange, PwdChange } from '@/lib/api/userApi';
import { formatKRPhone, formatBirthDate } from '@/module/helper';
import Agreement from '@/components/(Online-Store)/MyPage/Agreement';
import DaumPostcodeModal from "@/components/common/DaumPostcodeModal";
import Withdraw from '@/app/[locale]/online-store/myPage/_components/Withdraw';

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
    async function handleSaveUserInfo(e?: React.FormEvent) {
        e?.preventDefault?.();
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
            await UserInfoChange(payload);

            // 로컬 병합 저장
            const merged = {
                ...(storedUser ?? {}),
                userNm: payload.userNm,
                privateInfo: {
                    ...(storedUser?.privateInfo ?? {}),
                    ...payload.userPrivateDTO,
                },
                updateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            };
            localStorage.setItem('paymentUserInfo', JSON.stringify(merged));

            alert('회원정보가 저장되었습니다.');
            router.push(`/${locale}/online-store/myPage/profile`);
        } catch (err: any) {
            setError(err?.message || '저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    }

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
                router.push(`/${locale}/online-store/myPage/profile`);
            } else {
                setPwError('비밀번호 변경에 실패했습니다.');
            }
        } catch (err: any) {
            setPwError(err?.message || '비밀번호 변경 중 오류가 발생했습니다.');
        } finally {
            setPwSaving(false);
        }
    }

    if (loading) return <div className="p-4 text-sm">불러오는 중…</div>;


    return (
        <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 pb-24">
            {/* 헤더 */}
            <div className="mb-3 sm:mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">회원정보 수정</h2>
                <div className="text-xs sm:text-sm text-gray-500">
                    <span>마지막 수정 일자: </span>
                    <span>{storedUser?.updateDate || '-'}</span>
                </div>
            </div>

            {/* 컨텐츠 카드 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                {/* 아이디 (읽기 전용) */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <div className="mb-1 md:mb-0 text-sm font-medium text-gray-700">아이디</div>
                        <div className="md:col-span-2 text-sm break-all">{storedUser?.userId || "-"}</div>
                    </div>
                </section>

                {/* 비밀번호 변경 */}
                <form onSubmit={handleChangePassword} className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:gap-4">
                        <div className="mb-2 md:mb-0 text-sm font-medium text-gray-700">비밀번호 변경</div>

                        <div className="md:col-span-2 space-y-3">
                            <label className="block">
                                <span className="mb-1 block text-xs text-gray-600">현재 비밀번호</span>
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    value={currentPw}
                                    onChange={(e) => setCurrentPw(e.target.value)}
                                    placeholder="현재 비밀번호"
                                    className={`h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1 block text-xs text-gray-600">새 비밀번호</span>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                    placeholder="새 비밀번호"
                                    className={`h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1 block text-xs text-gray-600">비밀번호 다시 입력</span>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                    placeholder="새 비밀번호 확인"
                                    className={`h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 ${pwError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                />
                            </label>

                            {pwError && <p className="text-sm text-red-600">{pwError}</p>}

                            <div className="pt-1">
                                <button
                                    type="submit"
                                    disabled={pwSaving}
                                    className="h-11 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {pwSaving ? '변경 중…' : '비밀번호 변경'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* 이름 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <label className="mb-1 md:mb-0 text-sm font-medium text-gray-700">이름</label>
                        <div className="md:col-span-2">
                            <input
                                value={userNm}
                                onChange={(e) => setUserNm(e.target.value)}
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* 생년월일 (모바일 피커) */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <label className="mb-1 md:mb-0 text-sm font-medium text-gray-700">생년월일</label>
                        <div className="md:col-span-2">
                            <input
                                type="date"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                                placeholder="YYYY-MM-DD"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">저장 시 서버 포맷(YYYYMMDD)으로 변환됩니다.</p>
                        </div>
                    </div>
                </section>

                {/* 이메일 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <label className="mb-1 md:mb-0 text-sm font-medium text-gray-700">이메일</label>
                        <div className="md:col-span-2">
                            <input
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                inputMode="email"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* 휴대폰 번호 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <label className="mb-1 md:mb-0 text-sm font-medium text-gray-700">휴대폰 번호</label>
                        <div className="md:col-span-2">
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="010-1234-5678"
                                inputMode="numeric"
                                pattern="\d*"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">저장 시 숫자만 전송됩니다. 현재: {formatKRPhone(phone)}</p>
                        </div>
                    </div>
                </section>

                {/* 보조 번호 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                        <label className="mb-1 md:mb-0 text-sm font-medium text-gray-700">보조 번호</label>
                        <div className="md:col-span-2">
                            <input
                                value={telNo}
                                onChange={(e) => setTelNo(e.target.value)}
                                placeholder="02-123-4567"
                                inputMode="numeric"
                                pattern="\d*"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">저장 시 숫자만 전송됩니다. 현재: {formatKRPhone(telNo)}</p>
                        </div>
                    </div>
                </section>

                {/* 기본 배송지 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-200">
                    <div className="md:grid md:grid-cols-3 md:items-start md:gap-4">
                        <label className="mb-2 md:mb-0 text-sm font-medium text-gray-700">기본 배송지</label>
                        <div className="md:col-span-2 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="우편번호"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    className="h-11 w-36 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setAddrModalOpen(true)}
                                    className="h-11 rounded-md border px-3 text-sm hover:bg-gray-50"
                                >
                                    주소검색
                                </button>
                            </div>
                            <input
                                value={addressMain}
                                onChange={(e) => setAddressMain(e.target.value)}
                                placeholder="기본 주소"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                ref={addressSubRef}
                                value={addressSub}
                                onChange={(e) => setAddressSub(e.target.value)}
                                placeholder="상세 주소"
                                className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* 약관 동의 */}
                <section className="px-4 py-3 sm:px-5 sm:py-4">
                    <div className="md:grid md:grid-cols-3 md:items-start md:gap-4">
                        <div className="mb-2 md:mb-0 text-sm font-medium text-gray-700">약관 동의</div>
                        <div className="md:col-span-2 space-y-4">
                            <Agreement
                                status={{
                                    terms: {
                                        agreed: storedUser?.termsAgreeYn === 'Y',
                                        date: storedUser?.termsAgreeDate,
                                    },
                                    exchange: {
                                        agreed: storedUser?.exchangeRefundYn === 'Y',
                                        date: storedUser?.exchangeRefundDate,
                                    },
                                }}
                            />

                        </div>
                    </div>
                </section>
            </div>

            {/* 에러 */}
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            {/* 하단 액션바: 모바일 sticky */}
            <div className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 md:static md:bg-transparent md:border-0">
                <div className="mx-auto flex max-w-3xl justify-end gap-2 px-3 py-3 sm:px-0 md:py-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/${locale}/online-store/myPage/profile`)}
                        className="h-11 rounded-md border px-4 text-sm hover:bg-gray-50"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveUserInfo}
                        disabled={saving}
                        className="h-11 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {saving ? '저장 중…' : '저장'}
                    </button>
                </div>
            </div>

            {/* 주소 검색 모달 */}
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

            {/* 회원 탈퇴 섹션 (그대로) */}
            <div className="mt-6">
                <Withdraw />
            </div>
        </div>
    );
};

export default ProfileEditPage;
