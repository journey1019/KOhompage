// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
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
    );
};

export default SearchBar;
