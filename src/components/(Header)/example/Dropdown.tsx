'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownContent: Record<string, { label: string; href: string; title?: string; description?: string; image?: string }[]> = {
    solutions: [
        { label: 'Container-IoT', href: 'container-iot', title: 'Container IoT', description: 'Real-time tracking, monitoring, and remote control for refrigerated containers.' },
        { label: 'Global-IoT', href: 'global-iot', title: 'Global IoT', description: 'Monitoring construction equipment, weather data, and marine information.' },
        { label: 'Satellite', href: 'satellite', title: 'Satellite', description: 'INMARSAT / ORBCOMM / STARLINK satellite communication services.' },
        { label: 'AIS', href: 'ais', title: 'AIS', description: 'AIS data collection and provision through satellite/terrestrial networks.' },
    ],
    hardware: [
        { label: 'CT 1000', href: '/hardware/ct-1000', image: '/images/hardware/CT-1000.png', description: 'ORBCOMM affordable tracking for trailers and intermodal containers.' },
        { label: 'CT 3500', href: '/hardware/ct-3500', image: '/images/hardware/CT-3500.png', description: 'Next-generation technology in remote refrigeration container management that enables complete visibility and control of assets' },
        { label: 'CT 3600', href: '/hardware/ct-3600', image: '/images/hardware/CT-3600.png', description: 'ORBCOMM smarter reefer container telematics introducing the next generation of reefer container fleet management.' },
        { label: 'GT 1200', href: '/hardware/gt-1200', image: '/images/hardware/GT-1200.png', description: 'GT100 GPS tracker for trailers the industry\'s #1 choice for trailer telematics.' },
        { label: 'IDP 800', href: '/hardware/idp-800', image: '/images/hardware/IDP-800.png', description: 'GT100 GPS tracker for trailers the industry\'s #1 choice for trailer telematics.' },
        { label: 'OG2', href: '/hardware/og-2', image: '/images/hardware/OG-2.png', description: 'OG2 Purpose-Built for Satellite IoT ORBCOMM OG2 is the world\'s first and only commercial satellite network 100%' },
        { label: 'SC 1000', href: '/hardware/sc-1000', image: '/images/hardware/SC-1000.png', description: 'Solar-powered satellite tracker' },
        { label: 'ST 2100', href: '/hardware/st-2100', image: '/images/hardware/ST-2100.png', description: 'ORBCOMM Satellite Tracking Device Connected almost anywhere ORBCOMM\'s ST21000 is a reliable satellite tracking' },
        { label: 'ST 6000', href: '/hardware/st-6000', image: '/images/hardware/ST-6000.png', description: 'The ST 6000 satellite terminal is fully programmable with comprehensive resources for quick deployment.' },
        { label: 'ST 9100', href: '/hardware/st-9100', image: '/images/hardware/ST-9100.png', description: 'Invest in the flexibility needed to provide asset tracking regardless of location with reliable satellite connectivity and automatic 4G LTE/3G/2G cellular fallback.' },
        { label: 'QPRO', href: '/hardware/qpro', image: '/images/hardware/QPRO.png', description: 'Communication equipment for expanding global asset tracking capabilities' },
        { label: 'Q 4000', href: '/hardware/q-4000', image: '/images/hardware/Q-4000.png', description: 'Using satellite and international mobile networks' }
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
    const [hoveredItem, setHoveredItem] = useState<{ label: string; href: string; description: string; image?: string } | null>(null);

    // Handle `solutions` dropdown with a specific structure
    if (menuKey === 'solutions') {
        return (
            <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
                <div
                    id="mega-menu-full-dropdown"
                    className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
                >
                    <div className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                        {items.map((item) => (
                            <ul key={item.href}>
                                <li>
                                    <a
                                        href={`/solutions/${item.href}`}
                                        className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <div className="flex flex-col items-start">
                                            <div className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-black dark:text-white"
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12" y2="16" />
                                                </svg>
                                            </div>
                                            <div className="font-semibold pt-5">{item.title}</div>
                                            <div className="text-sm pt-2 text-gray-400">{item.description}</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    else if (menuKey === 'hardware') {
        return (
            <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-50">
                <div className="grid max-w-screen-xl mx-auto px-6 py-8 grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Grid 1: First half of hardware items */}
                    <div className="space-y-4 max-w-screen-xl border-r border-gray-200 pr-4">
                        {items.slice(0, Math.ceil(items.length / 2)).map((item) => (
                            <a href={item.href}
                                key={item.href}
                                // onMouseEnter={() => setHoveredItem(item)} // description 이 무조건 string 이라고 선언될 때
                                onMouseEnter={() => setHoveredItem(({
                                    ...item,
                                    description: item.description ?? 'No description available',
                                }))}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="w-full block text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Grid 2: Second half of hardware items */}
                    <div className="space-y-4 border-r border-gray-200 pr-4">
                        {items.slice(Math.ceil(items.length / 2)).map((item) => (
                            <button
                                key={item.href}
                                // onMouseEnter={() => setHoveredItem(item)}
                                onMouseEnter={() => setHoveredItem(({
                                    ...item,
                                    description: item.description ?? 'No description available',
                                }))}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="w-full block text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid 3: Display hovered item's details */}
                    <div className="flex flex-col items-center text-center space-y-4 pl-4">
                        {hoveredItem ? (
                            <>
                                {hoveredItem.image && (
                                    <Image
                                        src={hoveredItem.image}
                                        alt={hoveredItem.label}
                                        width={500}
                                        height={300}
                                        className="w-40 h-40 object-contain"
                                        unoptimized
                                    />
                                )}
                                <h3 className="text-lg font-bold text-gray-900">{hoveredItem.label}</h3>
                                <p className="text-gray-500">{hoveredItem.description}</p>
                                {/*<Link*/}
                                {/*    href={`/${locale}${hoveredItem.href}`}*/}
                                {/*    className="px-6 py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700"*/}
                                {/*>*/}
                                {/*    Learn More*/}
                                {/*</Link>*/}
                            </>
                        ) : (
                            <p className="text-gray-400">Hover over an item to see details</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Default layout for other dropdowns
    return (
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div
                id="mega-menu-full-dropdown"
                className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
            >
                <div
                    className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                    {items.map((item) => (
                        <ul key={item.href}>
                            <li>
                                <Link
                                    key={item.href}
                                    href={`/${locale}${item.href}`}
                                    className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600"
                                >
                                    <h3 className="font-semibold">{item.label}</h3>
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
