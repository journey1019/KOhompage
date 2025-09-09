/** src/lib/api/historyApi.ts */
import { apiGetFetch } from '@/lib/client/apiFetch';

// ====== 타입 ======
export interface PaidDetailResponse {
    purchaseId: number;
    userId: string;
    productId: number;
    productInfo: {
        useYn: 'Y' | 'N';
        productNm: string;
        productCategory: string;
        productType: string; // 'device' | 'service' 등
        codeOption: string[];
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
    };
    orderId: string;
    purchaseStatus: 'Y' | 'N';
    purchaseDate: string; // "YYYY-MM-DD HH:mm:ss"
    purchaseType: 'card' | 'bank' | 'vbank' | string;
    purchaseFee: number;
    purchaseQuantity: number;
    productPrice: number;
    taxYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    dateIndex: string;
    orderOption: Array<{ key: string; value: string; codeId: string }>;
    purchaseDetailInfo: {
        price: number;
        receiptId: string;
        purchaseStatus: number;
        cancelledPrice: number;
        methodSymbol: string; // 'card' 등
        statusLocale: string; // '결제완료' 등
        purchasedAt: string;
        confirmEvent: string; // 'done'
        cancelledTaxFree: number;
        pgCompany: string;    // '토스', '나이스', '카카오'...
        methodOriginSymbol: string;
        requestedAt: string;
        receiptUrl?: string;
        cardCompany?: string;
        cardType?: string;
        cardOwnerType?: string;
        otherMethod?: any | null; // 계좌이체/가상계좌일 때 추가정보
        taxFree: number;
        cardNo?: string;
    };
    purchaseDelivery: {
        purchaseId: number;
        recipient: string;
        addressMain: string;
        addressSub?: string | null;
        postalCode: string;
        phone: string;
        telNo?: string | null;
        deliveryDesc?: string | null;
        deliveryCompany?: string | null;
        deliveryCode?: string | null;
        deliveryStatus: 'W' | 'P' | 'D';
        companyName?: string | null;
        fullUrl?: string | null;
        linkUrl?: string | null;
    };
}

export interface PaidListResponse {
    purchaseId: number;
    userId: string;
    orderId: string;
    receiptId: string;
    purchaseStatus: 'Y' | 'N';
    purchaseDate: string; // "YYYY-MM-DD HH:mm:ss"
    purchaseType: 'card' | 'bank' | 'vbank' | string;
    orderOption: Array<{ key: string; value: string; codeId: string }>;
    productPrice: number;
    purchaseQuantity: number;
    purchaseFee: number;
    price: number;
    cancelledPrice: number;
    methodSymbol: string;
    statusLocale: string;
    purchasedAt: string; // "YYYY-MM-DD HH:mm:ss"
    productId: number;
    productNm: string;
    productCategory: string;
    productType: string;
    mainDesc?: string | null;
    mainImagePath?: string | null;
    mainImageFileNm?: string | null;
    deliveryStatus: 'W' | 'P' | 'D';
    dateIndex: string; // "YYYYMMDDHH"
}

// 날짜 포맷터: Date → "YYYYMMDD"
const fmtYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}${m}${day}`;
};


// ====== API: 결제 상세 조회 ======
// 프록시 라우트: /api/payment/historyDetail -> /history/paid/detail
export function getPaidDetail(purchaseId: number) {
    return apiGetFetch<PaidDetailResponse>('/api/payment/historyDetail', { purchaseId });
}

