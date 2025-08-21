import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';

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

/**
 * 사용자 데이터 조회
 */
export async function UserInfo(query: { userPw: string }) {
    return apiQueryFetch<UserInfo>('/api/payment/userInfo', query);
}