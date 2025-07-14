// store/cartStore.ts
import { create } from 'zustand';
import { Product } from '@/types/product';

type CartState = {
    cartItems: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
    cartItems: [],
    addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
    removeFromCart: (id) =>
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),
    clearCart: () => set({ cartItems: [] }),
}));
