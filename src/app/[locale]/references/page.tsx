'use client';

import { useState, useEffect } from "react";
import {
    getAllResources,
    getFilteredResourcesByQueryAndFilters,
    FilterOptions,
} from "@/service/references/referencesData";
import ResourceCard from "@/components/(Resources)/ResourceCard";
import SearchBar from '@/components/(Resources)/SearchBar';
import FiltersResources from '@/components/(Resources)/FiltersResources';

const ReferencesPage = () => {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [filters, setFilters] = useState<FilterOptions>({}); // 필터 상태
    const [resources, setResources] = useState(getAllResources()); // 초기 데이터

    useEffect(() => {
        const filteredResources = getFilteredResourcesByQueryAndFilters(searchQuery, filters);
        setResources(filteredResources);
    }, [searchQuery, filters]);

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Resources</h1>
            <SearchBar onSearch={setSearchQuery} /> {/* 검색어 전달 */}
            <FiltersResources onFilterChange={setFilters} /> {/* 필터 전달 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {resources.length > 0 ? (
                    resources.map((post) => <ResourceCard key={post.path} {...post} />)
                ) : (
                    <p className="text-gray-500">No resources match your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default ReferencesPage;
