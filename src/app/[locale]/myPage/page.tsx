"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MyPage() {
    const router = useRouter();

    // useEffect(() => {
    //     const token = sessionStorage.getItem("userToken");
    //     if (!token) {
    //         alert("로그인이 필요합니다.");
    //         router.push("/ko/login");
    //     }
    // }, [router]);

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">마이페이지 메인</h2>
            <p>여기에 선택된 페이지의 콘텐츠가 표시됩니다.</p>
        </>
    );
}
