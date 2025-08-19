import { apiBodyFetch, apiQueryFetch } from '@/lib/client/apiFetch';

/**
 * 회원 가입
 * */
export interface JoinRequestBody {
    userId: string;
    userPw: string;
    userNm: string;
    userPrivateDTO: {
        birth: string;
        email: string;
        phone: string;
        telNo: string;
        addressMain: string;
        addressSub: string;
        postalCode: string;
    };
    userAdditionalDTO: {
        termsAgreeYn: "Y" | "N";
        termsAgreeDate: string;
        privateAgreeYn: "Y" | "N";
        privateAgreeDate: string;
        locationAgreeYn: "Y" | "N";
        locationAgreeDate: string;
        exchangeRefundYn: "Y" | "N";
        exchangeRefundDate: string;
    };
}
export async function SignUp(data: JoinRequestBody) {
    return apiBodyFetch('/api/payment/signup', data); // { success: true, message: "...", etc. }
}

/**
 * ID 중복 체크
 * Proxy API Route로 API proxy 중계 서버
 * 기존에 외부 API 직접 호출 -> authApi.ts에서 해당 Proxy API 요청하도록
 * */
export async function CheckUserId(userId: string): Promise<boolean> {
    const res = await fetch(`/api/payment/userIdCheck?userId=${userId}`);
    if (!res.ok) throw new Error('ID 중복 확인 실패');
    const data = await res.json();
    return data.status === true; // 사용 가능 시 true
}
export interface CheckUserId {
    status: boolean;
}
// export async function CheckUserId(data: { userId: string }) {
//     return apiQueryFetch<CheckUserId>(`/api/payment/userIdCheck?userId=${data}`);
// }

/**
 * 계정 정보 중복 체크
 * */
export interface CheckUser {
    status: boolean;
    emailUser?: string;
    phoneUser?: string;
}
export async function CheckUserInfo(email: string, phone: string): Promise<CheckUser> {
    const res = await fetch(`/api/payment/userInfoCheck?email=${email}&phone=${phone}`);
    if (!res.ok) throw new Error('계정 중복 확인 실패');
    return res.json();
}


/**
 * 로그인
 * */
export interface LoginResponse {
    userId: string;
    userToken: string;
    userNm: string;
    roleId: string;
    roleNm: string;
    userExpired: string;
    tokenExpired: string;
}
export async function Login(data: { userId: string; userPw: string }): Promise<LoginResponse> {
    return apiQueryFetch<LoginResponse>('/api/payment/login', data);
}

/**
 * 로그아웃
 * */
export async function LogOut() {
    return apiQueryFetch('/api/payment/logout');
}



/**
 * ID 찾기
 * */
export interface FindIdResponse {
    status: boolean;
    userId: string;
}
export async function FindId(data: { birth: number; findKey: string; findValue: string }) {
    return apiQueryFetch<FindIdResponse>('/api/payment/findId', data);
}

/**
 * PW 찾기
 * */
export interface FindPwdRequestBody {
    status: boolean;
    email: string;
}
export async function FindPwd(data: { userId: string; birth: number }) {
    return apiQueryFetch<FindPwdRequestBody>('/api/payment/findPwd', data);
}
