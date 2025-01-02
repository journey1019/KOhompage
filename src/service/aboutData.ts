interface SectionData {
    image: string;
    title: string;
    description: string;
    reverse?: boolean;
}
interface ValueData {
    image: string;
    title: string;
    description: string;
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
    imageIntro: string;
    imageMain: string;
    imageUrl: string;
    imageSub: string;
    imageThird: string;
    valueTitle: string;
    faqs?: FaqData[];
    ctas: CtaData;
    value: ValueData[];
    feature: SectionData[];
}

const maritimeData: Record<string, MaritimeData> = {
    "en": {
        imageIntro: "About",
        imageUrl: "/images/header/Company.jpg",
        imageMain: "KOREA ORBCOMM provides reliable",
        imageSub: "connectivity for all customer assets",
        imageThird: "and infrastructure.",
        valueTitle: "Why KOREA ORBCOMM",
        faqs: [
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
            title: "Have any questions?",
            subTitle: "Send us a message today to learn more about our company values and how we can help you achieve your goals.",
            button: "Contact Us",
        },
        value: [
            {
                image: '/images/icons/About/Experienced.png',
                title: 'Experienced',
                description: '30 years of IoT development and key domain expertise.'
            },
            {
                image: '/images/icons/About/Comprehensive.png',
                title: 'Comprehensive',
                description: 'End-to-end turn-key solutions: devices, satellite/cellular connectivity and analytics apps.'
            },
            {
                image: '/images/icons/About/Proven.png',
                title: 'Proven',
                description: '2.2 million subscribers and countless industry awards for innovation excellence.'
            },
            {
                image: '/images/icons/About/Reliable.png',
                title: 'Reliable',
                description: 'Ubiquitous global coverage across multiple satellite and cellular networks.'
            },
            {
                image: '/images/icons/About/Global.png',
                title: 'Global',
                description: 'We are where you are, with authorizations in 120 countries and offices in 15 regions.'
            },
            {
                image: '/images/icons/About/Innovative.png',
                title: 'Innovative',
                description: 'More than 175 patents, 300 engineers and the only satellite network dedicated to IoT.'
            },
            {
                image: '/images/icons/About/CustomerFocused.png',
                title: 'Customer-focused',
                description: '…with global best-in-class multilingual sales, service and 24/7/365 technical support teams.\n'
            },
            {
                image: '/images/icons/About/SingleSource.png',
                title: 'Single source',
                description: 'All your asset data where and when you need it.'
            },
        ],
        feature: [
            {
                image: '/images/about/ORBCOMM_Company_AboutUs_Mission.webp',
                title: 'Unlocking Potential with the Power of Data',
                description: 'Our innovative IoT technology helps customers optimize their industrial operations and build a more sustainable future.',
            },
            // {
            //     image: '/images/solutions/ais/UseData2.png',
            //     title: '고품질의 AIS 데이터',
            //     description: 'Korea ORBCOMM의 AIS 서비스는 60만척 이상의 선박에서 일일 천만개의 AIS 메시지를 수집/처리합니다.',
            //     reverse: true, // 이미지와 텍스트 위치 반전
            // },
        ]
    },

    "ko": {
        imageIntro: "KOREA ORBCOMM",
        imageUrl: "/images/header/Company.jpg",
        imageMain: "코리아오브컴은",
        imageSub: "고객의 모든 자산/인프라에",
        imageThird: "Connectivity를 제공합니다.",
        valueTitle: "Why KOREA ORBCOMM",
        faqs: [
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
            title: "궁금한 점이 있으신가요?",
            subTitle: "저희 회사의 가치와 목표 달성을 위한 지원 방법에 대해 더 알아보시려면 지금 메시지를 보내주세요.",
            button: "문의하기"
        },
        value: [
            {
                "image": "/images/icons/About/Experienced.png",
                "title": "풍부한 경험",
                "description": "30년의 IoT 개발과 주요 도메인 전문성을 보유하고 있습니다."
            },
            {
                "image": "/images/icons/About/Comprehensive.png",
                "title": "포괄적인 솔루션",
                "description": "디바이스, 위성/셀룰러 연결, 분석 앱을 포함한 엔드 투 엔드 턴키 솔루션을 제공합니다."
            },
            {
                "image": "/images/icons/About/Proven.png",
                "title": "입증된 성과",
                "description": "220만 명의 가입자와 혁신 우수성을 인정받은 다수의 산업 수상 경력이 있습니다."
            },
            {
                "image": "/images/icons/About/Reliable.png",
                "title": "신뢰할 수 있는 네트워크",
                "description": "다수의 위성 및 셀룰러 네트워크를 통해 전 세계적으로 끊김 없는 서비스를 제공합니다."
            },
            {
                "image": "/images/icons/About/Global.png",
                "title": "글로벌 네트워크",
                "description": "120개국에서 인증을 받았으며 15개 지역에 사무소를 운영하고 있습니다."
            },
            {
                "image": "/images/icons/About/Innovative.png",
                "title": "혁신적 기술",
                "description": "175건 이상의 특허, 300명의 엔지니어, IoT 전용 위성 네트워크를 보유하고 있습니다."
            },
            {
                "image": "/images/icons/About/CustomerFocused.png",
                "title": "고객 중심",
                "description": "다국어 지원 글로벌 최상의 세일즈, 서비스 및 연중무휴(24/7/365) 기술 지원팀을 제공합니다."
            },
            {
                "image": "/images/icons/About/SingleSource.png",
                "title": "통합 데이터 소스",
                "description": "필요한 자산 데이터를 필요한 시간과 장소에서 제공합니다."
            }
        ],
        feature: [
            {
                image: '/images/about/ORBCOMM_Company_AboutUs_Mission.webp',
                title: '데이터의 힘으로 잠재력을 실현하다',
                description: '혁신적인 IoT 기술을 통해 고객이 산업 운영을 최적화하고 더욱 지속 가능한 미래를 구축할 수 있도록 돕습니다.'
            },
            // {
            //     image: '/images/solutions/ais/UseData2.png',
            //     title: '고품질의 AIS 데이터',
            //     description: 'Korea ORBCOMM의 AIS 서비스는 60만척 이상의 선박에서 일일 천만개의 AIS 메시지를 수집/처리합니다.',
            //     reverse: true, // 이미지와 텍스트 위치 반전
            // },
        ]
    }
}
export default maritimeData;