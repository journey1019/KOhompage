import Image from 'next/image';
import React from 'react';

const items = [
    {
        "title": "GT1200 Series (Satellite)",
        "subTitle": "설명",
        "description": "차세대 GT1200 시리즈는 개선된 태양전지판, 무선 센서, 더 빠르고 안전한 현장 설치 및 더 많은 고급 기능을 지원하는 초소형 Dry Container 및 트레일러 추적 솔루션입니다. 독립형 또는 화물 센서가 장착된 올인원 장치로 제공됩니다.",
        "brochure": "",
        "devkit": "",
        "category": "",
        "imageSrc": "/images/hardware/GT-1200.png",
        "tag": [
            "gt1200",
            "Trailer Tracking",
            "Dry Van",
            "Chassis and Dry Container"
        ],
        "slug": "gt-1200",
        "featured": true
    },
    {
        "title": "CT3500 (Celluar)",
        "subTitle": "설명",
        "description": "CT 3500은 육지, 철도 또는 바다의 Supply Chain의 모든 지점에서 자산을 완벽하게 파악하고 제어할 수 있도록 하는 원격 냉동컨테이너 관리의 차세대 기술입니다. 최첨단의 텔레매틱스 장치는 화주 및 운송업자에게 포괄적인 보고서, 분석, 경고 및 원격 양방향 제어 기능을 제공하여 컨테이너 운영을 간소화하고 효율성을 높일 수 있도록 지원합니다. CT 3500은 타의 추종을 불허하는 글로벌 LTE 커버리지와 LoRa, Bluetooth 5, NFC 기술을 지원하며 위성 연결 옵션도 갖추고 있습니다.",
        "brochure": "",
        "devkit": "",
        "category": "",
        "imageSrc": "/images/hardware/CT-3500.png",
        "tag": [
            "CT3500",
            "Intermodal Containers and Cargo Security",
            "NMS",
            "VMS",
            "Reefer Connect"
        ],
        "slug": "ct-3500",
        "featured": false
    }
]

interface HardwareProps {
    locale: string;
}
export const SlugHardware: React.FC<HardwareProps> = ({locale}) => {

    return(
        <section className="max-w-7xl mx-auto items-center pt-12 pb-24">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                {items.map((item) => (
                    <a key={item.slug} href={`/${locale}/hard/${item.slug}`}
                       className="group border p-4 rounded-md shadow-md mb-4 hover:shadow-lg hover:border-blud-500 transition duration-300">
                        <div
                            className="w-full h-60 overflow-hidden rounded-lg bg-gray-200 group-hover:bg-gray-300 transition duration-300"> {/* 고정된 크기 설정 */}
                            <Image
                                alt={item.slug}
                                src={item.imageSrc}
                                width={240} // 고정된 크기
                                height={240} // 고정된 크기
                                className="object-cover object-center w-full h-full bg-white group-hover:opacity-90 transition duration-300"
                                unoptimized
                            />
                        </div>
                        <h2 className="text-xl font-bold group-hover:text-blue-500 transition duration-300">{item.title}</h2>
                        <p className="group-hover:text-gray-700 transition duration-300">{item.subTitle}</p>
                        <div className="mt-2">
                            <span className="text-xs text-gray-600">Tags: </span>
                            {item.tag.map((tag) => (
                                <span key={tag}
                                      className="text-blue-500 mr-2 text-xs group-hover:underline transition duration-300">{tag}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}