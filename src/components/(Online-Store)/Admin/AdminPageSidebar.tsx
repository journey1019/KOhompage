/** src/components/MyPageSidebar.tsx */
"use client";

import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";

const menuItems = [
    { label: "주문 내역/배송지 정보", path: "/ko/online-store/superAdmin/paid" },
    // { label: "주문 내역/배송지 정보", path: "/ko/online-store/superAdmin/delivery" },
    // { label: "취소/반품/교환/환불내역", path: "/ko/online-store/superAdmin/paid" },
    { label: "상품 정보", path: "/ko/online-store/superAdmin/product" },
    { label: "사용자 정보", path: "/ko/online-store/superAdmin/user" },
];

export default function AdminPageSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <aside
            className={classNames(
                // 모바일: 가로 탭 바 | md↑: 기존 세로 사이드바
                "w-full md:w-64",
                "bg-gray-50 border-gray-200",
                "md:border-r md:min-h-[600px]",
                "md:py-8 md:px-4",
                "border-b md:border-b-0" // 모바일에서 상단 구분선
            )}
        >
            {/* 모바일 탭 바: 가로 스크롤 */}
            <nav
                className={classNames(
                    "md:hidden",
                    "flex items-center gap-2 px-2 py-3",
                    "overflow-x-auto overscroll-x-contain touch-pan-x",
                    "scrollbar-thin"
                )}
            >
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={classNames(
                                "shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-600"
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* 데스크톱: 세로 메뉴 */}
            <nav className="hidden md:block space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={classNames(
                                "w-full text-left px-4 py-3 rounded-md font-medium transition-colors whitespace-nowrap",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}

