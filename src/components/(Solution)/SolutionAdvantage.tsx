import React from "react";
import Image from "next/image";

interface AdvantageData {
    direction: "left" | "right";
    title1: string;
    title2: string;
    description: string;
    image: string;
}

interface SolutionAdvantageProps {
    advantages: AdvantageData[]; // advantage 데이터를 props로 전달받음
}

// Case 컴포넌트: 각각의 장점 케이스를 렌더링
const Case: React.FC<AdvantageData> = ({ direction, title1, title2, description, image }) => (
    <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 pb-20">
        {direction === "left" ? (
            <>
                {/* 텍스트 영역 */}
                <div className="w-full lg:w-2/5">
                    <div className="block lg:text-left text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            <span className="text-red-700">{title1}</span> {title2}
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">{description}</p>
                    </div>
                </div>
                {/* 이미지 영역 */}
                <div className="w-full lg:w-3/5">
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt={`${title1} ${title2}`}
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
                {/* 이미지 영역 */}
                <div className="w-full lg:w-3/5">
                    <div className="group w-full border border-gray-300 rounded-2xl">
                        <div className="flex items-center">
                            <Image
                                src={image}
                                alt={`${title1} ${title2}`}
                                className="rounded-2xl w-full object-cover"
                                width={500}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="w-full lg:w-2/5">
                    <div className="block lg:text-right text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                            {title1} <span className="text-red-700">{title2}</span>
                        </h2>
                        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">{description}</p>
                    </div>
                </div>
            </>
        )}
    </div>
);

// SolutionAdvantage 컴포넌트: 전체 장점 섹션을 렌더링
const SolutionAdvantage: React.FC<SolutionAdvantageProps> = ({ advantages }) => {
    if (!advantages || advantages.length === 0) {
        return <p>No advantages available.</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {advantages.map((advantage, index) => (
                        <Case
                            key={index}
                            direction={advantage.direction}
                            title1={advantage.title1}
                            title2={advantage.title2}
                            description={advantage.description}
                            image={advantage.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionAdvantage;
