'use client';

import React, { useState } from "react";

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
    const maxVisiblePages = 5; // 한 번에 표시할 최대 페이지 수
    const [currentGroup, setCurrentGroup] = useState(1); // 현재 페이지 그룹

    if (totalPages <= 1) return null; // 페이지가 1개 이하인 경우 표시하지 않음

    const totalGroups = Math.ceil(totalPages / maxVisiblePages); // 총 그룹 수
    const startPage = (currentGroup - 1) * maxVisiblePages + 1;
    const endPage = Math.min(currentGroup * maxVisiblePages, totalPages);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    const goToNextGroup = () => {
        if (currentGroup < totalGroups) setCurrentGroup(currentGroup + 1);
    };

    const goToPreviousGroup = () => {
        if (currentGroup > 1) setCurrentGroup(currentGroup - 1);
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {/* 이전 그룹 버튼 */}
            {currentGroup > 1 && (
                <button
                    onClick={goToPreviousGroup}
                    className="px-4 py-2 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Previous
                </button>
            )}

            {/* 페이지 번호 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const page = startPage + index;
                return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 text-sm rounded-md ${
                            currentPage === page
                                ? "bg-red-500 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* 다음 그룹 버튼 */}
            {currentGroup < totalGroups && (
                <button
                    onClick={goToNextGroup}
                    className="px-4 py-2 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
