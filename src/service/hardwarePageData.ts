interface HardwareData{
    title: string;
    description: string;
    openGraphDesc: string;
    pageTopImageIntro: string;
    pageTopImageTitle: string;
    pageTopImageSubtitle: string;
    searchBarTitle: string;
}

const hardwareData: Record<string, HardwareData> = {
    "en": {
        title: "Hardware",
        description: "This is the introduction page for IoT hardware solutions. We provide the best IoT hardware.",
        openGraphDesc: "This is the introduction page for IoT hardware solutions.",
        pageTopImageIntro: "Innovative and Reliable Hardware",
        pageTopImageTitle: "Hardware Solutions",
        pageTopImageSubtitle: "Discover our hardware products that enable connectivity and tracking.",
        searchBarTitle: "Search for Hardware"
    },
    "ko": {
        title: "Hardware",
        description: "IoT 하드웨어 솔루션 소개 페이지입니다. 최고의 IoT 하드웨어를 제공합니다.",
        openGraphDesc: "IoT 하드웨어 솔루션 소개 페이지입니다.",
        pageTopImageIntro: "혁신적이고 신뢰할 수 있는 장비",
        pageTopImageTitle: "하드웨어 솔루션",
        pageTopImageSubtitle: "연결성과 추적을 가능하게 하는 우리의 하드웨어 제품을 발견하십시오.",
        searchBarTitle: "하드웨어를 검색 해보세요"
    }
}
export default hardwareData;