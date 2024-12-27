"use client";

import Link from "next/link";

export default function SolutionsPage() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Solutions</h1>
            <p className="mb-4">Explore our solutions:</p>
            <ul className="list-disc pl-6">
                <li>
                    <Link href="/ko/solutions/ais" className="text-blue-500 hover:underline">
                        AIS Solutions
                    </Link>
                </li>
                <li>
                    <Link href="/ko/solutions/container-iot" className="text-blue-500 hover:underline">
                        Container IoT
                    </Link>
                </li>
                <li>
                    <Link href="/ko/solutions/global-iot" className="text-blue-500 hover:underline">
                        Global IoT
                    </Link>
                </li>
                <li>
                    <Link href="/ko/solutions/satellite" className="text-blue-500 hover:underline">
                        Satellite Solutions
                    </Link>
                </li>
            </ul>
        </div>
    );
}
