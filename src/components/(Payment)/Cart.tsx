'use client';

import { useCartStore } from '@/store/cartStore';
import PaymentProcessor from './PaymentProcessor';

const Cart = () => {
    const { cartItems, removeFromCart } = useCartStore();

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">장바구니</h2>
            <ul className="divide-y mt-2">
                {cartItems.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between items-center">
                        <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>삭제</button>
                    </li>
                ))}
            </ul>
            <PaymentProcessor />
        </div>
    );
};

export default Cart;
