/** src/lib/payment/pending.ts */
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

