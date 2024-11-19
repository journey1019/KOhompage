import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [chips, setChips] = useState<string[]>([]);

    const handleSearch = () => {
        if (input.trim()) {
            onSearch(input.trim());
            setChips((prevChips) => [...prevChips, input.trim()]);
            setInput(''); // 입력 필드 초기화
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const addChip = (chip: string) => {
        setInput(chip);
        onSearch(chip); // 즉시 검색 실행
    };

    const removeChip = (index: number) => {
        setChips((prevChips) => prevChips.filter((_, i) => i !== index));
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
                        className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200"
                        onClick={() => onSearch(chip)}
                    >
                        {chip}
                        <button
                            onClick={() => removeChip(index)}
                            className="ml-2 text-blue-700 hover:text-blue-900"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* Predefined tags */}
            <div className="flex gap-2 justify-between">
                {[
                    '#Satellite',
                    '#ST6100',
                    '#Maritime',
                    '#Container',
                    '#NMS',
                    '#AIS',
                    '#Trail Tracking',
                ].map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => addChip(tag.slice(1))} // "#" 제거 후 chip에 추가
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
