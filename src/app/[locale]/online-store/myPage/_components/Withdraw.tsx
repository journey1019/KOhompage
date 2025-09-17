"use client";

import { RemoveUserAccount } from '@/lib/api/userApi';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const Withdraw = () => {
    const { locale } = useParams() as { locale: string };
    const router = useRouter();

    const [showDelete, setShowDelete] = useState(false);
    const [deletePw, setDeletePw] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string>('');

    async function handleDelete() {
        if (!deletePw.trim()) {
            setDeleteError('비밀번호를 입력해 주세요.');
            return;
        }
        const confirmText = prompt('정말 탈퇴하시겠습니까? 계속하려면 "탈퇴"를 입력하세요.');
        if (confirmText !== '탈퇴') return;

        try {
            setDeleteLoading(true);
            setDeleteError('');
            await RemoveUserAccount(deletePw);

            // 로컬 세션/캐시 제거
            localStorage.removeItem('userToken');
            localStorage.removeItem('paymentUserInfo');

            alert('회원탈퇴가 완료되었습니다.');
            router.replace(`/${locale}/online-store/`); // 혹은 /login 등
        } catch (e: any) {
            setDeleteError(e?.message || '탈퇴 중 오류가 발생했습니다.');
        } finally {
            setDeleteLoading(false);
        }
    }

    return(
        <>
            {/* 하단 - 회원탈퇴 */}
            <div className="mt-auto pt-6 flex justify-end items-center gap-2">
                <p className="text-xs text-gray-400">
                    탈퇴를 원하시면 우측의 회원탈퇴 버튼을 눌러주세요.
                </p>
                <button
                    onClick={() => setShowDelete(true)}
                    className="rounded-md px-3 py-2 text-xs font-medium border border-red-200 bg-red-600 text-white hover:bg-red-700"
                >
                    회원탈퇴
                </button>
            </div>

            {/* 탈퇴 모달 */}
            {showDelete && (
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setShowDelete(false)} />
                    <div className="relative w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
                        <h3 className="text-lg font-semibold mb-3">회원탈퇴</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            탈퇴를 위해 현재 비밀번호를 입력해 주세요.
                        </p>
                        <input
                            type="password"
                            value={deletePw}
                            onChange={(e) => setDeletePw(e.target.value)}
                            placeholder="현재 비밀번호"
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {deleteError && (
                            <p className="mt-2 text-sm text-red-600">{deleteError}</p>
                        )}
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowDelete(false)}
                                className="rounded-md border px-3 py-2 text-sm"
                                disabled={deleteLoading}
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleteLoading ? '처리 중…' : '탈퇴'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Withdraw;