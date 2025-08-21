import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';

export interface Product {
    productId: number;
    productNm: string;
    productCategory: string;
    productType: string;
    useYn: string;
    codeOption: string[];
    createId: string;
    createDate: string;
    updateId: string;
    updateDate: string;
}