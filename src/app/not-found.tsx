import React from 'react';
import Navbar from '@/components/(Header)/example/Navbar';
import { Footer } from "@/components/(Header)/Footer";

export default function NotFound() {
    return (
        <section className="relative w-full h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar locale="ko" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-74px)] pt-[74px] px-5">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 items-center">PAGE NOT FOUND</h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center">
                    KOREA ORBCOMM couldn&apos;t find the page you&apos;re looking for.
                    <br />
                    Try starting over from Home.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                >
                    Back to Home
                </a>
            </div>

            {/* Footer */}
            <Footer locale="ko" />
        </section>
    );
}
