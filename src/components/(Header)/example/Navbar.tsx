'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Dropdown from './Dropdown';
import { GlobeAltIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = ({ locale }: { locale: string }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null); // Dropdown 닫기 타이머

    const menuItems = [
        { key: 'solutions', label: 'Solutions' },
        { key: 'hardware', label: 'Hardware' },
        { key: 'company', label: 'Company' },
    ];

    const handleMouseEnter = (key: string) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }
        setOpenDropdown(key);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200); // 200ms 딜레이
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <nav className="max-w-screen-2xl w-full mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/KO_SmallLogo.png"
                        alt="Logo"
                        width={100}
                        height={40}
                        unoptimized
                        className="cursor-pointer"
                    />
                </Link>

                {/* Center Menu */}
                <ul className="flex space-x-8">
                    {menuItems.map((item) => (
                        <li
                            key={item.key}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter(item.key)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="text-gray-700 hover:text-red-600">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right Icons */}
                <div className="flex space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <UserIcon className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <GlobeAltIcon className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* Dropdown */}
            {openDropdown && (
                <div
                    onMouseEnter={() => handleMouseEnter(openDropdown)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Dropdown menuKey={openDropdown} locale={locale} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
