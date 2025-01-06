'use client';

import React from 'react';
import Link from 'next/link';
import {
    GlobeAltIcon,
    RocketLaunchIcon,
    MapIcon,
    DocumentTextIcon,
    PhoneIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';
import { GoContainer } from 'react-icons/go';
import { MdDevicesOther, MdViewModule, MdOutlineSettingsInputAntenna, MdOutlineSensors } from "react-icons/md";




interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownContent: Record<
    string,
    { label: string; href?: string; title?:string; description?:string; filterKey?: string; filterValue?: string; icon?: React.ReactNode }[]
> = {
    solutions: [
        { label: 'Container-IoT', href: 'container-iot', title: 'Container IoT', description: 'Real-time tracking, monitoring, and remote control for refrigerated containers.', icon: <GoContainer className="h-6 w-6" /> },
        { label: 'Global-IoT', href: 'global-iot', title: 'Global IoT', description: 'Monitoring construction equipment, weather data, and marine information.', icon: <GlobeAltIcon className="h-6 w-6" />, },
        { label: 'Satellite', href: 'satellite', title: 'Satellite', description: 'INMARSAT / ORBCOMM / STARLINK satellite communication services.', icon: <RocketLaunchIcon className="h-6 w-6" />, },
        { label: 'AIS', href: 'ais', title: 'AIS', description: 'AIS data collection and provision through satellite/terrestrial networks.', icon: <MapIcon className="h-6 w-6" />, }
    ],
    hardware: [
        { label: 'Device', filterKey: 'types', filterValue: 'Device', icon: <MdDevicesOther className="h-6 w-6" />  },
        { label: 'Module', filterKey: 'types', filterValue: 'Module', icon: <MdViewModule className="h-6 w-6" />  },
        { label: 'Antenna', filterKey: 'types', filterValue: 'Antenna', icon: <MdOutlineSettingsInputAntenna className="h-6 w-6" />  },
        { label: 'Sensor', filterKey: 'types', filterValue: 'Sensor', icon: <MdOutlineSensors className="h-6 w-6" />  },
        // Categories
        // { label: 'Container-IoT', filterKey: 'categories', filterValue: 'Container-IoT' },
        // { label: 'Global-IoT', filterKey: 'categories', filterValue: 'Global-IoT' },
        // { label: 'Satellite-IoT', filterKey: 'categories', filterValue: 'Satellite-IoT' },
        // { label: 'AIS', filterKey: 'categories', filterValue: 'AIS' },
        // { label: 'Starlink', filterKey: 'categories', filterValue: 'Starlink' },
        // { label: 'Tracking', filterKey: 'categories', filterValue: 'Tracking' },
        // Types
        // { label: 'Device', filterKey: 'types', filterValue: 'Device' },
        // { label: 'Module', filterKey: 'types', filterValue: 'Module' },
        // { label: 'Antenna', filterKey: 'types', filterValue: 'Antenna' },
        // { label: 'Sensor', filterKey: 'types', filterValue: 'Sensor' },
        // Networks
        // { label: 'Satellite(ORBCOMM)', filterKey: 'networks', filterValue: 'Satellite(ORBCOMM)' },
        // { label: 'Satellite(OGx/IDP)', filterKey: 'networks', filterValue: 'Satellite(OGx/IDP)' },
        // { label: 'Satellite(Starlink)', filterKey: 'networks', filterValue: 'Satellite(Starlink)' },
        // { label: 'Satellite(NTN)', filterKey: 'networks', filterValue: 'Satellite(NTN)' },
        // { label: 'Cellular(LTE/3G/2G)', filterKey: 'networks', filterValue: 'Cellular(LTE/3G/2G)' },
        // { label: 'Sigfox', filterKey: 'networks', filterValue: 'Sigfox' }
    ],
    company: [
        { label: 'About Us', href: '/about', icon: <DocumentTextIcon className="mt-1 h-5 w-5" /> },
        { label: 'Contact', href: '/contact-us', icon: <PhoneIcon className="mt-1 h-5 w-5" /> },
        { label: 'Resources', href: '/resources', icon: <Squares2X2Icon className="mt-1 h-5 w-5" /> }
    ]
};

const NewDropdown = ({ menuKey, locale }: DropdownProps) => {
    const items = dropdownContent[menuKey];


    // Handle `solutions` dropdown with a specific structure
    if (menuKey === 'solutions') {
        return (
            <div className="grid max-w-screen-2xl px-4 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
                <div
                    id="mega-menu-full-dropdown"
                    className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
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
            // <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-50">
            //     <div className="grid max-w-screen-xl mx-auto px-6 py-2 grid-cols-3 gap-8">
            //         {/* Categories */}
            //         <div className="space-y-0">
            //             <h3 className="block w-full text-md font-bold">Category</h3>
            //             {items
            //                 .filter((item) => item.filterKey === 'categories')
            //                 .map((item) => (
            //                     <Link
            //                         key={item.label}
            //                         href={`/ko/hardware?${item.filterKey}=${item.filterValue}`}
            //                         className="block text-gray-700 hover:text-red-600 w-full hover:bg-gray-100 px-3 py-2 rounded-md"
            //                     >
            //                         {item.label}
            //                     </Link>
            //                 ))}
            //         </div>
            //
            //         {/* Types */}
            //         <div className="space-y-0">
            //             <h3 className="block w-full text-md font-bold">Types</h3>
            //             {items
            //                 .filter((item) => item.filterKey === 'types')
            //                 .map((item) => (
            //                     <Link
            //                         key={item.label}
            //                         href={`/ko/hardware?${item.filterKey}=${item.filterValue}`}
            //                         className="block text-gray-700 hover:text-red-600 w-full hover:bg-gray-100 px-3 py-2 rounded-md"
            //                     >
            //                         {item.label}
            //                     </Link>
            //                 ))}
            //         </div>
            //
            //         {/* Networks */}
            //         <div className="space-y-0">
            //             <h3 className="block w-full text-md font-bold">Networks</h3>
            //             {items
            //                 .filter((item) => item.filterKey === 'networks')
            //                 .map((item) => (
            //                     <Link
            //                         key={item.label}
            //                         href={`/ko/hardware?${item.filterKey}=${item.filterValue}`}
            //                         className="block text-gray-700 hover:text-red-600 w-full hover:bg-gray-100 px-3 py-2 rounded-md"
            //                     >
            //                         {item.label}
            //                     </Link>
            //                 ))}
            //         </div>
            //     </div>
            // </div>
            <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-50">
                <div className="grid grid-cols-4 gap-4 p-6 max-w-screen-xl mx-auto">
                    {items
                        .filter((item) => item.filterKey === 'types') // 'types' 조건에 맞는 항목 필터링
                        .map((item) => (
                            <Link
                                key={`${item.filterKey}-${item.label}`} // 고유한 key 설정
                                href={`/ko/hardware?${item.filterKey}=${item.filterValue}`} // 필터링 조건 URL
                                className="flex flex-row items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600"
                            >
                                <div className="p-1 rounded-md ring-1 ring-gray-300 bg-gray-200 flex items-center">
                                    {item.icon} {/* 아이콘 렌더링 */}
                                </div>
                                <h3 className="font-semibold pl-3">{item.label}</h3> {/* 라벨 표시 */}
                            </Link>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="absolute top-full left-0 w-screen bg-white shadow-lg border-t z-60">
            <div className="grid grid-cols-3 gap-4 p-6 max-w-screen-xl mx-auto">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="flex flex-row p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600 items-center"
                    >
                        <div className="p-1 rounded-md ring-1 ring-gray-300 bg-gray-200 items-center">
                            {item.icon}
                        </div>
                        <h3 className="font-semibold pl-3">{item.label}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewDropdown;
