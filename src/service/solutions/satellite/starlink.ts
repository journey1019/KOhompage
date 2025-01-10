interface CharacterData {
    title: string;
    icon: string;
}

interface CtaData{
    imageUrl: string;
    title: string;
    subTitle: string;
    button: string;
}
interface FaqData{
    question: string;
    answer: string;
}

interface StarlinkData{
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
    character?: CharacterData[];
}

const starlinkData: Record<string, StarlinkData> = {
    "en": {
        title: "Starlink: SpaceX",
        description: "Offers lower latency and faster download/upload speeds than traditional satellite internet. Ensures fast and reliable connectivity with 1,000+ LEO satellites.",
        openGraphDesc: "Offers lower latency and faster download/upload speeds than traditional satellite internet. Ensures fast and reliable connectivity with 1,000+ LEO satellites.",
        imageIntro: "It is an ultra-fast, low-latency satellite Internet solution that provides stable Internet connections anywhere on the planet.",
        imageMain: "Marine Solutions for the Smart, Connected Supply Chain",
        imageUrl: "/images/header/Starlink.webp",
        imageSub: "",
        "introTitle": "Innovative Satellite Internet Technology",
        "introLetter": "Starlink is a low-Earth orbit satellite internet service developed by SpaceX, providing high-speed internet access anywhere in the world.",
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
            imageUrl: "/images/solutions/satellite/StarlinkLink.png",
            title: "HIGH-SPEED INTERNET AROUND THE WORLD",
            subTitle: "It provides a reliable Internet connection anytime, anywhere.",
            button: "Get a tailored quote",
        },
        character: [
            {
                title: "LEO satellite connectivity",
                icon: "/images/icons/Satellite.png"
            },
            {
                title: "High-speed connectivity",
                icon: "/images/icons/HighSpeed.png"
            },
            {
                title: "Low-latency technoloy",
                icon: "/images/icons/LowLatencyTech.png"
            },
            {
                title: "Maritime Coverage",
                icon: "/images/icons/Maritime.png"
            },
            {
                title: "Compact antenna",
                icon: "/images/icons/Antenna1.png"
            }
        ]
    },



    "ko": {
        title: "스타링크: 스페이스X",
        description: "기존 위성 인터넷보다 낮은 지연 시간(Latency)과 빠른 다운로드/업로드 속도를 제공. 1000개 이상의 저궤도 위성 네트워크로 빠르고 안정적인 연결을 보장.",
        openGraphDesc: "기존 위성 인터넷보다 낮은 지연 시간(Latency)과 빠른 다운로드/업로드 속도를 제공. 1000개 이상의 저궤도 위성 네트워크로 빠르고 안정적인 연결을 보장.",
        imageIntro: "초고속 저지연 위성 인터넷 솔루션으로, 지구 어디에서나 안정적인 인터넷 연결을 제공합니다.",
        imageMain: "SpaceX: Starlink Satellite",
        imageUrl: "/images/header/Starlink.webp",
        imageSub: "",
        introTitle: "혁신적인 위성 인터넷 기술",
        introLetter: "Starlink는 SpaceX가 개발한 저궤도 위성 인터넷 서비스로, 전 세계 어디서나 고속 인터넷 접속을 제공합니다.",
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
            imageUrl: "/images/solutions/satellite/StarlinkLink.png",
            title: "전 세계 고속 인터넷",
            subTitle: "언제 어디에서나 안정적인 인터넷 연결을 제공합니다.",
            button: "맞춤형 견적을 받아보세요",
        },
        character: [
            {
                title: "LEO 위성 연결",
                icon: "/images/icons/Satellite.png"
            },
            {
                title: "고속 연결",
                icon: "/images/icons/HighSpeed.png"
            },
            {
                title: "낮은 지연 기술",
                icon: "/images/icons/LowLatencyTech.png"
            },
            {
                title: "해양 커버",
                icon: "/images/icons/Maritime.png"
            },
            {
                title: "컴팩트 안테나",
                icon: "/images/icons/Antenna1.png"
            }
        ]
    }
}
export default starlinkData;