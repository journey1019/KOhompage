interface HardwareData{
    pageTopImageTitle: string;
    pageTopImageSubtitle: string;
    pageTopImageDescription: string;
    searchBarTitle: string;
}

const hardwareData: Record<string, HardwareData> = {
    "en": {
        pageTopImageTitle: "Innovative and Reliable Hardware",
        pageTopImageSubtitle: "Hardware Solutions",
        pageTopImageDescription: "Discover our hardware products that enable connectivity and tracking.",
        searchBarTitle: "Search for Hardware"
    },
    "ko": {
        pageTopImageTitle: "혁신적이고 신뢰할 수 있는 장비",
        pageTopImageSubtitle: "하드웨어 솔루션",
        pageTopImageDescription: "연결성과 추적을 가능하게 하는 우리의 하드웨어 제품을 발견하십시오.",
        searchBarTitle: "하드웨어를 검색 해보세요"
    }
}
export default hardwareData;