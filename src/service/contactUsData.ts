interface ContactUsData {
    title: string;
    description: string;
    openGraphDesc: string;
    introText: string;
}
const contactUsData: Record<string, ContactUsData> = {
    "en": {
        title: "Contact Us",
        description: "This page is the customer inquiry page for KOREA ORBCOMM. Please feel free to inquire about our industrial IoT solutions that assist with transportation, heavy equipment, marine, oil and gas, utilities, and asset management.",
        openGraphDesc: "Feel free to ask about IoT and satellite communication solutions. Submit your inquiries through the form below, and our sales representative will provide you with detailed information.",
        introText: "Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.",
    },
    "ko": {
        title: "문의하기",
        description: "KOREA ORBCOMM의 고객 문의 페이지입니다. 운송, 중장비, 해양, 석유 및 가스, 유틸리티 및 고객의 자산 운용을 돕는 산업용 IoT 솔루션에 대해 문의하세요.",
        openGraphDesc: "IoT 및 위성 통신 솔루션을 비롯하여 궁금한 점에 대해 물어보세요. 아래 양식을 통해 편하게 문의해주시면 세일즈 담당자가 자세히 알려드리겠습니다.",
        introText: "큰 아이디어나 개발할 브랜드가 있으신가요? 도움이 필요하시다면 언제든 연락주세요! 여러분의 프로젝트에 대해 듣고, 필요한 도움을 제공해드리고 싶습니다.",
    },
}
export default contactUsData;