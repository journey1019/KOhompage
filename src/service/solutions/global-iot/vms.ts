interface CharacterData {
    title: string;
    icon: string;
}

interface CtaData{
    imageUrl: string;
    title: string;
    subTitle: string;
    button: string;
    solutionButton: string;
    solutionUrl: string;
}
interface FaqData{
    question: string;
    answer: string;
}

interface VMSData{
    title: string;
    description: string;
    openGraphDesc: string;
    imageUrl: string;
    imageIntro: string;
    imageMain: string;
    imageSub: string;
    solutionButton: string;
    solutionUrl: string;
    introTitle: string;
    introLetter: string;
    characteristicsTitle: string;
    characteristicsLetter: string;
    qnaTitle: string;
    qnaLetter: string;
    faqs?: FaqData[];
    ctas: CtaData;
    character?: CharacterData[];
}

const vmsData: Record<string, VMSData> = {
    "en": {
        title: "VMS(Vessel Monitoring System)",
        description: "Real-time tracking and monitoring with data from satellites, mobile networks, and SIGFOX. Our portal integrates device sensor data and geofence alerts.",
        openGraphDesc: "Smart maritime logistics solutions improve vessel operations and ensure safety.",
        imageUrl: "/images/header/VMS.jpg",
        imageIntro: "Real-time Network Management System",
        imageMain: "Real-time data analytics dashboards and notifications",
        imageSub: "",
        solutionButton: "Explore the Solution",
        solutionUrl: "https://vms.commtrace.com/",
        introTitle: "Network Management System",
        introLetter: "Network Management System (NMS) is a system that monitors all equipment and terminals connected to the network in real time and analyzes data to help proactively detect failures or quickly identify causes. It is an innovative solution that focuses on utilizing the latest technologies to increase the stability of network operations and maximize management efficiency",
        characteristicsTitle: "NMS 서비스 특징",
        characteristicsLetter: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공합니다.",
        qnaTitle: "Frequently Asked Questions",
        qnaLetter: "Check out our customers' frequently asked questions",
        faqs: [
            {
                question: "What is the NMS?",
                answer: "Marine Solutions for the Smart, Connected Supply Chain"
            },
            {
                question: "How do I create a new ID on the NMS?",
                answer: "Please leave an inquiry with the administrator or on the 'Contact-Us' page."
            },
            {
                question: "Can I use it in a commercial project?",
                answer: "Yes, this you can.",
            },
            {
                question: "What is your refund policy? ",
                answer: "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
            },
            {
                question: "Do you offer technical support? ",
                answer: "No, we don't offer technical support for free downloads. Please purchase a support plan to get 6 months of support.",
            },
        ],
        ctas: {
            imageUrl: "/images/solutions/global-iot/Monitoring.webp",
            title: "Choice for the Future of the Marine Industry, VMS",
            subTitle: "GAutomate everything about ship management with BMS, and create better performance",
            button: "Get a tailored quote",
            solutionButton: "Give It a Try!",
            solutionUrl: "https://vms.commtrace.com/",
        },
        character: [
            {
                title: "Optimized for various communication services such as satellite and mobile communications, SIGFOX",
                icon: "/images/icons/Optimization.png"
            },
            {
                title: "Provide real-time location information monitoring services",
                icon: "/images/icons/DataSend.png"
            },
            {
                title: "Device's Sensor, Geofence Information",
                icon: "/images/icons/VMSMonitoring.png"
            },
            {
                title: "Easy service application of New Device",
                icon: "/images/icons/ServiceProvision.png"
            },
        ]
    },
    "ko": {
        title: "VMS(Vessel Monitoring System)",
        description: "위성 및 이동통신, SIGFOX 등 다양한 통신장비를 통해 수집되는 위치정보를 실시간 모니터링 및 Tracking을 서비스하며 Device의 Sensor 데이터와 Geofence 등의 정보를 통해 종합적인 위치정보 포탈 서비스를 제공합니다.",
        openGraphDesc: "상선 및 어선 운영의 효율성을 높이고 안전을 보장하는 스마트 해양 물류 관리 솔루션",
        imageUrl: "/images/header/VMS.jpg",
        imageIntro: "선박 모니터링 시스템",
        imageMain: "VMS Commtrace",
        imageSub: "",
        solutionButton: "솔루션 살펴보기",
        solutionUrl: "https://vms.commtrace.com/",
        introTitle: "선박 모니터링 시스템",
        introLetter: "Commtrace는 실시간 위치정보, 이동 이력 추적, 디바이스별 Geofence, 센서 데이터 제공, 그리고 이를 기반으로 한 알림 서비스를 통해 상선 및 어선 운영의 효율성을 높이고 안전을 보장하는 스마트 해양 물류 관리 솔루션입니다. 데이터 기반의 통찰력과 정교한 기술로 해양 산업의 미래를 함께 만들어갑니다.",
        characteristicsTitle: "Vessel Monitoring System",
        characteristicsLetter: "VMS는 위성 및 이동통신, SIGFOX 등 다양한 통신장비를 통해 수집되는 위치정보를 실시간 모니터링 및 Tracking을 서비스하며 Device의 Sensor 데이터 와 Geofence 등의 정보를 통해 종합적인 위치정보 포탈 서비스를 제공합니다.",
        qnaTitle: "자주 묻는 질문",
        qnaLetter: "고객들이 자주 묻는 질문을 확인해보세요",
        faqs: [
            {
                question: "VMS란 무엇인가요?",
                answer: "VMS(Vessel Monitoring System)는 선박의 위치, 상태, 운항 기록 등을 실시간으로 모니터링하고 데이터를 분석하여 해양 안전과 선박 관리를 지원하는 시스템입니다."
            },
            {
                question: "VMS는 어떤 기능을 제공하나요?",
                answer: "주요 기능은 다음과 같습니다. '실시간 선박 위치 추적', '항로 계획 및 이탈 알림', '운항 상태 모니터링', '어업 활동 데이터 수집 및 보고', '해양 안전 경고 제공'"
            },
            {
                question: "어떤 선박에 VMS를 적용할 수 있나요?",
                answer: "어선, 화물선, 여객선, 연구선 등 모든 유형의 선박에 적용할 수 있습니다."
            },
            {
                question: "VMS는 선박의 위치를 얼마나 정확하게 추적하나요?",
                answer: "VMS는 GPS 기반으로 위치를 10~15미터 이내의 정확도로 추적하며, 통신이 가능한 범위 내에서 실시간으로 데이터를 업데이트합니다.",
            },
            {
                question: "VMS 서비스의 비용은 얼마나 되나요?",
                answer: "비용은 선박 크기, 적용 기능, 통신 방식 등에 따라 달라지며, 고객 맞춤형 견적을 제공합니다.",
            },
        ],
        ctas: {
            imageUrl: "/images/solutions/global-iot/VMS_CTA.webp",
            title: "해양 산업의 미래를 위한 선택, VMS",
            subTitle: "VMS를 통해 선박 관리의 모든 것을 자동화하고, 더 나은 성과를 만들어보세요.",
            button: "맞춤형 견적을 받아보세요",
            solutionButton: "솔루션을 경험해보세요",
            solutionUrl: "https://vms.commtrace.com/",
        },
        character: [
            {
                title: "위성 및 이동통신, SIGFOX 등 다양한 통신 서비스에 최적화",
                icon: "/images/icons/Optimization.png"
            },
            {
                title: "실시간 위치정보 모니터링 서비스 제공",
                icon: "/images/icons/DataSend.png"
            },
            {
                title: "Device의 Sensor, Geofence 정보 제공",
                icon: "/images/icons/VMSMonitoring.png"
            },
            {
                title: "New Device의 쉬운 서비스 적용",
                icon: "/images/icons/ServiceProvision.png"
            },
        ]
    }
}
export default vmsData;