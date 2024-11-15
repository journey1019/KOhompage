'use client';

import React, { useState } from 'react';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}


export default function SerachCategory({ onSearch }: SearchProps) {
    const [input, setInput] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운의 열림 상태
    const [selectedCategory, setSelectedCategory] = useState('All categories'); // 선택된 카테고리
    const [searchValue, setSearchValue] = useState(''); // 입력값 상태
    const [chips, setChips] = useState<string[]>([]);

    const handleInput = () => {
        onSearch(input);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && input.trim()) {
            setChips((prevChips) => [...prevChips, input.trim()]);
            setInput(''); // 입력 필드 초기화
        }
    }
    const removeChip = (index: number) => {
        setChips((prevChips) => prevChips.filter((_, i) => i !== index));
    };

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // 카테고리 선택 함수
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category); // 선택된 카테고리 설정
        setSearchValue(category); // 선택된 카테고리를 입력값에 설정
        setIsDropdownOpen(false); // 드롭다운 닫기
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <form className="max-w-screen-lg mx-auto pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24">
                <div className="mb-4">

                </div>

                {/*<div className="flex relative"> /!* relative 추가 *!/*/}
                {/*    <label htmlFor="search-dropdown"*/}
                {/*           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>*/}
                {/*    <button id="dropdown-button" type="button" onClick={toggleDropdown}*/}
                {/*            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">*/}
                {/*        {selectedCategory}*/}
                {/*        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="none"*/}
                {/*             viewBox="0 0 10 6">*/}
                {/*            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                {/*                  d="m1 1 4 4 4-4" />*/}
                {/*        </svg>*/}
                {/*    </button>*/}
                {/*    {isDropdownOpen && ( // 드롭다운이 열렸을 때만 리스트를 보여줌*/}
                {/*        <div id="dropdown"*/}
                {/*             className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-1 top-full left-0"> /!* mt-1 추가 *!/*/}
                {/*            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 border border-white rounded-lg"*/}
                {/*                aria-labelledby="dropdown-button">*/}
                {/*                {['GT1200', 'CT3500', 'ST2100', 'ST6000', 'IDP-800', 'ST-9100', 'QPRO', 'Q4000', 'OG2OGi', 'VSAT', 'iDirect'].map(category => (*/}
                {/*                    <li key={category}>*/}
                {/*                        <button*/}
                {/*                            type="button"*/}
                {/*                            onClick={() => handleCategorySelect(category)} // 카테고리 선택 시 함수 호출*/}
                {/*                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">*/}
                {/*                            {category}*/}
                {/*                        </button>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*    <div className="relative w-full">*/}
                {/*        <input*/}
                {/*            type="search"*/}
                {/*            id="search-dropdown"*/}
                {/*            value={searchValue} // 입력값을 상태로 관리*/}
                {/*            onChange={(e) => setSearchValue(e.target.value)} // 입력값 변경 시 상태 업데이트*/}
                {/*            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500"*/}
                {/*            placeholder="Search GT1200, CT3500, ST2100 ... Tags" required*/}
                {/*        />*/}
                {/*        <button*/}
                {/*            type="submit"*/}
                {/*            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-700 rounded-e-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">*/}
                {/*            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
                {/*                 viewBox="0 0 20 20">*/}
                {/*                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                {/*                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />*/}
                {/*            </svg>*/}
                {/*            <span className="sr-only">Search</span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="flex relative justify-evenly text-gray-600 py-3">
                    <p>#Satellite</p>
                    <p>#ST6100</p>
                    <p>#Maritime</p>
                    <p>#VMS</p>
                    <p>#NMS</p>
                    <p>#AIS</p>
                    <p>#Trail Tracking</p>
                </div>
            </form>
        </div>
    );
}
