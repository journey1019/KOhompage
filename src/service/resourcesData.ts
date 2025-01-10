interface ResourcesData{
    introduce: string;
    description: string;
    openGraphDesc: string;
}
const ResourcesData: Record<string, ResourcesData> = {
    "en": {
        introduce: "Resources",
        description: "This is the resource page of KOREA ORBCOMM. Explore resources related to IoT and satellite communication solutions.",
        openGraphDesc: "Explore resources related to IoT and satellite communication solutions.",
    },
    "ko": {
        introduce: "자료실",
        description: "KOREA ORBCOMM의 자료실 페이지입니다. IoT 및 위성 통신 솔루션 관련 리소스를 확인하세요.",
        openGraphDesc: "IoT 및 위성 통신 솔루션 관련 리소스를 확인하세요.",
    }
}
export default ResourcesData;
