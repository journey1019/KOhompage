'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewDropdown from './NewDropdown';
import Login from '../Platforms';
import Language from '../Language';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const NewNavbar = ({ locale }: { locale: string }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    const menuItems = [
        { key: 'solutions', label: 'Solutions' },
        { key: 'hardware', label: 'Hardware' },
        { key: 'company', label: 'Company' },
    ];

    const dropdownContent: Record<string, { label: string; href: string; filterKey?: string; filterValue?: string }[]> = {
        solutions: [
            { label: 'Container-IoT', href: '/solutions/container-iot' },
            { label: 'Global-IoT', href: '/solutions/global-iot' },
            { label: 'Satellite', href: '/solutions/satellite' },
            { label: 'AIS', href: '/solutions/ais' },
        ],
        hardware: [
            { label: 'Device', href: '/hardware', filterKey: 'types', filterValue: 'Device' },
            { label: 'Module', href: '/hardware', filterKey: 'types', filterValue: 'Module' },
            { label: 'Antenna', href: '/hardware', filterKey: 'types', filterValue: 'Antenna' },
            { label: 'Sensor', href: '/hardware', filterKey: 'types', filterValue: 'Sensor' },
        ],
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact-us' },
            { label: 'Resources', href: '/resources' },
        ],
    };

    const handleMouseEnter = (key: string) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setOpenDropdown(key);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const toggleSubMenu = (key: string) => setOpenSubMenu((prev) => (prev === key ? null : key));

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <nav className="max-w-screen-2xl 2xl:max-w-screen-xl maxWeb:max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4 lg:px-16 maxWeb:py-8">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/KO_SmallLogo.png"
                        alt="Logo"
                        width={170}
                        height={120}
                        unoptimized
                        className="cursor-pointer maxWeb:w-[200px] h-auto"
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
                            <button className="text-gray-700 hover:text-red-600 px-4 maxWeb:text-2xl font-semibold">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-4">
                    <Login locale={locale} />
                    <Language />
                    <button
                        className="sm:p-2 py-2 rounded-full md:hidden"
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

            {openDropdown && (
                <div onMouseEnter={() => handleMouseEnter(openDropdown)} onMouseLeave={handleMouseLeave}>
                    <NewDropdown menuKey={openDropdown} locale={locale} />
                </div>
            )}

            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 w-full bg-white shadow-md z-40 md:hidden">
                    <ul className="flex flex-col space-y-4 py-2 sm:p-4">
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    className="w-full flex justify-between items-center py-2 px-4 text-gray-700 hover:text-red-600"
                                    onClick={() => toggleSubMenu(item.key)}
                                >
                                    {item.label}
                                    {openSubMenu === item.key ? (
                                        <ChevronUpIcon className="w-6 h-6 text-gray-700" />
                                    ) : (
                                        <ChevronDownIcon className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>

                                {openSubMenu === item.key && (
                                    <ul className="pl-6 pt-2">
                                        {dropdownContent[item.key].map((subItem, index) => (
                                            <li
                                                key={`${item.key}-${subItem.filterValue || index}`}
                                                className="hover:bg-gray-100 pl-3"
                                            >
                                                <Link
                                                    href={`/${locale}${subItem.href}${subItem.filterKey && subItem.filterValue ? `?${subItem.filterKey}=${subItem.filterValue}` : ''}`}
                                                    className="block py-1 text-gray-700 hover:text-red-600"
                                                    onClick={() => setIsMobileMenuOpen(false)}
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

export default NewNavbar;
