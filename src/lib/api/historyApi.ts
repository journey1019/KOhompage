/** src/lib/api/historyApi.ts */
import { apiGetFetch, apiQueryFetch } from '@/lib/client/apiFetch';

/**
 * 상품 정보
 * */
export interface ProductInfo {
    productNm: string;
    productCategory: string;
    productType: 'device' | 'service' | string;
    useYn: 'Y' | 'N';
    codeOption?: string[] | null;
    productId: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    stockQuantity: number;
    availablePurchase: number;
    finalPrice: number;
    mainDesc?: string | null;
    mainImagePath?: string | null;
    mainImageFileNm?: string | null;
}

/**
 * 상품 결제 이력 정보
 * */
export interface PurchaseDetailInfo {
    receiptId: string;
    price: number;
    purchaseStatus: number; // 1:완료 등
    cancelledTaxFree: number;
    pgCompany: string; // '나이스페이먼츠' 등
    methodSymbol: string; // 'card' | 'vbank' | ...
    methodOriginSymbol: string;
    statusLocale: string; // '결제완료' 등
    purchasedAt: string;  // 'YYYY-MM-DD HH:mm:ss'
    requestedAt: string;  // 'YYYY-MM-DD HH:mm:ss'
    receiptUrl: string;
    cardCompany?: string | null;
    cardType?: string | null;
    cardNo?: string | null;
    cardOwnerType?: string | null;
    otherMethod?: string | null;
    confirmEvent?: string | null; // 'done' | 'confirm'
    taxFree: number;
    cancelledPrice: number;
}

/**
 * 배송지 정보
 * */
export interface PurchaseDelivery {
    addressSub?: string | null;
    purchaseId: number;
    deliveryStatus: 'W' | 'P' | 'D' | string; // W:준비,P:배송중,D:완료...
    deliveryCode?: string | null;
    recipient: string;
    addressMain: string;
    postalCode: string;
    phone: string;
    deliveryDesc?: string | null;
    deliveryCompany?: string | null;
    companyName?: string | null;
    fullUrl?: string | null; // 배송 조회 base url
    telNo?: string | null;
    linkUrl?: string | null; // fullUrl + code
}

/**
 * 배송 이력 정보
 * */
export interface PaidHistoryDetailResponse {
    purchaseId: number;
    userId: string;
    productId: number;
    productInfo: ProductInfo;
    orderId: string;
    purchaseStatus: 'Y' | 'N' | string; // 결제 기록 상태
    purchaseDate: string; // 'YYYY-MM-DD HH:mm:ss'
    purchaseType: 'card' | 'vbank' | string;
    purchaseFee: number;
    purchaseQuantity: number;
    productPrice: number;
    taxYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    dateIndex: string; // 'YYYYMMDDHH'
    orderOption?: Array<{ codeId: string; key: string; value: string }> | null;
    purchaseDetailInfo: PurchaseDetailInfo;
    purchaseDelivery: PurchaseDelivery;
}

export async function fetchPaidHistoryDetailByIndex(purchaseId: number) {
    // 프록시 동적 경로로 호출
    return apiGetFetch(`/api/payment/paidHistory/${purchaseId}`);
}
