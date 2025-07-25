import { Product } from '@/types/product';

/** references.ts */
export interface FilterOptions {
    contentType?: string[]; // 선택된 contentType
    form?: string[]; // 선택된 form
    solutions?: string[]; // 선택된 solutions
}

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`/api/`);
    const data: Product[] = await res.json();
    return data;
};

// Normalize text by converting to lowercase and removing special characters
const normalizeText = (text: string | number | boolean): string =>
    String(text).toLowerCase().replace(/[^a-z0-9가-힣]/g, ""); // 대소문자, 특수문자 무시

// 검색 및 필터링 함수
export const getFilteredProductsByQueryAndFilters = async (
    query: string,
    filters: FilterOptions
): Promise<Product[]> => {
    const res = await fetch(`/api/product`);
    const data: Product[] = await res.json();

    const normalizedQuery = normalizeText(query.trim());

    return data
    // return data.filter((product) => {
    //     const searchableContent = [
    //         product.contentType,
    //         product.title,
    //         product.subtitle || "",
    //         product.tags,
    //         product.hideTag,
    //         product.solutionTag,
    //         product.form,
    //         String(product.use)
    //     ]
    //         .map(normalizeText)
    //         .join(" ");
    //
    //     const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);
    //
    //     const matchesFilters = [
    //         !filters.contentType || filters.contentType.length === 0 ||
    //         filters.contentType.every((type) => normalizeText(type) === normalizeText(product.contentType)),
    //         !filters.form || filters.form.length === 0 ||
    //         filters.form.every((form) => normalizeText(form) === normalizeText(product.form)),
    //         !filters.solutions || filters.solutions.length === 0 ||
    //         filters.solutions.every((solution) =>
    //             product.tags.split(',').map(normalizeText).includes(normalizeText(solution))
    //         ),
    //     ].every(Boolean);
    //
    //     return matchesQuery && matchesFilters;
    // });
};