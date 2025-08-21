import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';
import { JoinRequestBody } from '@/lib/api/authApi';

export interface UserInfo {
    userId: string;
    userNm: string;
    useYn: string;
    delYn: string;
    roleId: string;
    roleNm: string;
    privateInfo: string;
    birth: string;
    email: string;
    phone: string;
    telNo: string;
    addressSub: string;
    postalCode: string;
    addressMain: string;
    termsAgreeYn: string;
    termsAgreeDate: string[];
    privateAgreeYn: string;
    privateAgreeDate: string;
    locationAgreeYn: string;
    exchangeRefundYn: string;
    exchangeRefundDate: string;
    userExpired: string;
    subscribeDate: string;
    updateDate: string;
}


interface orderOption {
    codeId: string;
    key: string;
    value: string;
    codeNm: string;
}
interface deliveryInfo {
    recipient: string;
    addressMain: string;
    addressSub: string;
    postalCode: number;
    phone: string;
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
    orderOption: orderOption[];
    deliveryInfo: deliveryInfo;
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

/** 주문 생성(결제 후 저장) */
export async function createOrder(data: CreateOrderRequest) {
    return apiBodyFetch('/api/payment/order', data);
}