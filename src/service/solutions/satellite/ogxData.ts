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
    imageIntro: string;
    imageMain: string;
    imageUrl: string;
    imageSub: string;
    introTitle: string;
    introLetter: string;
    character?: CharacterData[];
    features?: OGxFeaturesData[];
    advantages?: AdvantageData[];
}

const maritimeData: Record<string, MaritimeData> = {
    "en": {
        imageIntro: "Next-generation satellite IoT services with innovative network capabilities and flexible prices",
        imageMain: "Marine Solutions for the Smart, Connected Supply Chain",
        imageUrl: "/images/header/Port.jpg",
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
            },
        ]
    },



    "ko": {
        imageIntro: "혁신적인 네트워크 기능과 유연한 가격의 차세대 위성 IoT 서비스",
        imageMain: "OGx: Next Generation Of Satellite ",
        imageUrl: "/images/header/ogx.webp",
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
                imageUrl: "/images/icons/color/BigData.png",
                advantage: "Larger message sizes",
                description: "이전 세대의 위성보다 최대 40배 더 큰 데이터를 전송합니다. 대용량 데이터/이미지/무선 업데이트"
            },
            {
                imageUrl: "/images/icons/color/MoneySaving.png",
                advantage: "Competitive, flexible pricing",
                description: "유연한 OGx 전용 데이터 요금제로 초과 데이터 사용요금을 줄이고 고객 맞춤 데이터를 제공합니다."
            },
            {
                imageUrl: "/images/icons/color/PowerSaving.png",
                advantage: "Hardware flexibility",
                description: "업데이트 통한 기존 ST series 단말기의 소모전력을 절감하고, 태양광충전 타입 OGx 전용 단말기를 지원합니다."
            },
            {
                imageUrl: "/images/icons/color/GlobalCoverage.png",
                advantage: "Comprehensive global connectivity",
                description: "OGx의 글로벌 커버리지로 전세계에 위성 서비스를 공급하며, 고객 맞춤형 솔루션 개발을 지원합니다."
            },
            {
                imageUrl: "/images/icons/color/Service.png",
                advantage: "End-to-end support",
                description: "숙련된 기술인력을 기반으로 전세계 다양한 현장에서 고객에 기술지원 및 서비스를 제공합니다."
            },
        ]
    }
}
export default maritimeData;