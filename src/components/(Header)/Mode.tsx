'use client'

import { FaMoon, FaRegMoon } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function Mode() {
    const [darkMode, setDarkMode] = useState (false);

    useEffect(() => {
        // 처음 렌더린 시 로컬 스토리지에서 다크 모드 상태 확인
        const storedTheme = localStorage.getItem('theme');
        if(storedTheme == 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if(darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    return(
        <button
            id='theme-toggle' type='button'
            onClick={toggleDarkMode}
            className='text-center justify-center items-center hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full p-1'
            // className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-lg"
        >
            {darkMode ? <FaMoon/> : <FaRegMoon/>}
        </button>
    )
}