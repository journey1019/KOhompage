'use client';

import React from 'react';
import Link from 'next/link';

interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownContent: Record<string, { label: string; href: string }[]> = {
    solutions: [
        { label: 'Container-IoT', href: '/solutions/container-iot' },
        { label: 'Global-IoT', href: '/solutions/global-iot' },
        { label: 'Satellite', href: '/solutions/satellite' },
        { label: 'AIS', href: '/solutions/ais' },
    ],
    hardware: [
        { label: 'Laptops', href: '/hardware/laptops' },
        { label: 'Desktops', href: '/hardware/desktops' },
        { label: 'Accessories', href: '/hardware/accessories' },
        { label: 'Networking', href: '/hardware/networking' },
    ],
    company: [
        { label: 'About Us', href: '/company/about' },
        { label: 'Careers', href: '/company/careers' },
        { label: 'Contact', href: '/company/contact' },
        { label: 'Blog', href: '/company/blog' },
    ],
};

const Dropdown = ({ menuKey, locale }: DropdownProps) => {
    const items = dropdownContent[menuKey];

    return (
        <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-60">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 max-w-screen-2xl mx-auto">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600"
                    >
                        <h3 className="font-semibold">{item.label}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
