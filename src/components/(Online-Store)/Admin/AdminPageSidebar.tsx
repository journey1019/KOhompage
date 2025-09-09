/** src/components/MyPageSidebar.tsx */
"use client";

import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";

const menuItems = [
    { label: "주문 내역/배송지 정보", path: "/ko/online-store/superAdmin/delivery" },
    { label: "취소/반품/교환/환불내역", path: "/ko/online-store/superAdmin/paid" },
    { label: "상품 정보", path: "/ko/online-store/superAdmin/product" },
    { label: "사용자 정보", path: "/ko/online-store/superAdmin/user" },
];

export default function AdminPageSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-[600px] bg-gray-50 border-r border-gray-200 py-8 px-4">
            <nav className="space-y-2">
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
