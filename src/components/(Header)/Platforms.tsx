'use client';

import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid';
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    PresentationChartBarIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import { RiShipLine } from "react-icons/ri";
import Link from 'next/link';
import {signIn, signOut, useSession } from "next-auth/react";

const platforms = [
    { name: 'ORBCOMM Platform', description: 'Fleet Management Solutions', url: 'https://platform.orbcomm.com/', icon: ChartPieIcon },
    { name: 'Maritime Platform', description: 'Driving container tracking', url: 'https://platform.orbcommmaritime.com/', icon: CursorArrowRaysIcon },
    { name: 'NMS', description: "Network Management System", url: 'https://nms.commtrace.com/', icon: PresentationChartBarIcon },
    { name: 'VMS', description: "Vessel Monitoring System", url: 'https://vms.commtrace.com/', icon: RiShipLine },
    // { name: 'Windward', description: 'Decision Support Platform to Accelerate Global Trade', url: 'https://windward.ai/', icon: SquaresPlusIcon },
    // { name: "Lloyd's List", description: 'Real-time ship movement monitoring', url: 'https://www.lloydslist.com/', icon: ArrowPathIcon },
];

const callsToAction = [
    { name: 'Admin', href: 'auth/signin', icon: UserIcon },
    { name: 'Contact sales', href: 'contact-us', icon: PhoneIcon },
];

interface Props {
    locale: string;
}

export default function Login({locale}: Props) {
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton className="group inline-flex items-center gap-x-1 text-xs mobile:text-sm 3xl:text-base maxWeb:text-xl font-semibold leading-6 text-gray-900">
                        <span>Platforms</span>
                        <ChevronDownIcon aria-hidden="true" className="h-4 w-4 mobile:h-5 mobile:w-5 maxWeb:h-8 maxWeb:w-8"/>
                    </PopoverButton>

                    {/* Web 해상도(md 이상) */}
                    <PopoverPanel
                        transition
                        className="hidden absolute right-0 z-10 mt-2 md:flex w-full md:w-screen max-w-xs md:max-w-md transition"
                    >
                        <div className="w-full md:max-w-md flex-auto overflow-hidden rounded-xl md:rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-2 md:p-4">
                                {platforms.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => close()} // ✅
                                        className="group relative flex gap-x-4 md:gap-x-6 rounded-lg p-3 md:p-4 hover:bg-gray-50"
                                    >
                                        <div className="mt-1 flex h-9 w-9 md:h-11 md:w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon
                                                aria-hidden="true"
                                                className="h-5 w-5 md:h-6 md:w-6 text-gray-600 group-hover:text-red-600"
                                            />
                                        </div>
                                        <div>
                                    <span className="font-semibold text-gray-900 text-xs md:text-sm">
                                        {item.name}
                                    </span>
                                            <p className="mt-1 text-gray-600 text-xs md:text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={`/${locale}/${item.href}`}
                                        onClick={() => close()} // ✅
                                        className="flex items-center justify-center gap-x-1.5 md:gap-x-2.5 p-2 md:p-3 font-semibold text-gray-900 hover:bg-gray-100 text-xs md:text-sm"
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className="h-4 w-4 md:h-5 md:w-5 flex-none text-gray-400"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </PopoverPanel>

                    {/* 모바일 해상도 */}
                    <PopoverPanel className="md:hidden absolute left-1/4 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-8 transition">
                        <div className="w-full md:max-w-md flex-auto overflow-hidden rounded-xl md:rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-2 md:p-4">
                                {platforms.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => close()} // ✅
                                        className="group relative flex gap-x-4 md:gap-x-6 rounded-lg p-3 md:p-4 hover:bg-gray-50"
                                    >
                                        <div className="mt-1 flex h-9 w-9 md:h-11 md:w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon
                                                aria-hidden="true"
                                                className="h-5 w-5 md:h-6 md:w-6 text-gray-600 group-hover:text-indigo-600"
                                            />
                                        </div>
                                        <div>
                                    <span className="font-semibold text-gray-900 text-xs md:text-sm">
                                        {item.name}
                                    </span>
                                            <p className="mt-1 text-gray-600 text-xs md:text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => close()} // ✅
                                        className="flex items-center justify-center gap-x-1.5 md:gap-x-2.5 p-2 md:p-3 font-semibold text-gray-900 hover:bg-gray-100 text-xs md:text-sm"
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className="h-4 w-4 md:h-5 md:w-5 flex-none text-gray-400"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
}
