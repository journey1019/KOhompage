import resourcesData from "../../../data/references/references.json";

export interface ResourcesProps {
    date: string;
    contentType: string; // Video / Guide / Brochures / DataSheets
    title: string;
    subtitle?: string;
    tags: string[];
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
    const normalizedQuery = query.trim().toLowerCase();

    return resourcesData.filter((resource) => {
        // 검색어 필터링
        const searchableContent = [
            resource.contentType,
            resource.title,
            resource.subtitle || "",
            ...resource.tags,
            resource.form,
        ]
            .join(" ")
            .toLowerCase();

        const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

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
        return matchesQuery && matchesContentType && matchesForm && matchesSolutions;
    });
};





// 전체 데이터 반환
export const getResourcesData = (): ResourcesProps[] => {
    return resourcesData as ResourcesProps[];
};

// 소문자 변환 및 특수 문자 제거
const normalizeString = (str: string) =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

// 데이터 정제 함수
const normalizeForm = (form: string): "link" | "pdf" => {
    if (form === "link" || form === "pdf") {
        return form; // 유효한 값 반환
    }
    throw new Error(`Invalid form value: ${form}`); // 잘못된 값 처리
};

// Tags+Title 문자열 내 특정 문자열 필터링된 데이터 반환 함수
export const getFilteredByKeywords = (keywords: string[]): ResourcesProps[] => {
    const normalizedKeywords = keywords.map(normalizeString);

    return resourcesData
        .map((item) => ({
            ...item,
            form: normalizeForm(item.form),
        }))
        .filter((item) => {
            const normalizedTitle = normalizeString(item.title);
            const normalizedTags = item.tags.map(normalizeString);

            // 키워드가 title이나 tags에 하나라도 포함되는지 확인
            return normalizedKeywords.some(
                (keyword) =>
                    normalizedTitle.includes(keyword) || normalizedTags.includes(keyword)
            );
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // date 내림차순 정렬
};
