'use client'

import Link from 'next/link';
import Image from 'next/image';
import Mode from '@/components/(Header)/Mode';
import { useState } from 'react';
import Solutions from './Solutions';
import Hardware from './Hardware';
import CaseStudies from './CaseStudies';
import Support from './Support';
import Company from './Company';
import LanguageSwitcher from '@/components/(Header)/LanguageSwitcher';
import { GrLanguage } from 'react-icons/gr';
// import { useTranslation } from 'next-i18next';
import Services from '@/components/(Header)/Services';

export default function Header() {
    // const { t } = useTranslation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 오픈 상태 추가

    const handleMouseEnter = (menu: string) => setOpenDropdown(menu);
    const handleMouseLeave = () => setOpenDropdown(null);

    const toggleMenu = () => setIsMenuOpen(prev => !prev); // 메뉴 토글 함수

    const dropdownComponents: { [key: string]: JSX.Element | null } = {
        solutions: <Solutions />,
        caseStudies: <CaseStudies/>,
        hardware: <Hardware />,
        support: <Support />,
        company: <Company />,
    };

    const dropdownContent = (category: string) => {
        return(
            <div
                id="mega-menu-full-image-dropdown"
                className="absolute left-0 top-full w-screen bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600"
                onMouseLeave={handleMouseLeave}
            >
                {dropdownComponents[category] || null}
            </div>
        )
    }
    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={`/images/KO_SmallLogo.png`} alt="KO Logo" width={180} height={130} unoptimized />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {!isMenuOpen && (
                            <Services/>
                            // <a href="#"
                            //    className="hidden sm:flex items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                            //     Services
                            //     <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                            //          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            //               strokeWidth="2" d="m1 1 4 4 4-4" />
                            //     </svg>
                            // </a>
                        )}
                        <Mode />
                        <GrLanguage className="ml-2 cursor-pointer dark:text-white" />
                        <button
                            onClick={toggleMenu} // Toggle menu on click
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mega-menu"
                            aria-expanded={isMenuOpen} // Update aria-expanded based on state
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 1l15 12M1 13L16 1" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 transition-transform duration-300 ease-in-out"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div id="mega-menu-full-image"
                         className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block h-screen' : 'hidden'}`}> {/* 메뉴 오픈 시 높이를 full로 설정 */}
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            <li>{!isMenuOpen && (
                                <Services/>
                                // <a href="#"
                                //    className="hidden sm:flex items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                //     Services
                                //     <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                //          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                //               strokeWidth="2" d="m1 1 4 4 4-4" />
                                //     </svg>
                                // </a>
                            )}</li>
                            <li>
                                <button
                                    className="flex w-full justify-between items-center py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                    onMouseEnter={() => handleMouseEnter('solutions')}
                                >
                                    Solutions
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {openDropdown === 'solutions' && dropdownContent('solutions')}
                            </li>
                            <li>
                                <button
                                    className="flex w-full justify-between items-center py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                    onMouseEnter={() => handleMouseEnter('caseStudies')}
                                >
                                    Case Studies
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {openDropdown === 'caseStudies' && dropdownContent('caseStudies')}
                            </li>
                            <li>
                                <button
                                    className="flex w-full justify-between items-center py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                    onMouseEnter={() => handleMouseEnter('hardware')}
                                >
                                    Hardware
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {openDropdown === 'hardware' && dropdownContent('hardware')}
                            </li>
                            {/*<li onMouseEnter={() => handleMouseEnter('support')}>*/}
                            {/*    <Link href="/support"*/}
                            {/*          className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">*/}
                            {/*        Support*/}
                            {/*    </Link>*/}
                            {/*    {openDropdown === 'support' && dropdownContent('support')}*/}
                            {/*</li>*/}
                            {/*<li onMouseEnter={() => handleMouseEnter('company')}>*/}
                            {/*    <Link href="/company"*/}
                            {/*          className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">*/}
                            {/*        Company*/}
                            {/*    </Link>*/}
                            {/*    {openDropdown === 'company' && dropdownContent('company')}*/}
                            {/*</li>    */}
                        </ul>
                        {/* 메뉴 오픈 시 Services 버튼을 맨 마지막에 추가 */}
                        {isMenuOpen && (
                            <div className="mt-4 md:hidden">
                                <a href="#"
                                   className="block text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                    Login
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
