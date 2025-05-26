'use client';

import React, { useEffect, useState } from 'react';
import { FilterOptions } from "@/service/hardware/hardwareData";
import { GoPlus } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { IoInformation } from 'react-icons/io5';

interface FiltersHardwareProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    totalResourcesCount: number; // 전체 게시글 개수
    isAdmin?: boolean; // 관리자 여부 (기본값 false)
}
interface FilterOption {
    type: string;
    label: string;
}
const FiltersHardware: React.FC<FiltersHardwareProps> = ({ filters, onFilterChange, totalResourcesCount, isAdmin = false }) => {
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);
    const [networkOptions, setNetworkOptions] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/hardware/filter-options')
            .then(res => res.json())
            .then((options: FilterOption[]) => {
                setCategoryOptions(options.filter((opt) => opt.type === 'categoryOptions').map((opt) => opt.label));
                setTypeOptions(options.filter((opt) => opt.type === 'typeOptions').map((opt) => opt.label));
                setNetworkOptions(options.filter((opt) => opt.type === 'networkOptions').map((opt) => opt.label));
            });
    }, []);


    const handleCheckboxChange = (type: keyof FilterOptions, value: string) => {
        const updatedFilters = { ...filters };
        const currentValues = filters[type] || [];
        updatedFilters[type] = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];
        onFilterChange(updatedFilters);
    };

    const handleAddOption = async (type: 'categoryOptions' | 'typeOptions' | 'networkOptions', label: string) => {
        const res = await fetch('/api/hardware/filter-options', {
            method: 'POST',
            body: JSON.stringify({ type, label }),
            headers: { 'Content-Type': 'application/json' },
        });
        const newOption = await res.json();

        if (type === 'categoryOptions') {
            setCategoryOptions(prev => [...prev, newOption.label]);
        } else if (type === 'typeOptions') {
            setTypeOptions(prev => [...prev, newOption.label]);
        } else {
            setNetworkOptions(prev => [...prev, newOption.label]);
        }
    };

    const handleDeleteOption = async (type: 'categoryOptions' | 'typeOptions' | 'networkOptions', label: string) => {
        if (!confirm(`'${label}' 항목을 삭제하시겠습니까?`)) return;

        const res = await fetch('/api/hardware/filter-options', {
            method: 'DELETE',
            body: JSON.stringify({ type, label }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            if (type === 'categoryOptions') {
                setCategoryOptions(prev => prev.filter(item => item !== label));
            } else if (type === 'typeOptions') {
                setTypeOptions(prev => prev.filter(item => item !== label));
            } else {
                setNetworkOptions(prev => prev.filter(item => item !== label));
            }
        } else {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <div className="flex flex-row items-center space-x-4">
                <h2 className="items-center text-xl maxWeb:text-2xl font-semibold mb-2">Filters</h2>
                {/* 활성화/비활성화 검색 방법 안내*/}
                {isAdmin && (
                    <Tooltip title="'true/false'를 입력하면, Hardware 페이지 노출 여부로 필터링됩니다."
                             className="flex flex-row items-center">
                        <IoInformation className="bg-gray-100 rounded-full p-1 w-5 h-5 hover:bg-gray-200" />
                    </Tooltip>
                )}
            </div>
            <p className="text-gray-600 mb-4 text-base maxWeb:text-lg">{totalResourcesCount} hardware found</p>

            {/* Categories 필터 */}
            <div className="mb-4 maxWeb:mb-6">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Category</h3>
                {categoryOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2 text-base maxWeb:text-lg">
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={filters.categories?.includes(type) || false}
                                onChange={() => handleCheckboxChange('categories', type)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <span>{type}</span>
                        </label>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteOption('categoryOptions', type)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="삭제"
                            >
                                <MdOutlineClose className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}

                {/* Content Type 추가 버튼 */}
                {isAdmin && (
                    <button
                        className="bg-gray-300 rounded-full p-1"
                        onClick={() => {
                            const label = prompt('새 Category Option 을 입력하세요');
                            if (label) handleAddOption('categoryOptions', label);
                        }}
                    >
                        <GoPlus className="w-3 h-3" />
                    </button>
                )}
                {/*{CATEGORY_OPTIONS.map((category) => (*/}
                {/*    <label key={category} className="flex items-center space-x-2 text-base maxWeb:text-lg cursor-pointer">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            checked={filters.categories?.includes(category) || false}*/}
                {/*            onChange={() => handleCheckboxChange('categories', category)}*/}
                {/*            className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"*/}
                {/*        />*/}
                {/*        <span>{category}</span>*/}
                {/*    </label>*/}
                {/*))}*/}
            </div>

            {/* Types 필터 */}
            <div className="mb-4 maxWeb:mb-6">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Type</h3>
                {typeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2 text-base maxWeb:text-lg">
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={filters.types?.includes(type) || false}
                                onChange={() => handleCheckboxChange('types', type)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <span>{type}</span>
                        </label>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteOption('typeOptions', type)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="삭제"
                            >
                                <MdOutlineClose className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}

                {/* Type Type 추가 버튼 */}
                {isAdmin && (
                    <button
                        className="bg-gray-300 rounded-full p-1"
                        onClick={() => {
                            const label = prompt('새 Type Option 을 입력하세요');
                            if (label) handleAddOption('typeOptions', label);
                        }}
                    >
                        <GoPlus className="w-3 h-3" />
                    </button>
                )}

                {/*{TYPE_OPTIONS.map((type) => (*/}
                {/*    <label key={type} className="flex items-center space-x-2 text-base maxWeb:text-lg cursor-pointer">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            checked={filters.types?.includes(type) || false}*/}
                {/*            onChange={() => handleCheckboxChange('types', type)}*/}
                {/*            className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"*/}
                {/*        />*/}
                {/*        <span>{type}</span>*/}
                {/*    </label>*/}
                {/*))}*/}
            </div>

            {/* Networks 필터 */}
            <div className="mb-4 maxWeb:mb-6">
                <h3 className="font-semibold text-base maxWeb:text-lg xl:mb-1">Network</h3>
                {networkOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2 text-base maxWeb:text-lg">
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={filters.networks?.includes(type) || false}
                                onChange={() => handleCheckboxChange('networks', type)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <span>{type}</span>
                        </label>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteOption('networkOptions', type)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="삭제"
                            >
                                <MdOutlineClose className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}

                {/* Network Type 추가 버튼 */}
                {isAdmin && (
                    <button
                        className="bg-gray-300 rounded-full p-1"
                        onClick={() => {
                            const label = prompt('새 Network Option 을 입력하세요');
                            if (label) handleAddOption('networkOptions', label);
                        }}
                    >
                        <GoPlus className="w-3 h-3" />
                    </button>
                )}

                {/*{NETWORK_OPTIONS.map((network) => (*/}
                {/*    <label key={network} className="flex items-center space-x-2 text-base maxWeb:text-lg cursor-pointer">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            checked={filters.networks?.includes(network) || false}*/}
                {/*            onChange={() => handleCheckboxChange('networks', network)}*/}
                {/*            className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"*/}
                {/*        />*/}
                {/*        <span>{network}</span>*/}
                {/*    </label>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

export default FiltersHardware;
