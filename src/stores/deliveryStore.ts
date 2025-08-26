'use client';

import { create } from 'zustand';
import { fetchDeliveryList, pickDefaultAddress, mapToDeliveryInfo } from '@/lib/api/delivery';
import type { DeliveryManageItem } from '@/lib/api/delivery';
import type { deliveryInfo } from '@/lib/api/paidApi';

interface DeliveryState {
    list: DeliveryManageItem[] | null;
    selected: DeliveryManageItem | null;
    loading: boolean;
    error: string | null;
    load: () => Promise<void>;
    selectByIndex: (index: number) => void;
    getSelectedForOrder: () => deliveryInfo | null;
}

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
    list: null,
    selected: null,
    loading: false,
    error: null,
    load: async () => {
        set({ loading: true, error: null });
        try {
            const list = await fetchDeliveryList();
            const selected = pickDefaultAddress(list);
            set({ list, selected, loading: false });
        } catch (e: any) {
            set({ loading: false, error: e?.message || '배송지 조회 실패' });
        }
    },
    selectByIndex: (addressIndex: number) => {
        const item = get().list?.find(x => x.addressIndex === addressIndex) ?? null;
        set({ selected: item });
    },
    getSelectedForOrder: () => {
        const s = get().selected;
        return s ? mapToDeliveryInfo(s) : null;
    },
}));
