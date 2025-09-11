type FetchOptions =
    | { query?: Record<string, string | number>; body?: never }
    | { query?: never; body?: Record<string, any> };

/**
 * POST 전용 Fetch
 */
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
        credentials: 'include', // ✅ 세션 쿠키 포함
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

/** Admin 이미지 삽입/수정 */
export async function apiFormFetch<T>(url: string, form: FormData, init?: { method?: "POST" | "PUT" }) {
    const paymentToken = localStorage.getItem("userToken") ?? "";
    const res = await fetch(url, {
        method: init?.method ?? "POST",
        body: form,
        credentials: "include",
        headers: {
            ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
            // ⚠️ Content-Type 넣지 말 것!
        },
    });

    const text = await res.text();
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; } catch {}
    if (!res.ok) {
        const msg = data?.message || data?.error || text || "요청 실패";
        throw new Error(msg);
    }
    return (data ?? (text as any)) as T;
}

// ➊ 공용: Query를 붙여 URL 만들기
function buildQuery(query?: Record<string, string | number>) {
    return query
        ? `?${new URLSearchParams(
            Object.entries(query).reduce((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {} as Record<string, string>)
        ).toString()}`
        : '';
}
/**
 * Del
 * */
// ➋ DELETE 전용 Fetch (query 방식)
async function baseDeleteFetch<T>(url: string, query?: Record<string, string | number>): Promise<T> {
    const paymentToken = localStorage.getItem('userToken') ?? '';
    const fullUrl = `${url}${buildQuery(query)}`;

    const res = await fetch(fullUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
        },
        credentials: 'include', // 세션 쿠키 전달
    });

    const text = await res.text();
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; } catch { /* 텍스트 그대로 */ }

    if (!res.ok) {
        console.error(`❌ API Error (DELETE ${res.status}):`, data ?? text);
        const msg = data?.message || data?.error || data?.orderMessage || '요청 실패';
        throw new Error(msg);
    }

    return (data ?? (text as any)) as T;
}


// 최종적으로 export할 함수들
export const apiBodyFetch = <T>(url: string, body: Record<string, any>) =>
    baseFetch<T>(url, { body });

export const apiQueryFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseFetch<T>(url, query ? { query } : undefined);

export const apiGetFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseGetFetch<T>(url, query);

export const apiDeleteQueryFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseDeleteFetch<T>(url, query);