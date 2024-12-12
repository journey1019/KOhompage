import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string; // 경로 이름
    href?: string; // 링크 (없으면 현재 위치로 간주)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]; // Breadcrumb 경로 배열
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="w-full bg-zinc-100" aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse px-4 py-2">
                    {items.map((item, index) => (
                        <li key={index} className="inline-flex items-center">
                            {item.href ? (
                                <div className="flex items-center">
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center text-md font-medium text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {index === 0 && (
                                            <svg
                                                className="w-3 h-3 me-2.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                            </svg>
                                        )}
                                        {item.label}
                                    </Link>
                                    {index < items.length - 1 && (
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        {item.label}
                                    </span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
