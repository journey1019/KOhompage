import { Resource } from '@/types/resource';
import resourcesData from "@/data/resource.json";

/** references.ts */
export interface FilterOptions {
    contentType?: string[]; // 선택된 contentType
    form?: string[]; // 선택된 form
    solutions?: string[]; // 선택된 solutions
}

// 모든 references 데이터를 가져오는 함수
export const getAllResources = async (): Promise<Resource[]> => {
    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();
    return data;
    // `use` 필드가 true인 게시글만 가져오기
    // return data.filter((resource) => resource.use);
};

// Normalize text by converting to lowercase and removing special characters
const normalizeText = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9가-힣]/g, ""); // 대소문자, 특수문자 무시

// 검색 필터링 함수
export const getFilteredResources = async (query: string): Promise<Resource[]> => {
    const normalizedQuery = query.trim().toLowerCase(); // 검색어 소문자로 변환 및 공백 제거

    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();

    return data.filter((resource) => {
        // 필터링할 모든 문자열을 하나로 결합
        const searchableContent = [
            resource.contentType,
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            ...resource.hideTag,
            ...resource.solutionTag,
            resource.form,
        ]
            .join(" ") // 문자열 합치기
            .toLowerCase(); // 소문자로 변환

        return searchableContent.includes(normalizedQuery); // 검색어 포함 여부 확인
    });
};

// 검색 및 필터링 함수
export const getFilteredResourcesByQueryAndFilters = async (
    query: string,
    filters: FilterOptions
): Promise<Resource[]> => {
    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();

    const normalizedQuery = normalizeText(query.trim());

    return data.filter((resource) => {
        // if (!resource.use) return false;

        const searchableContent = [
            resource.contentType,
            resource.title,
            resource.subtitle || "",
            resource.tags,
            resource.hideTag,
            resource.solutionTag,
            resource.form,
        ]
            .map(normalizeText)
            .join(" ");

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

        const matchesFilters = [
            !filters.contentType || filters.contentType.length === 0 ||
            filters.contentType.every((type) => normalizeText(type) === normalizeText(resource.contentType)),
            !filters.form || filters.form.length === 0 ||
            filters.form.every((form) => normalizeText(form) === normalizeText(resource.form)),
            !filters.solutions || filters.solutions.length === 0 ||
            filters.solutions.every((solution) =>
                resource.tags.split(',').map(normalizeText).includes(normalizeText(solution))
            ),
        ].every(Boolean);

        return matchesQuery && matchesFilters;
    });
};

// Filter resources by keywords (tags)
export const getResourcesByKeywords = async (keywords: string[]): Promise<Resource[]> => {
    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return data.filter((resource) => {
        // Ensure the resource is usable
        if (!resource.use) return false;

        // Check if any normalized keyword matches the tags
        const normalizedTags = resource.tags.split(',').map((tag) =>
            tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        );

        return normalizedKeywords.some((keyword) => normalizedTags.includes(keyword));
    });
};



// Filter resources by keywords (title, subtitle, tags)
export const getResourcesByAllKeywords = async (keywords: string[]): Promise<Resource[]> => {
    const normalizedKeywords = keywords.map(normalizeText);

    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();

    return data.filter((resource) => {
        // if (!resource.use) return false;

        // Aggregate searchable fields and normalize them
        const searchableContent = [
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            ...resource.hideTag,
            ...resource.solutionTag,
        ]
            .map(normalizeText)
            .join(" ");

        // Check if any keyword matches
        return normalizedKeywords.some((keyword) => searchableContent.includes(keyword));
    });
};

/** solutionTag 에 의해 Filtering - [Page 에서 키워드 필터링] */
export const getResourceByKeywordsInPage = async (keywords: string[]): Promise<Resource[]> => {
    if (!keywords || keywords.length === 0) return getAllResources();

    const res = await fetch('/api/resource');
    const data: Resource[] = await res.json();

    // Normalize keywords (lowercase, remove special characters)
    const normalizedKeywords = keywords.map((keyword) =>
        keyword.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    return data.filter((resource) => {
        if (!resource.use) return false;

        // Normalize tags and solutionTag
        // const normalizedHideTags = hardware.hideTag.map((tag) =>
        //     tag.toLowerCase().replace(/[^a-z0-9]/g, "")
        // );
        const normalizedSolutionTag = resource.solutionTag.split(',').map((tag) =>
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
