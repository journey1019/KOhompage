'use client'

import Link from 'next/link';
import Image from 'next/image';
import Mode from '@/components/Mode';
import { useState } from 'react';

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleMouseEnter = (menu: string) => setOpenDropdown(menu);
    const handleMouseLeave = () => setOpenDropdown(null);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={`/images/KO_SmallLogo.png`} alt="KO Logo" width={180} height={130} unoptimized />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
                        <Mode/>
                        <button data-collapse-toggle="mega-menu" type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mega-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div id="mega-menu-full-image" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            <li onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
                                <Link href="/solutions"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Solutions
                                </Link>
                                {openDropdown === 'solutions' && (
                                    <div className="absolute bg-white dark:bg-gray-800 shadow-lg p-4">
                                        <ul className="space-y-2">
                                            <li>Global IoT</li>
                                            <li>Container IoT</li>
                                            <li>Satellite</li>
                                            <li>AIS</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('hardware')} onMouseLeave={handleMouseLeave}>
                                <Link href="/hardware"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Hardware
                                </Link>
                                {openDropdown === 'hardware' && (
                                    <div className="absolute bg-white dark:bg-gray-800 shadow-lg p-4">
                                        <ul className="space-y-4">
                                            <li>
                                                <strong>Trailer Tracking, Dry Van, Chassis and Dry Container</strong>
                                                <ul className="ml-4 text-sm">
                                                    <li>GT1200 Series</li>
                                                    <li>CT3500 Series</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>Intermodal Containers and Cargo Security</strong>
                                                <ul className="ml-4 text-sm">
                                                    <li>ST2100 Series</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>Maritime</strong>
                                                <ul className="ml-4 text-sm">
                                                    <li>ST6100 Series</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('company')} onMouseLeave={handleMouseLeave}>
                                <button id="mega-menu-full-cta-image-button" className="flex items-center">
                                    Company
                                    <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {openDropdown === 'company' && (
                                    <div className="absolute bg-white dark:bg-gray-800 shadow-lg p-4">
                                        <ul className="space-y-2">
                                            <li>About Us</li>
                                            <li>Mission</li>
                                            <li>Vision</li>
                                            <li>Team</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('support')} onMouseLeave={handleMouseLeave}>
                                <Link href="/support"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Support
                                </Link>
                                {openDropdown === 'support' && (
                                    <div className="absolute bg-white dark:bg-gray-800 shadow-lg p-4">
                                        <ul className="space-y-2">
                                            <li>Announcements</li>
                                            <li>Brochure</li>
                                            <li>News</li>
                                            <li>Blog</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
