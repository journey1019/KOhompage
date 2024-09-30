// components/CaseStudies.tsx
'use client';

import { useEffect, useState } from 'react';
import { Case } from '@/service/cases'; // 이 부분은 나중에 사용
import { Metadata } from 'next';
import CaseCard from '@/components/CaseCard';

// 클라이언트에서 내보내지 않도록 주의
export const metadata: Metadata = {
    title: 'Cases',
    description: 'Korea ORBCOMM 솔루션이 실제로 어떻게 활용되는지 확인하세요.'
};

export default function CaseStudies() {
    const [cases, setCases] = useState<Case[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await fetch('/api/cases');
                if (!response.ok) {
                    throw new Error('Failed to fetch cases');
                }
                const casesData = await response.json();
                setCases(casesData);
            } catch (error) {
                // Cast the error to an Error type
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchCases();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <section className="bg-white dark:bg-gray-900 w-full">
            <div className='max-w-screen-2xl xl:max-w-screen-xl mx-auto py-10'>
                <div className="border-t border-gray-800 border-2 mb-5 dark:border-amber-50"/>
                <h2 className="text-start text-3xl font-semibold dark:text-white mb-8">Case Studies</h2>
                <section className="flex m-4">
                    <ul className='flex grid w-full justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                        {cases.map((caseItem) => (
                            <CaseCard case={caseItem} key={caseItem.company} />
                        ))}
                    </ul>
                </section>
            </div>
        </section>
    );
}
