'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-6">
                This page could not be found.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sorry, we couldn&apos;t find the page you were looking for.
            </p>
            <Link href="/">
                <a className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
                    Go to Homepage
                </a>
            </Link>
        </div>
    );
}
