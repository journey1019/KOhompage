interface CtaData{
    title: string;
    subTitle: string;
    button: string;
}

interface AdvantageData {
    imageUrl: string;
    advantage: string;
    description: string;
}

interface OGxFeaturesData {
    messageSize: string;
    ogx: string;
    idp: string;
}

interface MaritimeData{
    title: string;
    description: string;
    openGraphDesc: string;
    imageIntro: string;
    imageMain: string;
    imageUrl: string;
    imageSub: string;
    introTitle: string;
    introLetter: string;
    character?: CharacterData[];
    features?: OGxFeaturesData[];
    advantages?: AdvantageData[];
    ctas: CtaData;
}

const maritimeData: Record<string, MaritimeData> = {
    "en": {
        title: "OGx",
        description: "Next-generation satellite IoT service with innovative network features and flexible operation. Provides global satellite communication using Inmarsat's L-Band.",
        openGraphDesc: "Next-generation satellite IoT service with innovative network features and flexible operation. Provides global satellite communication using Inmarsat's L-Band.",
        imageIntro: "Next-generation satellite IoT services with innovative network capabilities and flexible prices",
        imageMain: "Marine Solutions for the Smart, Connected Supply Chain",
        imageUrl: "/images/header/OGx.webp",
        imageSub: "",
        introTitle: "Reefer Container Monitoring and Control System",
        introLetter: "KOREA ORBCOMM's ReeferContainer, selected by top three shipping companies worldwide, is currently operating with more than 500,000 products installed in cold-refrigerated containers, providing container carriers, multimodal carriers, shippers and other users with real-time container control services across the land and sea.",
        features: [
            {
                messageSize: '10 Kbyte',
                ogx: '30 초',
                idp: '10 분'
            },
            {
                messageSize: '100 Kbyte',
                ogx: '2 분',
                idp: '80 분'
            },
        ],
        advantages: [
            {
                imageUrl: "/images/icons/BigData.png",
                advantage: "Larger message sizes",
                description: "Transmit data up to 40 times larger than previous-generation satellites, supporting large-scale data, images, and over-the-air updates."
            },
            {
                imageUrl: "/images/icons/MoneySaving.png",
                advantage: "Competitive, flexible pricing",
                description: "Reduce excess data usage costs with flexible OGx-exclusive data plans while offering tailored data solutions for customers."
            },
            {
                imageUrl: "/images/icons/PowerSaving.png",
                advantage: "Hardware flexibility",
                description: "Reduce power consumption of existing ST series devices through updates, and support OGx-exclusive devices with solar charging options."
            },
            {
                imageUrl: "/images/icons/GlobalCoverage.png",
                advantage: "Comprehensive global connectivity",
                description: "Provide satellite services worldwide with OGx's global coverage and support the development of customized solutions for customers."
            },
            {
                imageUrl: "/images/icons/Service1.png",
                advantage: "End-to-end support",
                description: "Offer technical support and services across diverse global locations through skilled technical personnel."
            },
        ],
        ctas: {
            title: "When you need a tailored solution, contact us now.",
            subTitle: "Leveraging experience and innovation to drive your success.",
            button: "Contact Us",
        }
    },



    "ko": {
        title: "OGx",
        description: "혁신적인 네트워크 기능과 유연한 가영의 차세대 위성 IoT 서비스. Inmarsat 위성의 L-Band 대역을 이용하여 전 세계에 위성통신을 제공.",
        openGraphDesc: "혁신적인 네트워크 기능과 유연한 가영의 차세대 위성 IoT 서비스. Inmarsat 위성의 L-Band 대역을 이용하여 전 세계에 위성통신을 제공.",
        imageIntro: "혁신적인 네트워크 기능과 유연한 가격의 차세대 위성 IoT 서비스",
        imageMain: "OGx: Next Generation Of Satellite ",
        imageUrl: "/images/header/OGx.webp",
        imageSub: "",
        introTitle: "차세대 위성",
        introLetter: "OGx 위성 서비스는 Inmarsat(인말셋) 4세대 및 6세대 위성의 L-Band 대역을 이용하여 전세계에 위성통신을 제공합니다. Global L-Band 위성서비스는 우천 등 기상조건의 영향을 받지 않는 네트워크 가용성으로 고객의 자산을 원격 모니터링을 위한 신뢰성있는 통신망을 제공합니다.",
        features: [
            {
                messageSize: '10 Kbyte',
                ogx: '30 초',
                idp: '10 분'
            },
            {
                messageSize: '100 Kbyte',
                ogx: '2 분',
                idp: '80 분'
            },
        ],
        advantages: [
            {
                imageUrl: "/images/icons/BigData.png",
                advantage: "더 큰 메시지 크기",
                description: "이전 세대 위성보다 최대 40배 더 큰 데이터를 전송합니다. 대용량 데이터/이미지/무선 업데이트를 지원합니다."
            },
            {
                imageUrl: "/images/icons/MoneySaving.png",
                advantage: "경쟁력 있고 유연한 가격 정책",
                description: "유연한 OGx 전용 데이터 요금제를 통해 초과 데이터 사용 요금을 줄이고, 고객 맞춤 데이터를 제공합니다."
            },
            {
                imageUrl: "/images/icons/PowerSaving.png",
                advantage: "하드웨어 유연성",
                description: "업데이트를 통해 기존 ST 시리즈 단말기의 소모 전력을 절감하며, 태양광 충전 타입 OGx 전용 단말기를 지원합니다."
            },
            {
                imageUrl: "/images/icons/globalCoverage.png",
                advantage: "포괄적인 글로벌 연결성",
                description: "OGx의 글로벌 커버리지를 통해 전 세계에 위성 서비스를 공급하며, 고객 맞춤형 솔루션 개발을 지원합니다."
            },
            {
                imageUrl: "/images/icons/Service1.png",
                advantage: "종합적인 지원",
                description: "숙련된 기술 인력을 기반으로 전 세계 다양한 현장에서 고객에게 기술 지원 및 서비스를 제공합니다."
            },
        ],
        ctas: {
            title: "맞춤형 솔루션이 필요한 순간, 지금 바로 상담하세요.",
            subTitle: "축적된 경험과 혁신으로 고객의 성공을 돕겠습니다.",
            button: "문의하기",
        },
    }
}
export default maritimeData;