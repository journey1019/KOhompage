'use client'

import { FaMoon, FaRegMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from 'react';

interface ModeProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export default function Mode({ darkMode, setDarkMode }: ModeProps) {
    useEffect(() => {
        // Check local storage for theme on initial render
        const storedTheme = localStorage.getItem('theme');
        const isDarkMode = storedTheme === 'dark';
        document.documentElement.classList.toggle('dark', isDarkMode);
        setDarkMode(isDarkMode);
    }, [setDarkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        setDarkMode(newDarkMode);
    };

    return (
        <button
            id='theme-toggle'
            type='button'
            onClick={toggleDarkMode}
            className='text-center justify-center items-center hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full p-1'
        >
            {darkMode ? <FaSun /> : <FaRegMoon />}
        </button>
    );
}
