'use client';

import { useTranslations } from 'next-intl';

interface SolutionsProps {
    locale: string;
}

export default function Solutions({ locale }: SolutionsProps) {
    const t = useTranslations('solutions'); // Ensure 'solutions.json' is set up in your locales

    const solutions = [
        { slug: 'container-iot', key: 'container-iot' },
        { slug: 'global-iot', key: 'global-iot' },
        { slug: 'satellite', key: 'satellite' },
        { slug: 'ais', key: 'ais' },
    ];

    return (
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div
                id="mega-menu-full-dropdown"
                className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
            >
                <div className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                    {solutions.map((solution) => (
                        <ul key={solution.slug}>
                            <li>
                                <a
                                    href={`/${locale}/solutions/${solution.slug}`}
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
                                        <div className="font-semibold pt-5">{t(`${solution.key}.title`)}</div>
                                        <div className="text-sm pt-2 text-gray-400">{t(`${solution.key}.description`)}</div>
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
