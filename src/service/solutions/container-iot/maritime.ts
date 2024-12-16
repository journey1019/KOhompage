interface CtaData{
    title: string;
    subTitle: string;
    button: string;
    button2: string;
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
}

const maritimeData: Record<string, MaritimeData> = {
    "en": {
        imageIntro: "See more. Know more. Do more: The industry’s single source for complete maritime asset visibility and control.",
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
            title: "Master Maritime Visibility with ORBCOMM",
            subTitle: "Gain remote vessel tracking, monitoring and control capabilities for your commercial fishing boats, merchant marine fleets and more.",
            button: "Get a tailored quote",
            button2: "Give It a Try!"
        }
    },
    "ko": {
        imageIntro: "더 많이 보고, 더 깊이 알고, 더 능숙하게 행동하십시오: 업계에서 유일하게 완전한 해양 자산 가시성과 제어를 제공하는 단일 솔루션.",
        imageMain: "스마트하고 연결된 공급망을 위한 해양 솔루션",
        imageUrl: "/images/header/Port.jpg",
        imageSub: "",
        introTitle: "Reefer Container 감시 및 제어 시스템",
        introLetter: "전세계 Top3 선사가 선택한 ORBCOMM의 ReeferContainer는 현재 500,000개 이상의 제품이 냉동냉장 컨테이너에 설치되어 운영 중이며, 컨테이너선사, 복합운송업체, 화주 및 기타 사용자에게 육해상 전 지역에서의 실시간 컨테이너관제 서비스를 제공합니다.",
        qnaTitle: "자주 묻는 질문",
        qnaLetter: "고객들이 자주 묻는 질문을 확인해보세요",
        useCaseTitle: "이 솔루션을 사용해야 하는 이유",
        useCaseLetter: "KOREA ORBCOMM은 IoT와 AIS 기반 솔루션 및 서비스를 독특하게 결합하여 전 세계 해역에서 운영되는 해운 회사, 상업용 어선 및 상선 컨테이너 및 기타 해상 자산에 대한 중요한 모니터링을 제공합니다.",
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
            title: "ORBCOMM으로 해상 가시성 마스터하기",
            subTitle: "상업용 어선, 상선 함대 등에 대한 원격 선박 추적, 모니터링 및 제어 기능을 확보하세요.",
            button: "맞춤형 견적을 받아보세요",
            button2: "솔루션을 경험해봐!"
        }
    }
}
export default maritimeData;