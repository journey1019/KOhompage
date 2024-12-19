interface AdvantageData{
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    description: string;
    image: string;
}

interface CtaData{
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

interface MaritimeData{
    imageIntro: string;
    imageMain: string;
    imageUrl: string;
    imageSub: string;
    introTitle: string;
    introLetter: string;
    qnaTitle: string;
    qnaLetter: string;
    useCaseTitle: string;
    useCaseLetter: string;
    faqs?: FaqData[];
    ctas: CtaData;
    advantage: AdvantageData[];
}

const maritimeData: Record<string, MaritimeData> = {
    "en": {
        imageIntro: "Real-time Network Monitoring System",
        imageMain: "Real-time data analytics dashboards and notifications",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "Network Monitoring System",
        introLetter: "Network Monitoring System (NMS) is a system that monitors all equipment and terminals connected to the network in real time and analyzes data to help proactively detect failures or quickly identify causes. It is an innovative solution that focuses on utilizing the latest technologies to increase the stability of network operations and maximize management efficiency",
        qnaTitle: "Frequently Asked Questions",
        qnaLetter: "Check out our customers' frequently asked questions",
        useCaseTitle: "Why should you use this solution",
        useCaseLetter: "KOREA ORBCOM's uniquely combines IoT and AIS-based solutions and services to provide critical monitoring of shipping companies, commercial fishing boats and merchant containers, and other maritime assets operating in waters around the world.",
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
            title: "Master Maritime Visibility with ORBCOMM",
            subTitle: "Gain remote vessel tracking, monitoring and control capabilities for your commercial fishing boats, merchant marine fleets and more.",
            button: "Get a tailored quote",
            solutionButton: "Give It a Try!",
            solutionUrl: "https://nms.commtrace.com/",
        },
        advantage: [
            {
                direction: "left",
                title1: "",
                title2: "Visibility",
                description: "Stay connected to your containers on land and sea with reliable monitoring for dry and refrigerated containers and their cargo.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-1-visibility-1440x776.png",
            },
            {
                direction: "right",
                title1: "",
                title2: "Optimization",
                description: "Maximize fuel consumption, asset utilization and more by driving operational decisions with container telematics data.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-2-Optimization.png",
            },
            {
                direction: "left",
                title1: "",
                title2: "Utilization",
                description: "Ensure containers are always working at peak efficiency through continuous monitoring of location and cargo status data.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-3-utilization.png",
            },
            {
                direction: "right",
                title1: "Cargo Security and",
                title2: "Integrity",
                description: "Real-time cargo position and condition data allows you to provide value-added services to customers such as shipment status, current location and accurate ETAs.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-4-cargo-security-and-integrity.png",
            }
        ]
    },
    "ko": {
        imageIntro: "시스템 네트워크 모니터링 시스템",
        imageMain: "실시간 데이터 분석 대시보드 및 알림 기능",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "네트워크 모니터링 시스템",
        introLetter: "NMS(Network Monitoring System)는 네트워크에 연결된 모든 장비와 단말기를 실시간으로 모니터링하고, 데이터를 분석하여 장애를 사전에 감지하거나 발생 원인을 신속히 파악할 수 있도록 지원하는 시스템입니다. 최신 기술을 활용하여 네트워크 운영의 안정성을 높이고, 관리의 효율성을 극대화하는 데 초점을 맞춘 혁신적인 솔루션입니다.",
        qnaTitle: "자주 묻는 질문",
        qnaLetter: "고객들이 자주 묻는 질문을 확인해보세요",
        useCaseTitle: "이 솔루션을 사용해야 하는 이유",
        useCaseLetter: "KOREA ORBCOMM은 IoT와 AIS 기반 솔루션 및 서비스를 독특하게 결합하여 전 세계 해역에서 운영되는 해운 회사, 상업용 어선 및 상선 컨테이너 및 기타 해상 자산에 대한 중요한 모니터링을 제공합니다.",
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
            title: "ORBCOMM으로 해상 가시성 마스터하기",
            subTitle: "상업용 어선, 상선 함대 등에 대한 원격 선박 추적, 모니터링 및 제어 기능을 확보하세요.",
            button: "맞춤형 견적을 받아보세요",
            solutionButton: "솔루션을 경험해봐!",
            solutionUrl: "https://nms.commtrace.com/",
        },
        advantage: [
            {
                direction: "left",
                title1: "가시성",
                title2: "",
                description: "건조 및 냉장 컨테이너와 화물에 대한 신뢰할 수 있는 모니터링을 통해 육상 및 해상 컨테이너에 계속 연결하세요.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-1-visibility-1440x776.png",
            },
            {
                direction: "right",
                title1: "",
                title2: "최적화",
                description: "컨테이너 텔레매틱스 데이터를 통해 운영 결정을 유도하여 연료 소비, 자산 활용 등을 극대화하십시오.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-2-Optimization.png",
            },
            {
                direction: "left",
                title1: "활용",
                title2: "",
                description: "위치 및 화물 상태 데이터를 지속적으로 모니터링하여 컨테이너가 항상 최고 효율로 작동하도록 보장합니다.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-3-utilization.png",
            },
            {
                direction: "right",
                title1: "",
                title2: "화물 보안 및 무결성",
                description: "실시간 화물 위치 및 상태 데이터를 통해 고객에게 배송 상태, 현재 위치, 정확한 도착 예정 시간 등 부가가치 서비스를 제공할 수 있습니다.",
                image: "/images/solutions/container-iot/maritime/Maritime-Benefits-4-cargo-security-and-integrity.png",
            }
        ]
    }
}
export default maritimeData;