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
    imageIntro: string;
    imageMain: string;
    imageUrl: string;
    imageSub: string;
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
        imageIntro: "Real-time Network Monitoring System",
        imageMain: "Real-time data analytics dashboards and notifications",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "Network Monitoring System",
        introLetter: "Network Monitoring System (NMS) is a system that monitors all equipment and terminals connected to the network in real time and analyzes data to help proactively detect failures or quickly identify causes. It is an innovative solution that focuses on utilizing the latest technologies to increase the stability of network operations and maximize management efficiency",
        characteristicsTitle: "NMS 서비스 특징",
        characteristicsLetter: "통신망 상태를 한눈에, Network Monitoring System(NMS) NMS는 위성, 이동통신, Sigfox 등 다양한 통신망 데이터를 통합하여 수집, 분석, 그리고 실시간 모니터링을 제공합니다.",
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
            title: "Master Maritime Visibility with ORBCOMM",
            subTitle: "Gain remote vessel tracking, monitoring and control capabilities for your commercial fishing boats, merchant marine fleets and more.",
            button: "Get a tailored quote",
            solutionButton: "Give It a Try!",
            solutionUrl: "https://nms.commtrace.com/",
        },
        character: [
            {
                title: "다양한 통신망 적용",
                icon: "/images/icons/CommunicationNetwork.png"
            },
            {
                title: "정교한 데이터 분석",
                icon: "/images/icons/DataAnalysis.png"
            },
            {
                title: "고장 예측 및 실시간 모니터링",
                icon: "/images/icons/NMSMonitoring.png"
            },
            {
                title: "알람 서비스 제공",
                icon: "/images/icons/Alarm.png"
            },
        ]
    },
    "ko": {
        imageIntro: "시스템 네트워크 모니터링 시스템",
        imageMain: "실시간 데이터 분석 대시보드 및 알림 기능",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "네트워크 모니터링 시스템",
        introLetter: "NMS(Network Monitoring System)는 네트워크에 연결된 모든 장비와 단말기를 실시간으로 모니터링하고, 데이터를 분석하여 장애를 사전에 감지하거나 발생 원인을 신속히 파악할 수 있도록 지원하는 시스템입니다. 최신 기술을 활용하여 네트워크 운영의 안정성을 높이고, 관리의 효율성을 극대화하는 데 초점을 맞춘 혁신적인 솔루션입니다.",
        characteristicsTitle: "NMS 서비스 특징",
        characteristicsLetter: "통신망 상태를 한눈에, Network Monitoring System(NMS) NMS는 위성, 이동통신, Sigfox 등 다양한 통신망 데이터를 통합하여 수집, 분석, 그리고 실시간 모니터링을 제공합니다.",
        qnaTitle: "자주 묻는 질문",
        qnaLetter: "고객들이 자주 묻는 질문을 확인해보세요",
        faqs: [
            {
                question: "NMS이 무엇인가요?",
                answer: "스마트하고 연결된 공급망을 위한 해양 솔루션입니다."
            },
            {
                question: "NMS Platform에서 새로운 아이디를 생성하려면 어떻게 해야 하나요?",
                answer: "관리자에게 문의 혹은 '문의하기' 페이지에서 문의를 남겨주세요."
            },
            {
                question: "상업용 프로젝트에 사용할 수 있나요?",
                answer: "네, 할 수 있습니다."
            },
            {
                question: "환불 정책은 무엇인가요?",
                answer: "어떤 이유로든 구매가 만족스럽지 않다면 90일 이내에 이메일을 보내주시면 question 없이 전액 환불해드리겠습니다.",
            },
            {
                question: "기술 지원을 제공하시나요?",
                answer: "아니요, 무료 다운로드에 대한 기술 지원은 제공하지 않습니다. 6개월 지원을 받으려면 지원 플랜을 구매하세요.",
            },
        ],
        ctas: {
            imageUrl: "/images/solutions/global-iot/Monitoring.webp",
            title: "ORBCOMM으로 해상 가시성 마스터하기",
            subTitle: "상업용 어선, 상선 함대 등에 대한 원격 선박 추적, 모니터링 및 제어 기능을 확보하세요.",
            button: "맞춤형 견적을 받아보세요",
            solutionButton: "솔루션을 경험해보세요",
            solutionUrl: "https://nms.commtrace.com/",
        },
        character: [
            {
                title: "다양한 통신망 적용",
                icon: "/images/icons/CommunicationNetwork.png"
            },
            {
                title: "정교한 데이터 분석",
                icon: "/images/icons/DataAnalysis.png"
            },
            {
                title: "고장 예측 및 실시간 모니터링",
                icon: "/images/icons/NMSMonitoring.png"
            },
            {
                title: "알람 서비스 제공",
                icon: "/images/icons/Alarm.png"
            },
        ]
    }
}
export default vmsData;