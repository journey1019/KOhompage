'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlobeAltIcon, RocketLaunchIcon, MapIcon, CloudArrowUpIcon, PhoneIcon, DocumentTextIcon, BellIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { GoContainer } from "react-icons/go";

interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownContent: Record<string, { label: string; href: string; title?: string; description?: string; image?: string; icon?: React.ReactNode; }[]> = {
    solutions: [
        { label: 'Container-IoT', href: 'container-iot', title: 'Container IoT', description: 'Real-time tracking, monitoring, and remote control for refrigerated containers.', icon: <GoContainer className="h-6 w-6" /> },
        { label: 'Global-IoT', href: 'global-iot', title: 'Global IoT', description: 'Monitoring construction equipment, weather data, and marine information.', icon: <GlobeAltIcon className="h-6 w-6" />, },
        { label: 'Satellite', href: 'satellite', title: 'Satellite', description: 'INMARSAT / ORBCOMM / STARLINK satellite communication services.', icon: <RocketLaunchIcon className="h-6 w-6" />, },
        { label: 'AIS', href: 'ais', title: 'AIS', description: 'AIS data collection and provision through satellite/terrestrial networks.', icon: <MapIcon className="h-6 w-6" />, }
    ],
    hardware: [
        { label: 'CT 1000', href: '/hardware/ct-1000', image: '/images/hardware/CT-1000.png', description: 'Trailer and composite container' },
        { label: 'CT 3500', href: '/hardware/ct-3500', image: '/images/hardware/CT-3500.png', description: 'Next-generation technology' },
        { label: 'CT 3600', href: '/hardware/ct-3600', image: '/images/hardware/CT-3600.png', description: 'Smarter Reefer Container Telematics' },
        { label: 'GT 1200', href: '/hardware/gt-1200', image: '/images/hardware/GT-1200.png', description: 'Trailer Telematics.' },
        { label: 'IDP 800', href: '/hardware/idp-800', image: '/images/hardware/IDP-800.png', description: 'Trailers the industry\'s #1 choice' },
        { label: 'OG2', href: '/hardware/og-2', image: '/images/hardware/OG-2.png', description: 'First and only commercial satellite network' },
        { label: 'SC 1000', href: '/hardware/sc-1000', image: '/images/hardware/SC-1000.png', description: 'Solar-powered satellite tracker' },
        { label: 'ST 2100', href: '/hardware/st-2100', image: '/images/hardware/ST-2100.png', description: 'Reliable satellite tracking' },
        { label: 'ST 6000', href: '/hardware/st-6000', image: '/images/hardware/ST-6000.png', description: 'Comprehensive resources for Quick deployment.' },
        { label: 'ST 9100', href: '/hardware/st-9100', image: '/images/hardware/ST-9100.png', description: 'Reliable satellite connectivity and asset tracking' },
        { label: 'QPRO', href: '/hardware/qpro', image: '/images/hardware/QPRO.png', description: 'Global Asset Tracking Features   ' },
        { label: 'Q 4000', href: '/hardware/q-4000', image: '/images/hardware/Q-4000.png', description: 'Using satellite and international mobile networks' }
    ],
    company: [
        { label: 'About Us', href: '/about', icon: <DocumentTextIcon className="mt-1 h-5 w-5 flex-none text-black" /> },
        { label: 'Contact', href: '/contact-us', icon: <PhoneIcon className="mt-1 h-5 w-5 flex-none text-black" /> },
        { label: 'Resources', href: '/resources', icon: <Squares2X2Icon className="mt-1 h-5 w-5 flex-none text-black" /> },
        // { label: 'Blog', href: '/resources/blog', icon: <BellIcon className="mt-1 h-5 w-5 flex-none text-black" /> },
        // { label: 'Notice', href: '/resources/notice', icon: <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-black" /> },
        // { label: 'Board', href: '/resources/board', icon: <Squares2X2Icon className="mt-1 h-5 w-5 flex-none text-black" /> },
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
                                        className="group block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <div className="flex flex-col items-start">
                                            <div className="group-hover:text-red-700 rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                                {/* Icon Rendering */}
                                                {item.icon}
                                            </div>
                                            <div className="group-hover:text-red-700 font-semibold pt-5">{item.title}</div>
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
                <div className="grid max-w-screen-xl mx-auto px-6 py-2 grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Grid 1: First half of hardware items */}
                    <div className="space-y-3 max-w-screen-xl border-r border-gray-200 pr-4">
                        {items.slice(0, Math.ceil(items.length / 2)).map((item) => (
                            <a href={item.href}
                                key={item.href}
                                // onMouseEnter={() => setHoveredItem(item)} // description 이 무조건 string 이라고 선언될 때
                                onMouseEnter={() => setHoveredItem(({
                                    ...item,
                                    description: item.description ?? 'No description available',
                                }))}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="w-full block text-left px-4 py-1 rounded-lg hover:bg-gray-100 hover:text-red-700 text-gray-700"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Grid 2: Second half of hardware items */}
                    <div className="space-y-3 border-r border-gray-200 pr-4">
                        {items.slice(Math.ceil(items.length / 2)).map((item) => (
                            <button
                                key={item.href}
                                // onMouseEnter={() => setHoveredItem(item)}
                                onMouseEnter={() => setHoveredItem(({
                                    ...item,
                                    description: item.description ?? 'No description available',
                                }))}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="w-full block text-left px-4 py-1 rounded-lg hover:bg-gray-100 hover:text-red-700 text-gray-700"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid 3: Display hovered item's details */}
                    <div className="flex flex-col items-center text-center space-y-3 pl-4">
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
        <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-60">
            <div className="grid grid-cols-3 gap-4 p-6 max-w-screen-xl mx-auto">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="flex flex-row p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600 items-center"
                    >
                        <div className="p-1 rounded-md border border-1 border-gray-200 bg-indigo-50 items-center">
                            {item.icon}
                        </div>
                        <h3 className="font-semibold pl-3">{item.label}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
