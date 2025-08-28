/** src/app/[locale]/online-store/payment-result/page.tsx */
'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/payment';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { serverPaid, CreateOrderDraftResponse, readPendingOrderDraft, PendingOrderDraft } from '@/lib/api/paidApi';

type PaidSummary = {
    orderId: string;
    receiptId: string;
    paidPrice: number;
    productNm: string;
};

export default function PaymentResultPage() {
    const router = useRouter();
    const sp = useSearchParams();

    // 화면 표시/로직용 상태
    const [phase, setPhase] = useState<'pending' | 'success' | 'error'>();
    const [msg, setMsg] = useState<string>();
    const [displayOrderId, setDisplayOrderId] = useState('');
    const [pendingSnapshot, setPendingSnapshot] = useState<PendingOrderDraft | null>(null);
    const [paid, setPaid] = useState<PaidSummary | null>(null);
    const called = useRef(false);

    // 0) 토큰 만료 체크
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const tokenExpired = localStorage.getItem('tokenExpired');
        const now = new Date();
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(' ', 'T')) : null;
        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push('/ko/login');
        }
    }, [router]);

    // 1) 표시용 주문번호 & pending 스냅샷 확정
    useEffect(() => {
        const qOrderId = sp.get('order_id') || sp.get('orderId') || '';
        const pending = readPendingOrderDraft();
        const draft = useCheckoutStore.getState().draft;

        setDisplayOrderId(qOrderId || pending?.orderId || draft?.orderId || '');
        setPendingSnapshot(pending || null);
    }, [sp]);

    // 2) 결제 결과 처리 (done일 때만 serverPaid)
    useEffect(() => {
        const event = sp.get('event'); // confirm | done | cancel | error
        const qOrderId = sp.get('order_id') || sp.get('orderId') || '';
        const receiptId = sp.get('receipt_id') || sp.get('receiptId') || '';

        // done 아니면 확정 저장 금지
        if (event !== 'done') {
            setPhase('pending');
            setMsg('승인 대기 중입니다. 결제가 확정되면 자동으로 완료됩니다.');
            return;
        }
        if (!receiptId) {
            setPhase('error');
            setMsg('영수증 번호가 없습니다. 다시 시도해 주세요.');
            return;
        }

        const pending = readPendingOrderDraft();
        if (!pending || !pending.orderId || (qOrderId && qOrderId !== pending.orderId)) {
            setPhase('error');
            setMsg('주문 정보가 일치하지 않아 저장할 수 없습니다.');
            return;
        }

        if (called.current) return;
        called.current = true;

        (async () => {
            try {
                await serverPaid({
                    productId: pending.product.productId,
                    productNm: pending.product.productNm,
                    finalPrice: pending.product.finalPrice,
                    orderStatus: true,
                    purchaseQuantity: pending.quantity,
                    productPrice: pending.product.productPrice,
                    taxAddYn: pending.product.taxAddYn,
                    taxAddType: pending.product.taxAddType || 'percent',
                    taxAddValue: pending.product.taxAddValue ?? 0,
                    paidPrice: pending.amount,
                    expiredDate: useCheckoutStore.getState().draft?.expiredDate || '',
                    purchaseIndex: useCheckoutStore.getState().draft?.purchaseIndex || 0,
                    orderId: pending.orderId,
                    deliveryInfo: JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null'),
                    receiptId,
                    billingPrice: pending.amount
                });

                setPaid({
                    orderId: pending.orderId,
                    receiptId,
                    paidPrice: pending.amount,
                    productNm: pending.product.productNm
                });

                setPhase('success');
                setMsg('결제가 완료되었습니다!');
                // 필요하면 여기서 clearPendingOrderDraft(); 등 정리
            } catch (e) {
                setPhase('error');
                setMsg('결제 확정(서버) 처리에 실패했습니다.');
            }
        })();
    }, [sp]);

    const isSuccess = phase === 'success';

    // 화면 표시용 파생값 (paid가 없을 때는 pendingSnapshot으로 대체)
    const productNm = paid?.productNm ?? pendingSnapshot?.product.productNm ?? '';
    const paidPrice = paid?.paidPrice ?? pendingSnapshot?.amount;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className={`text-xl font-semibold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? '결제가 완료되었습니다.' : phase === 'pending' ? '승인 대기 중' : '결제에 실패했습니다.'}
            </h1>

            {msg && <p className="mb-4 text-sm text-gray-600">{msg}</p>}

            <div className="border rounded-md divide-y">
                <div className="flex justify-between p-4">
                    <span className="text-gray-600">주문번호</span>
                    <span className="font-medium">{displayOrderId}</span>
                </div>

                {paid?.receiptId && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">영수증 번호</span>
                        <span className="font-medium">{paid.receiptId}</span>
                    </div>
                )}

                {productNm && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">상품명</span>
                        <span className="font-medium">{productNm}</span>
                    </div>
                )}

                {typeof paidPrice === 'number' && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">결제금액</span>
                        <span className="font-medium">{formatCurrency(paidPrice)}</span>
                    </div>
                )}

                <div className="flex justify-between p-4">
                    <span className="text-gray-600">상태</span>
                    <span className={`font-medium ${isSuccess ? 'text-green-600' : phase === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {isSuccess ? '성공' : phase === 'pending' ? '승인 대기' : '실패'}
                    </span>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => router.push('/ko/online-store')} className="px-4 py-2 rounded border">
                    계속 쇼핑
                </button>
                {isSuccess && (
                    <button onClick={() => router.push('/ko/mypage/orders')} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                        주문 내역 보기
                    </button>
                )}
            </div>
        </div>
    );
}