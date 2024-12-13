'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MenuItem from './MenuItem';
import Login from './Login';
import Language from './Language';
import { useTranslations } from 'next-intl';

interface HeaderProps {
    locale: string;
}

export default function Header({ locale }: HeaderProps) {
    const t = useTranslations('header');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const menuItems = [
        { key: 'solutions', href: null },
        { key: 'caseStudies', href: null },
        { key: 'hardware', href: `/${locale}/hard` },
    ];

    const handleMouseEnter = (menu: string) => {
        if (openDropdown !== menu) {
            setOpenDropdown(menu);
        }
    };

    const handleMouseLeave = () => {
        if (openDropdown !== null) {
            setOpenDropdown(null);
        }
    };
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
            <nav className="max-w-screen-2xl mx-auto flex justify-between items-center p-4">
                <Link href="/" locale={locale}>
                    <Image
                        src="/images/KO_SmallLogo.png"
                        alt="KO Logo"
                        width={180}
                        height={130}
                        unoptimized
                        className="cursor-pointer"
                    />
                </Link>
                <div id="menu" className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:items-center`}>
                    <ul className="flex flex-col md:flex-row md:space-x-8">
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.key}
                                label={t(`menu.${item.key}`)}
                                href={item.href}
                                onMouseEnter={item.href ? undefined : () => handleMouseEnter(item.key)}
                                onMouseLeave={item.href ? undefined : handleMouseLeave}
                                isDropdownOpen={openDropdown === item.key}
                                locale={locale}
                            />
                        ))}
                    </ul>
                </div>
                <div className="flex items-center space-x-2">
                    {!isMenuOpen && <Login />}
                    <Language />
                    <button
                        onClick={toggleMenu}
                        className="p-2 w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
                        aria-controls="menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                                className="w-5 h-5"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l15 12M1 13L16 1"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                                className="w-5 h-5"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}
