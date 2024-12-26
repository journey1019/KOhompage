import React from "react";
import { Container } from "@/components/Container";

interface CtaProps {
    items: { imageUrl: string; title: string; subTitle: string; button: string; solutionButton: string; solutionUrl: string; };
}

export const CtaSolution: React.FC<CtaProps> = ({ items }) => {
    return (
        <Container>
            <div
                className="relative flex flex-wrap items-center justify-between w-full max-w-7xl gap-5 mx-auto text-white p-7 lg:p-12 lg:flex-nowrap rounded-xl"
                style={{
                    backgroundImage: `url(${items.imageUrl})`, // Fixed closing brace
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-xl"></div>

                {/* Content */}
                <div className="relative flex-grow text-center lg:text-left">
                    <h2 className="text-2xl font-medium lg:text-3xl">
                        {items.title}
                    </h2>
                    <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
                        {items.subTitle}
                    </p>
                </div>

                {/* Button 1 */}
                <div className="relative flex-shrink-0 w-full text-center lg:w-auto">
                    <a
                        href="/contact-us"
                        target="_blank"
                        rel="noopener"
                        className="inline-block py-3 mx-auto text-lg font-medium text-center text-gray-900 bg-white rounded-md px-7 lg:px-10 lg:py-5 hover:bg-red-800 hover:text-white hover:border-2 hover:border-gray-50"
                    >
                        {items.button}
                    </a>
                </div>

                {/* Button 2 */}
                <div className="relative flex-shrink-0 w-full text-center lg:w-auto">
                    <a
                        href={items.solutionUrl}
                        target="_blank"
                        rel="noopener"
                        className="inline-block py-3 mx-auto text-lg font-medium text-center text-white bg-red-700 rounded-md px-7 lg:px-10 lg:py-5 hover:bg-white hover:text-red-800 hover:border-2 hover:border-red-700"
                    >
                        {items.solutionButton}
                    </a>
                </div>
            </div>
        </Container>
    );
};
