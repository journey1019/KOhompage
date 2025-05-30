/** src/app/[locale]/hard/[slug]/page.tsx */
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import hardwareData from '@/data/hardware.json';
import PageHero from '@/components/PageHero';
import { Hardware } from '@/types/hardware';
import { notFound } from 'next/navigation';
import AllFilterReferenceCarousel from '@/components/(Resources)/AllFilterResourceCarousel';
import AllFilterHardwareCarousel from '@/components/(Hardware)/AllFilterHardwareCarousel';

const categoryStyles: Record<string, string> = {
    Device: "text-blue-600 bg-blue-100 border-blue-400",
    Antenna: "text-green-600 bg-green-100 border-green-400",
    Sensor: "text-orange-600 bg-orange-100 border-orange-400",
    Modem: "text-purple-600 bg-purple-100 border-purple-400",
    default: "text-gray-600 bg-gray-100 border-gray-400",
};


const HardwareDetailPage = () => {
    const params = useParams();
    const { locale, slug } = params;

    // Find the hardware matching the slug
    const hardware = hardwareData.find((item) => item.slug === slug) as Hardware | undefined;

    if (!hardware) {
        // Redirect to 404 if the hardware is not found
        notFound();
    }

    // Determine the category style
    const categoryStyle = categoryStyles[hardware.category] || categoryStyles.default;

    // tags, hideTag, solutionTag 문자열 → 배열 변환 (빈 문자열 체크 포함)
    const tagsArray = hardware.tags ? hardware.tags.split(',').map(t => t.trim()) : [];
    const hideTagArray = hardware.hideTag ? hardware.hideTag.split(',').map(t => t.trim()) : [];
    const solutionTagArray = hardware.solutionTag ? hardware.solutionTag.split(',').map(t => t.trim()) : [];


    return (
        <div className="bg-white">
            {/* Page Top Image */}
            <PageHero
                size="py-28"
                url={hardware.imageSrc || '/images/DefaultImage.png'}
                intro={hardware.title}
                title={hardware.subtitle || ''}
                subtitle=""
            />

            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Hardware Title and Description */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{hardware.title}</h1>
                <h2 className="text-2xl text-gray-600 mb-8">{hardware.subtitle}</h2>
                <p className="text-lg text-gray-700 mb-12">{hardware.description}</p>

                <div className="flex justify-between">
                    {/* Tags */}
                    {tagsArray.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tagsArray.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                    {tag}
                                </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Content */}
                    <div className="space-y-8 text-right">
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category</h3>
                            <p
                                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${categoryStyle}`}
                            >
                                {hardware.category}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resources */}
            <AllFilterReferenceCarousel keywords={[`${hardware.slug}` ]} />

            {/* MultiCarousel */}
            {/*<AllFilterHardwareCarousel keywords={[]} />*/}
        </div>
    );
};

export default HardwareDetailPage;
