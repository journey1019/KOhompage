export async function apiBodyFetch<T>(url: string, data: unknown): Promise<T> {
    const paymentToken = localStorage.getItem('userToken');
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(paymentToken && { Authorization: `Bearer ${paymentToken}` })
        },
        body: data ? JSON.stringify(data) : undefined,
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

export async function apiQueryFetch<T>(url: string, query?: Record<string, string>): Promise<T> {
    const paymentToken = localStorage.getItem('userToken');
    const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
    const fullUrl = `${url}${queryString}`;

    const res = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(paymentToken  ? { Authorization: `Bearer ${paymentToken }` } : {})
        }
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
