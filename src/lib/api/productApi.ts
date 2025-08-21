import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';

export interface AdminProduct {
    productId: number;
    productNm: string;
    productCategory: string;
    productType: string;
    useYn: string;
    mainDesc: string;
    mainImagePath: string;
    productPrice: string;
    taxAddYn: string;
    taxAddType: string;
    taxAddValue: number;
    finalPrice: number;
    stockQuantity: number;
    availablePurchase: number; // availablePurchase
    codeOption: string[];
}


export interface Product {
    productCategory: string;
    productNm: string;
    productType: string;
    useYn: string;
    codeOption: string[];
    productId: number;
    productPrice: number;
    taxAddYn: string;
    taxAddType: string;
    taxAddValue: number;
    stockQuantity: number;
    availablePurchase: number;
    finalPrice: number;
    mainImagePath: string;
    mainImageFileNm: string;
    mainDesc: string;
};



/**
 * 상품 리스트 조회 (GET)
 */
export async function ProductList(): Promise<Product[]> {
    return apiGetFetch<Product[]>('/api/payment/productList');
}
// export async function ProductList(): Promise<boolean> {
//     const res = await fetch(`/api/payment/productList`); // apiQueryFetch 활용으로 바꾸기
//     if (!res.ok) throw new Error('상품 리스트 불러오기 실패');
//     const data = await res.json();
//     return data.status === true; // 사용 가능 시 true
// }