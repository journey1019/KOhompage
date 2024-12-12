import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string; // 경로 이름
    href?: string; // 링크 (없으면 현재 위치로 간주)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]; // Breadcrumb 경로 배열
}

const SameBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="w-full bg-zinc-100" aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse px-4 py-6">
                    {items.map((item, index) => (
                        <li key={index} className="inline-flex items-center">
                            {item.href ? (
                                <div className="flex items-center pl-3">
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center text-md font-medium text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                    {index < items.length - 1 && (
                                        <svg
                                            className="rtl:rotate-180 text-gray-400 ml-4 mr-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 2 16"
                                            style={{ height: '1em' }}
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                d="M1 0 L1 16" // 상단부터 하단까지 직선
                                            />
                                        </svg>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="ms-1 text-sm font-medium text-red-500 md:ms-2 dark:text-red-400">
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

export default SameBreadcrumbs;
