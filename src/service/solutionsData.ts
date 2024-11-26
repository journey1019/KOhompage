interface SolutionData {
    solutionNumber: string;
    title: string;
    solutionName: string;
    description?: string;
    imageUrl: string;
}

const solutionsData: Record<string, SolutionData> = {
    "global-iot": {
        solutionNumber: "Solution 1",
        title: "Real-Time Visibility for Your Containers",
        solutionName: "Global IoT",
        description: "Monitor and manage your assets globally with our IoT solutions.",
        imageUrl: "https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg"
    },
    "container-iot": {
        solutionNumber: "Solution 2",
        title: "Streamline Container Operations",
        solutionName: "Container IoT",
        description: "Enhance logistics efficiency and reduce costs with container tracking solutions.",
        imageUrl: "https://www.orbcomm.co.kr/resources/img/background/container_iot.jpg"
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
};

export default solutionsData;
