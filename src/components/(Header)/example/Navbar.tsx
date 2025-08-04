/** Navbar에서 Hardware 선택하면 HardwarePage Filtering 선택 */
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Dropdown from './Dropdown';
import Login from '../Platforms';
import Language from '../Language';
import { GlobeAltIcon, UserIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import hardwareData from '@/data/hardware.json';

/** Hardware.json에서 가져오는 데이터 */
const hardwareDropdownData = hardwareData
    .filter((item) => item.use) // Only include items where 'use' is true
    .map((item) => ({
        label: item.title,
        href: `/hardware/${item.slug}`,
    }));

const Navbar = ({ locale }: { locale: string }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null); // Dropdown 닫기 타이머

    const menuItems = [
        { key: 'solutions', label: 'Solutions' },
        { key: 'hardware', label: 'Hardware' },
        { key: 'company', label: 'Company' },
    ];

    const dropdownContent: Record<string, { label: string; href: string }[]> = {
        solutions: [
            { label: 'Container-IoT', href: '/solutions/container-iot' },
            { label: 'Global-IoT', href: '/solutions/global-iot' },
            { label: 'Satellite', href: '/solutions/satellite' },
            { label: 'AIS', href: '/solutions/ais' },
        ],
        hardware: hardwareDropdownData,
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact-us' },
            { label: 'Resources', href: '/resources' },
        ],
    };

    // MenuItem 마우스 커서 Dropdown 제어
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

    // Mobile || Tab 햄버거 버튼 메뉴
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };
    const toggleSubMenu = (key: string) => {
        setOpenSubMenu((prev) => (prev === key ? null : key));
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            {/* Web Navbar */}
            <nav className="max-w-screen-2xl w-full mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/KO_SmallLogo.png"
                        alt="Logo"
                        width={170}
                        height={120}
                        unoptimized
                        className="cursor-pointer"
                        priority
                    />
                </Link>

                <ul className="hidden md:flex space-x-8">
                    {menuItems.map((item) => (
                        <li
                            key={item.key}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter(item.key)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.key === 'hardware' ? (
                                <Link
                                    href="/hardware"
                                    className="text-gray-700 hover:text-red-600 px-4"
                                    onClick={() => setOpenDropdown(null)}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button className="text-gray-700 hover:text-red-600 px-4">
                                    {item.label}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>


                {/* Right Icons */}
                <div className="flex items-center space-x-4">
                    <Login locale={locale} />
                    <Language />

                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="sm:p-2 py-2 hover:bg-gray-100 rounded-full md:hidden"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Dropdown for Desktop */}
            {openDropdown && (
                <div
                    onMouseEnter={() => handleMouseEnter(openDropdown)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Dropdown menuKey={openDropdown} locale={locale} />
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 w-full bg-white shadow-md z-40 md:hidden">
                    <ul className="flex flex-col space-y-4 py-2 sm:p-4">
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    className="w-full flex justify-between items-center py-2 px-4 text-gray-700 hover:text-red-600"
                                    onClick={() => toggleSubMenu(item.key)} // Toggle SubMenu
                                >
                                    {item.label}
                                    {openSubMenu === item.key ? (
                                        <ChevronUpIcon className="w-6 h-6 text-gray-700" />
                                    ) : (
                                        <ChevronDownIcon className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>

                                {/* SubMenu */}
                                {openSubMenu === item.key && (
                                    <ul className="pl-6 pt-2">
                                        {dropdownContent[item.key].map((subItem) => (
                                            <li key={subItem.href} className="hover:bg-gray-100 pl-3">
                                                <Link
                                                    href={`/${locale}${subItem.href}`}
                                                    className="block py-1 text-gray-700 hover:text-red-600"
                                                    onClick={toggleMobileMenu} // Close mobile menu on click
                                                >
                                                    {subItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
