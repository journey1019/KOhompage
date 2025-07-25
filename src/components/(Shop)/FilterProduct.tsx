import { FilterOptions } from '@/service/shop/shopData';
import React, { useEffect, useState } from 'react';

interface FiltersProductsProps {
    filters: FilterOptions,
    onFilterChange: (filters: FilterOptions) => void;
    totalProductCount: number; // 전체 게시글 개수
    isAdmin?: boolean; // 관리자 여부 (기본값 false)
}
interface FilterOption {
    type: string;
    label: string;
}

const FilterProduct: React.FC<FiltersProductsProps> = ({ filters, onFilterChange, totalProductCount, isAdmin = false}) => {
    const [contentTypes, setContentTypes] = useState<string[]>([]);
    const [solutions, setSolutions] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/')
            .then(res => res.json())
            .then((options: FilterOption[]) => {
                setContentTypes(options.filter((opt) => opt.type === 'contentType').map((opt) => opt.label));
                setSolutions(options.filter((opt) => opt.type === 'solution').map((opt) => opt.label));
            });
    }, []);

    return(
        <></>
    )
}

export default FilterProduct;