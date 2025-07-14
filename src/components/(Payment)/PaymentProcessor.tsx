'use client';

import { Bootpay } from '@bootpay/client-js';
import { useCartStore } from '@/store/cartStore';

const PaymentProcessor = () => {
    const { cartItems, clearCart } = useCartStore();

    const handlePayment = async () => {
        const hasSubscription = cartItems.some(item => item.paymentType === 'subscription');

        if (hasSubscription) {
            alert('정기결제 상품은 단독 결제만 가능합니다.');
            return;
        }

        const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

        try {
            const response = await Bootpay.requestPayment({
                application_id: 'YOUR_APP_ID',
                price: totalPrice,
                order_name: cartItems.map(item => item.name).join(', '),
                order_id: 'order_' + Date.now(),
                pg: 'nicepay',
                method: 'card',
                items: cartItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    qty: 1,
                    price: item.price,
                })),
                user: {
                    id: 'user_1234',
                    username: '홍길동',
                    email: 'test@test.com',
                },
                extra: {
                    redirect_url: 'http://localhost:3000/payment-result',
                },
            });

            console.log('결제 성공:', response);
            clearCart();
        } catch (err) {
            console.log('결제 실패:', err);
        }
    };

    return (
        <button onClick={handlePayment} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            결제하기
        </button>
    );
};

export default PaymentProcessor;
