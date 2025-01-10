interface ResourcesData{
    introduce: string;
    description: string;
    openGraphDesc: string;
}
const ResourcesData: Record<string, ResourcesData> = {
    "en": {
        introduce: "KOREA ORBCOMM | An integrated platform providing IoT services.",
        description: "KOREA ORBCOMM, a global leader in IoT and satellite communication solutions, delivers top-tier IoT connectivity services.",
        openGraphDesc: "KOREA ORBCOMM, a global leader in IoT and satellite communication solutions."
    },
    "ko": {
        introduce: "코리아오브컴 | IoT 서비스를 제공하는 통합 플랫폼",
        description: "IoT와 위성통신 솔루션의 글로벌 리더, KOREA ORBCOMM. 최고의 IoT 통신 서비스를 제공합니다.",
        openGraphDesc: "IoT와 위성통신 솔루션의 글로벌 리더, KOREA ORBCOMM."
    }
}
export default ResourcesData;
