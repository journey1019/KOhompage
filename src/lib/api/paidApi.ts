// src/lib/api/paidApi.ts
import { apiBodyFetch } from '@/lib/client/apiFetch';

/** 서버 사양에 맞춘 타입 별도 분리: 주문 임시생성 */
export interface OrderOptionItem {
    codeId: string;
    key: string;
    value: string;
    codeNm: string;
}

// /paid/order 의 Request: (postalCode, phone은 문자열 권장)
export interface CreateOrderDraftRequest {
    productId: string | number;
    productNm: string;
    finalPrice: number;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    orderOption: OrderOptionItem[];
    deliveryInfo: {
        recipient: string;
        addressMain: string;
        addressSub?: string;
        postalCode: string; // 서버 예시가 문자열
        phone: string;      // 하이픈 제거된 문자열
    };
}

// /paid/order 의 Response
export interface CreateOrderDraftResponse {
    productId: number;
    productNm: string;
    finalPrice: number;
    orderStatus: boolean;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    paidPrice: number;
    orderOption: Array<{ codeId: string; key: string; value: string }>;
    expiredDate: string;         // "YYYY-MM-DD HH:mm:ss"
    purchaseIndex: number;
    orderId: string;             // ex) jmpark_1_20250808101043
    deliveryInfo: {
        recipient: string;
        addressMain: string;
        addressSub: string;
        postalCode: string;
        phone: string;             // 하이픈 없는 문자열
        deliveryDesc?: string;
        telNo?: string;
        deliveryStatus: 'W' | 'P' | 'D';
    };
}

// 실제 결제 확정 요청(/paid/serverPaid)
export interface ServerPaidRequest {
    productId: number;
    productNm: string;
    finalPrice: number;
    orderStatus: boolean;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType: 'percent' | 'fee';
    taxAddValue: number;
    paidPrice: number;
    expiredDate: string;
    purchaseIndex: number;
    orderId: string;
    deliveryInfo: {
        recipient: string;
        addressMain: string;
        addressSub?: string;
        postalCode: string;
        phone: string;
        deliveryStatus: 'W' | 'P' | 'D';
    };
    receiptId: string;     // ✅ Bootpay에서 받은 영수증 ID
    billingPrice: number;  // ✅ 실청구 금액(대개 paidPrice)
}

export interface ServerPaidResponse {
    status: boolean;
    orderMessage: string; // "done"
}

/** 1) 주문 임시생성(재고확인 + 주문/결제기본정보 발급) */
export async function createOrderDraft(
    data: CreateOrderDraftRequest
): Promise<CreateOrderDraftResponse> {
    // 프록시 응답이 { ok, data } 형태이므로 data.data 방어적으로 언래핑
    const res = await apiBodyFetch<{ ok: boolean; data: any }>('/api/payment/order', data);
    if (!res?.ok) throw new Error(res?.data?.message ?? '주문 생성 실패'); // 'throw new Error': 주문 생성 실패
    return res.data as CreateOrderDraftResponse;
}

/** 2) 실제 결제 확정(서버 결제 처리) */
export async function serverPaid(
    data: ServerPaidRequest
): Promise<ServerPaidResponse> {
    const res = await apiBodyFetch<{ ok: boolean; data: any }>('/api/payment/serverPaid', data);
    if (!res?.ok) throw new Error(res?.data?.message ?? '결제 확정 실패');
    return res.data as ServerPaidResponse;
}

// 표준화된 옵션 구조 (FE 내부에서만 사용)
export interface OptionValue { key: string; label: string }       // key: 서버전달값, label: 표시명
export interface OptionGroup { id: string; name: string; required: boolean; multi?: boolean; values: OptionValue[] }

export function normalizeOptions(codeOption?: string[]): OptionGroup[] {
    if (!codeOption || codeOption.length === 0) return [];
    return [{
        id: 'DEFAULT',
        name: '옵션',
        required: false,
        multi: false,
        values: codeOption.map((v, i) => ({ key: v, label: v })),
    }];
}