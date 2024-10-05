'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleMouseEnter = (menu: string) => setOpenDropdown(menu);
    const handleMouseLeave = () => setOpenDropdown(null);

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={`/images/KO_SmallLogo.png`} alt="KO Logo" width={180} height={130} unoptimized />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
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
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('hardware')} onMouseLeave={handleMouseLeave}>
                                <Link href="/hardware"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Hardware
                                </Link>
                            </li>
                            <li>
                                <button id="mega-menu-full-cta-image-button"
                                        data-collapse-toggle="mega-menu-full-image-dropdown"
                                        className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Company <svg
                                    className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                                </button>
                            </li>
                            <li>
                                <Link href="/support"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Support</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Company Dropdown*/}
                <div id="mega-menu-full-image-dropdown" className="mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600">
                    <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">

                        <ul className="hidden mb-4 space-y-4 md:mb-0 md:block"
                            aria-labelledby="mega-menu-full-image-button">
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Online Stores
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Segmentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Marketing CRM
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Online Stores
                                </a>
                            </li>
                        </ul>
                        <ul className="mb-4 space-y-4 md:mb-0">
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Our Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    License
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    Resources
                                </a>
                            </li>
                        </ul>
                        <a href="#"
                           className="p-8 bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
                           style={{ backgroundImage: 'url(/images/posts/javascript-basic.png)' }}>
                            <p className="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">Preview
                                the new Flowbite dashboard navigation.</p>
                            <button type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
                                Get started
                                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}