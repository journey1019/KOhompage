import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/(About)/Container";



export function Footer({locale}: {locale: string}) {
    const solutions = [
        { title: "Container IoT", href: "container-iot" },
        { title: "Global IoT", href: "global-iot" },
        { title: "Satellite", href: "satellite" },
        { title: "AIS", href: "ais" },
    ];

    const legal = [
        { title: "Hardware", href: "hardware" },
        { title: "Case Studies", href: "case-studies" },
    ];

    const etc = [
        { title: "Company", href: "company" },
        { title: "Support", href: "support" },
        { title: "Resources", href: "resources" },
    ];

    return (
        <div className="relative">
            <Container>
                <div
                    className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div>
                            {' '}
                            <Link
                                href={`/${locale}`}
                                className="flex items-center space-x-2 text-2xl font-medium text-red-800 dark:text-gray-100"
                            >
                                <Image
                                    src="/images/ko_logo.png"
                                    alt="N"
                                    width="32"
                                    height="32"
                                    className="w-8"
                                    unoptimized
                                />
                                <Image
                                    src="/images/KO_SmallLogo.png"
                                    alt="/images/KO_SmallLogo.png"
                                    width="32"
                                    height="32"
                                    className="w-36"
                                    unoptimized
                                />
                                {/*<span>Nextly</span>*/}
                            </Link>
                        </div>

                        <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
                            Nextly is a free landing page & marketing website template for
                            startups and indie projects. Its built with Next.js & TailwindCSS.
                            And its completely open-source.
                        </div>

                        <div className="mt-5">
                            <a
                                href="https://ko-hompage-4i450xcr4-jihyeons-projects-55215b2b.vercel.app/en"
                                target="_blank"
                                rel="noopener"
                                className="relative block w-44"
                            >
                                <Image
                                    src="/images/about/vercel.svg"
                                    alt="Powered by Vercel"
                                    width="212"
                                    height="44"
                                />
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            <span className="w-full px-4 py-2 text-gray-800 rounded-md">Solutions</span>
                            {solutions.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${locale}/solutions/${item.href}`}
                                    className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-red-800 focus:text-red-800 focus:bg-red-100 focus:outline-none dark:focus:bg-trueGray-700"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {legal.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${locale}/${item.href}`}
                                    className="w-full px-4 py-2 text-gray-800 rounded-md dark:text-gray-300 hover:text-red-800 focus:text-red-800 focus:bg-red-100 focus:outline-none dark:focus:bg-trueGray-700"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {etc.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${locale}/${item.href}`}
                                    className="w-full px-4 py-2 text-gray-800 rounded-md dark:text-gray-300 hover:text-red-800 focus:text-red-800 focus:bg-red-100 focus:outline-none dark:focus:bg-trueGray-700"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
                    Copyright © {new Date().getFullYear()}. {' '}
                    <a href="https://www.orbcomm.co.kr/" target="_blank" rel="noopener">
                        KOREA ORBCOMM™
                    </a>{' '}
                    All Rights{' '}
                    <a href="https://www.orbcomm.co.kr/" target="_blank" rel="noopener ">
                        Reserved.
                    </a>
                </div>
            </Container>
            {/* Do not remove this */}
            <Backlink />
        </div>
    );
}

const Backlink = () => {
    return (
        <a
            href="https://web3templates.com"
            target="_blank"
            rel="noopener"
            className="absolute flex px-3 py-1 space-x-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded shadow-sm place-items-center left-5 bottom-5 dark:bg-trueGray-900 dark:border-trueGray-700 dark:text-trueGray-300"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="30" height="29.5385" rx="2.76923" fill="#362F78" />
                <path
                    d="M10.14 21.94H12.24L15.44 12.18L18.64 21.94H20.74L24.88 8H22.64L19.58 18.68L16.36 8.78H14.52L11.32 18.68L8.24 8H6L10.14 21.94Z"
                    fill="#F7FAFC"
                />
            </svg>

            <span>Web3Templates</span>
        </a>
    );
};