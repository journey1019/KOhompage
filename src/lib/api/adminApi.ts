import { apiBodyFetch, apiQueryFetch, apiGetFetch, apiFormFetch } from '@/lib/client/apiFetch';

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
 * 유저 상세 조회 (GET)
 * */
/** 유저 상세 응답 */
export interface UserDetailResponse {
    userId: string; //계정 ID
    userNm: string; // 사용자 이름
    useYn: string; // 사용 여부
    delYn: string; // 삭제 여부
    roleId: string; // 권한 ID
    roleNm: string; // 권한 이름
    privateInfo: {
        birth: string; // 생년 월일
        email: string; // email
        phone: string; // 전화번호
        telNo: string; // 보조 번호
        addressSub: string; //주소2
        postalCode: string; // 우편 번호
        addressMain: string; // 주소1
    };
    termsAgreeYn: string; // 약관 동의
    termsAgreeDate: string;
    privateAgreeYn: string; // 개인 정보 동의
    privateAgreeDate: string;
    locationAgreeYn: string; // 개인 위치 정보 동의
    locationAgreeDate: string;
    exchangeRefundYn: string; // 교환/환불 동의 여부
    exchangeRefundDate: string;
    userExpired: string; // 사용자 만료
    subscribeDate: string; // 가입일
    updateDate: string; // 수정일자
}
export function getUserDetail(userId: string) {
    return apiGetFetch<UserDetailResponse>('/api/payment/adminUserDetail', { userId });
}

/**
 * 유저 비밀번호 변경
 * */
export interface ChangePwdResponse {
    status: boolean
    password: string;
}
export async function UserChangePwd(data: { userId: string; userPw: string }): Promise<ChangePwdResponse> {
    return apiQueryFetch<ChangePwdResponse>('/api/payment/adminUserChangePwd', data);
}
/**
 * 유저 권한 변경
 * */
export interface RoleResponse {
    status: boolean
    role: string;
}
export async function UserRole(data: { userId: string; roleId: string }): Promise<RoleResponse> {
    return apiQueryFetch<RoleResponse>('/api/payment/adminUserRole', data);
}
/**
 * 계정 사용 여부
 * */
export interface UseResponse {
    status: boolean
    account: string;
}
export async function UserUse(data: { userId: string; useYn: boolean }): Promise<UseResponse> {
    return apiQueryFetch<UseResponse>('/api/payment/adminUserUse', data);
}
/**
 * 계정 사용 기간 연장
 * */
export interface ExpiredResponse {
    status: boolean
    userExpired: string;
}
// userExpired 예시: 2026-12-31 23:59:59
export async function UserExpired(data: { userId: string; userExpired: string }): Promise<ExpiredResponse> {
    return apiQueryFetch<ExpiredResponse>('/api/payment/adminUserExpired', data);
}


/**
 * 상품 리스트 조회 (GET)
 */
export async function ProductList(): Promise<Product[]> {
    return apiGetFetch<Product[]>('/api/payment/adminProductList');
}

/**
 * 상품 상세 조회
 * */
// 프록시 라우트: /api/payment/adminPaidDetail -> /admin/product/detail
/** 가격 리스트 아이템 */
export interface ProductPriceItem {
    roleId: string;                        // 'user' | 'admin' 등
    productPrice: number;                  // 기본 금액
    taxAddYn: 'Y' | 'N';                   // 부가세 포함 여부
    taxAddType: 'percent' | 'fee';         // percent: 비율, fee: 금액
    taxAddValue: number;                   // taxAddType에 대한 값
    finalfee: number;                      // 최종 요금
}


/**
 * Role 권한 조회
 * */
export interface Role {
    roleId: string;
    roleNm: string;
    useYn: string;
    roleUsedInfo: object
}
export async function RoleList(): Promise<Role[]> {
    return apiGetFetch<Role[]>('/api/payment/adminRoleList');
}

/**
 * 권한 추가
 * */
export interface RoleRequestBody {
    roleId: string; // 권한 추가
    useYn: string; //권한 사용 여부
    roleUsedInfo: object; //권한 설정 값
    roleNm: string; //권한 이름
}

/** 관리자 권한 추가 */
export async function postRoleAdd(data: RoleRequestBody) {
    return await apiBodyFetch('/api/payment/adminRoleAdd', data);
}
/** 관리자 권한 수정 */
export async function postRoleEdit(data: RoleRequestBody) {
    return await apiBodyFetch('/api/payment/adminRoleEdit', data);
}



/** 구매 대기 목록 아이템 */
export interface PurchaseWaitingItem {
    purchaseIndex: number;                 // 구매대기 idx
    userId: string;                        // 구매자 ID
    purchaseYn: 'W' | 'Y' | 'N' | string;  // 구매 상태 (예: 'W')
    purchaseQuantity: number;              // 구매 수량
    purchaseExpired: string;               // 'YYYY-MM-DD HH:mm:ss'
    expiredIndex: string;                  // 'YYYYMMDDHH'
}

/** 상품 상세 응답 */
export interface ProductDetailResponse {
    productId: number;                     // 상품 ID
    productNm: string;                     // 상품명
    productCategory: string;               // 상품 범주
    productType: 'device' | 'service' | string; // 상품 타입
    useYn: 'Y' | 'N';                      // 사용 여부
    mainDesc?: string | null;              // 상품 설명
    mainImagePath?: string | null;         // 메인 이미지 경로(서버 경로일 수 있음)
    mainImageFileNm?: string | null;       // 메인 이미지 파일명
    productPriceList: ProductPriceItem[];  // 가격 리스트
    stockQuantity: number;                 // 구매 가능 수량
    /** ⚠️ 서버 응답 오탈자 주의: availablePurchase */
    avaliablePurchase?: number;            // 구매 제한 수량 (오탈자)
    availablePurchase?: number;            // 혹시 백엔드 수정 시
    purchaseWatingList?: PurchaseWaitingItem[]; // 구매 대기 목록 (오탈자: Wating)
    codeOption?: string[];                 // 상품 옵션 codeId List
    createDate: string;                    // 생성 시간 'YYYY-MM-DD HH:mm:ss'
    createId: string;                      // 생성자
    updateDate: string;                    // 수정 시간
    updateId: string;                      // 수정자
}
export function getProductDetail(productId: number) {
    return apiGetFetch<ProductDetailResponse>('/api/payment/adminProductDetail', { productId });
}

/**
 * 상품 이미지 추가/수정
 * */
/** 상품 메인이미지 업로드 (프록시 라우트) */
/** 서버는 /admin/product/image/upload/{productId} 를 받는다고 했음 */
export interface UploadImageResponse {
    productId: number;
    mainImageFileNm?: string | null;
    mainDesc?: string | null;
}

export async function uploadProductMainImage(
    productId: number,
    file: File,
    desc?: string
): Promise<UploadImageResponse> {
    const fd = new FormData();
    if (desc !== undefined) fd.append("mainDesc", desc);
    fd.append("mainImageFile", file);

    // 프록시로 호출
    return await apiFormFetch<UploadImageResponse>(
        `/api/payment/adminProductImageUpload/${productId}`,
        fd,
        { method: "POST" }
    );
}


/**
 * 상품 추가
 * */
export interface ProductPriceItem {
    roleId: string;                 // 'user' | 'admin' ...
    productPrice: number;           // 기본 금액
    taxAddYn: 'Y' | 'N';            // 부가세 포함 여부
    taxAddType: 'percent' | 'fee';  // percent: 비율, fee: 금액
    taxAddValue: number;            // 부가세 값
    finalfee: number;               // 최종 요금
}

export interface ProductRequestBody {
    // 신규 생성 시 보통 서버가 부여 → 선택적으로 둡니다.
    productId?: number;
    productNm: string;
    productCategory: string;
    productType: 'device' | 'service' | string;
    useYn: 'Y' | 'N';
    productPriceList: ProductPriceItem[];
    codeOption?: string[];
    stockQuantity: number;
    availablePurchase: number;
}

/** 관리자 상품 추가 */
export async function postProductAdd(data: ProductRequestBody) {
    return await apiBodyFetch('/api/payment/adminProductAdd', data);
}

/** 관리자 상품 수정 */
export async function postProductEdit(data: ProductRequestBody) {
    return await apiBodyFetch('/api/payment/adminProductEdit', data);
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
 * 결제 취소
 * */
export interface PaidCancelResponse {
    status: boolean;
    orderMessage: string;
}
export async function PaidCancel(data: { purchaseId: number; receiptId: string; cancelMessage: string; }): Promise<PaidCancelResponse> {
    return apiQueryFetch<PaidCancelResponse>('/api/payment/adminPaidCancel', data);
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

