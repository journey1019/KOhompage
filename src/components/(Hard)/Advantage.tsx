import React from "react";
import Image from 'next/image';

// interface AdvantageItem {
//     imageUrl: string;
//     advantage: string;
//     description: string;
// }
// interface AdvantageProps {
//     items: AdvantageItem[];
// }

const items = [
    {
        imageUrl: "/images/icons/color/Container.png",
        advantage: "GPS 컨테이너 관리",
        description: "컨테이너 온도 모니터링 및 원격제어"
    },
    {
        imageUrl: "/images/icons/color/Platform.png",
        advantage: "원활한 상호 운용성",
        description: "다양한 디바이스와 플랫폼에서 데이터를 쉽게 공유"
    },
    {
        imageUrl: "/images/icons/color/Global.png",
        advantage: "글로벌 네트워크 연결",
        description: "2G, 3G, LTE 네트워크를 통한 글로벌 커버리지"
    },
    {
        imageUrl: "/images/icons/color/Data.png",
        advantage: "간편한 데이터 로그 액세스",
        description: "컨테이너 이력정보의 손쉬운 접근"
    },
    {
        imageUrl: "/images/icons/color/Monitoring.png",
        advantage: "24시간 실시간 모니터링",
        description: "실시간 모니터링"
    },
    {
        imageUrl: "/images/icons/color/Satellite.png",
        advantage: "위성 AIS",
        description: "위성 AIS 데이터와 결합하여 해상이동정보 정확도 향상"
    },
    {
        imageUrl: "/images/icons/color/Property.png",
        advantage: "모든 자산 통합관리",
        description: "고객의 다양한 형태의 자산을 단일플랫폼에서 통합관리"
    }
]

const Strength = () => {
// const Strength: React.FC<AdvantageProps> = () => {
    return (
        <section className="pt-40 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:pt-0 sm:pb-24 lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
                    {items.map((item, index) => (
                        <div key={index} className="group relative">
                            <div
                                className="flex-shrink-0 w-20 h-20 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 items-center">
                                <Image
                                    src={item.imageUrl}
                                    alt="Example"
                                    width={50}
                                    height={50}
                                    className="object-contain w-full h-full bg-white"
                                    unoptimized
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-lg text-gray-700 font-semibold dark:text-gray-200">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {item.advantage}
                                    </h3>
                                    <p className="mt-3 text-md text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Strength;