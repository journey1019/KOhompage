import React from "react";
import { Container } from "@/components/(About)/Container";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  length?: number; // Optional length prop to control styles
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
  const maxWidthClass = props.length && props.children && props.length > 2 ? "max-w-3xl" : "max-w-2xl";
  return (
      <Container
          className={`flex w-full flex-col mt-4 ${
              props.align === "left" ? "" : "items-center justify-center text-center"
          }`}>
        {props.preTitle && (
            <div className="text-sm font-bold tracking-wider text-red-700 uppercase">
              {props.preTitle}
            </div>
        )}

        {props.title && (
            <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {props.title}
            </h2>
        )}

        {props.children && (
            <p
                className={`${maxWidthClass} py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300`}
            >
              {props.children}
            </p>
        )}
      </Container>
  );
};
