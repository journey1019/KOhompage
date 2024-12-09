'use client';

import Link from 'next/link';
import Dropdown from './Dropdown';

interface MenuItemProps {
    label: string;
    href?: string | null;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isDropdownOpen?: boolean;
    locale: string;
}

export default function MenuItem({ label, href, onMouseEnter, onMouseLeave, isDropdownOpen, locale }: MenuItemProps) {
    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative"
        >
            {href ? (
                <Link href={href} className="block px-3 py-2 hover:text-red-700">
                    {label}
                </Link>
            ) : (
                <button className="block px-3 py-2 text-gray-900 dark:text-white hover:text-red-700">
                    {label}
                </button>
            )}
            {isDropdownOpen && !href && <Dropdown menuKey={label.toLowerCase()} locale={locale} />}
        </li>
    );
}
