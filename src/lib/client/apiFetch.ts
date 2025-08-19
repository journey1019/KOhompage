type FetchOptions =
    | { query?: Record<string, string | number>; body?: never }
    | { query?: never; body?: Record<string, any> };

async function baseFetch<T>(url: string, options?: FetchOptions): Promise<T> {
    const paymentToken = localStorage.getItem('userToken');

    // Query 처리
    const queryString = options?.query
        ? `?${new URLSearchParams(
            Object.entries(options.query).reduce((acc, [k, v]) => {
                acc[k] = String(v); // number → string 변환
                return acc;
            }, {} as Record<string, string>)
        ).toString()}`
        : '';

    const fullUrl = `${url}${queryString}`;

    const res = await fetch(fullUrl, {
        method: 'POST', // 서버쪽이 POST만 받으니 통일
        headers: {
            'Content-Type': 'application/json',
            ...(paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {}),
        },
        ...(options && "body" in options && options.body
            ? { body: JSON.stringify(options.body) }
            : {}),
    });

    const text = await res.text();
    try {
        const result = JSON.parse(text);
        if (!res.ok) {
            console.error(`❌ API Error (${res.status}):`, result);
            throw new Error(result?.message || '요청 실패');
        }
        return result;
    } catch (err) {
        console.error(`❌ JSON Parse Error:`, text);
        throw new Error('응답 파싱 실패');
    }
}

// 🚀 최종적으로 export할 함수들
export const apiBodyFetch = <T>(url: string, body: Record<string, any>) =>
    baseFetch<T>(url, { body });

export const apiQueryFetch = <T>(url: string, query?: Record<string, string | number>) =>
    baseFetch<T>(url, query ? { query } : undefined);
