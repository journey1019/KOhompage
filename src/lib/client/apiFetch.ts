type FetchOptions =
    | { query?: Record<string, string | number>; body?: never }
    | { query?: never; body?: Record<string, any> };

/**
 * POST 전용 Fetch
 */


// src/lib/client/apiFetch.ts
// async function baseFetch<T>(url: string, options?: FetchOptions): Promise<T> {
//     let paymentToken = localStorage.getItem('userToken');
//
//     // ✅ userToken이 JSON 문자열로 저장된 경우('[]', '"abc"', '{...}') 방어
//     try {
//         const parsed = JSON.parse(paymentToken ?? 'null');
//         if (typeof parsed === 'string') paymentToken = parsed;
//     } catch {/* ignore */}
//
//     // 🔎 디버깅: 토큰 앞 10자만 마스킹해서 콘솔에 출력
//     if (!paymentToken) {
//         console.warn('[apiFetch] userToken is empty/undefined');
//     } else {
//         console.log('[apiFetch] Authorization Bearer =', paymentToken.slice(0, 10) + '…');
//     }
//
//     const queryString = options?.query
//         ? `?${new URLSearchParams(
//             Object.entries(options.query).reduce((acc, [k, v]) => {
//                 acc[k] = String(v);
//                 return acc;
//             }, {} as Record<string, string>)
//         ).toString()}`
//         : '';
//
//     const fullUrl = `${url}${queryString}`;
//
//     const res = await fetch(fullUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
//             // 일부 백엔드가 커스텀 헤더를 쓰는 경우 대비
//             ...(paymentToken ? { 'X-Auth-Token': paymentToken } : {}),
//         },
//         ...(options && 'body' in options && options.body ? { body: JSON.stringify(options.body) } : {}),
//         credentials: 'include', // 쿠키 전달(미들웨어 인증이 쿠키를 볼 경우)
//     });
//
//     const text = await res.text();
//     try {
//         const result = text ? JSON.parse(text) : {};
//         if (!res.ok) {
//             console.error(`❌ API Error (${res.status}):`, result);
//             throw new Error(result?.message || '요청 실패');
//         }
//         return result;
//     } catch (err) {
//         console.error(`❌ JSON Parse Error:`, text);
//         throw new Error('응답 파싱 실패');
//     }
// }
// async function baseFetch<T>(url: string, options?: FetchOptions): Promise<T> {
//     let paymentToken = localStorage.getItem('userToken');
//
//     // ✅ userToken이 JSON 문자열로 저장된 경우('[]', '"abc"', '{...}') 방어
//     try {
//         const parsed = JSON.parse(paymentToken ?? 'null');
//         if (typeof parsed === 'string') paymentToken = parsed;
//     } catch {/* ignore */}
//
//     // 🔎 디버깅: 토큰 앞 10자만 마스킹해서 콘솔에 출력
//     if (!paymentToken) {
//         console.warn('[apiFetch] userToken is empty/undefined');
//     } else {
//         console.log('[apiFetch] Authorization Bearer =', paymentToken.slice(0, 10) + '…');
//     }
//
//     const queryString = options?.query
//         ? `?${new URLSearchParams(
//             Object.entries(options.query).reduce((acc, [k, v]) => {
//                 acc[k] = String(v);
//                 return acc;
//             }, {} as Record<string, string>)
//         ).toString()}`
//         : '';
//
//     const fullUrl = `${url}${queryString}`;
//
//     const res = await fetch(fullUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
//             // 일부 백엔드가 커스텀 헤더를 쓰는 경우 대비
//             ...(paymentToken ? { 'X-Auth-Token': paymentToken } : {}),
//         },
//         ...(options && 'body' in options && options.body ? { body: JSON.stringify(options.body) } : {}),
//         credentials: 'include', // 쿠키 전달(미들웨어 인증이 쿠키를 볼 경우)
//     });
//
//     const text = await res.text();
//     try {
//         const result = text ? JSON.parse(text) : {};
//         if (!res.ok) {
//             console.error(`❌ API Error (${res.status}):`, result);
//             throw new Error(result?.message || '요청 실패');
//         }
//         return result;
//     } catch (err) {
//         console.error(`❌ JSON Parse Error:`, text);
//         throw new Error('응답 파싱 실패');
//     }
// }

// async function baseFetch<T>(url: string, options?: FetchOptions): Promise<T> {
//     const paymentToken = localStorage.getItem('userToken');
//
//     const queryString = options && 'query' in options && options.query
//         ? `?${new URLSearchParams(
//             Object.entries(options.query).reduce((acc, [k, v]) => {
//                 acc[k] = String(v);
//                 return acc;
//             }, {} as Record<string, string>)
//         ).toString()}`
//         : '';
//
//     const fullUrl = `${url}${queryString}`;
//
//     const res = await fetch(fullUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
//         },
//         ...(options && 'body' in options && options.body
//             ? { body: JSON.stringify(options.body) }
//             : {}),
//     });
//
//     const text = await res.text();
//     let data: any = null;
//     try {
//         data = text ? JSON.parse(text) : null;
//     } catch {
//         // JSON이 아니면 그냥 텍스트 그대로 둔다
//     }
//
//     if (!res.ok) {
//         console.error(`❌ API Error (${res.status}):`, data ?? text);
//         // 서버가 message 대신 error, orderMessage를 주는 경우도 커버
//         const msg = data?.message || data?.error || data?.orderMessage || '요청 실패';
//         throw new Error(msg);
//     }
//
//     // JSON이면 JSON 반환, 아니면 텍스트 그대로 반환
//     return (data ?? (text as any)) as T;
// }

async function baseFetch<T>(url: string, options?: FetchOptions): Promise<T> {
    const paymentToken = localStorage.getItem('userToken');

    const queryString = options && 'query' in options && options.query
        ? `?${new URLSearchParams(
            Object.entries(options.query).reduce((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {} as Record<string, string>)
        ).toString()}`
        : '';

    const fullUrl = `${url}${queryString}`;

    const res = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
        },
        ...(options && 'body' in options && options.body
            ? { body: JSON.stringify(options.body) }
            : {}),
    });

    const text = await res.text();
    let data: any = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        // JSON이 아니면 그냥 텍스트 그대로 둔다
    }

    if (!res.ok) {
        console.error(`❌ API Error (${res.status}):`, data ?? text);
        // 서버가 message 대신 error, orderMessage를 주는 경우도 커버
        const msg = data?.message || data?.error || data?.orderMessage || '요청 실패';
        throw new Error(msg);
    }

    // JSON이면 JSON 반환, 아니면 텍스트 그대로 반환
    return (data ?? (text as any)) as T;
}


/**
 * GET 전용 Fetch
 */
async function baseGetFetch<T>(url: string, query?: Record<string, string | number>): Promise<T> {
    const paymentToken = localStorage.getItem('userToken');

    const queryString = query
        ? `?${new URLSearchParams(
            Object.entries(query).reduce((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {} as Record<string, string>)
        ).toString()}`
        : '';

    const fullUrl = `${url}${queryString}`;

    const res = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
        },
    });

    const text = await res.text();
    let result: any;
    try {
        result = text ? JSON.parse(text) : {};
    } catch (err) {
        console.error(`❌ JSON Parse Error:`, text);
        throw new Error('응답 파싱 실패');
    }

    if (!res.ok) {
        console.error(`❌ API Error (${res.status}):`, result);
        throw new Error(result?.message || '요청 실패');
    }

    return result;
}


// 🚀 최종적으로 export할 함수들
export const apiBodyFetch = <T>(url: string, body: Record<string, any>) =>
    baseFetch<T>(url, { body });

export const apiQueryFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseFetch<T>(url, query ? { query } : undefined);

export const apiGetFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseGetFetch<T>(url, query);