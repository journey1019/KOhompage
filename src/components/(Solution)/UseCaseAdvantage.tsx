import solutionsAdvantage from '@/service/solutionsAdvantage';
import React from 'react';
import Image from 'next/image';

interface CaseData {
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    description: string;
    image: string;
}

interface UseCaseProps {
    locale: string; // 다국어 지원을 위해 locale 추가
    solutionKey: string; // `slug` 대신 solutionKey 사용
}

const Case: React.FC<CaseData> = ({ direction, title1, title2, description, image }) => (
    <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 pb-72">
        {direction === 'left' ? (
            <>
                <div className="w-full lg:w-2/5">
                    <div className="block lg:text-left text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            <span className="text-red-700">{title1}</span> {title2}
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-3/5">
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt="Case Image"
                                className="rounded-2xl w-full object-cover"
                                width={500}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="w-full lg:w-3/5">
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt="Case Image"
                                className="rounded-2xl w-full object-cover"
                                width={500}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <div className="block lg:text-right text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            {title1} <span className="text-red-700">{title2}</span>
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                            {description}
                        </p>
                    </div>
                </div>
            </>
        )}
    </div>
);

export default function UseCase({ locale, solutionKey }: UseCaseProps) {
    const solution = solutionsAdvantage[locale]?.[solutionKey];

    // 타입 검증
    if (!solution || !solution.useCases) {
        return <p>No use cases available.</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {solution.useCases.map((useCase, index) => (
                        <Case
                            key={index}
                            direction={useCase.direction}
                            title1={useCase.title1}
                            title2={useCase.title2}
                            description={useCase.description}
                            image={useCase.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}