import { getAllCases } from '@/service/cases';
import { Metadata } from 'next';
import CaseCard from '@/components/CaseCard';

export const metadata: Metadata = {
    title: 'Cases',
    description: 'Korea ORBCOMM 솔루션이 실제로 어떻게 활용되는지 확인하세요.'
}

export default async function CaseStudies() {
    const cases = await getAllCases();
    return(
        <section className="bg-white py-8 mt-10 max-w-screen-2xl mx-auto">
            <div className="border-t border-gray-800 border-2 mb-5" />
            <h2 className="text-start text-3xl font-semibold mb-8">Case Studies</h2>
            <section className="flex m-4">
                <ul className='flex grid w-full justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                    {cases.map((caseItem) => (
                        <CaseCard case={caseItem} key={caseItem.company} />
                    ))}
                </ul>
            </section>
        </section>
    )
}