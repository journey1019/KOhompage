import React, { useState } from 'react';

interface SearchBarProps {
    chips: string[];
    onAddChip: (chip: string) => void;
    onRemoveChip: (chip: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ chips, onAddChip, onRemoveChip }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input.trim()) { // 양 끝 공백 제거
            onAddChip(input.trim().toLowerCase());
            setInput(''); // 입력 필드 초기화
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="mb-4">
            {/* Input with search icon */}
            <div className="relative flex items-center mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Search hardware..."
                    className="py-3 px-5 rounded-full w-full border-gray-300 border-2 pr-12"
                />
                <button
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                </button>
            </div>

            {/* Chips display */}
            <div className="flex flex-wrap gap-2 mb-4">
                {chips.map((chip, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-blue-200"
                    >
                        {chip}
                        <button
                            onClick={() => onRemoveChip(chip)}
                            className="text-blue-700 hover:text-blue-900"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* Predefined tags */}
            <div className="flex flex-wrap gap-2 sm:justify-between">
                {[
                    '#Satellite',
                    '#ST6000',
                    '#Maritime',
                    '#Container',
                    '#NMS',
                    '#AIS',
                    '#Trail Tracking',
                ].map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => onAddChip(tag.slice(1).toLowerCase())} // "#" 제거 후 chip에 추가
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
