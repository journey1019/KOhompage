'use client';
import { useState } from 'react';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

export default function SubscribeSection() {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubscribe = () => {
        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('올바른 이메일 형식을 입력해주세요.', {
                duration: 3000,
            });
            return;
        }
        setIsModalOpen(true); // 모달 열기
    };

    const confirmSubscription = () => {
        setIsModalOpen(false); // 모달 닫기
        toast.success(`구독 완료! ${email}로 매달 뉴스레터를 받으실 수 있습니다.`, {
            duration: 3000,
        });
    };

    return (
        <div className="relative bg-gray-900 py-16 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Subscribe to our newsletter.
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Sign up to receive our latest news, updates, and more.
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                            <dd className="mt-2 text-sm text-gray-400">
                                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-white">No spam</dt>
                            <dd className="mt-2 text-sm text-gray-400">
                                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Toast Alerts */}
            <Toaster
                position="top-right" // 위치 조정
                toastOptions={{
                    className: 'z-[100]', // z-index 설정
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h3 className="text-lg font-medium text-gray-900">뉴스레터 구독 확인</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            뉴스레터를 <strong>{email}</strong>로 구독하시겠습니까?
                        </p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)} // 모달 닫기
                                className="px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmSubscription} // 구독 확인
                                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                            >
                                구독
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
