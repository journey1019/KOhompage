"use client";

import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import loginPage from '../../../../../public/images/admin/talk_dark.jpg';

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // 로그인시 로딩
    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get('callbackUrl') || '/ko/admin';

    // 로그인 검사 후 Session 있을 시 '/admin' 페이지로 redirect
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "loading") return;

        if (session?.user?.role === 'ADMIN') {
            router.replace(callbackUrl);
        }
        // else if (session?.user?.role === 'USER') {
        //     router.replace('/ko'); // 또는 /shop 등
        // }
    }, [session, status, router, callbackUrl]);


    // 페이지 열릴 때, localStorage에서 이메일 불러오기
    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setLoginError(null); // 이전 오류 초기화
        setIsLoading(true); // 로딩 시작

        if (rememberMe) {
            localStorage.setItem('rememberEmail', email);
        } else {
            localStorage.removeItem('rememberEmail');
        }

        // redirect: false => 로그인 성공 여부만 반환
        const result = await signIn("credentials", {
            username: email,
            password: password,
            redirect: false,
            callbackUrl, // router.push 쓰므로 선택사항임
        });

        if (result?.ok) {
            // 로그인 성공 후 세션을 확인
            const sessionRes = await fetch("/api/auth/session");
            const session = await sessionRes.json();

            const role = session?.user?.role;

            if (role === "ADMIN") {
                setIsLoading(false); // 로딩 끝
                router.push(callbackUrl);
            } else if (role === "USER") {
                // router.push("/ko/shop");
                setIsLoading(false); // 로딩 끝
                setLoginError("이 페이지는 관리자 전용입니다.");
            } else {
                // console.log(result)
                // 예외: role 없거나 이상하면 fallback
                // router.push("/");
                // setLoginError("로그인 정보는 맞지만 역할 정보가 올바르지 않습니다. 관리자에게 문의해주세요.");
                setIsLoading(false); // 로딩 끝
                setLoginError("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } else {
            setIsLoading(false); // 로딩 끝
            setLoginError("아이디 또는 비밀번호가 잘못되었습니다.");
            // alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        }
        // console.log(result)
    };

    const onClickClose = () => {
        router.back();
    };

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onChangeRememberMe: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-50 px-4 py-8"
            style={{
                backgroundImage: `url(${loginPage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Link href="/ko/admin" className="flex items-center mb-8 text-2xl font-semibold text-gray-900">
                <Image
                    src="/images/KO_SmallLogo.png"
                    alt="KO Logo"
                    width={180}
                    height={130}
                    unoptimized
                />
            </Link>

            <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                {/* 닫기 버튼 */}
                {/*<button*/}
                {/*    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"*/}
                {/*    onClick={onClickClose}*/}
                {/*>*/}
                {/*    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">*/}
                {/*        <g>*/}
                {/*            <path*/}
                {/*                d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"*/}
                {/*                fill="currentColor"*/}
                {/*            />*/}
                {/*        </g>*/}
                {/*    </svg>*/}
                {/*</button>*/}

                {/* 타이틀 */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    관리자 로그인
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
                                value={email}
                                onChange={onChangeId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="이메일을 입력하세요"
                                autoComplete="off"
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="비밀번호를 입력하세요"
                                autoComplete="off"
                            />
                        </div>

                        {/* remember me */}
                        <div className="flex items-center space-x-2">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={onChangeRememberMe}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-700">
                                아이디 기억하기
                            </label>
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <div>
                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*    className={`w-full py-2 px-4 rounded-md text-white font-semibold transition*/}
                        {/*    ${email && password ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}*/}
                        {/*    `}*/}
                        {/*    disabled={!email || !password}*/}
                        {/*>*/}
                        {/*    로그인하기*/}
                        {/*</button>*/}
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition
                            ${email && password && !isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
                            `}
                            disabled={!email || !password || isLoading}
                        >
                            {isLoading ? "로딩 중..." : "로그인하기"}
                        </button>

                        <div className="pt-4">
                            <Link href="/ko/auth/signup">
                                <div
                                    className="w-full rounded-md text-sm text-center hover:underline hover:text-blue-500">
                                    계정 만들기
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}