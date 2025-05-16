'use client';

import React, { useEffect, useState } from 'react';
import { FilterOptions } from "@/service/resources/resourceData";
import { GoPlus } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";


interface FiltersResourcesProps {
    filters: FilterOptions,
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
    isAdmin?: boolean; // 관리자 여부 (기본값 false)
}

const FilterResource: React.FC<FiltersResourcesProps> = ({ filters, onFilterChange, totalResourcesCount, isAdmin = false}) => {
    const [contentTypes, setContentTypes] = useState<string[]>([]);
    const [solutions, setSolutions] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/resource/filter-options')
            .then(res => res.json())
            .then((options) => {
                setContentTypes(options.filter((opt) => opt.type === 'contentType').map((opt) => opt.label));
                setSolutions(options.filter((opt) => opt.type === 'solution').map((opt) => opt.label));
            });
    }, []);

    const handleCheckboxChange = (
        category: "contentType" | "form" | "solutions",
        value: string
    ) => {
        const updateValues = (currentValues: string[] = [], newValue: string) => {
            return currentValues.includes(newValue)
                ? currentValues.filter((item) => item !== newValue)
                : [...currentValues, newValue];
        };

        const updatedFilters: FilterOptions = { ...filters };

        // 필터 항목 업데이트
        if (category === "contentType") {
            updatedFilters.contentType = updateValues(filters.contentType, value);
        } else if (category === "form") {
            updatedFilters.form = updateValues(filters.form, value);
        } else if (category === "solutions") {
            updatedFilters.solutions = updateValues(filters.solutions, value);
        }

        onFilterChange(updatedFilters); // 상위 컴포넌트로 업데이트된 필터 전달
    };

    const handleAddOption = async (type: 'contentType' | 'solution', label: string) => {
        const res = await fetch('/api/resource/filter-options', {
            method: 'POST',
            body: JSON.stringify({ type, label }),
            headers: { 'Content-Type': 'application/json' },
        });
        const newOption = await res.json();

        if (type === 'contentType') {
            setContentTypes(prev => [...prev, newOption.label]);
        } else {
            setSolutions(prev => [...prev, newOption.label]);
        }
    };

    const handleDeleteOption = async (type: 'contentType' | 'solution', label: string) => {
        if (!confirm(`'${label}' 항목을 삭제하시겠습니까?`)) return;

        const res = await fetch('/api/resource/filter-options', {
            method: 'DELETE',
            body: JSON.stringify({ type, label }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            if (type === 'contentType') {
                setContentTypes(prev => prev.filter(item => item !== label));
            } else {
                setSolutions(prev => prev.filter(item => item !== label));
            }
        } else {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };



    return (
        <div className="mb-4">
            <h2 className="text-xl maxWeb:text-2xl font-semibold mb-2">Filters</h2>
            <p className="text-gray-600 mb-4 text-base maxWeb:text-lg">{totalResourcesCount} resources found</p>

            {/* Content Type 필터 */}
            <div className="mb-4 maxWeb:mb-6">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Content Type</h3>
                {contentTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 text-base maxWeb:text-lg">
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={filters.contentType?.includes(type) || false}
                                onChange={() => handleCheckboxChange('contentType', type)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <span>{type}</span>
                        </label>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteOption('contentType', type)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="삭제"
                            >
                                <MdOutlineClose className="w-5 h-5"/>
                            </button>
                        )}
                    </div>
                ))}

                {/* Content Type 추가 버튼 */}
                {isAdmin && (
                    <button
                        className="bg-gray-300 rounded-full p-1"
                        onClick={() => {
                            const label = prompt('새 Content Type을 입력하세요');
                            if (label) handleAddOption('contentType', label);
                        }}
                    >
                        <GoPlus className="w-3 h-3" />
                    </button>
                )}

            </div>


            {/* Form 필터 (주석 제거 시 사용 가능) */}
            {/* <div className="mb-4">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Form</h3>
                {["link", "pdf", "page"].map((type) => (
                    <label
                        key={type}
                        className="flex items-center space-x-2 text-base maxWeb:text-lg cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={filters.form?.includes(type) || false}
                            onChange={() => handleCheckboxChange("form", type)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div> */}

            {/* Solutions 필터 */}
            <div className="mb-4 maxWeb:mb-6">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Solutions</h3>
                {solutions.map((solution) => (
                    <div key={solution} className="flex items-center space-x-2 text-base maxWeb:text-lg">
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={filters.solutions?.includes(solution) || false}
                                onChange={() => handleCheckboxChange('solutions', solution)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <span>{solution}</span>
                        </label>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteOption('solution', solution)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="삭제"
                            >
                                <MdOutlineClose className="w-5 h-5"/>
                            </button>
                        )}
                    </div>
                ))}

                {/* Solutions 추가 버튼 */}
                {isAdmin && (
                    <button
                        className="bg-gray-300 rounded-full p-1"
                        onClick={() => {
                            const label = prompt('새 Solution을 입력하세요');
                            if (label) handleAddOption('solution', label);
                        }}
                    >
                        <GoPlus className="w-3 h-3" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterResource;
