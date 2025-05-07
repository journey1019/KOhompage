interface CharacterData {
    title: string;
    subtitle: string;
    icon: string;
}
interface KindData {
    title: string;
    image: string;
}
interface PointData {
    text: string;
}
interface AdvantageData {
    imageUrl: string;
    advantage: string;
    description: string;
}
interface CarouselData {
    title: string;
    subtitle:string;
    imageTitle1: string;
    imageTitle2: string;
    imageTitle3: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
}
interface CaseData {
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    slug: string;
    description: string;
    image: string;
}
interface GlobalIoTData {
    imageIntro: string;
    imageMain: string;
    imageSub: string;
    imageUrl: string;
    solutionNumber: string;
    title: string
    solutionName: string;
    description: string;
    carousels?: CarouselData[];
    useCases?: CaseData[];
    advantages?: AdvantageData[];
    points?: PointData[];
    kind?: KindData[];
    character?: CharacterData[];
}


const solutionsData: Record<string, GlobalIoTData> = {
    "en": {
        imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
        imageMain: "Improve your experience with global communication.",
        imageSub: "Through the Global Communication Network provided by Korea ofCom, we provide IoT solutions suitable for various fields around the world.",
        imageUrl: "/images/solutions/global-iot/M2M_IoT.jpg",
        solutionNumber: "Global IoT",
        title: "Industrial IoT Solutions",
        solutionName: "Industrial IoT solutions provided by KOREA ORBCOMM provide solutions suitable for various industries such as construction equipment monitoring, marine information monitoring, and climate information monitoring.",
        description: "Monitor and manage your assets globally with our IoT solutions.",
        carousels: [
            {
                title: "Heavy Equipment Monitoring",
                subtitle: "Monitor the operation information (operating time, condition/consumables information) and location information of heavy equipment such as construction machinery, mining equipment, and agricultural machinery operated in places with poor global communication",
                imageTitle1: "Construction",
                imageTitle2: "Mining",
                imageTitle3: "Agriculture",
                imageUrl1: "/images/solutions/global-iot/Construct.webp",
                imageUrl2: "/images/solutions/global-iot/Mining.webp",
                imageUrl3: "/images/solutions/global-iot/Agricluture.webp",
            },
            {
                title: "Maritime Information Monitoring",
                subtitle: "For marine safety, marine industry, academic information, etc., ship operation/sea wave/temperature/weather information is collected by sensors and transmitted/monitored through global communication networks",
                imageTitle1: "Vessel Monitoring",
                imageTitle2: "Buoy/Floating LiDAR",
                imageTitle3: "Weather Ship",
                imageUrl1: "/images/solutions/global-iot/Vessel.webp",
                imageUrl2: "/images/solutions/global-iot/Buoy-FloatingLiDAR.jpg",
                imageUrl3: "/images/solutions/global-iot/WeatherObservation.jpg",
            },
            {
                title: "Public / Social Safety Network",
                subtitle: "Public network communication network and social safety net multi-communication network are used together with wired/wireless network where multi-communication network is required",
                imageTitle1: "Water level Measurement",
                imageTitle2: "Electronic Voting",
                imageTitle3: "Marine Distress Safety",
                imageUrl1: "/images/solutions/global-iot/WaterLevelMeasurementAI.webp",
                imageUrl2: "/images/solutions/global-iot/ElectronicVoting.png",
                imageUrl3: "/images/solutions/global-iot/MarineDistressSafety.png",
            },
        ],
        useCases: [
            {
                direction: "left",
                title1: "VMS",
                title2: "Commtrace",
                slug: "vms",
                description: "Real-Time Network Management System",
                image: "/images/solutions/global-iot/VMS.png",
            },
            {
                direction: "right",
                title1: "",
                title2: "NMS",
                slug: "nms",
                description: "Real-Time Network Management System",
                image: "/images/solutions/global-iot/nms_main.png",
            },
        ],
    },


    "ko": {
        imageIntro: "",
        imageMain: "글로벌 IoT 솔루션",
        imageSub: "코리아오브컴에서 제공하는 Global 통신망(Global Cellular, 저궤도/정지궤도 위성망, IoT 망 등)을 통해 전세계 다양한 분야에 적합한 솔루션을 제공합니다.",
        imageUrl: "/images/solutions/global-iot/M2M_IoT.jpg",
        solutionNumber: "Global IoT",
        title: "산업용 IoT 솔루션",
        solutionName: "산업용 IoT 솔루션은 건설장비 모니터링, 해양정보 모니터링, 기후정보 모니터링 등 다양한 산업분야에 적합한 솔루션을 제공합니다.",
        description: "글로벌 IoT 솔루션으로 자산을 관리하세요.",
        carousels: [
            {
                title: "중장비 모니터링",
                subtitle: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공합니다.",
                imageTitle1: "건설",
                imageTitle2: "광업",
                imageTitle3: "농업",
                imageUrl1: "/images/solutions/global-iot/Construct.webp",
                imageUrl2: "/images/solutions/global-iot/Mining.webp",
                imageUrl3: "/images/solutions/global-iot/Agricluture.webp",
            },
            {
                title: "해양 정보 모니터링",
                subtitle: "해상안전, 해양산업, 학술정보 등을 위해 선박운항/파고/기온/기상정보 등을 센서로 수집하고 글로벌 통신망을 통해 전송/모니터링",
                imageTitle1: "선박 모니터링",
                imageTitle2: "부이/부표 LiDAR",
                imageTitle3: "기상 관측선",
                imageUrl1: "/images/solutions/global-iot/Vessel.webp",
                imageUrl2: "/images/solutions/global-iot/Buoy-FloatingLiDAR.jpg",
                imageUrl3: "/images/solutions/global-iot/WeatherObservation.jpg",
            },
            {
                title: "공공 / 사회 안전망",
                subtitle: "공공망 통신망, 사회안전망 다중통신망이 필요한 곳에서 유/무선망과 함께 활용",
                imageTitle1: "수위 측정",
                imageTitle2: "전자 투표",
                imageTitle3: "해양 조난 안전",
                imageUrl1: "/images/solutions/global-iot/WaterLevelMeasurementAI.webp",
                imageUrl2: "/images/solutions/global-iot/ElectronicVoting.png",
                imageUrl3: "/images/solutions/global-iot/MarineDistressSafety.png",
            }
        ],
        useCases: [
            {
                direction: "left",
                title1: "VMS",
                title2: "Commtrace",
                slug: "vms",
                description: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공합니다.",
                image: "https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG",
            },
            {
                direction: "right",
                title1: "NMS",
                title2: "",
                slug: "nms",
                description: "고객에게 제공되는 웹플랫폼(Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.",
                image: "/images/solutions/global-iot/nms_main.png",
            },
        ]
    }
};

export default solutionsData;
