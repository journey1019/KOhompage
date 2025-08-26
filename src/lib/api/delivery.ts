import { apiGetFetch } from '@/lib/client/apiFetch';
import { formatPhone } from '@/module/helper';

/**
 * 주문 시, 'deliveryInfo' 포맷
 * */
export type DeliveryInfo = {
    recipient: string;
    addressMain: string;
    addressSub: string;
    postalCode: string; // 저장은 문자열 권장 (전송 시 Number로 변환)
    phone: string;     // 하이픈 포함 형식
};

export type DeliveryManageListItem = {
    addressIndex: number
    userId: string;
    alias: string;
    useYn: string;
    recipient: string;
    addressMain: string;
    addressSub: string;
    postalCode: string;
    phone: string;
    telNo: string;
    deliveryDesc: string;
}
// 배송지 목록 조회
export async function fetchDeliveryList(): Promise<DeliveryManageListItem[]> {
    return apiGetFetch<DeliveryManageListItem[]>('/api/payment/delivery');
}


// 서버 레코드 -> DeliveryInfo
export function mapRecordToDeliveryInfo(r: DeliveryManageListItem): DeliveryInfo {
    return {
        recipient: r.recipient,
        addressMain: r.addressMain,
        addressSub: r.addressSub,
        postalCode: String(r.postalCode ?? ''),
        phone: formatPhone(r.phone || r.telNo),
    };
}

// 기본 배송지 선정 규칙
export function pickDefaultDelivery(list: DeliveryManageListItem[]): DeliveryInfo | null {
    if (!list?.length) return null;
    // 1순위: useYn === 'Y'
    const primary = list.find(x => String(x.useYn).toUpperCase() === 'Y');
    if (primary) return mapRecordToDeliveryInfo(primary);
    // 2순위: alias가 '기본' 또는 'default'
    const alias = list.find(x =>
        ['기본', '기본배송지', 'default', 'primary'].includes((x.alias || '').toLowerCase())
    );
    if (alias) return mapRecordToDeliveryInfo(alias);
    // 3순위: 첫 번째
    return mapRecordToDeliveryInfo(list[0]);
}

export function isValidDelivery(d: Partial<DeliveryInfo> | null | undefined): d is DeliveryInfo {
    return !!(d && d.recipient && d.addressMain && d.postalCode && d.phone);
}

// === Storage helpers ===
const STORAGE_KEY = 'paymentDeliveryInfo';

export function readDeliveryFromStorage(): DeliveryInfo | null {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch { return null; }
}
export function saveDeliveryToStorage(d: DeliveryInfo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}
export function clearDeliveryInStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

// === “API로 확보” 보장 함수 ===
// localStorage에 없으면 API에서 목록을 가져와 기본 배송지를 저장한 뒤 반환
export async function ensureDeliveryInfoFromAPI(): Promise<DeliveryInfo | null> {
    let d = readDeliveryFromStorage();
    if (isValidDelivery(d)) return d;

    const list = await fetchDeliveryList();
    const chosen = pickDefaultDelivery(list);
    if (isValidDelivery(chosen)) {
        saveDeliveryToStorage(chosen);
        return chosen;
    }
    return null;
}

// === React Hook ===
import { useEffect, useState } from 'react';

export function useDeliveryInfo() {
    const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState<string | null>(null);

    async function load() {
        try {
            setLoading(true);
            setErr(null);
            const d = await ensureDeliveryInfoFromAPI();
            if (!isValidDelivery(d)) setErr('등록된 배송지가 없습니다.');
            setDelivery(d ?? null);
        } catch (e: any) {
            setErr(e?.message || '배송지 조회에 실패했습니다.');
            setDelivery(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    return { delivery, loading, error, reload: load, setDelivery };
}
