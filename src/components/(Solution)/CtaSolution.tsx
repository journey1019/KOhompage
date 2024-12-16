import React from "react";
import { Container } from "@/components/Container";

interface CtaProps {
    items: { title: string; subTitle: string; button: string; button2: string; }
}

export const CtaSolution:React.FC<CtaProps> = ({ items }) => {
    return (
        <Container>
            <div
                className="flex flex-wrap items-center justify-between w-full max-w-7xl gap-5 mx-auto text-white bg-gray-900 p-7 lg:p-12 lg:flex-nowrap rounded-xl">
                <div className="flex-grow text-center lg:text-left">
                    <h2 className="text-2xl font-medium lg:text-3xl">
                        {items.title}
                    </h2>
                    <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
                        {items.subTitle}
                    </p>
                </div>
                <div className="flex-shrink-0 w-full text-center lg:w-auto">
                    <a
                        href="/contact-us"
                        target="_blank"
                        rel="noopener"
                        className="inline-block py-3 mx-auto text-lg font-medium text-center text-gray-900 bg-white rounded-md px-7 lg:px-10 lg:py-5 hover:bg-red-800 hover:text-white hover:border-2 hover:border-gray-50"
                    >
                        {items.button}
                    </a>
                </div>
                <div className="flex-shrink-0 w-full text-center lg:w-auto">
                    <a
                        href="https://reeferconnect.tms-orbcomm.com/"
                        target="_blank"
                        rel="noopener"
                        className="inline-block py-3 mx-auto text-lg font-medium text-center text-white bg-red-700 rounded-md px-7 lg:px-10 lg:py-5 hover:bg-white hover:text-red-800 hover:border-2 hover:border-red-700"
                    >
                        {items.button2}
                    </a>
                </div>
            </div>
        </Container>
    );
};
