// src/app/[locale]/order/confirm/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { useCheckoutStore } from '@/stores/checkoutStore'


export default function OrderConfirmPage() {
    const router = useRouter();
    const draft = useCheckoutStore(s => s.draft);

    useEffect(() => {
        if (!draft) router.replace('/ko/online-store');
    }, [draft, router]);

    if (!draft) return null;

    const onPay = async () => {
        try {
            const response = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: draft.paidPrice,
                order_name: draft.productNm,
                order_id: draft.orderId,
                pg: 'nicepay',
                method: 'card',
                user: { id: 'user', username: 'user' },
                items: [{
                    id: String(draft.productId),
                    name: draft.productNm,
                    qty: draft.purchaseQuantity,
                    price: draft.finalPrice,
                }],
                extra: {
                    separately_confirmed: false,
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                },
            });

            if (response.event === 'confirm') {
                await Bootpay.confirm();
            }
        } catch (e) {
            alert('결제 창 호출에 실패했다.');
        }
    };

    return (
        <div className="mx-auto max-w-lg px-6 py-10 space-y-6">
            <h1 className="text-xl font-bold">주문서 확인</h1>

            <div className="rounded border p-4 space-y-1">
                <div className="font-semibold">{draft.productNm}</div>
                <div>수량: {draft.purchaseQuantity}</div>
                <div>결제금액: {draft.paidPrice.toLocaleString()}원</div>
            </div>

            <div className="rounded border p-4 space-y-1">
                <div className="font-semibold">배송지</div>
                <div>{draft.deliveryInfo.recipient}</div>
                <div>{draft.deliveryInfo.addressMain} {draft.deliveryInfo.addressSub}</div>
                <div>{draft.deliveryInfo.postalCode}</div>
                <div>{draft.deliveryInfo.phone}</div>
            </div>

            <button
                onClick={onPay}
                className="w-full py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                결제하기
            </button>
        </div>
    );
}
