'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FindId, FindPw } from '@/lib/api/authApi';

const FindIdPwPage = () => {
    const [activeTab, setActiveTab] = useState<'id' | 'pw'>('id');

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
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

            <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
                {/* 탭 버튼 */}
                <div className="flex mb-6 border-b border-gray-300">
                    <button
                        className={classNames(
                            'flex-1 py-2 text-center font-semibold',
                            activeTab === 'id'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                        )}
                        onClick={() => setActiveTab('id')}
                    >
                        아이디 찾기
                    </button>
                    <button
                        className={classNames(
                            'flex-1 py-2 text-center font-semibold',
                            activeTab === 'pw'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                        )}
                        onClick={() => setActiveTab('pw')}
                    >
                        비밀번호 찾기
                    </button>
                </div>

                {/* 탭 내용 */}
                <div className="mt-4">
                    {activeTab === 'id' ? <FindIdForm /> : <FindPwForm />}
                </div>
            </div>
        </div>
    );
};

export default FindIdPwPage;

const FindIdForm = () => {
    const [birth, setBirth] = useState('');
    const [findKey, setFindKey] = useState<'email' | 'phone'>('email');
    const [findValue, setFindValue] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!birth || !findValue) {
            alert('생년월일과 인증 수단은 필수입니다.');
            return;
        }

        const payload = {
            birth: Number(birth),
            findKey: findKey,
            findValue: findKey==='phone' ? Number(findValue) : findValue,
        };

        try {
            const res = await FindId(payload);
            if (res.success) {
                alert(`아이디: ${res.message}`);
            } else {
                alert(`찾기 실패: ${res.message}`);
            }
        } catch (error) {
            alert('요청 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="생년월일 (예: 19870815)"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            {/* 라디오 버튼으로 인증 방법 선택 */}
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="findKey"
                        value="email"
                        checked={findKey === 'email'}
                        onChange={() => {
                            setFindKey('email');
                            setFindValue('');
                        }}
                    />
                    <span>이메일로 인증</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="findKey"
                        value="phone"
                        checked={findKey === 'phone'}
                        onChange={() => {
                            setFindKey('phone');
                            setFindValue('');
                        }}
                    />
                    <span>휴대폰 번호로 인증</span>
                </label>
            </div>

            {/* 선택된 인증 방식에 따라 input 표시 */}
            <input
                type={findKey === 'email' ? 'email' : 'tel'}
                placeholder={findKey === 'email' ? '이메일 주소' : '휴대폰 번호 (숫자만)'}
                value={findValue}
                onChange={(e) => setFindValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
                아이디 찾기
            </button>
        </form>
    );
};


const FindPwForm = () => {
    const [userId, setUserId] = useState('');
    const [birth, setBirth] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId || !birth) {
            alert('아이디와 생년월일은 필수입니다.');
            return;
        }

        const payload = {
            userId,
            birth: Number(birth),
        };

        try {
            const res = await FindPw(payload);
            if (res.success) {
                alert(`비밀번호 변경을 위한 안내가 전송되었습니다.`);
            } else {
                alert(`찾기 실패: ${res.message}`);
            }
        } catch (error) {
            alert('요청 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                placeholder="생년월일 (예: 19870815)"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
                비밀번호 찾기
            </button>
        </form>
    );
};