import hardwareData from "@/data/hardware.json";

interface HardwareItem {
    title: string;
    subTitle: string;
    description: string;
    category: string;
    imageSrc: string;
    tag: string[];
    slug: string;
    featured: boolean;
}

// 모든 데이터를 가져오는 함수
export const getHardwareData = (): HardwareItem[] => {
    return hardwareData as HardwareItem[];
};

// 특수문자 및 공백 제거 함수
const normalizeString = (str: string): string => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, ""); // 소문자로 변환 후 특수문자 제거
};


// 모든 검색어가 포함된 데이터를 필터링
// ex) maritime: Only maritime
export const getFilterHardwareByChips = (chips: string[]): HardwareItem[] => {
    if (chips.length === 0) {
        return getHardwareData(); // chips가 없으면 전체 데이터 반환
    }

    // chips를 정규화
    const normalizedChips = chips.map(normalizeString);

    return getHardwareData().filter((item) => {
        // 각 HardwareItem의 검색 대상 필드를 정규화하여 하나의 문자열로 결합
        const normalizedContent = [
            item.title,
            item.subTitle,
            item.description,
            ...item.tag,
            item.slug,
        ]
            .map(normalizeString) // 각 문자열을 정규화
            .join(" "); // 정규화된 문자열 결합

        // 모든 chips가 normalizedContent에 포함되어 있는지 확인
        return normalizedChips.every((chip) => normalizedContent.includes(chip));
    });
};


// 하나 이상의 검색어가 포함된 데이터를 필터링
// ex) container-iot: container-iot, maritime
export const getFilteredByKeywords = (chips: string[]): HardwareItem[] => {
    if (chips.length === 0) {
        return getHardwareData(); // Chips가 없으면 전체 데이터를 반환
    }

    const normalizedChips = chips.map(normalizeString);

    return getHardwareData().filter((item) => {
        const { title, subTitle, description, tag, slug } = item;

        // title, subTitle, description, tag, slug를 하나로 합쳐 정규화
        const normalizedContent = [
            title,
            subTitle,
            description,
            ...tag,
            slug,
        ]
            .map(normalizeString) // 각 문자열 정규화
            .join(" ") // 모든 필드를 하나의 문자열로 합침

        // 하나의 chip이라도 포함되면 true 반환
        return normalizedChips.some((chip) => normalizedContent.includes(chip));
    });
};