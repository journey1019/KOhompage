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
            ...hardware.tag,
            ...hardware.hideTag,
            ...hardware.solutionTag,
        ]
            .join(" ")
            .toLowerCase();


        // 필터링 조건
        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

        // 필터 조건
        const matchesFilters = [
            // types 필터
            !filters.types || filters.types.length === 0 || filters.types.includes(hardware.category),

            // networks 필터
            !filters.networks ||
            filters.networks.length === 0 ||
            filters.networks.some((network) =>
                NETWORK_MAPPING[network]?.some((tag) =>
                    hardware.hideTag.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
                )
            ),

            // tags 필터
            !filters.tags ||
            filters.tags.length === 0 ||
            filters.tags.some((tag) =>
                hardware.hideTag.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
            ),

            // categories 필터
            !filters.categories ||
            filters.categories.length === 0 ||
            filters.categories.some((category) =>
                hardware.hideTag.map((tag) => tag.toLowerCase()).includes(category.toLowerCase())
            ),
        ].every((condition) => condition); // 모든 조건이 만족해야 true


        const matchesTypes =
            !filters.types || filters.types.length === 0 || filters.types.includes(hardware.category);

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

        // return matchesQuery && matchesTypes && matchesNetwork && matchesTag && matchesCategory;

        // Query와 Filters 모두 충족하는 데이터만 반환
        return matchesQuery && matchesFilters;
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

/** solutionTag 에 의해 Filtering - [Page 에서 키워드 필터링] */
export const getHardwareByKeywordsInPage = (keywords: string[]): HardwareProps[] => {
    if (!keywords || keywords.length === 0) return getAllHardware();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return hardwareData.filter((hardware) => {
        if (!hardware.use) return false;

        // Normalize tags and solutionTag
        // const normalizedHideTags = hardware.hideTag.map((tag) =>
        //     tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        // );
        const normalizedSolutionTag = hardware.solutionTag.map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

        // Match against hideTag or solutionTag
        return normalizedKeywords.some(
            (keyword) =>
                // normalizedHideTags.includes(keyword) ||
                normalizedSolutionTag.includes(keyword)
        );
    });
};
