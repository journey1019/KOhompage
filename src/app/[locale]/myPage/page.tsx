"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PageHero from '@/components/PageHero';

export default function MyPage() {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("userToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/ko/login");
        }
    }, [router]);

    return (
        <section>
            <PageHero
                size="py-52"
                url="/images/shop/shop2.png"
                intro=""
                title="요금제 구매"
                subtitle=""
            />
            <h1>마이페이지</h1>
        </section>
    );
}
