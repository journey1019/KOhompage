import { apiBodyFetch, apiQueryFetch, apiGetFetch, apiDeleteQueryFetch } from '@/lib/client/apiFetch';

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


/**
 * 비밀번호 변경
 * */
export interface PwdChangeResponse {
    status: boolean;
    password: string;
}
export async function PwdChange(data: { beforeUserPw: string; newUserPw: string }): Promise<PwdChangeResponse> {
    return apiQueryFetch<PwdChangeResponse>('/api/payment/userPwChange', data);
}


/**
 * 사용자 정보 변경
 * */
export interface UserInfoChangeRequestBody {
    userNm: string;
    userPrivateDTO:{
        birth: string;
        email: string;
        phone: string;
        telNo: string;
        addressMain: string;
        addressSub : string;
        postalCode: string;
    }
}

export async function UserInfoChange(data: UserInfoChangeRequestBody) {
    return await apiBodyFetch('/api/payment/userInfoChange', data);
}


/**
 * 사용자 계정 삭제
 * */
export interface UserRemoveResponse {
    status?: boolean;
    use?: string;
}

export async function RemoveUserAccount(userPw: string): Promise<UserRemoveResponse> {
    // 프론트는 프록시 경로를 친다
    return apiDeleteQueryFetch<UserRemoveResponse>('/api/payment/userRemove', { userPw });
}