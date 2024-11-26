interface SolutionData {
    solutionNumber: string;
    title: string;
    solutionName: string;
    description?: string;
    imageUrl: string;
}

const solutionsData: Record<string, Record<string, SolutionData>> = {
    "en": {
        "container-iot": {
            solutionNumber: "Solution 1",
            title: "Streamline Container Operations",
            solutionName: "Container IoT",
            description: "Enhance logistics efficiency and reduce costs with container tracking solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/container_iot.jpg",
        },
        "global-iot": {
            solutionNumber: "Solution 2",
            title: "Real-Time Visibility for Your Containers",
            solutionName: "Global IoT",
            description: "Monitor and manage your assets globally with our IoT solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg"
        },
        "satellite": {
            solutionNumber: "Solution 3",
            title: "Reliable Satellite Communication",
            solutionName: "Satellite",
            description: "Stay connected with global satellite communication solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/satellite.jpg"
        },
        "ais": {
            solutionNumber: "Solution 4",
            title: "Enhanced Maritime Tracking",
            solutionName: "AIS",
            description: "Accurate maritime tracking with AIS solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/ais.jpg"
        }
    },
    "ko": {
        "container-iot": {
            solutionNumber: "솔루션 1",
            title: "실시간 컨테이너 가시성",
            solutionName: "컨테이너 IoT",
            description: "컨테이너 IoT 솔루션으로 자산을 관리하세요.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/container_iot.jpg"
        },
        "global-iot": {
            solutionNumber: "솔루션 2",
            title: "실시간 컨테이너 가시성",
            solutionName: "글로벌 IoT",
            description: "글로벌 IoT 솔루션으로 자산을 관리하세요.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg"
        },
        "satellite": {
            solutionNumber: "Solution 3",
            title: "Reliable Satellite Communication",
            solutionName: "Satellite",
            description: "Stay connected with global satellite communication solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/satellite.jpg"
        },
        "ais": {
            solutionNumber: "Solution 4",
            title: "Enhanced Maritime Tracking",
            solutionName: "AIS",
            description: "Accurate maritime tracking with AIS solutions.",
            imageUrl: "https://www.orbcomm.co.kr/resources/img/background/ais.jpg"
        }
    }
};

export default solutionsData;
