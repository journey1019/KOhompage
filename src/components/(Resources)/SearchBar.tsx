'use client';

import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void; // 검색어를 상위 컴포넌트로 전달하는 함수
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        onSearch(value.trim()); // 입력값을 상위 컴포넌트로 전달
    };

    return (
        <div className="mb-4">
            <div className="relative flex items-center">
                {/* 돋보기 아이콘 */}
                <svg
                    className="absolute left-4 w-5 h-5 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                {/* 검색 입력창 */}
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange} // 입력 변경 시 바로 검색
                    placeholder="Search by keyword"
                    className="py-3 px-12 rounded-md w-full border-gray-300 border-2"
                />
            </div>
        </div>
    );
};

export default SearchBar;
