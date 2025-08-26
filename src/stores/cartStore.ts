/** src/stores/cartStore.ts */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: number;
    productNm: string;
    productPrice: number;
    finalPrice: number;       // 세금/할인 후 최종 판매가 (표시용, 서버에서 재검증)
    taxAddYn: string;
    taxAddType: string;
    taxAddValue: number;
    imageUrl?: string;
    quantity: number;
    // 옵션 선택: groupId -> 선택된 key 배열(단일옵션이면 1개)
    selectedOptions: Record<string, string[]>;
    // 재고 정보(상한 계산에 사용)
    stockQuantity?: number;
    availablePurchase?: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    updateOptions: (productId: number, selected: Record<string, string[]>) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
    // 계산 헬퍼
    subtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const items = get().items.slice();
                const idx = items.findIndex(i => i.productId === item.productId);
                if (idx >= 0) {
                    // 동일 상품은 수량만 누적(옵션까지 구분하고 싶으면 productId 대신 composite key 구성)
                    const nextQty = items[idx].quantity + item.quantity;
                    items[idx].quantity = nextQty;
                    items[idx].selectedOptions = item.selectedOptions; // 마지막 선택으로 갱신 (정책에 따라 병합)
                } else {
                    items.push(item);
                }
                set({ items });
            },
            updateQuantity: (productId, quantity) => {
                set({ items: get().items.map(i => i.productId === productId ? { ...i, quantity } : i) });
            },
            updateOptions: (productId, selected) => {
                set({ items: get().items.map(i => i.productId === productId ? { ...i, selectedOptions: selected } : i) });
            },
            removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
            clear: () => set({ items: [] }),
            subtotal: () => get().items.reduce((sum, i) => sum + i.finalPrice * i.quantity, 0),
        }),
        { name: 'cart-storage' }
    )
);
