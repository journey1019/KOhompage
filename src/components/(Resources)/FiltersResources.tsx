'use client';

import React, { useState } from 'react';
import { FilterOptions } from "@/service/references/referencesData";

interface FiltersResourcesProps {
    onFilterChange: (filters: FilterOptions) => void;
}

const FiltersResources: React.FC<FiltersResourcesProps> = ({ onFilterChange }) => {
    const [contentType, setContentType] = useState<string[]>([]);
    const [form, setForm] = useState<string[]>([]);
    const [solutions, setSolutions] = useState<string[]>([]);

    const handleCheckboxChange = (
        category: "contentType" | "form" | "solutions",
        value: string
    ) => {
        const updateValues = (currentValues: string[], newValue: string) => {
            return currentValues.includes(newValue)
                ? currentValues.filter((item) => item !== newValue)
                : [...currentValues, newValue];
        };

        if (category === "contentType") {
            const updatedContentType = updateValues(contentType, value);
            setContentType(updatedContentType);
            onFilterChange({ contentType: updatedContentType, form, solutions });
        } else if (category === "form") {
            const updatedForm = updateValues(form, value);
            setForm(updatedForm);
            onFilterChange({ contentType, form: updatedForm, solutions });
        } else if (category === "solutions") {
            const updatedSolutions = updateValues(solutions, value);
            setSolutions(updatedSolutions);
            onFilterChange({ contentType, form, solutions: updatedSolutions });
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            {/* Content Type */}
            <div className="mb-4">
                <h3 className="font-semibold">Content Type</h3>
                {["Video", "Brochure", "Datasheet"].map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={contentType.includes(type)}
                            onChange={() => handleCheckboxChange("contentType", type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Form */}
            <div className="mb-4">
                <h3 className="font-semibold">Form</h3>
                {["link", "pdf"].map((type) => (
                    <label key={type} className="block">
                        <input
                            type="checkbox"
                            checked={form.includes(type)}
                            onChange={() => handleCheckboxChange("form", type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Solutions */}
            <div className="mb-4">
                <h3 className="font-semibold">Solutions</h3>
                {["Container-IoT", "Global-IoT", "Satellite", "AIS"].map((solution) => (
                    <label key={solution} className="block">
                        <input
                            type="checkbox"
                            checked={solutions.includes(solution)}
                            onChange={() => handleCheckboxChange("solutions", solution)}
                            className="mr-2"
                        />
                        {solution}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FiltersResources;
