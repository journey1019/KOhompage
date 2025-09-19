"use client";

import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";

type Variant = "sidebar" | "tabs";
export default function MyPageSidebar({ variant = "sidebar" }: { variant?: Variant }) {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: "주문내역/배송정보", path: "/ko/online-store/myPage/orders" },
        { label: "내 정보", path: "/ko/online-store/myPage/profile" },
    ];

    if (variant === "tabs") {
        // 모바일 가로 탭: 스크롤 가능, 터치 타깃 확대
        return (
            <nav className="relative -mx-2 overflow-x-auto">
                <div className="flex gap-2 px-2">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={classNames(
                                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium border transition-colors",
                                    isActive
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600"
                                )}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>
        );
    }

    // 데스크탑 좌측 사이드바
    return (
        <aside className="w-56 lg:w-64 min-h-[520px] lg:min-h-[600px] bg-gray-50 border border-gray-200 rounded-md py-6 px-3 lg:py-8 lg:px-4">
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={classNames(
                                "w-full text-left px-4 py-3 rounded-md font-medium transition-colors",
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
