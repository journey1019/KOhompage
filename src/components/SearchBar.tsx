// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [chips, setChips] = useState<string[]>([]);

    const handleSearch = () => {
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

    return (
        <div className="mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search hardware..."
                className="border p-2 rounded-md w-full"
            />
            <button
                onClick={handleSearch}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Search
            </button>
        </div>

        // <div
        //     className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
        //          className="fill-gray-600 mr-3 rotate-90">
        //         <path
        //             d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
        //         </path>
        //     </svg>
        //     <input type="email" placeholder="Search Something..."
        //            className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        // </div>


        // <div className="mb-4">
        //     <input
        //         type="text"
        //         value={input}
        //         onChange={(e) => setInput(e.target.value)}
        //         onKeyPress={handleKeyPress}
        //         placeholder="Enter to add a tag..."
        //         className="border p-2 rounded-md w-full"
        //     />
        //
        //     {/* Chip 목록 표시 */}
        //     <div className="mt-2 flex flex-wrap gap-2">
        //         {chips.map((chip, index) => (
        //             <span
        //                 key={index}
        //                 id="badge-dismiss-dark"
        //                 className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
        //             >
        //                 {chip}
        //                 <button
        //                     type="button"
        //                     className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
        //                     onClick={() => removeChip(index)} // Chip 삭제 버튼
        //                     aria-label="Remove"
        //                 >
        //                     <svg
        //                         className="w-2 h-2"
        //                         aria-hidden="true"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 14 14"
        //                     >
        //                         <path
        //                             stroke="currentColor"
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        //                         />
        //                     </svg>
        //                     <span className="sr-only">Remove badge</span>
        //                 </button>
        //             </span>
        //         ))}
        //     </div>
        // </div>
    );
};

export default SearchBar;
