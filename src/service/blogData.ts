import blogData from "../../data/resources/blog.json";

export interface BlogCardProps {
    title: string;
    description: string;
    images: string;
    path: string;
    form: "link" | "pdf";
    tags: string[];
    classification: string;
    date: string;
}

// JSON 데이터를 BlogCardProps[] 타입으로 명시적으로 선언
// 전체 데이터를 반환하는 기본 함수
export const getBlogData = (): BlogCardProps[] => {
    return blogData as BlogCardProps[];
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

// Tags 문자열 내 특정 문자열 필터링된 데이터를 반환 함수
export const getFilteredBlogData = (initialTags: string[], selectedTag: string | null): BlogCardProps[] => {
    return blogData
        .map((item) => ({
            ...item,
            form: normalizeForm(item.form), // form 속성을 정제
        }))
        .filter((item) => {
            const normalizedTags = item.tags.map((tag) => normalizeString(tag));
            if (selectedTag) {
                return normalizedTags.includes(normalizeString(selectedTag));
            }
            return initialTags.some((tag) => normalizedTags.includes(normalizeString(tag)));
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // date 내림차순 정렬
};

// Tags+Title 문자열 내 특정 문자열 필터링된 데이터 반환 함수
export const getFilteredByKeywords = (keywords: string[]): BlogCardProps[] => {
    const normalizedKeywords = keywords.map(normalizeString);

    return blogData
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
