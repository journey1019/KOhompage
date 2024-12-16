interface CaseData {
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    description: string;
    image: string;
}

interface SolutionData {
    useCases: CaseData[];
}



const solutionsAdvantage: Record<string, Record<string, SolutionData>> = {
    "en": {
        "maritime": {
            useCases: [
                {
                    direction: "left",
                    title1: "",
                    title2: "Visibility",
                    description: "Stay connected to your containers on land and sea with reliable monitoring for dry and refrigerated containers and their cargo.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-1-visibility-1440x776.png",
                },
                {
                    direction: "right",
                    title1: "",
                    title2: "Optimization",
                    description: "Maximize fuel consumption, asset utilization and more by driving operational decisions with container telematics data.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-2-Optimization.png",
                },
                {
                    direction: "left",
                    title1: "",
                    title2: "Utilization",
                    description: "Ensure containers are always working at peak efficiency through continuous monitoring of location and cargo status data.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-3-utilization.png",
                },
                {
                    direction: "right",
                    title1: "Cargo Security and",
                    title2: "Integrity",
                    description: "Real-time cargo position and condition data allows you to provide value-added services to customers such as shipment status, current location and accurate ETAs.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-4-cargo-security-and-integrity.png",
                },
            ],
        },
    },

    "ko": {
        "maritime": {
            useCases: [
                {
                    direction: "left",
                    title1: "가시성",
                    title2: "",
                    description: "건조 및 냉장 컨테이너와 화물에 대한 신뢰할 수 있는 모니터링을 통해 육상 및 해상 컨테이너에 계속 연결하세요.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-1-visibility-1440x776.png",
                },
                {
                    direction: "right",
                    title1: "",
                    title2: "최적화",
                    description: "컨테이너 텔레매틱스 데이터를 통해 운영 결정을 유도하여 연료 소비, 자산 활용 등을 극대화하십시오.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-2-Optimization.png",
                },
                {
                    direction: "left",
                    title1: "활용",
                    title2: "",
                    description: "위치 및 화물 상태 데이터를 지속적으로 모니터링하여 컨테이너가 항상 최고 효율로 작동하도록 보장합니다.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-3-utilization.png",
                },
                {
                    direction: "right",
                    title1: "",
                    title2: "화물 보안 및 무결성",
                    description: "실시간 화물 위치 및 상태 데이터를 통해 고객에게 배송 상태, 현재 위치, 정확한 도착 예정 시간 등 부가가치 서비스를 제공할 수 있습니다.",
                    image: "/images/solutions/container-iot/maritime/Maritime-Benefits-4-cargo-security-and-integrity.png",
                }
            ]
        }
    }
};

export default solutionsAdvantage;
