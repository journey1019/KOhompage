// src/lib/client/apiFetch.ts
export async function apiBodyFetch<T>(url: string, data: unknown): Promise<T> {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

export async function apiQueryFetch<T>(url: string, query: Record<string, string>): Promise<T> {
    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${url}?${queryString}`;

    const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
