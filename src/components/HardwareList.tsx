// components/HardwareList.tsx
import React from 'react';

interface HardwareItem {
    title: string;
    description: string;
    brochure: string;
    devkit: string;
    category: string;
    tag: string[];
    path: string;
    featured: boolean;
}

interface HardwareListProps {
    items: HardwareItem[];
}

const HardwareList: React.FC<HardwareListProps> = ({ items }) => {
    if (items.length === 0) {
        return <p>No hardware found matching your criteria.</p>;
    }

    return (
        <ul>
            {items.map((item) => (
                <li key={item.path} className="border p-4 rounded-md shadow-md mb-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="mt-2">
                        <span className="text-sm text-gray-600">Tags: </span>
                        {item.tag.map((tag) => (
                            <span key={tag} className="text-blue-500 mr-2">{tag}</span>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default HardwareList;
