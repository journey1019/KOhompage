'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Language() {
    const router = useRouter();
    const pathname = usePathname(); // 현재 경로 가져오기
    const [menuOpen, setMenuOpen] = useState(false); // 드롭다운 열림 상태
    const [currentLocale, setCurrentLocale] = useState(pathname.startsWith('/en') ? 'en' : 'ko'); // 초기 언어 설정

    // 언어 변경 함수
    const changeLanguage = (locale: string) => {
        if (locale === currentLocale) return; // 동일한 언어 선택 시 아무 작업도 하지 않음

        // 현재 경로에서 locale 부분만 변경
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, `/${locale}`);
        setCurrentLocale(locale); // 현재 선택된 언어 업데이트
        setMenuOpen(false); // 드롭다운 닫기
        router.push(pathWithoutLocale); // 변경된 URL로 이동
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setMenuOpen(!menuOpen)} // 드롭다운 열기/닫기 토글
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md"
            >
                <GrLanguage className="ml-2 cursor-pointer dark:text-white" />
                <span>{currentLocale.toUpperCase()}</span> {/* 현재 언어 표시 */}
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-black dark:text-white" />
            </button>

            {/* 드롭다운 메뉴 */}
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
                    <ul>
                        <li
                            onClick={() => changeLanguage('ko')} // 한국어로 변경
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                currentLocale === 'ko' ? 'font-bold' : ''
                            }`}
                        >
                            KO
                        </li>
                        <li
                            onClick={() => changeLanguage('en')} // 영어로 변경
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                currentLocale === 'en' ? 'font-bold' : ''
                            }`}
                        >
                            EN
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
