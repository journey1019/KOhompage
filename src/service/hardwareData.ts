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

// chips를 기준으로 데이터를 필터링하는 함수
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
