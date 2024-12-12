import React from "react";
import Image from "next/image";
import { ArrowDownOnSquareIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface BlogCardProps {
    title: string;
    description: string;
    images: string;
    path: string;
    form: "link" | "pdf";
    tags: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, images, path, form, tags }) => {
    const handleOpenPDF = () => {
        if (form === "pdf") {
            window.open(path, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="flex flex-col justify-between border rounded-lg p-4 shadow-lg hover:shadow-xl h-full">
            <div>
                {/* Image */}
                <Image
                    src={images}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={500}
                    height={300}
                    unoptimized
                />

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600">{description}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
              {tag}
            </span>
                    ))}
                </div>
            </div>

            {/* Form Buttons */}
            <div className="mt-4">
                {form === "link" ? (
                    <a
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row group items-center justify-end text-red-500 hover:underline text-end pr-2"
                    >
                        View More
                        <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-5 w-5 ml-2" />
                    </a>
                ) : (
                    <button
                        onClick={handleOpenPDF}
                        className="flex flex-row group w-full items-center justify-end text-red-500 hover:underline text-end pr-2"
                    >
                        Open PDF
                        <ArrowDownOnSquareIcon aria-hidden="true" className="h-5 w-5 ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
