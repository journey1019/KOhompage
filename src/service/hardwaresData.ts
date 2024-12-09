interface TagData {
    tag: string;
}
interface HardwareData {
    path: string;
    title: string;
    tag?: TagData[];
}

const hardwaresData: Record<string, Record<string, HardwareData>> = {
    "en": {
        "ct-3500": {
            path: "ct-3500",
            title: "CT 3500",
            tag: [
                { tag: "Monitoring" },
                { tag: "News" },
            ]
        },
        "st-6100": {
            path: "st-6100",
            title: "ST 6100",
            tag: [
                { tag: "NMS" },
                { tag: "VMS" },
            ]
        }
    }
}
export default hardwaresData;