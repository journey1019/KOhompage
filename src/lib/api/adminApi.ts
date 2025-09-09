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

export interface User {
    userId: string;
    userNm: string;
    roleId: string;
    useYn: string;
    roleNm: string;
    delYn: string;
    subscribeDate: string;
    updateDate: string;
}

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

export interface Paid {
    purchaseId: number; //구매 ID
    userId: string; //계정 ID
    orderId: string; //주문 ID
    receiptId: string; //결제 ID(BP)
    purchaseStatus: string; //구매 상태
    purchaseDate: string; //구매 날짜
    purchaseType: string; //구매 타입
    orderOption: string; //구매 옵션
    productPrice: number; //상품 단가
    purchaseQuantity: number; //구매 수량
    purchaseFee: number; //결제 예정 금액
    price: number; //결제금액
    cancelledPrice: number; //취소 금액
    methodSymbol: string; //결제 symbol(bp)
    statusLocale: string; //결제 상태
    purchasedAt: string; //결제 일자
    productId: number; //상품 번호
    productNm: string; //상품명
    productCategory: string; //상품 분류
    productType: string; //상품 타입
    mainDesc: string; //상품 설명
    mainImagePath: string; //상품 경로
    mainImageFileNm: string; //상품 파일명
    deliveryStatus: string; //배송 상태
    dateIndex: number; //날짜 index
}

/** -- Paid Detail -- */
// 결제 상세 조회 응답 타입
export type Yn = 'Y' | 'N';

export type ProductCategory = 'inmarsat' | string; // 필요시 리터럴 확장
export type ProductType = 'device' | string;

export interface PaidOrderOption {
    /** productOption에 대한 선택 key (예: device_id) */
    key: string;
    /** key 항목에 대한 값 */
    value: string;
    /** code_info의 code_id (상품에 있는 code_option) */
    codeId: string; // 예: 'productOption'
}

export interface PaidProductInfo {
    /** 사용 여부 */
    useYn: Yn;
    /** 상품명 */
    productNm: string;
    /** 상품 분류 */
    productCategory: ProductCategory;
    /** 상품 타입 */
    productType: ProductType;
    /** 상품의 옵션 목록: code_info에서 조회할 key 배열 */
    codeOption: string[];
    /** 상품 ID */
    productId: number;
    /** 상품 단가(현재) */
    productPrice: number;
    /** 부가세 여부 */
    taxAddYn: Yn;
    /** 부가세 부가 타입 */
    taxAddType: 'percent' | 'amount' | string;
    /** 부가세 부가 값 */
    taxAddValue: number;
    /** 재고 수량 */
    stockQuantity: number;
    /** 구매 가능 수량 */
    avaliablePurchase: number;
    /** 개당 결제 금액(현재) */
    finalPrice: number;
    /** 상품 설명 */
    mainDesc: string;
    /** 상품 이미지 경로 */
    mainImagePath: string;
    /** 상품 이미지 파일명 */
    mainImageFileNm: string;
}

export type PurchaseStatusCode = 'Y' | 'N' | string; // 주문 상태(원시 코드)
export type MethodSymbol = 'card' | 'vbank' | 'bank' | 'phone' | string;

/** 부트페이/PG 측 상세 정보 */
export interface PaidDetailInfo {
    /** 구매 금액 */
    price: number;
    /** 결제 ID(Bootpay receiptId) */
    receiptId: string;
    /** 구매 상태(숫자 코드) */
    purchaseStatus: number;
    /** 취소 금액 */
    cancelledPrice: number;
    /** 결제 타입(표준 심볼) */
    methodSymbol: MethodSymbol;
    /** 결제 상태(로케일 문자열) 예: '결제완료' */
    statusLocale: string;
    /** 결제 일시(YYYY-MM-DD HH:mm:ss) */
    purchasedAt: string;
    /** 구매 정상 여부('done' 등) */
    confirmEvent: string;
    /** 취소 면세 금액 */
    cancelledTaxFree: number;
    /** PG사 이름 */
    pgCompany: string;
    /** 원본 결제 심볼 */
    methodOriginSymbol: MethodSymbol | string;
    /** 승인/요청 시각 */
    requestedAt: string;
    /** 영수증 URL */
    receiptUrl: string;
    /** 카드사 */
    cardCompany: string;
    /** 카드 타입(신용/체크 등) */
    cardType: string;
    /** 카드 소유(개인/법인 등) */
    cardOwnerType: string;
    /** 카드가 아닌 경우 추가 정보(JSON) */
    otherMethod: Record<string, unknown> | null;
    /** 면세 금액 */
    taxFree: number;
    /** 마스킹된 카드 번호 */
    cardNo: string;
}

/** 배송 정보 */
export type DeliveryStatus = 'W' | 'I' | 'D' | 'C' | string;
// W: 대기, I: 배송중, D: 배송완료, C: 취소 (프로젝트 규칙에 맞게 확정 가능)

export interface PaidDelivery {
    purchaseId: number;
    recipient: string;
    addressMain: string;
    addressSub: string;
    postalCode: string;
    phone: string;
    telNo: string | null;
    deliveryDesc: string | null;
    deliveryCompany: string | null;
    deliveryCode: string | null;
    deliveryStatus: DeliveryStatus;
    /** 배송 상태 수정 ID(관리자) */
    confirmId: string | null;
    /** 수정 날짜(YYYY-MM-DD HH:mm:ss) */
    updateDate: string;
}

/** 최상위 결제 상세 응답 */
export interface PaidDetail {
    /** 구매 ID */
    purchaseId: number;
    /** 계정 ID */
    userId: string;

    /** 상품 ID */
    productId: number;
    /** 상품 정보(현재 스냅샷) */
    productInfo: PaidProductInfo;

    /** 주문번호 */
    orderId: string;

    /** 주문 상태(원시 코드) */
    purchaseStatus: PurchaseStatusCode;

    /** 구매/주문 날짜(YYYY-MM-DD HH:mm:ss) */
    purchaseDate: string;

    /** 결제 타입(심볼) */
    purchaseType: MethodSymbol;

    /** 결제 예상 금액(= 정가*수량 + 세금 등) */
    purchaseFee: number;

    /** 구매 수량 */
    purchaseQuantity: number;

    /** 상품 단가(결제 시점 기준) */
    productPrice: number;

    /** 부가세 여부 */
    taxYn: Yn;

    /** 부가세 타입 */
    taxAddType: 'percent' | 'amount' | string;

    /** 부가세 값 */
    taxAddValue: number;

    /** 날짜 index (예: '2025080710') */
    dateIndex: string;

    /** 상품 구매 옵션(선택 값 목록) */
    orderOption: PaidOrderOption[];

    /** 결제 상세(부트페이/PG) */
    purchaseDetailInfo: PaidDetailInfo;

    /** 배송 정보 */
    purchaseDelivery: PaidDelivery;
}


/**
 * 유저 리스트 조회 (GET)
 */
export async function UserList(): Promise<User[]> {
    return apiGetFetch<User[]>('/api/payment/adminUserList');
}

/**
 * 상품 리스트 조회 (GET)
 */
export async function ProductList(): Promise<Product[]> {
    return apiGetFetch<Product[]>('/api/payment/adminProductList');
}


/**
 * 결제 리스트 조회 (GET)
 */
// 날짜 포맷터: Date → 'YYYYMMDD'
const fmtYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}${m}${day}`;
};
// 프록시 라우트: /api/payment/adminPaidList -> /admin/paid/list
export function PaidList(startDate?: string, endDate?: string) {
    // 기본: 최근 30일
    const end = endDate ?? fmtYmd(new Date());
    const s = new Date();
    s.setDate(s.getDate() - 30);
    const start = startDate ?? fmtYmd(s);

    return apiGetFetch<Paid[]>('/api/payment/adminPaidList', { startDate: start, endDate: end });
}


/**
 * 결제 상세 조회
 * */
// ====== API: 결제 상세 조회 ======
// 프록시 라우트: /api/payment/adminPaidDetail -> /admin/paid/detail
export function getPaidDetail(purchaseId: number) {
    return apiGetFetch<PaidDetail>('/api/payment/adminPaidDetail', { purchaseId });
}


/**
 * 배송 정보 Update
 * */
export interface DeliveryRequestBody {
    purchaseId: number;
    deliveryStatus: number;
    deliveryCompany: string;
    deliveryCode: string;
}
export async function PaidDeliveryUpdate(data: DeliveryRequestBody) {
    return apiBodyFetch('/api/payment/adminPaidDeliveryUpdate', data);
}



/**
 * 배송사 리스트 조회 (GET)
 */
export interface Delivery {
    deliveryCompany: string;
    companyName: string;
    mainDomainUrl: string;
    fullUrl: string;
    codeLength: number;
    createId: string;
    createDate: string;
    updateId: null,
    updateDate: null
}
export async function DeliveryList(): Promise<Delivery[]> {
    return apiGetFetch<Delivery[]>('/api/payment/adminDeliveryInfo');
}


/**
 * 배송지 추가 & 수정
 * */
export interface DeliveryMinimum {
    deliveryCompany: string;
    companyName: string;
    mainDomainUrl: string;
    fullUrl: string;
    codeLength: number;
}
export async function DeliveryAdd(data: DeliveryMinimum) {
    return apiBodyFetch('/api/payment/adminDeliveryAdd', data);
}
export async function DeliveryUpdate(data: DeliveryMinimum) {
    return apiBodyFetch('/api/payment/adminDeliveryUpdate', data);
}

