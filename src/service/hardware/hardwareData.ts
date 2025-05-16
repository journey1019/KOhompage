import { Hardware } from "@/types/hardware";

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

export const getAllHardware = async (): Promise<Hardware[]> => {
    const res = await fetch('/api/hardware');
    const data: Hardware[] = await res.json();
    return data;

    // 'use' 필드가 true 인 게시글만 가져오기
    // return hardwareData.filter((hardware) => hardware.use);
};

// 검색 필터링 함수
export const getFilteredHardwaresByQueryAndFilters = async (
    query: string,
    filters: FilterOptions
): Promise<Hardware[]> => {
    const normalizeString = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");

    const res = await fetch('/api/hardware');
    const data: Hardware[] = await res.json();
    const normalizedQuery = normalizeString(query.trim());

    return data.filter((hardware) => {
        // if (!hardware.use) return false; // ✅ 여기서 use: true 필터링

        const searchableContent = [
            hardware.category,
            hardware.title,
            hardware.subtitle || "",
            hardware.description || "",
            hardware.tags,
            hardware.hideTag,
            hardware.solutionTag,
        ].map(normalizeString).join(" ");

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

        const matchesFilters = [
            !filters.categories?.length ||
            filters.categories.every(category =>
                hardware.hideTag.split(',').map(normalizeString).includes(normalizeString(category))
            ),
            !filters.types?.length ||
            filters.types.every(type =>
                normalizeString(hardware.category) === normalizeString(type)
            ),
            !filters.networks?.length ||
            filters.networks.every(network =>
                NETWORK_MAPPING[network]?.some(tag =>
                    hardware.hideTag.split(',').map(normalizeString).includes(normalizeString(tag))
                )
            ),
            !filters.tags?.length ||
            filters.tags.every(tag =>
                hardware.hideTag.split(',').map(normalizeString).includes(normalizeString(tag))
            ),
        ].every(Boolean);

        return matchesQuery && matchesFilters;
    });
};




export const getHardwareByKeywords = async (keywords: string[]): Promise<Hardware[]> => {
    const res = await fetch('/api/hardware');
    const data: Hardware[] = await res.json();

    // Return all hardware if no keywords are provided
    if (!keywords || keywords.length === 0) return getAllHardware(); // 모든 데이터를 반환

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return data.filter((hardware) => {
        // Ensure the resource is usable
        if (!hardware.use) return false;

        // Check if any normalized keyword matches the tags
        const normalizedTags = hardware.hideTag.split(',').map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9가-힣]/g, "")
        );

        return normalizedKeywords.some((keyword) => normalizedTags.includes(keyword));
    });
};

/** solutionTag 에 의해 Filtering - [Page 에서 키워드 필터링] */
export const getHardwareByKeywordsInPage = async (keywords: string[]): Promise<Hardware[]> => {
    const res = await fetch('/api/hardware');
    const data: Hardware[] = await res.json();

    if (!keywords || keywords.length === 0) return getAllHardware();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9가-힣]/g, "")
    );

    return data.filter((hardware) => {
        if (!hardware.use) return false;

        const normalizedSolutionTag = hardware.solutionTag.split(',').map((tag) =>
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
