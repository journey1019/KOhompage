'use client';

import React from "react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalItems,
                                                   itemsPerPage,
                                                   onPageChange,
                                               }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null; // 페이지가 1개 이하인 경우 표시하지 않음

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {/* 이전 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm rounded-md ${
                    currentPage === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
                Previous
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm rounded-md ${
                        currentPage === index + 1
                            ? "bg-red-500 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm rounded-md ${
                    currentPage === totalPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
