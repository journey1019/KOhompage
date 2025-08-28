/** src/stores/checkoutStore.ts */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CreateOrderDraftResponse } from '@/lib/api/paidApi';

interface Store {
    draft: CreateOrderDraftResponse | null;
    setDraft: (d: CreateOrderDraftResponse) => void;
    clear: () => void;
}

export const useCheckoutStore = create<Store>()(
    persist(
        (set) => ({
            draft: null,
            setDraft: (d) => set({ draft: d }),
            clear: () => set({ draft: null }),
        }),
        { name: 'single-checkout', storage: createJSONStorage(() => sessionStorage) }
    )
);