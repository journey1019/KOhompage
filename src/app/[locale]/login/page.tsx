"use client";

import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import { Login } from '@/lib/api/authApi';
import { IoEye, IoEyeOff } from "react-icons/io5";


export default function PaymentLoginPage() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // 로그인시 로딩
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    // 페이지 열릴 때, localStorage에서 이메일 불러오기
    useEffect(() => {
        const storedUserId = localStorage.getItem('rememberPaymentUserId');
        if (storedUserId) {
            setUserId(storedUserId);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setLoginError(null);
        setIsLoading(true);

        if (rememberMe) {
            localStorage.setItem('rememberPaymentUserId', userId);
        } else {
            localStorage.removeItem('rememberPaymentUserId');
        }

        try {
            const response = await Login({ userId, userPw }); // /api/payment/login 호출
            if (response) {
                // 로그인 성공 시
                localStorage.setItem('userToken', response.userToken);
                localStorage.setItem('tokenExpired', response.tokenExpired);

                localStorage.removeItem('paymentUserInfo');
                localStorage.setItem('paymentUserInfo', JSON.stringify(response));
                // 로그인 성공 시 이동
                router.push('/ko/online-store');
            } else {
                // 실패 메시지 출력
                setLoginError("로그인에 실패했습니다.");
            }
        } catch (err) {
            setLoginError("로그인에 실패했습니다.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserId(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserPw(e.target.value);
    };

    const onChangeRememberMe: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-50 px-4 py-8"
            style={{
                backgroundColor: '#e8e8e8',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Link href="/ko/login" className="flex items-center mb-8 text-2xl font-semibold text-gray-900">
                <Image
                    src="/images/KO_SmallLogo.png"
                    alt="KO Logo"
                    width={180}
                    height={130}
                    unoptimized
                />
            </Link>

            <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                {/* 타이틀 */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    로그인
                </h2>

                {/* 로그인 에러 이유 */}
                {loginError && (
                    <p className="text-center text-red-500 text-sm mb-4">
                        {loginError}
                    </p>
                )}

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* 아이디 입력 */}
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                아이디
                            </label>
                            <input
                                id="id"
                                type="text"
                                value={userId}
                                onChange={onChangeId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="아이디를 입력하세요"
                                autoComplete="off"
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        {/*<div>*/}
                        {/*    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">*/}
                        {/*        비밀번호*/}
                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        id="password"*/}
                        {/*        type="password"*/}
                        {/*        value={userPw}*/}
                        {/*        onChange={onChangePassword}*/}
                        {/*        onKeyDown={(e) => {*/}
                        {/*            if (e.key === 'Enter') {*/}
                        {/*                e.preventDefault(); // 기본 폼 중복 제출 방지*/}
                        {/*                const form = e.currentTarget.form;*/}
                        {/*                if (form) form.requestSubmit(); // 폼 제출*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                        {/*        placeholder="비밀번호를 입력하세요"*/}
                        {/*        autoComplete="off"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={userPw}
                                onChange={onChangePassword}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const form = e.currentTarget.form;
                                        if (form) form.requestSubmit();
                                    }
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="비밀번호를 입력하세요"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500"
                                tabIndex={-1}
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>

                        {/* remember me */}
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={onChangeRememberMe}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                                    자동 로그인
                                </label>
                            </div>
                            <Link href="/ko/findIdPw"
                                  className="flex items-center space-x-2 text-sm text-blue-500 group hover:text-blue-600">
                                <span>아이디 · 비밀번호 찾기</span>
                                <IoIosArrowForward />
                            </Link>
                        </div>

                    </div>

                    {/* 로그인 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition
                                ${userId && userPw && !isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
                            `}
                            disabled={!userId || !userPw || isLoading}
                        >
                            {isLoading ? '로딩 중...' : '로그인하기'}
                        </button>

                        <div className="pt-4">
                            <Link href="/ko/signUp">
                                <button
                                    type="button"
                                    className="w-full cursor-pointer py-2 px-4 rounded-md border border-blue-600 text-blue-600 font-semibold text-sm transition hover:bg-blue-50"
                                    disabled={true}
                                >
                                    계정 만들기
                                </button>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}