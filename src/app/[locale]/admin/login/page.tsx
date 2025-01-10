'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import loginPage from '../../../../../public/images/admin/talk.jpg';
import Link from 'next/link';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // 비동기적으로 locale 값 설정
    useEffect(() => {
        let isMounted = true;

        const fetchParams = async () => {
            const resolvedParams = await params;
            if (isMounted) {
                setLocale(resolvedParams.locale);
            }
        };

        fetchParams();

        return () => {
            isMounted = false;
        };
    }, [params]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/${locale}/api/auth/login`, { email, password });

            // Save JWT in localStorage
            localStorage.setItem('token', res.data.token);

            // Redirect to Admin Page
            router.push(`/${locale}/admin/`);
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    if (!locale) {
        return <div>Loading...</div>;
    }

    return (
        <section
            className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${loginPage.src})`,
            }}
        >
            <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                <div className="text-white text-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image src={`/images/KO_SmallLogo.png`} alt="KO Logo" width={180} height={130} unoptimized />
                        </Link>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                {error && <p className="text-red-500">{error}</p>}
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-start dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-start dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
