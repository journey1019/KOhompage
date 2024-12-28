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
    //solutionsTags?: string[]; // 각 페이지 필터링을 위한 태그 (hideTag를 사용하게 되면 굳이 필요없긴 함)
    slug: string;
    path: string;
}


// 하나의 키워드 매칭
// export const NETWORK_MAPPING: Record<string, string> = {
//     "Satellite(ORBCOMM)": "ORBCOMM",
//     "Satellite(OGx/IDP)": "OGx/IDP",
//     "Satellite(Starlink)": "Starlink",
//     "Satellite(NTN)": "NTN",
//     "Cellular(LTE/3G/2G)": "LTE/3G/2G",
//     "Sigfox": "Sigfox",
// }
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
    const normalizedQuery = query.trim().toLowerCase();

    return hardwareData.filter((hardware) => {
        // use 필드가 true 인지 확인
        if (!hardware.use) return false;

        // 검색어 필터링
        const searchableContent = [
            hardware.title,
            hardware.subTitle || "",
            hardware.description || "",
            hardware.category,
            ...hardware.hideTag,
        ]
            .join(" ")
            .toLowerCase();

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

        // 필터링 조건
        const matchesTypes =
            !filters.types || filters.types.length === 0 || filters.types.includes(hardware.category);

        const matchesNetwork1 =
            !filters.networks ||
            filters.networks.length === 0 ||
            filters.networks.some((network) =>
                hardware.hideTag.map((tag) => tag.toLowerCase()).includes(network.toLowerCase())
            );

        const matchesNetwork =
            !filters.networks ||
            filters.networks.length === 0 ||
            // Cellular(LTE/3G/2G) = LTE/3G/2G 로 설정하고 싶을 때
            // filters.networks.some((network) => {
            //     const mappedTag = NETWORK_MAPPING[network];
            //     return mappedTag && hardware.hideTag.map((tag) => tag.toLowerCase()).includes(mappedTag.toLowerCase());
            // });
            // Cellular(LTE/3G/2G) = Cellular || LTE/3G/2G 로 설정하고 싶을 때
            filters.networks.some((network) => {
                const mappedTags = NETWORK_MAPPING[network]; // 배열로 가져옴
                return mappedTags?.some((mappedTag) =>
                    hardware.hideTag.map((tag) => tag.toLowerCase()).includes(mappedTag.toLowerCase())
                );
            });

        const matchesTag =
            !filters.tags ||
            filters.tags.length === 0 ||
            filters.tags.some((ta) =>
                hardware.hideTag.map((tag) => tag.toLowerCase()).includes(ta.toLowerCase())
            );

        // categories 필터: hardware.tag에서 categories와 매칭
        const matchesCategory =
            !filters.categories ||
            filters.categories.length === 0 ||
            filters.categories.some((category) =>
                hardware.hideTag.map((hwTag) => hwTag.toLowerCase()).includes(category.toLowerCase())
            );

        return matchesQuery && matchesTypes && matchesNetwork && matchesTag && matchesCategory;
    })
}

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
            tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

        return normalizedKeywords.some((keyword) => normalizedTags.includes(keyword));
    });
};