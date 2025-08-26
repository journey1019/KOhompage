/** src/app/[locale]/cart/checkout/page.tsx */
"use client";

import { useCartStore } from '@/stores/cartStore';
import { createCartOrder } from '@/lib/api/paidApi';
import { Bootpay } from '@bootpay/client-js';
import { useRouter } from 'next/navigation';

export default function CartCheckoutPage() {
    const { items, subtotal, clear } = useCartStore();
    const router = useRouter();

    const onPay = async () => {
        const token = localStorage.getItem('userToken');
        const userInfoStr = localStorage.getItem('paymentUserInfo');
        if (!token || !userInfoStr) { alert('로그인이 필요합니다.'); return; }
        const userInfo = JSON.parse(userInfoStr);

        const delivery = JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null');
        if (!delivery) { alert('배송지 정보를 등록해 주세요.'); return; }

        const amount = subtotal();
        const orderId = `cart_${Date.now()}`;

        try {
            const response = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: amount,
                order_name: `장바구니(${items.length}건)`,
                order_id: orderId,
                pg: 'nicepay',
                method: 'card',
                user: {
                    id: userInfo.userId,
                    username: userInfo.userNm,
                    phone: userInfo.phone || '01000000000',
                    email: userInfo.email || 'test@test.com',
                },
                items: items.map((it) => ({
                    id: String(it.productId),
                    name: it.productNm,
                    qty: it.quantity,
                    price: it.finalPrice, // 단가
                })),
                extra: {
                    separately_confirmed: true,
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                },
            });

            switch (response.event) {
                case 'confirm': {
                    // 서버 검증 API(예: /api/payment/order/validate-cart) 권장
                    // 현재는 통과 가정
                    await Bootpay.confirm();
                    break;
                }
                case 'done': {
                    const receiptId =
                        (response.data && (response.data.receipt_id || response.data.receiptId)) ||
                        (response as any).receipt_id || (response as any).receiptId || '';

                    await createCartOrder({
                        userId: userInfo.userId,
                        orderId,
                        amount,
                        payment: { orderId, pg: 'nicepay', method: 'card', amount, receiptId },
                        items: items.map((it, idx) => ({
                            productId: it.productId,
                            productNm: it.productNm,
                            purchaseQuantity: it.quantity,
                            finalPrice: it.finalPrice,
                            productPrice: it.productPrice,
                            taxAddYn: it.taxAddYn,
                            taxAddType: it.taxAddType,
                            taxAddValue: it.taxAddValue,
                            orderOption: Object.entries(it.selectedOptions).flatMap(([gid, arr]) =>
                                arr.map((k, i) => ({
                                    codeId: String(i + 1),
                                    key: gid,
                                    value: k,
                                    codeNm: k,
                                }))
                            ),
                        })),
                        deliveryInfo: delivery,
                    });

                    clear();
                    router.push(`/ko/shop/payment-result?orderId=${encodeURIComponent(orderId)}&status=success`);
                    break;
                }
            }
        } catch (e) {
            alert('결제에 실패했습니다.');
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-xl font-bold mb-4">결제</h1>
            {/* 배송지/요약 출력 생략 */}
            <div className="flex justify-between items-center">
                <div>총 결제금액</div>
                <div className="text-xl font-bold">{subtotal().toLocaleString()}원</div>
            </div>
            <button className="mt-6 w-full py-3 rounded bg-blue-600 text-white" onClick={onPay}>
                결제하기
            </button>
        </div>
    );
}
