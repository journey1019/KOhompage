// /** src/app/[locale]/order/checkout/page.tsx */
// 'use client';
//
// import { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Bootpay } from '@bootpay/client-js';
// import { useCheckoutStore } from '@/stores/checkoutStore';
// import { createOrder, CreateOrderRequest } from '@/lib/api/paidApi';
// import { useDeliveryInfo, isValidDelivery } from '@/lib/api/delivery';
// import { mockValidateApi } from '@/lib/api/mock/payment';
//
// export default function SingleCheckoutPage() {
//     const router = useRouter();
//     const draft = useCheckoutStore(s => s.draft);
//     const setDraft = useCheckoutStore(s => s.setDraft);
//     const clearDraft = useCheckoutStore(s => s.clear);
//
//     // ✅ API에서 배송지 불러오기
//     const { delivery, loading: deliveryLoading, error: deliveryError, reload } = useDeliveryInfo();
//
//     const [quantity, setQuantity] = useState(draft?.quantity ?? 1);
//     const nf = useMemo(() => new Intl.NumberFormat('ko-KR'), []);
//     const total = useMemo(() => (draft ? draft.finalPrice * quantity : 0), [draft, quantity]);
//
//     useEffect(() => {
//         if (!draft) {
//             alert('구매할 상품 정보가 없습니다.');
//             router.replace('/ko/online-store');
//             return;
//         }
//         const max = Math.max(1, draft.availablePurchase ?? draft.stockQuantity ?? 99);
//         if (quantity > max) setQuantity(max);
//     }, [draft, quantity, router]);
//
//     if (!draft) return null;
//
//     const maxPurchase = Math.max(1, draft.availablePurchase ?? draft.stockQuantity ?? 99);
//
//     const handlePay = async () => {
//         // 로그인
//         const token = localStorage.getItem('userToken');
//         const userInfoStr = localStorage.getItem('paymentUserInfo');
//         if (!token || !userInfoStr) {
//             alert('로그인이 필요합니다.');
//             router.push('/ko/login');
//             return;
//         }
//         const userInfo = JSON.parse(userInfoStr);
//
//         // 배송지(API 기반) 재확인
//         if (deliveryLoading) {
//             alert('배송지 정보를 불러오는 중입니다. 잠시만 기다려주세요.');
//             return;
//         }
//         if (!isValidDelivery(delivery)) {
//             alert(deliveryError || '배송지 정보가 없습니다. 배송지를 등록해 주세요.');
//             router.push('/ko/mypage/delivery'); // 실제 경로
//             return;
//         }
//
//         if (quantity < 1 || quantity > maxPurchase) {
//             alert(`구매 가능 수량은 최대 ${maxPurchase}개 입니다.`);
//             return;
//         }
//
//         try {
//             const response = await Bootpay.requestPayment({
//                 application_id: '68745846285ac508a5ee7a0b',
//                 price: draft.finalPrice * quantity,
//                 order_name: draft.productNm,
//                 order_id: draft.orderId,
//                 pg: 'nicepay',
//                 method: 'card',
//                 user: {
//                     id: userInfo.userId,
//                     username: userInfo.userNm,
//                     phone: userInfo.phone || '01000000000',
//                     email: userInfo.email || 'test@test.com',
//                 },
//                 items: [
//                     { id: String(draft.productId), name: draft.productNm, qty: quantity, price: draft.finalPrice },
//                 ],
//                 extra: {
//                     separately_confirmed: true,
//                     redirect_url: 'http://localhost:3000/ko/shop/payment-result',
//                 },
//             });
//
//             switch (response.event) {
//                 case 'confirm': {
//                     const ok = await mockValidateApi(draft.productId); // 실제 검증 API로 교체
//                     if (ok?.success) await Bootpay.confirm();
//                     else {
//                         await Bootpay.destroy();
//                         alert(ok?.message || '결제를 진행할 수 없습니다.');
//                     }
//                     break;
//                 }
//                 case 'done': {
//                     const receiptId =
//                         (response.data && (response.data.receipt_id || response.data.receiptId)) ||
//                         (response as any).receipt_id || (response as any).receiptId || '';
//
//                     const payload: CreateOrderRequest = {
//                         userId: userInfo.userId,
//                         productId: draft.productId,
//                         productNm: draft.productNm,
//                         productPrice: draft.productPrice,
//                         finalPrice: draft.finalPrice,
//                         purchaseQuantity: quantity,
//                         taxAddYn: draft.taxAddYn,
//                         taxAddType: draft.taxAddType,
//                         taxAddValue: draft.taxAddValue ?? 0,
//                         orderOption: draft.orderOptionList,
//                         deliveryInfo: {
//                             recipient: delivery.recipient,
//                             addressMain: delivery.addressMain,
//                             addressSub: delivery.addressSub,
//                             postalCode: Number(delivery.postalCode),
//                             phone: delivery.phone,
//                         },
//                         payment: {
//                             orderId: draft.orderId,
//                             pg: 'nicepay',
//                             method: 'card',
//                             amount: draft.finalPrice * quantity,
//                             receiptId,
//                         },
//                     };
//
//                     await createOrder(payload);
//                     clearDraft();
//                     router.push(`/ko/shop/payment-result?order_id=${encodeURIComponent(draft.orderId)}&receipt_id=${encodeURIComponent(receiptId)}&event=done&status=1`);
//                     break;
//                 }
//                 default:
//                     break;
//             }
//         } catch (e) {
//             console.error(e);
//             alert('결제 요청에 실패했습니다.');
//         }
//     };
//
//     return (
//         <div className="mx-auto max-w-3xl px-6 py-10">
//             <h1 className="text-2xl font-bold mb-6">주문 / 결제</h1>
//
//             {/* 상품 요약 */}
//             <div className="border rounded-lg p-4 mb-6">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <div className="text-lg font-semibold">{draft.productNm}</div>
//                         <div className="text-sm text-gray-500">
//                             {draft.orderOptionList.length > 0
//                                 ? draft.orderOptionList.map(o => `#${o.key}:${o.codeNm}`).join(' ')
//                                 : '옵션 없음'}
//                         </div>
//                     </div>
//                     <div className="text-lg font-bold">{nf.format(draft.finalPrice)}원</div>
//                 </div>
//
//                 {/* 수량 */}
//                 <div className="mt-4 flex items-center gap-3">
//                     <span className="text-sm text-gray-500">수량</span>
//                     <input
//                         type="number"
//                         className="w-20 border rounded px-2 py-1 text-right"
//                         min={1}
//                         max={maxPurchase}
//                         value={quantity}
//                         onChange={(e) => {
//                             const n = Math.max(1, Math.min(Number(e.target.value) || 1, maxPurchase));
//                             setQuantity(n);
//                             setDraft({ ...draft, quantity: n });
//                         }}
//                     />
//                     <span className="text-xs text-gray-400">최대 {maxPurchase}개</span>
//                 </div>
//
//                 <div className="mt-4 text-right text-xl font-bold">
//                     합계: {nf.format(total)}원
//                 </div>
//             </div>
//
//             {/* 배송지 */}
//             <div className="border rounded-lg p-4 mb-6">
//                 <div className="flex justify-between items-center">
//                     <div className="text-lg font-semibold">배송지</div>
//                     <a className="text-sm text-blue-600 hover:underline" href="/ko/mypage/delivery">
//                         배송지 변경
//                     </a>
//                 </div>
//
//                 {deliveryLoading ? (
//                     <div className="flex items-center mt-3 space-x-3">
//                         <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" />
//                         <div className="text-sm text-gray-600">배송지 불러오는 중…</div>
//                     </div>
//                 ) : isValidDelivery(delivery) ? (
//                     <div className="text-sm text-gray-700 mt-2 leading-6">
//                         {delivery!.recipient} / {delivery!.phone}<br />
//                         {delivery!.addressMain} {delivery!.addressSub} ({delivery!.postalCode})
//                     </div>
//                 ) : (
//                     <div className="mt-2 text-sm text-red-600">
//                         {deliveryError || '등록된 배송지가 없습니다. 배송지를 등록해 주세요.'}
//                     </div>
//                 )}
//             </div>
//
//             <button
//                 onClick={handlePay}
//                 className="w-full py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
//                 disabled={deliveryLoading}
//             >
//                 결제하기
//             </button>
//         </div>
//     );
// }
/** src/app/[locale]/order/checkout/page.tsx */
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { useCheckoutStore } from '@/stores/checkoutStore';

export default function CheckoutPage() {
    const router = useRouter();
    const draft = useCheckoutStore(s => s.draft);

    useEffect(() => {
        if (!draft) {
            router.replace('/ko/online-store');
            return;
        }

        (async () => {
            try {
                const response = await Bootpay.requestPayment({
                    application_id: '68745846285ac508a5ee7a0b',
                    price: draft.paidPrice,                 // 서버가 돌려준 금액을 신뢰
                    order_name: draft.productNm,
                    order_id: draft.orderId,
                    pg: 'nicepay',
                    method: 'card',
                    user: { id: 'user', username: 'user' }, // 필요 시 실제 유저 정보
                    items: [{
                        id: String(draft.productId),
                        name: draft.productNm,
                        qty: draft.purchaseQuantity,
                        price: draft.finalPrice,              // 단가
                    }],
                    extra: {
                        separately_confirmed: true,
                        redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                    },
                });

                if (response.event === 'confirm') {
                    // 여기서 재고 재확인 로직이 필요 없다면 바로 승인
                    await Bootpay.confirm();
                }
                // 'done'이면 redirect_url로 이동됨
            } catch (e) {
                alert('결제 창 호출에 실패했습니다.');
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
