/** src/app/[locale]/shop/payment-result/page.tsx */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { readPendingOrderDraft, clearPendingOrderDraft } from '@/lib/payment/pending';
import { callServerPaid, createOrder, CreateOrderRequest } from '@/lib/api/paidApi';
import { useCartStore } from '@/stores/cartStore';
import type { PendingOrderDraft } from '@/lib/payment/pending';
import { useCheckoutStore } from '@/stores/checkoutStore';

type Phase = 'waiting' | 'verifying' | 'saving' | 'success' | 'cancel' | 'error';

/** 결제 확정 후 주문 저장용 payload 생성 */
function payloadFrom(pending: PendingOrderDraft, orderId: string, receiptId: string): CreateOrderRequest {
    if (!pending) throw new Error('pending draft가 없습니다.');

    const userInfo = JSON.parse(localStorage.getItem('paymentUserInfo') || 'null');
    if (!userInfo?.userId) throw new Error('로그인이 필요합니다.');

    const delivery = JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null');
    if (!delivery?.recipient || !delivery?.addressMain || !delivery?.postalCode || !delivery?.phone) {
        throw new Error('배송지 정보가 없습니다.');
    }

    return {
        userId: userInfo.userId,
        productId: pending.product.productId,
        productNm: pending.product.productNm,
        productPrice: pending.product.productPrice,
        finalPrice: pending.product.finalPrice,
        purchaseQuantity: pending.quantity,
        taxAddYn: pending.product.taxAddYn,
        taxAddType: pending.product.taxAddType,
        taxAddValue: pending.product.taxAddValue ?? 0,
        orderOption: pending.orderOptionList,
        deliveryInfo: {
            recipient: delivery.recipient,
            addressMain: delivery.addressMain,
            addressSub: delivery.addressSub || '',
            postalCode: String(delivery.postalCode),
            phone: String(delivery.phone).replace(/-/g, ''),
            deliveryDesc: delivery.deliveryDesc || '',
            telNo: delivery.telNo || '',
            deliveryStatus: 'W',
        },
        payment: {
            orderId,
            pg: 'nicepay',
            method: 'card',
            amount: pending.amount,     // = draft.paidPrice 와 동일해야 함
            receiptId,
        },
    };
}


// 1) finalize 시그니처 변경: URL orderId 제거
async function finalize(receiptId: string): Promise<boolean> {
    const pending = readPendingOrderDraft();
    if (!pending) return false;

    const myOrderId = pending.orderId; // ✅ 항상 pending 기준
    const storeDraft = useCheckoutStore.getState().draft; // 선택: purchaseIndex/expiredDate 가져오기

    const body: any = {
        productId: pending.product.productId,
        productNm: pending.product.productNm,
        finalPrice: pending.product.finalPrice,
        orderStatus: true,
        purchaseQuantity: pending.quantity,
        productPrice: pending.product.productPrice,
        taxAddYn: pending.product.taxAddYn,
        taxAddType: pending.product.taxAddType,
        taxAddValue: pending.product.taxAddValue ?? 0,
        paidPrice: pending.amount,
        orderId: myOrderId,                            // ✅ pending.orderId 사용
        deliveryInfo: (() => {
            const d = JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null');
            return {
                recipient: d.recipient,
                addressMain: d.addressMain,
                addressSub: d.addressSub || '',
                postalCode: String(d.postalCode),
                phone: String(d.phone).replace(/-/g, ''),
                deliveryStatus: 'W'
            };
        })(),
        receiptId,             // camelCase (혹시 서버가 받아줄 수도 있으니 유지)
        receipt_id: receiptId, // snake_case (서버가 이걸 요구하는 가능성 높음)
        billingPrice: pending.amount,
        ...(storeDraft?.purchaseIndex ? { purchaseIndex: storeDraft.purchaseIndex } : {}),
        ...(storeDraft?.expiredDate  ? { expiredDate:  storeDraft.expiredDate  } : {}),
    };

    try {
        const res = await callServerPaid(body);
        return !!res?.status && res?.orderMessage === 'done';
    } catch {
        return false;
    }
}



export default function PaymentResultPage() {
    const sp = useSearchParams();
    const router = useRouter();
    const clearCart = useCartStore(s => s.clear);

    const [phase, setPhase] = useState<Phase>('waiting');
    const [msg, setMsg] = useState('결제 진행 상태를 확인 중입니다…');
    const [amountText, setAmountText] = useState<string>('');

    const orderId = sp.get('order_id') || sp.get('orderId') || '';
    const receiptId = sp.get('receipt_id') || sp.get('receiptId') || '';
    const event = sp.get('event');   // confirm | done | cancel | error
    const status = sp.get('status'); // 2(대기), 1(완료) 등
    const statusLocale = sp.get('status_locale') || '';

    const triesRef = useRef(0);
    const nf = useMemo(() => new Intl.NumberFormat('ko-KR'), []);

    useEffect(() => {
        // 금액 표시(초안 또는 서버에서)
        const d = readPendingOrderDraft();
        if (d && d.orderId === orderId) setAmountText(nf.format(d.amount));
    }, [orderId, nf]);

// 2) effect 내부에서 사용하는 orderId도 pending 기준으로 교체
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        async function run() {
            const pending = readPendingOrderDraft();
            const myOrderId = pending?.orderId || orderId; // URL 값과 다르면 pending 우선

            if (!myOrderId) { setPhase('error'); setMsg('유효하지 않은 결제 결과입니다. (order_id 없음)'); return; }
            if (event === 'cancel') { clearPendingOrderDraft(); setPhase('cancel'); setMsg('결제가 취소되었습니다.'); return; }
            if (event === 'error')  { clearPendingOrderDraft(); setPhase('error');  setMsg('결제 처리 중 오류가 발생했습니다.'); return; }
            if (!receiptId) { setPhase('error'); setMsg('영수증 번호가 없습니다. 다시 시도해 주세요.'); return; }

            setPhase('verifying');
            setMsg('결제 승인 확인 중입니다...');

            const ok = await finalize(receiptId); // ✅ orderId 전달 제거
            if (!ok) {
                if (triesRef.current++ > 12) { setPhase('error'); setMsg('승인 확인이 지연됩니다. 잠시 후 다시 시도해 주세요.'); return; }
                const t = Math.min(3000 * Math.pow(1.4, triesRef.current), 10000);
                timer = setTimeout(run, t);
                return;
            }

            // 저장 단계
            const d = readPendingOrderDraft();
            if (!d || !d.orderId) { setPhase('error'); setMsg('주문 정보가 없어 저장할 수 없습니다.'); return; }

            setPhase('saving');
            setMsg('주문 정보를 저장하고 있습니다…');

            try {
                await createOrder(payloadFrom(d, d.orderId, receiptId)); // ✅ pending.orderId 사용
                clearPendingOrderDraft();
                clearCart();
                setPhase('success');
                setMsg('결제가 완료되었어요!');
            } catch {
                setPhase('error');
                setMsg('주문 저장 중 오류가 발생했습니다.');
            }
        }

        run();
        return () => { if (timer) clearTimeout(timer); };
    }, [orderId, receiptId, event, status]);

    return (
        <div className="mx-auto max-w-lg px-6 py-12">
            <h1 className="text-2xl font-bold mb-2">결제 결과</h1>
            <p className="text-sm text-gray-500 mb-6">
                주문번호: <span className="font-mono">{orderId || '-'}</span>
            </p>

            {phase === 'verifying' && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500" />
                        <div>{msg}</div>
                    </div>
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                        <li>휴대폰에서 카드(간편결제) 인증을 완료해 주세요.</li>
                        <li>승인이 완료되면 이 화면이 자동으로 전환됩니다.</li>
                        <li>오래 걸리면 아래 <b>다시 시도</b>를 눌러 주세요.</li>
                    </ol>
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 rounded border"
                            onClick={() => location.reload()}
                        >
                            다시 시도
                        </button>
                        <button
                            className="px-4 py-2 rounded border text-red-600"
                            onClick={() => { clearPendingOrderDraft(); location.href = '/ko/online-store'; }}
                        >
                            취소하고 나가기
                        </button>
                    </div>
                    <div className="text-sm text-gray-500">
                        결제금액: <b>{amountText ? `${amountText}원` : '-'}</b>
                    </div>
                    <div className="text-xs text-gray-400">
                        상태: {status} • {decodeURIComponent(statusLocale || '')}
                    </div>
                </div>
            )}

            {phase === 'saving' && (
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500" />
                    <div>{msg}</div>
                </div>
            )}

            {phase === 'success' && (
                <div className="space-y-4">
                    <div className="text-green-600 font-semibold">{msg}</div>
                    <div className="text-sm text-gray-500">영수증: <span className="font-mono">{receiptId}</span></div>
                    <a href="/ko/online-store" className="inline-block px-4 py-2 rounded bg-blue-600 text-white">
                        계속 쇼핑하기
                    </a>
                </div>
            )}

            {phase === 'cancel' && (
                <div className="space-y-3">
                    <div>{msg}</div>
                    <a href="/ko/online-store" className="text-blue-600 hover:underline">상품으로 돌아가기</a>
                </div>
            )}

            {phase === 'error' && (
                <div className="space-y-3">
                    <div className="text-red-600">{msg}</div>
                    <a href="/ko/online-store" className="text-blue-600 hover:underline">상품으로 돌아가기</a>
                </div>
            )}
        </div>
    );
}