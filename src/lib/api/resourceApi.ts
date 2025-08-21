import { apiBodyFetch, apiQueryFetch, apiGetFetch } from '@/lib/client/apiFetch';

/**
 * 사용자 데이터 조회
 */
export async function ImageView(query: { produceId: number; mainImagePath: string; }) {
    return apiQueryFetch('/api/payment/userInfo', query);
}

export function getProductImageUrl(productId: number, mainImageFileNm?: string) {
    if (!mainImageFileNm) return '/images/DefaultImage.png';
    // 이 경로가 방금 만든 동적 라우트와 정확히 일치해야 함
    return `/api/payment/productImage/${productId}/${encodeURIComponent(mainImageFileNm)}`;
}

/**
 * 보호된 이미지(토큰 필요)를 <img>에 넣기 위해 blob → objectURL 로 변환
 * - 장점: Authorization 헤더를 붙일 수 있음
 * - 단점: revokeObjectURL 관리 필요
 */
export async function fetchProductImageObjectUrl(
    productId: number,
    mainImageFileNm: string
): Promise<string> {
    const token = localStorage.getItem('userToken') ?? '';
    const res = await fetch(getProductImageUrl(productId, mainImageFileNm), {
        method: 'GET',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('이미지 불러오기 실패');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}