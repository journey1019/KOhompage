import resourcesData from "@/data/resource.json";

export interface ResourcesProps {
    date: string;
    contentType: string; // Video / Guide / Brochures / DataSheets
    title: string;
    subtitle?: string;
    tags: string[];
    solutionTag: string[];
    form: string; // "link" / "pdf" / "datasheet"
    image: string; // 대표 이미지 경로
    path: string; // 링크 및 페이지
    use: boolean;
}

/** references.ts */
export interface FilterOptions {
    contentType?: string[]; // 선택된 contentType
    form?: string[]; // 선택된 form
    solutions?: string[]; // 선택된 solutions
}

// 모든 references 데이터를 가져오는 함수
export const getAllResources = (): ResourcesProps[] => {
    // `use` 필드가 true인 게시글만 가져오기
    return resourcesData.filter((resource) => resource.use);
};

// Normalize text by converting to lowercase and removing special characters
const normalizeText = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9가-힣]/g, ""); // 대소문자, 특수문자 무시

// 검색 필터링 함수
export const getFilteredResources = (query: string): ResourcesProps[] => {
    const normalizedQuery = query.trim().toLowerCase(); // 검색어 소문자로 변환 및 공백 제거

    return resourcesData.filter((resource) => {
        // 필터링할 모든 문자열을 하나로 결합
        const searchableContent = [
            resource.contentType,
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            ...resource.solutionTag,
            resource.form,
        ]
            .join(" ") // 문자열 합치기
            .toLowerCase(); // 소문자로 변환

        return searchableContent.includes(normalizedQuery); // 검색어 포함 여부 확인
    });
};

// 검색 및 필터링 함수
export const getFilteredResourcesByQueryAndFilters = (
    query: string,
    filters: FilterOptions
): ResourcesProps[] => {
    const normalizedQuery = normalizeText(query.trim());

    return resourcesData.filter((resource) => {
        // use 필드가 true인지 확인
        if (!resource.use) return false;

        // 검색어 필터링 (검색 대상 필드 결합 및 정규화)
        const searchableContent = [
            resource.contentType,
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            ...resource.solutionTag,
            resource.form,
        ]
            .map(normalizeText) // 각 필드를 정규화
            .join(" ");

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery); // 검색어 포함 여부 확인

        // 필터 조건
        const matchesFilters = [
            // contentType 필터
            !filters.contentType ||
            filters.contentType.length === 0 ||
            filters.contentType.some((type) => normalizeText(type) === normalizeText(resource.contentType)),

            // form 필터
            !filters.form ||
            filters.form.length === 0 ||
            filters.form.some((form) => normalizeText(form) === normalizeText(resource.form)),

            // solutions 필터
            !filters.solutions ||
            filters.solutions.length === 0 ||
            filters.solutions.some((solution) =>
                resource.tags.map(normalizeText).includes(normalizeText(solution))
            ),
        ].every(Boolean);

        // 필터링 조건
        const matchesContentType =
            !filters.contentType || filters.contentType.length === 0 || filters.contentType.includes(resource.contentType);

        const matchesForm =
            !filters.form || filters.form.length === 0 || filters.form.includes(resource.form);

        const matchesSolutions =
            !filters.solutions ||
            filters.solutions.length === 0 ||
            filters.solutions.some((solution) =>
                resource.tags.map((tag) => tag.toLowerCase()).includes(solution.toLowerCase())
            );

        // 모든 조건에 부합하면 true
        // return matchesQuery && matchesContentType && matchesForm && matchesSolutions;

        // Query와 Filters 조건을 모두 만족하는 데이터 반환
        return matchesQuery && matchesFilters;
    });
};

// Filter resources by keywords (tags)
export const getResourcesByKeywords = (keywords: string[]): ResourcesProps[] => {
    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return resourcesData.filter((resource) => {
        // Ensure the resource is usable
        if (!resource.use) return false;

        // Check if any normalized keyword matches the tags
        const normalizedTags = resource.tags.map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

        return normalizedKeywords.some((keyword) => normalizedTags.includes(keyword));
    });
};



// Filter resources by keywords (title, subtitle, tags)
export const getResourcesByAllKeywords = (keywords: string[]): ResourcesProps[] => {
    const normalizedKeywords = keywords.map(normalizeText);

    return resourcesData.filter((resource) => {
        if (!resource.use) return false;

        // Aggregate searchable fields and normalize them
        const searchableContent = [
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            ...resource.solutionTag,
        ]
            .map(normalizeText)
            .join(" ");

        // Check if any keyword matches
        return normalizedKeywords.some((keyword) => searchableContent.includes(keyword));
    });
};

/** solutionTag 에 의해 Filtering - [Page 에서 키워드 필터링] */
export const getResourceByKeywordsInPage = (keywords: string[]): ResourcesProps[] => {
    if (!keywords || keywords.length === 0) return getAllResources();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return resourcesData.filter((resource) => {
        if (!resource.use) return false;

        // Normalize tags and solutionTag
        // const normalizedHideTags = hardware.hideTag.map((tag) =>
        //     tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        // );
        const normalizedSolutionTag = resource.solutionTag.map((tag) =>
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
