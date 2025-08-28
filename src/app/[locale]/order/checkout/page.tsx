/** src/app/[locale]/order/checkout/page.tsx */
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { useCheckoutStore } from '@/stores/checkoutStore';

export default function CheckoutPage() {
    const router = useRouter();
    const draft = useCheckoutStore(s => s.draft);

    // src/app/[locale]/order/checkout/page.tsx
    useEffect(() => {
        if (!draft) {
            router.replace('/ko/online-store');
            return;
        }

        (async () => {
            try {
                const response = await Bootpay.requestPayment({
                    application_id: '68745846285ac508a5ee7a0b',
                    price: draft.paidPrice,
                    order_name: draft.productNm,
                    order_id: draft.orderId,
                    pg: 'nicepay',
                    method: 'card', // kakao 등 다른 방식 선택 시에도 동일 패턴
                    user: { id: 'user', username: 'user' },
                    items: [{
                        id: String(draft.productId),
                        name: draft.productNm,
                        qty: draft.purchaseQuantity,
                        price: draft.finalPrice,
                    }],
                    extra: {
                        // ✅ 수동 승인
                        separately_confirmed: false,
                        // ✅ 항상 redirect 지정(모바일/데스크탑 공통)
                        redirect_url: 'http://localhost:3000/ko/online-store/payment-result',
                    },
                });

                if (response.event === 'confirm') {
                    // (선택) 서버 재고/금액 검증이 필요하면 여기서 /api/payment/order/validate 호출
                    const ok = true;
                    if (ok) {
                        // ✅ 진짜 승인 (이게 없으면 status=2에 머문다)
                        await Bootpay.confirm();
                    }
                }

                // 데스크톱 환경에선 confirm 후에도 JS로 바로 done 이 떨어질 수 있음
                if (response.event === 'done') {
                    const rid = response.data?.receipt_id || response.data?.receiptId || '';
                    router.replace(`/ko/online-store/payment-result?event=done&order_id=${draft.orderId}&receipt_id=${rid}`);
                }
            } catch (e) {
                alert('결제 창 호출에 실패했다.');
                router.replace('/ko/online-store');
            }
        })();
    }, [draft, router]);

    if (!draft) return null;

    return (
        <div className="mx-auto max-w-lg px-6 py-12">
            <h1 className="text-xl font-bold mb-4">주문 확인</h1>
            <div className="text-sm text-gray-600">
                상품: {draft.productNm} • 수량: {draft.purchaseQuantity} • 결제금액: {draft.paidPrice.toLocaleString()}원
            </div>
            <div className="mt-6 text-gray-500">결제창으로 이동 중…</div>
        </div>
    );
}