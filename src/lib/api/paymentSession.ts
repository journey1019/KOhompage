/** src/lib/auth/paymentSession.ts */
export function getLocalToken() {
    return typeof window === 'undefined' ? null : localStorage.getItem('userToken');
}
export function getLocalTokenExp(): number | null {
    if (typeof window === 'undefined') return null;
    const s = localStorage.getItem('tokenExpired');
    if (!s) return null;
    const t = Date.parse(s); // ISO or RFC3339
    return Number.isNaN(t) ? null : t;
}
/** 60초 스큐 */
const SKEW_MS = 60_000;

export function isLocalTokenValidNow(): boolean {
    const exp = getLocalTokenExp();
    if (!exp) return false;
    return Date.now() + SKEW_MS < exp;
}

export function clearPaymentSession() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenExpired');
        localStorage.removeItem('paymentUserInfo');
        localStorage.removeItem('roleId');
        localStorage.removeItem('roleNm');
        // 쿠키 제거(과거 시점으로)
        document.cookie = `payment_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `payment_token_exp=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}
