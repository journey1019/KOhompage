/** src/lib/api/paidApi.ts */
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
    orderId: string;             // ex) jhlee_1_20250808101043
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
    receipt_id?: string;
    receiptId: string;     // Bootpay에서 받은 영수증 ID
    billingPrice: number;  // 실청구 금액(대개 paidPrice)
}

export interface ServerPaidResponse {
    status: boolean;
    orderMessage: string; // "done"
}

/** 1) 주문 임시생성(재고확인 + 주문/결제기본정보 발급) */
export async function createOrderDraft(
    data: CreateOrderDraftRequest
): Promise<CreateOrderDraftResponse> {
    // 프록시가 { ok, data } 또는 그냥 원본(JSON)을 반환해도 동작하도록 처리
    const res = await apiBodyFetch<any>('/api/payment/order', data);
    const payload = res?.data ?? res;                  // 둘 다 대응
    if (!payload?.orderId) {
        throw new Error(payload?.message ?? '주문 생성 실패');
    }
    return payload as CreateOrderDraftResponse;
}


/** 2) 실제 결제 확정(서버 결제 처리) */
export async function serverPaid(data: ServerPaidRequest): Promise<ServerPaidResponse> {
    const rid = (data as any).receiptId ?? (data as any).receipt_id;
    const receiptId = String(rid ?? '').trim();
    if (!receiptId) throw new Error('receiptId is required');

    const payload = {
        ...data,
        receiptId,
        receipt_id: receiptId, // ← snake_case 동시 포함
    };
    console.log(payload);

    const res = await apiBodyFetch<any>('/api/payment/serverPaid', payload);
    if (res?.status === false) throw new Error(res?.orderMessage ?? '결제 확정 실패');
    return res as ServerPaidResponse;
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
export function toOrderOption(groups: OptionGroup[], selected: Record<string, string[]>): OrderOptionItem[] {
    // selected[groupId] = ['key1', 'key2', ...]
    const list: OrderOptionItem[] = [];
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

//
export interface PendingOrderDraft {
    orderId: string;
    userId: string;
    product: {
        productId: number;
        productNm: string;
        productPrice: number;
        finalPrice: number;
        taxAddYn: 'Y' | 'N';
        taxAddType?: 'percent' | 'fee';
        taxAddValue?: number;
    };
    quantity: number;
    orderOptionList: Array<{ codeId: string; key: string; value: string; codeNm: string }>;
    amount: number; // finalPrice * quantity
    expiredDate?: string;
    purchaseIndex?: number;
}

const KEY = 'pendingOrderDraft';

export function savePendingOrderDraft(d: PendingOrderDraft) {
    localStorage.setItem(KEY, JSON.stringify(d));
}

export function readPendingOrderDraft(): PendingOrderDraft | null {
    try {
        return JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch { return null; }
}

export function clearPendingOrderDraft() {
    localStorage.removeItem(KEY);
}