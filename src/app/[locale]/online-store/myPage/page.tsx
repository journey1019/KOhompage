"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MyPage() {
    const router = useRouter();

    // useEffect(() => {
    //     const token = sessionStorage.getItem("userToken");
    //     if (!token) {
    //         alert("로그인이 필요합니다.");
    //         router.push("/ko/online-store/login");
    //     }
    // }, [router]);
    // useEffect(() => {
    //     router.push('myPage/orders')
    // }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">3개월 주문내역 / 배송정보</h2>

        </div>
    );
}
