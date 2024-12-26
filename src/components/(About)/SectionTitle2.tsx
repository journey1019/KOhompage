import React from "react";
import { Container } from "@/components/(About)/Container";

interface SectionTitleProps {
    preTitle?: string;
    title?: string;
    children?: React.ReactNode;
}

export const SectionTitle2 = (props: Readonly<SectionTitleProps>) => {
    return (
        <Container
            className="flex w-full flex-col mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 items-center justify-center">
            {props.preTitle && (
                <div className="text-sm font-bold tracking-wider text-red-700 uppercase">
                    {props.preTitle}
                </div>
            )}

            <Container className="flex flex-row justify-between items-start w-full gap-12">
                {/* Title Section */}
                {props.title && (
                    <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                        {props.title}
                    </h2>
                )}

                {/* Children Section */}
                {props.children && (
                    <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300 text-right">
                        {props.children}
                    </p>
                )}
            </Container>
        </Container>
    );
};
