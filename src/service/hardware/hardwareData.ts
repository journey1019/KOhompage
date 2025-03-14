import hardwareData from "@/data/hardware.json";

export interface HardwareProps {
    use: boolean; // 사용 유무
    title: string;
    subTitle: string;
    description: string;
    category: string;
    imageSrc: string;
    tag: string[]; // 보여줄 태그
    hideTag: string[]; // 숨겨진 모든 태그
    solutionTag: string[]; // 각 페이지 필터링을 위한 태그 (hideTag를 사용하게 되면 굳이 필요없긴 함)
    slug: string;
    path: string;
}


export const NETWORK_MAPPING: Record<string, string[]> = {
    "Satellite(ORBCOMM)": ["ORBCOMM"],
    "Satellite(OGx/IDP)": ["OGx/IDP"],
    "Satellite(Starlink)": ["Starlink"],
    "Satellite(NTN)": ["NTN"],
    "Cellular(LTE/3G/2G)": ["LTE/3G/2G", "Cellular"],
    "Sigfox": ["Sigfox"],
}

export interface FilterOptions {
    categories?: string[];
    types?: string[];
    networks?: string[];
    tags?: string[];
}

export const getAllHardware = (): HardwareProps[] => {
    // 'use' 필드가 true 인 게시글만 가져오기
    return hardwareData.filter((hardware) => hardware.use);
};

// 검색 필터링 함수
export const getFilteredHardwaresByQueryAndFilters = (
    query: string,
    filters: FilterOptions
): HardwareProps[] => {
    const normalizeString = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9가-힣]/g, ""); // 대소문자 변환 및 특수문자 제거

    const normalizedQuery = normalizeString(query.trim());

    return hardwareData.filter((hardware) => {
        // use 필드가 true 인지 확인
        if (!hardware.use) return false;

        // 검색어 필터링
        const searchableContent = [
            hardware.title,
            hardware.subTitle || "",
            hardware.description || "",
            hardware.category,
            ...hardware.tag,
            ...hardware.hideTag,
            ...hardware.solutionTag,
        ]
            .map(normalizeString) // 모든 문자열을 정규화
            .join(" ")

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

        // 필터 조건 검사
        const matchesFilters = [
            !filters.categories ||
            filters.categories.length === 0 ||
            filters.categories.every((category) =>
                hardware.hideTag.map(normalizeString).includes(normalizeString(category))
            ),
            !filters.types ||
            filters.types.length === 0 ||
            filters.types.every((type) =>
                normalizeString(hardware.category) === normalizeString(type)
            ),
            !filters.networks ||
            filters.networks.length === 0 ||
            filters.networks.every((network) =>
                NETWORK_MAPPING[network]?.some((tag) =>
                    hardware.hideTag
                        .map(normalizeString)
                        .includes(normalizeString(tag))
                )
            ),
            !filters.tags ||
            filters.tags.length === 0 ||
            filters.tags.every((tag) =>
                hardware.hideTag.map(normalizeString).includes(normalizeString(tag))
            ),
        ].every((condition) => condition); // 모든 조건이 만족해야 true

        // Query와 Filters 모두 충족하는 데이터만 반환
        return matchesQuery && matchesFilters;
    });
};



export const getHardwareByKeywords = (keywords: string[]): HardwareProps[] => {
    // Return all hardware if no keywords are provided
    if (!keywords || keywords.length === 0) return getAllHardware(); // 모든 데이터를 반환

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return hardwareData.filter((hardware) => {
        // Ensure the resource is usable
        if (!hardware.use) return false;

        // Check if any normalized keyword matches the tags
        const normalizedTags = hardware.hideTag.map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9가-힣]/g, "")
        );

        return normalizedKeywords.some((keyword) => normalizedTags.includes(keyword));
    });
};

/** solutionTag 에 의해 Filtering - [Page 에서 키워드 필터링] */
export const getHardwareByKeywordsInPage = (keywords: string[]): HardwareProps[] => {
    if (!keywords || keywords.length === 0) return getAllHardware();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9가-힣]/g, "")
    );

    return hardwareData.filter((hardware) => {
        if (!hardware.use) return false;

        const normalizedSolutionTag = hardware.solutionTag.map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9가-힣]/g, "")
        );

        // Match against hideTag or solutionTag
        return normalizedKeywords.some(
            (keyword) =>
                // normalizedHideTags.includes(keyword) ||
                normalizedSolutionTag.includes(keyword)
        );
    });
};
