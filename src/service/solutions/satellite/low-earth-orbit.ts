interface CharacterData {
    title: string;
    icon: string;
}

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
}
interface FaqData{
    question: string;
    answer: string;
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
    qnaTitle: string;
    qnaLetter: string;
    useCaseTitle: string;
    useCaseLetter: string;
    faqs?: FaqData[];
    ctas: CtaData;
    advantage: AdvantageData[];
    character?: CharacterData[];
}

const lowEarthOrbitData: Record<string, MaritimeData> = {
    "en": {
        title: "ORBCOMM: Low Earth Orbit",
        description: "ORBCOMM's low-Earth orbit satellite network provides data communication in remote areas like mountains and oceans without infrastructure.",
        openGraphDesc: "Provides tailored solutions for monitoring, tracking, and remote management in construction, marine, environment, and weather industries.",
        imageIntro: "It provides real-time data transmission and efficient remote monitoring solutions through low-orbit satellites.",
        imageMain: "Marine Solutions for the Smart, Connected Supply Chain",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "Reefer Container Monitoring and Control System",
        introLetter: "KOREA ORBCOMM's ReeferContainer, selected by top three shipping companies worldwide, is currently operating with more than 500,000 products installed in cold-refrigerated containers, providing container carriers, multimodal carriers, shippers and other users with real-time container control services across the land and sea.",
        qnaTitle: "Frequently Asked Questions",
        qnaLetter: "Check out our customers' frequently asked questions",
        useCaseTitle: "Why should you use this solution",
        useCaseLetter: "KOREA ORBCOM's uniquely combines IoT and AIS-based solutions and services to provide critical monitoring of shipping companies, commercial fishing boats and merchant containers, and other maritime assets operating in waters around the world.",
        faqs: [
            {
                question: "What is the Maritime Platform?",
                answer: "Marine Solutions for the Smart, Connected Supply Chain"
            },
            {
                question: "How do I create a new ID on the Maritime Platform?",
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
            title: "When you need a tailored solution, contact us now.",
            subTitle: "Leveraging experience and innovation to drive your success.",
            button: "Contact Us",
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
        ],
        character: [
            {
                title: "양방향 데이터 통신 서비스 제공",
                icon: "/images/icons/TwoWay.png"
            },
            {
                title: "VHF 주파수 대역으로 전파송신 전송시간 최소화",
                icon: "/images/icons/Time.png"
            },
            {
                title: "저전력, 저출력으로 운용가능",
                icon: "/images/icons/LowPower.png"
            },
            {
                title: "사용료 및 장비가격 저렴",
                icon: "/images/icons/Descent.png"
            },
        ]
    },



    "ko": {
        title: "ORBCOMM: 저궤도 위성 네트워크",
        description: "ORBCOMM의 저궤도 위성 네트워크. 인프라가 구축되지 않은 산악/해상 등 장소에서 유용한 데이터 통신 서비스를 제공합니다.",
        openGraphDesc: "각 분야에 맞는  솔루션을 제공하며 추가 설비나 투자 비용 없이 이용 가능. 건설장비, 해양, 환경, 기상 등 다양한 분야에 상태감시, 위치추적, 원격관리 등을 제공.",
        imageIntro: "저궤도 위성을 통해 실시간 데이터 전송과 효율적인 원격 모니터링 솔루션을 제공합니다.",
        imageMain: "ORBCOMM: Low Earth Orbit",
        imageUrl: "/images/header/Satellite.jpg",
        imageSub: "",
        introTitle: "Reefer Container 감시 및 제어 시스템",
        introLetter: "전세계 Top3 선사가 선택한 ORBCOMM의 ReeferContainer는 현재 500,000개 이상의 제품이 냉동냉장 컨테이너에 설치되어 운영 중이며, 컨테이너선사, 복합운송업체, 화주 및 기타 사용자에게 육해상 전 지역에서의 실시간 컨테이너관제 서비스를 제공합니다.",
        qnaTitle: "자주 묻는 질문",
        qnaLetter: "고객들이 자주 묻는 질문을 확인해보세요",
        useCaseTitle: "이 솔루션을 사용해야 하는 이유",
        useCaseLetter: "KOREA ORBCOMM은 IoT와 AIS 기반 솔루션 및 서비스를 독특하게 결합하여 전 세계 해역에서 운영되는 해운 회사, 상업용 어선 및 상선 컨테이너 및 기타 해상 자산에 대한 중요한 모니터링을 제공합니다.",
        faqs: [
            {
                question: "Maritime Platform이 무엇인가요?",
                answer: "스마트하고 연결된 공급망을 위한 해양 솔루션입니다."
            },
            {
                question: "Maritime Platform에서 새로운 아이디를 생성하려면 어떻게 해야 하나요?",
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
            title: "맞춤형 솔루션이 필요한 순간, 지금 바로 상담하세요.",
            subTitle: "축적된 경험과 혁신으로 고객의 성공을 돕겠습니다.",
            button: "문의하기",
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
        ],
        character: [
            {
                title: "양방향 데이터 통신 서비스 제공",
                icon: "/images/icons/TwoWay.png"
            },
            {
                title: "VHF 주파수 대역으로 전파송신 전송시간 최소화",
                icon: "/images/icons/Time.png"
            },
            {
                title: "저전력, 저출력으로 운용가능",
                icon: "/images/icons/LowPower.png"
            },
            {
                title: "사용료 및 장비가격 저렴",
                icon: "/images/icons/Descent.png"
            },
        ]
    }
}
export default lowEarthOrbitData;