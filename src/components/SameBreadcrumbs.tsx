import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string; // 경로 이름
    href?: string; // 링크 (없으면 현재 위치로 간주)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]; // Breadcrumb 경로 배열
    current: string; // 현재 활성화된 메뉴 (classification)
}

const SameBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items, current }) => {
    return (
        <nav className="w-full bg-zinc-100" aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto">
                <ol className="inline-flex items-center space-x-4 px-4 py-6">
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
                    {items
                        .filter((item) => item.label !== 'Resources') // Resources 제외
                        .map((item, index) => (
                            <li key={index} className="inline-flex items-center">
                                {item.href ? (
                                    <div className="flex items-center pl-4">
                                        <Link
                                            href={item.href}
                                            className={`inline-flex items-center text-md font-medium ${
                                                current ===
                                                item.label.toLowerCase() // 비교를 위해 소문자로 변환
                                                    ? 'text-red-500'
                                                    : 'text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-white'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
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