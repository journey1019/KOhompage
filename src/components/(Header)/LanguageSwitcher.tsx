'use client'

import { useTranslation } from 'next-i18next';
import { GrLanguage } from 'react-icons/gr';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const switchLanguage = (lng: string) => {
        if (i18n.changeLanguage) {
            i18n.changeLanguage(lng);
        }
    }

    // const router = useRouter();
    // const { locale, pathname, query } = router;
    //
    // const switchLanguage = (lang: string) => {
    //     router.push({ pathname, query }, undefined, { locale: lang });
    // };

    return (
        <div>
            {/*<button id="theme-language" type="button"*/}
            {/*        className="text-center justify-center items-center hover:bg-gray-100 dark:hover:bg-gay-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full p-1">*/}
            {/*    <GrLanguage />*/}
            {/*</button>*/}
            <div className="flex items-center">
                <button
                    onClick={() => {
                        switchLanguage('ko');
                        // console.log('korea');
                    }}
                    className="text-gray-800 dark:text-white p-2"
                >
                    Korean
                </button>
                <button
                    onClick={() => {
                        switchLanguage('en');
                        // console.log('english')
                    }}
                    className="text-gray-800 dark:text-white p-2"
                >
                    English
                </button>

                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    <GrLanguage className="ml-2" />
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div id="dropdownNavbar"
                     className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                한국어
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                English
                            </a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Sign out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}