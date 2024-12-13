import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string; // 경로 이름
    href?: string; // 링크 (없으면 현재 위치로 간주)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]; // Breadcrumb 경로 배열
    current: string; // 현재 활성화된 메뉴
}

const SameBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items, current }) => {
    return (
        <>
            {/* Fixed Breadcrumbs */}
            <nav
                className="fixed top-16 left-0 w-full bg-gray-100 border-b z-50"
                style={{ height: '48px' }}
                aria-label="Breadcrumb"
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center h-full">
                    <ol className="inline-flex items-center space-x-4">
                        {/* Resources는 항상 고정된 스타일 */}
                        <li className="inline-flex items-center">
                            <div className="flex items-center">
                            <span className="text-md font-medium text-gray-600 dark:text-gray-400">
                                Resources
                            </span>
                            </div>
                        </li>

                        {/* 상하 직선 추가 */}
                        <li className="inline-flex items-center">
                            <svg
                                className="text-gray-400 mx-2"
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
                                    d="M1 0 L1 16"
                                />
                            </svg>
                        </li>

                        {/* 나머지 메뉴들 */}
                        {items.map((item, index) => (
                            <li key={index} className="inline-flex items-center">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={`inline-flex items-center text-md font-medium pr-3 ${
                                            current === item.label.toLowerCase()
                                                ? 'text-red-500'
                                                : 'text-gray-600 hover:text-red-600'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-sm font-medium text-red-500">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>

            {/* Spacer to avoid overlapping */}
            <div style={{ height: '38px' }} />
        </>
    );
};

export default SameBreadcrumbs;
