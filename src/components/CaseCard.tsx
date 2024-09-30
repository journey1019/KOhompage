// components/CaseCard.tsx
import { Case } from '@/service/cases';
import Image from 'next/image';

type Props = { case: Case };
export default function CaseCard({ case: { company, comment, url, index } }: Props) {
    return (
        <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out">
            <Image className="rounded-t-lg w-auto h-auto" src={`/images/cases/${index}.png`} alt={company} width={300} height={300} unoptimized />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{company}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comment}</p>
                <a
                    href={url}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    target="_blank" // 새 탭 열기
                    rel="noopener noreferrer" // 보안상 필요 속성
                >
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
