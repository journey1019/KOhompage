interface CharacterData {
    title: string;
    subtitle: string;
    icon: string;
}
interface KindData {
    title: string;
    image: string;
}
interface PointData {
    text: string;
}
interface AdvantageData {
    imageUrl: string;
    advantage: string;
    description: string;
}
interface CarouselData {
    title: string;
    subtitle:string;
    imageUrl: string;
}
interface CaseData {
    direction: 'left' | 'right';
    title1: string;
    title2: string;
    slug: string;
    description: string;
    image: string;
}
interface SolutionData {
    imageIntro: string;
    imageMain: string;
    imageSub: string;
    imageUrl: string;
    solutionNumber: string;
    title: string
    solutionName: string;
    description?: string;
    carousels?: CarouselData[];
    useCases?: CaseData[];
    advantages?: AdvantageData[];
    points?: PointData[];
    kind?: KindData[];
    character?: CharacterData[];
}


const solutionsData: Record<string, Record<string, SolutionData>> = {
    "en": {
        "container-iot": {
            imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
            imageMain: "Improve your experience with container solutions",
            imageSub: "Korea ofCom provides IoT solutions suitable for various fields around the world through a container monitoring service",
            imageUrl: "/images/solutions/container-iot/Container_Header.jpg",
            solutionNumber: "Container IoT",
            title: "Streamline Container Operations",
            solutionName: "",
            description: "Enhance logistics efficiency and reduce costs with container tracking solutions.",
            carousels: [
                {
                    title: "Heavy Equipment Monitoring",
                    subtitle: "Monitor operational and location data of heavy equipment...",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "Maritime Information Monitoring",
                    subtitle: "Collect and monitor maritime data such as vessel operations...",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "Public / Social Safety Network",
                    subtitle: "Used for public communication networks...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "Maritime",
                    title2: "Platform",
                    slug: "maritime",
                    description: "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG",
                },
            ],
            advantages: [
                {
                    imageUrl: "/images/icons/color/Container.png",
                    advantage: "GPS container management",
                    description: "Remote reefer container temperature monitoring and control."
                },
                {
                    imageUrl: "/images/icons/color/Platform.png",
                    advantage: "Seamless interoperability",
                    description: "Easily share data across different devices and platforms."
                },
                {
                    imageUrl: "/images/icons/color/Global.png",
                    advantage: "Global network connectivity",
                    description: "SIM (2G, 3G, 4G), Bluetooth, and more."
                },
                {
                    imageUrl: "/images/icons/color/Data.png",
                    advantage: "Easy data log access",
                    description: "Remotely access data logs without field work."
                },
                {
                    imageUrl: "/images/icons/color/Monitoring.png",
                    advantage: "24/7 live monitoring",
                    description: "Manages exceptions and resolves issues around the clock."
                },
                {
                    imageUrl: "/images/icons/color/Satellite.png",
                    advantage: "Satellite AIS",
                    description: "Supplement with satellite AIS data to see any container."
                },
                {
                    imageUrl: "/images/icons/color/Property.png",
                    advantage: "Every asset. One Platform",
                    description: "Manage containers, chassis, gensets, railcars and more."
                },
            ],
            points: [
                { text: "Stay connected to your containers anywhere." },
                { text: "Monitor key parameters remotely around the clock." },
                { text: "Remote pre-trip inspections save time and money." },
                { text: "Track guest reefers without financial investment." },
                { text: "Share data across any platform at any time." },
                { text: "Reduce excessive idling, under-utilized assets." }
            ]
        },
        "global-iot": {
            imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
            imageMain: "Improve your experience with global communication.",
            imageSub: "Through the Global Communication Network provided by Korea ofCom, we provide IoT solutions suitable for various fields around the world.",
            imageUrl: "/images/solutions/global-iot/M2M_IoT.jpg",
            solutionNumber: "Global IoT",
            title: "Industrial IoT Solutions",
            solutionName: "Industrial IoT solutions provided by KOREA ORBCOMM provide solutions suitable for various industries such as construction equipment monitoring, marine information monitoring, and climate information monitoring.",
            description: "Monitor and manage your assets globally with our IoT solutions.",
            carousels: [
                {
                    title: "Heavy Equipment Monitoring",
                    subtitle: "Monitor the operation information (operating time, condition/consumables information) and location information of heavy equipment such as construction machinery, mining equipment, and agricultural machinery operated in places with poor global communication",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "Maritime Information Monitoring",
                    subtitle: "For marine safety, marine industry, academic information, etc., ship operation/sea wave/temperature/weather information is collected by sensors and transmitted/monitored through global communication networks",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "Public / Social Safety Network",
                    subtitle: "Public network communication network and social safety net multi-communication network are used together with wired/wireless network where multi-communication network is required",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "VMS",
                    title2: "Commtrace",
                    slug: "vms",
                    description: "Real-Time Network Monitoring System",
                    image: "/images/solutions/global-iot/VMS.png",
                },
                {
                    direction: "right",
                    title1: "",
                    title2: "NMS",
                    slug: "nms",
                    description: "Real-Time Network Monitoring System",
                    image: "/images/solutions/global-iot/nms_main.png",
                },
            ],
        },
        "satellite": {
            imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
            imageMain: "안정적 통신 서비스로 경험을 향상시키세요",
            imageSub: "KOREA ORBCOMM provides satellite communication services suitable for customers through cooperation with global satellite network operators.",
            imageUrl: "/images/solutions/satellite/Satellite_Header.jpg",
            solutionNumber: "Satellite",
            title: "Communication Network",
            solutionName: "It provides optimal devices and communication networks for a wide range of industries for your customers.",
            description: "Stay connected with global satellite communication solutions.",
            carousels: [
                {
                    title: "Heavy Equipment Monitoring",
                    subtitle: "Monitor operational and location data of heavy equipment...",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "Maritime Information Monitoring",
                    subtitle: "Collect and monitor maritime data such as vessel operations...",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "Public / Social Safety Network",
                    subtitle: "Used for public communication networks...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "OGX : ",
                    title2: "next generation of satellite",
                    slug: "ogx",
                    description: "OGx Satellite Service provides satellite communication around the world using the L-Band bands of the Inmarsat 4th and 6th generation satellites. Global L-Band Satellite Service provides a reliable communication network for remote monitoring of customers' assets with network availability that is not affected by weather conditions such as rain.",
                    image: "/images/solutions/satellite/Inmarsat.jpg",
                },
                {
                    direction: "right",
                    title1: "ORBCOMM: ",
                    title2: "Low Earth Orbit",
                    slug: "low-earch-orbit",
                    description: "ORBCOM's Low Earth Orbit (LEO) satellite network, which uses a small satellite module and a whip-type omnidirectional antenna to provide useful data communication services in places such as mountain/sea where communication infrastructure is not established with easy and simple installation.",
                    image: "/images/solutions/satellite/ORBCOMM_LOW.png",
                },
                {
                    direction: "left",
                    title1: "SpaceX",
                    title2: "Starlink",
                    slug: "starlink",
                    description: "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "/images/solutions/satellite/Starlink.png",
                },
            ]
        },
        "ais": {
            imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
            imageMain: "AIS: Automatic identification system",
            imageSub: "코리아오브컴에서 제공하는 Global 통신망을 통해 전세계 다양한 분야에 적합한 IoT 솔루션을 제공합니다.",
            imageUrl: "/images/solutions/ais/AIS_Header.jpg",
            solutionNumber: "AIS",
            title: "Enhanced Maritime Tracking",
            solutionName: "",
            description: "Accurate maritime tracking with AIS solutions.",
            carousels: [
                {
                    title: "Heavy Equipment Monitoring",
                    subtitle: "Monitor operational and location data of heavy equipment...",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "Maritime Information Monitoring",
                    subtitle: "Collect and monitor maritime data such as vessel operations...",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "Public / Social Safety Network",
                    subtitle: "Used for public communication networks...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "Reefer",
                    title2: "Connect",
                    slug: "reefer-connect",
                    description: "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG",
                },
                {
                    direction: "right",
                    title1: "NMS",
                    title2: "",
                    slug: "nms",
                    description:
                        "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "/images/solutions/global-iot/nms_main.png",
                },
                {
                    direction: "left",
                    title1: "",
                    title2: "VMS",
                    slug: "vms",
                    description:
                        "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "https://www.orbcomm.co.kr/resources/img/solution/orbcommplatform/orbcommplatform_2.jpg",
                },
            ]
        }
    },


    "ko": {
        "container-iot": {
            imageIntro: "KOREAORBCOMM FOR RINANCIAL SERVICES",
            imageMain: "컨테이너 IoT 통합 솔루션",
            imageSub: "코리아오브컴의 컨테이너 솔루션은 통해 다양한 컨테이너(Reefer, Dry, Open, Flat 등)에 적합한 IoT 서비스를 제공합니다.",
            imageUrl: "/images/solutions/container-iot/Container_Header.jpg",
            solutionNumber: "Container IoT",
            title: "컨테이너 IoT 솔루션",
            solutionName: "코리아오브컴의 Container IoT Solution은 화물에 대한 실시간 추적, 화물 및 컨테이너의 상태 모니터링, Reefer Container의 원격제어 기능을 제공합니다. ",
            description: "컨테이너 IoT 솔루션으로 자산을 관리하세요.",
            carousels: [
                {
                    title: "중장비 모니터링",
                    subtitle: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "해양 정보 모니터링",
                    subtitle: "해상안전, 해양산업, 학술정보 등을 위해 선박운항/파고/기온/기상정보 등을 센서로 수집하고 글로벌 통신망을 통해 전송/모니터링",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "공공 / 사회 안전망",
                    subtitle: "공공망 통신망, 사회안전망 다중통신망이 필요한 곳에서...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "Maritime Platform",
                    title2: "",
                    slug: "maritime",
                    description: "IoT가 설치된 컨테이너의 위치와 상태를 실시간 모니터링하고, Reefer Container의 컨트롤러를 원격으로 조정하여 화물에 적합한 온도 및 습도를 설정할 수 있습니다. 또한 자동 알람을 통해 Reefer Container의 오동작, 전원 off 정보는 물론 컨테이너의 각종 알람을 모니터링하고 신속하게 대응할 수 있습니다.\n" +
                        "코리아오브컴의 컨테이너 IoT 장비는 전세계 100만대 이상 설치되어 운영중이며 선사, 화주, 복합운송업체 등 다양한 사용자에게 해상/육상 전 지역에서 수집된 데이터를 제공하여 화물의 안전한 운송에 기여하고 있습니다.  \n",
                    image: "https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG",
                }
            ],
            advantages: [
                {
                    imageUrl: "/images/icons/color/Container.png",
                    advantage: "GPS 컨테이너 관리",
                    description: "컨테이너 온도 모니터링 및 원격제어"
                },
                {
                    imageUrl: "/images/icons/color/Platform.png",
                    advantage: "원활한 상호 운용성",
                    description: "다양한 디바이스와 플랫폼에서 데이터를 쉽게 공유"
                },
                {
                    imageUrl: "/images/icons/color/Global.png",
                    advantage: "글로벌 네트워크 연결",
                    description: "2G, 3G, LTE 네트워크를 통한 글로벌 커버리지"
                },
                {
                    imageUrl: "/images/icons/color/Data.png",
                    advantage: "간편한 데이터 로그 액세스",
                    description: "컨테이너 이력정보의 손쉬운 접근"
                },
                {
                    imageUrl: "/images/icons/color/Monitoring.png",
                    advantage: "24시간 실시간 모니터링",
                    description: "실시간 모니터링"
                },
                {
                    imageUrl: "/images/icons/color/Satellite.png",
                    advantage: "위성 AIS",
                    description: "위성 AIS 데이터와 결합하여 해상이동정보 정확도 향상"
                },
                {
                    imageUrl: "/images/icons/color/Property.png",
                    advantage: "모든 자산 통합관리",
                    description: "고객의 다양한 형태의 자산을 단일플랫폼에서 통합관리"
                },
            ],
            points:[
                { text: "컨테이너가 어느곳에 있던지 위치를 확인" },
                { text: "컨테이너 및 화물을 24시간 모니터링" },
                { text: "원격 PTI를 통해 시간과 비용을 절약" },
                { text: "최소의 투자로 모니터링 및 원격제어가 가능" },
                { text: "플랫폼을 통해 모니터링하고 데이터를 공유" },
                { text: "유휴 자산 확인을 통한 Turn-Time 감소" }
            ]
        },
        "global-iot": {
            imageIntro: "",
            imageMain: "글로벌 IoT 솔루션",
            imageSub: "코리아오브컴에서 제공하는 Global 통신망(Global Cellular, 저궤도/정지궤도 위성망, IoT 망 등)을 통해 전세계 다양한 분야에 적합한 솔루션을 제공합니다.",
            imageUrl: "/images/solutions/global-iot/M2M_IoT.jpg",
            solutionNumber: "Global IoT",
            title: "산업용 IoT 솔루션",
            solutionName: "코리아오브컴에서 제공하는 산업용 IoT 솔루션은 건설장비 모니터링, 해양정보 모니터링, 기후정보 모니터링 등 다양한 산업분야에 적합한 솔루션을 제공합니다.",
            description: "글로벌 IoT 솔루션으로 자산을 관리하세요.",
            carousels: [
                {
                    title: "중장비 모니터링",
                    subtitle: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "해양 정보 모니터링",
                    subtitle: "해상안전, 해양산업, 학술정보 등을 위해 선박운항/파고/기온/기상정보 등을 센서로 수집하고 글로벌 통신망을 통해 전송/모니터링",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "공공 / 사회 안전망",
                    subtitle: "공공망 통신망, 사회안전망 다중통신망이 필요한 곳에서 유/무선망과 함께 활용",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "VMS",
                    title2: "Commtrace",
                    slug: "vms",
                    description: "전세계 통신이 열악한 장소에서 운용되는 건설기계, 광산장비, 농업기계 등 중장비의 운용정보(가동시간, 상태/소모품 정보) 및 위치정보를 모니터링하여 고객에 제공",
                    image: "https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG",
                },
                {
                    direction: "right",
                    title1: "NMS",
                    title2: "",
                    slug: "nms",
                    description: "고객에게 제공되는 웹플랫폼(Commtrace, NMS)를 통해 산업별로 적합한 데이터를 제공하고 실시간 모니터링 및 제어 기능을 제공합니다.",
                    image: "/images/solutions/global-iot/nms_main.png",
                },
            ]
        },
        "satellite": {
            imageIntro: "",
            imageMain: "KOREA ORBCOMM 위성기반 통신 서비스",
            imageSub: "코리아오브컴은 글로벌위성망 사업자와 협력을 통해 고객에게 적합한 위성통신서비스를 제공합니다.",
            imageUrl: "/images/solutions/satellite/Satellite_Header.jpg",
            solutionNumber: "Satellite",
            title: "통신망 서비스",
            solutionName: "고객의 다양한 산업 분야에 적합한 최적의 디바이스 및 통신망을 제공합니다.",
            description: "Stay connected with global satellite communication solutions.",
            carousels: [
                {
                    title: "중장비 모니터링",
                    subtitle: "전세계 통신이 열악한 장소에서 운용되는 건설기계...",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "해양 정보 모니터링",
                    subtitle: "해상안전, 해양산업, 학술정보 등을 위해...",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "공공 / 사회 안전망",
                    subtitle: "공공망 통신망, 사회안전망 다중통신망이 필요한 곳에서...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            useCases: [
                {
                    direction: "left",
                    title1: "OGX : ",
                    title2: "차세대 위성",
                    slug: "ogx",
                    description: "OGx 위성 서비스는 Inmarsat(인말셋) 4세대 및 6세대 위성의 L-Band 대역을 이용하여 전세계에 위성통신을 제공합니다. Global L-Band 위성서비스는 우천 등 기상조건의 영향을 받지 않는 네트워크 가용성으로 고객의 자산을 원격 모니터링을 위한 신뢰성있는 통신망을 제공합니다.",
                    image: "/images/solutions/satellite/Inmarsat.jpg",
                },
                {
                    direction: "right",
                    title1: "ORBCOMM: ",
                    title2: "저궤도 위성",
                    slug: "low-earth-orbit",
                    description: "ORBCOMM의 저궤도(LEO: Low Earth Orbit) 위성 네트워크. 소형 위성모듈과 Whip 형태의 무지향성 안테나를 적용하여 쉽고 간단한 설치로 통신 인프라가 구축되어 있지 않은 산악/해상 등의 장소에서 유용한 데이터 통신 서비스를 제공합니다.",
                    image: "/images/solutions/satellite/Remote.png",
                },
                {
                    direction: "left",
                    title1: "SpaceX",
                    title2: "Starlink",
                    slug: "starlink",
                    description:
                        "You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI.",
                    image: "/images/solutions/satellite/Starlink.png",
                },
            ],
            kind: [
                {
                    title: "OGx : next generation of satellite",
                    image: "/images/solutions/satellite/OrbcommInmarsat.webp"
                },
                {
                    title: "ORBCOMM : Low Earth Orbit",
                    image: "/images/solutions/satellite/LowEarthOrbit.png"
                },
                {
                    title: "SpaceX StarLink",
                    image: "/images/solutions/satellite/SpaceX.png"
                },
            ]
        },
        "ais": {
            imageIntro: "",
            imageMain: "AIS: 자동 식별 시스템",
            imageSub: "선박의 식별, 위치, 탐색을 지원하고 해양 안전을 향상시키는데 사용할 수 있는 중요한 데이터 선박 발신 시스템",
            imageUrl: "/images/solutions/ais/AIS_Header.jpg",
            solutionNumber: "AIS",
            title: "Automatic identification system",
            solutionName: "AIS(선박 자동 식별 시스템)는 선박의 식별, 위치, 탐색을 지원하고 해양 안전을 위해 사용할 수 있는 중요한 데이터를 전송하는 선박 발신 시스템 입니다. 코리아오브컴의 AIS 서비스는 위성과 물론 10,000개 이상의 육상AIS 수신국을 통해  전세계 모든 지역의 AIS 정보를 수집하여 해상 정보 분석, 수색 및 구조, 환경 모니터링 등 다양한 분야에 활용되고 있습니다.",
            description: "Accurate maritime tracking with AIS solutions.",
            carousels: [
                {
                    title: "중장비 모니터링",
                    subtitle: "전세계 통신이 열악한 장소에서 운용되는 건설기계...",
                    imageUrl: "/images/solutions/global-iot/HeavyEquipmentMonitoring.png",
                },
                {
                    title: "해양 정보 모니터링",
                    subtitle: "해상안전, 해양산업, 학술정보 등을 위해...",
                    imageUrl: "/images/solutions/global-iot/MaritimeInformationMonitoring.png",
                },
                {
                    title: "공공 / 사회 안전망",
                    subtitle: "공공망 통신망, 사회안전망 다중통신망이 필요한 곳에서...",
                    imageUrl: "/images/solutions/global-iot/SafetyNetwork.png",
                },
            ],
            character: [
                {
                    title: "Lower Latency",
                    subtitle: "Korea Orbcomm의 위성 AIS 데이터는 수신 지연 시간이 1분 이내로 제공됩니다.",
                    icon: "/images/icons/HighSpeed.png"
                },
                {
                    title: "Increased Detection Rate",
                    subtitle: "Korea Orbcomm의 전세계 해상 전역을 상시 모니터링 할 수 있도록 설계되어, 보다 효과적이고 안정적인 AIS 신호 탐지에 최적화되어 있습니다.",
                    icon: "/images/icons/Monitoring.png"
                },
                {
                    title: "Cost-Effective",
                    subtitle: "Korea ORBCOMM의 위성 AIS는 더 유연한 요금제와 고객의 요구에 적합한 서비스를 제공합니다.",
                    icon: "/images/icons/Service.png"
                }
            ]
        }
    }
};

export default solutionsData;