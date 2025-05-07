"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('모든 필드를 입력해 주세요.');
            return;
        }

        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                setSuccess(true);
                setError(null);
                // 회원가입 성공하면 로그인 페이지로 이동하거나, 바로 로그인할 수 있도록 유도
                // router.push('/');
                setTimeout(() => router.push('/'), 3000);
            } else {
                const data = await res.json();
                setError(data.message || '회원가입에 실패했습니다.');
            }
        } catch (err) {
            setError('네트워크 에러가 발생했습니다.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm">회원가입 성공! 메인페이지로 이동합니다.</div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
                    >
                        회원가입
                    </button>

                    <div className="pt-1">
                        <Link href="/ko/auth/signin">
                            <div
                                className="w-full rounded-md text-sm text-center hover:underline hover:text-blue-500">
                                로그인 페이지
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
