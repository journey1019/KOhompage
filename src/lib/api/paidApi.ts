/** src/lib/api/paidAPi.ts */
import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';

// 공토
export interface OrderOption {
    codeId: string;
    key: string;
    value: string;
    codeNm: string;
}
export interface DeliveryInfo {
    recipient: string;
    addressMain: string;
    addressSub: string;
    postalCode: string;
    phone: string;
    deliveryDesc?: string;
    telNo?: string;
    deliveryStatus?: 'W' | 'Y' | 'N';
}
export interface OrderProps {
    productId: number;
    productNm: string;
    finalPrice: number;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: string;
    taxAddType: string;
    taxAddValue: number;
    orderOption: OrderOption[];
    deliveryInfo: DeliveryInfo;
}

export interface PaymentInfo {
    orderId: string;      // 우리가 생성한 주문번호 (Bootpay order_id와 동일)
    pg: string;           // 'nicepay'
    method: string;       // 'card'
    amount: number;       // 결제금액
    receiptId?: string;   // Bootpay 영수증 ID
}

export interface CreateOrderRequest extends OrderProps {
    userId: string;
    payment: PaymentInfo;
}


/** /paid/order */
export interface CreateOrderDraftRequest {
    productId: string | number;
    productNm: string;
    finalPrice: number;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType?: 'percent' | 'fee';
    taxAddValue?: number;
    orderOption?: OrderOption[];
    deliveryInfo: DeliveryInfo;
}

export interface CreateOrderDraftResponse {
    productId: number;
    productNm: string;
    finalPrice: number;
    orderStatus: boolean;
    purchaseQuantity: number;
    productPrice: number;
    taxAddYn: 'Y' | 'N';
    taxAddType?: 'percent' | 'fee';
    taxAddValue?: number;
    paidPrice: number;
    orderOption?: OrderOption[];
    expiredDate: string;
    purchaseIndex: number;
    orderId: string;
    deliveryInfo: DeliveryInfo & { deliveryStatus: 'W' | 'Y' | 'N' };
}

/** /api/payment/serverPaid */
export interface ServerPaidRequest
    extends Omit<CreateOrderDraftResponse, 'orderStatus' | 'paidPrice'> {
    orderStatus: boolean;         // true
    paidPrice: number;            // 실제 청구 금액
    receiptId: string;
    receipt_id?: string;
    billingPrice: number;         // 결제 청구금액(=paidPrice와 동일하게 사용)
}

export interface ServerPaidResponse {
    status: boolean;
    orderMessage: string; // "done"
}

const API = process.env.NEXT_PUBLIC_API_URL!;

/** 토큰 포함 fetch */
async function authedFetch<T>(url: string, init: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('userToken');
    const res = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init.headers || {}),
        },
        cache: 'no-store',
    });
    const txt = await res.text();
    const data = txt ? JSON.parse(txt) : {};
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
}

export function createOrderDraft(body: CreateOrderDraftRequest) {
    // 프록시를 쓰면 '/api/payment/order' 로 바꿔도 됨
    return authedFetch<CreateOrderDraftResponse>('/api/payment/order', {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

export function callServerPaid(body: ServerPaidRequest) {
    const finalBody = {
        ...body,
        receipt_id: body.receipt_id ?? body.receiptId,
        receiptId:  body.receiptId  ?? body.receipt_id,
    };

    const qs = new URLSearchParams({
        ...(finalBody.receiptId ? { receiptId: String(finalBody.receiptId) } : {}),
        ...(finalBody.orderId   ? { orderId:   String(finalBody.orderId) }   : {}),
        ...(finalBody.paidPrice ? { paidPrice: String(finalBody.paidPrice) } : {}),
    }).toString();

    return authedFetch<ServerPaidResponse>(
        `/api/payment/serverPaid${qs ? `?${qs}` : ''}`,
        { method: 'POST', body: JSON.stringify(finalBody) } as any
    );
}


/** 주문 생성(결제 후 저장) */
export async function createOrder(data: CreateOrderRequest) {
    return apiBodyFetch('/api/payment/order', data);
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

// paidApi.ts의 orderOption 규격에 맞춤
export function toOrderOption(groups: OptionGroup[], selected: Record<string, string[]>): OrderOption[] {
    // selected[groupId] = ['key1', 'key2', ...]
    const list: OrderOption[] = [];
    groups.forEach((g, idx) => {
        const keys = selected[g.id] || [];
        keys.forEach((k) => {
            const v = g.values.find(v => v.key === k);
            list.push({
                codeId: String(idx + 1),
                key: g.id,             // 그룹 ID
                value: k,              // 선택된 값 key
                codeNm: v?.label ?? k, // 표시명
            });
        });
    });
    return list;
}



// 다건 주문 payload (서버 계약에 맞춰 조정)
export interface CreateCartOrderRequest {
    userId: string;
    orderId: string;
    amount: number;
    payment: PaymentInfo;            // { orderId, pg, method, amount, receiptId? }
    items: Array<{
        productId: number;
        productNm: string;
        purchaseQuantity: number;
        finalPrice: number;
        productPrice: number;
        taxAddYn: string;
        taxAddType: string;
        taxAddValue: number;
        orderOption: OrderOption[];
    }>;
    deliveryInfo: DeliveryInfo;
}


export async function createCartOrder(data: CreateCartOrderRequest) {
    return apiBodyFetch('/api/payment/order', data); // 서버가 단건/다건 모두 받도록 구현 권장
}

