/** src/app/[locale]/online-store/payment-result/page.tsx */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/payment';
import { serverPaid, readPendingOrderDraft, PendingOrderDraft, CreateOrderDraftResponse } from '@/lib/api/paidApi';
import { useCheckoutStore } from '@/stores/checkoutStore';

type PaidSummary = {
    orderId: string;
    receiptId: string;
    paidPrice: number;
    productNm: string;
};

export default function PaymentResultPage() {
    const router = useRouter();
    const sp = useSearchParams();

    const [phase, setPhase] = useState<'pending' | 'success' | 'error' | 'unknown'>('unknown');
    const [msg, setMsg] = useState<string>();
    const [displayOrderId, setDisplayOrderId] = useState('');
    const [paid, setPaid] = useState<PaidSummary | null>(null);
    const called = useRef(false);

    // 0) 토큰 만료 체크
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        // console.log(token);
        // console.log(typeof (token));
        const tokenExpired = localStorage.getItem('tokenExpired');
        const now = new Date();
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(' ', 'T')) : null;
        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push('/ko/login');
        }
    }, [router]);

    // 1) 결과 판단 로직
    useEffect(() => {
        const event = sp.get('event'); // done | confirm | cancel | error | null
        const urlOrderId = sp.get('order_id') || sp.get('orderId') || '';
        const urlReceiptId = sp.get('receipt_id') || sp.get('receiptId') || '';
        const status = sp.get('status'); // success | fail | 2(승인대기) ...

        setDisplayOrderId(urlOrderId);

        // A. JS 팝업 경로에서 미리 저장해둔 last-paid가 있으면 그대로 표시 (이미 serverPaid 수행됨)
        const lastRaw = sessionStorage.getItem('last-paid');
        if (lastRaw && event === 'done' && status === 'success') {
            try {
                const last: PaidSummary = JSON.parse(lastRaw);

                // ✅ URL의 order_id와 last-paid의 orderId가 일치할 때만 성공처리
                if (last.orderId && urlOrderId && last.orderId === urlOrderId) {
                    setPaid(last);
                    setDisplayOrderId(last.orderId);
                    setPhase('success');
                    setMsg('결제가 완료되었습니다!');
                    return;
                }
            } catch {
                // 무시하고 아래 로직 진행
            }
        }

        // B. 사용자가 직접 취소하거나 에러 케이스
        if (status === 'fail' || event === 'cancel' || event === 'error') {
            setPhase('error');
            setMsg('결제에 실패했거나 취소되었습니다.');
            return;
        }

        // C. 리다이렉트(done) 경로: URL에 receipt_id가 반드시 있어야 serverPaid 호출 가능
        if (event === 'done') {
            if (!urlReceiptId || String(urlReceiptId).trim().length === 0) {
                setPhase('pending');
                setMsg('결제는 완료되었지만 영수증 확인이 지연되고 있습니다. 잠시 후 새로고침하거나 주문내역에서 확인해 주세요.');
                return;
            }
            if (called.current) return;
            called.current = true;

            (async () => {
                try {
                    const draftRaw = urlOrderId ? sessionStorage.getItem(`order-draft:${urlOrderId}`) : null;
                    const draft: CreateOrderDraftResponse | null = draftRaw ? JSON.parse(draftRaw) : null;

                    if (!draft) {
                        setPhase('error');
                        setMsg('주문 정보(draft)를 찾지 못해 결제 확정 저장에 실패했습니다.');
                        return;
                    }

                    // ✅ 빈 receiptId 금지
                    const rid = String(urlReceiptId).trim();
                    if (!rid) {
                        setPhase('error');
                        setMsg('영수증 번호가 유효하지 않습니다.');
                        return;
                    }

                    await serverPaid({
                        productId: draft.productId,
                        productNm: draft.productNm,
                        finalPrice: draft.finalPrice,
                        orderStatus: draft.orderStatus,
                        purchaseQuantity: draft.purchaseQuantity,
                        productPrice: draft.productPrice,
                        taxAddYn: draft.taxAddYn,
                        taxAddType: draft.taxAddType,
                        taxAddValue: draft.taxAddValue,
                        paidPrice: draft.paidPrice,
                        expiredDate: draft.expiredDate,
                        purchaseIndex: draft.purchaseIndex,
                        orderId: draft.orderId,
                        deliveryInfo: {
                            recipient: draft.deliveryInfo.recipient,
                            addressMain: draft.deliveryInfo.addressMain,
                            addressSub: draft.deliveryInfo.addressSub,
                            postalCode: draft.deliveryInfo.postalCode,
                            phone: draft.deliveryInfo.phone,
                            deliveryStatus: draft.deliveryInfo.deliveryStatus,
                        },
                        receiptId: rid,               // 👈 camelCase만
                        billingPrice: draft.paidPrice,
                    });

                    // ...
                } catch (e) {
                    setPhase('error');
                    setMsg('결제 확정(서버) 처리에 실패했습니다.');
                }
            })();
            return;
        }

        // D. 승인 대기
        if (event === 'confirm' || status === '2') {
            setPhase('pending');
            setMsg('승인 대기 중입니다. 잠시 후 결제가 확정됩니다.');
            return;
        }

        // E. 상태 불명확
        setPhase('unknown');
        setMsg('결제 결과를 확인할 수 없습니다. 주문내역에서 상태를 확인해 주세요.');
    }, [sp]);

    const isSuccess = phase === 'success';
    const amount = typeof paid?.paidPrice === 'number' ? paid.paidPrice : undefined;
    const productNm = paid?.productNm || '';

    // isSuccess === true 조건에서 버튼 렌더 시
    const lastRaw = (typeof window !== 'undefined') ? sessionStorage.getItem('last-paid') : null;
    console.log(lastRaw)
    const lastPaid = lastRaw ? JSON.parse(lastRaw) as PaidSummary & { purchaseId?: number } : null;
    console.log(lastPaid)
    const link = lastPaid?.purchaseId
        ? `/ko/myPage/orders?purchaseId=${encodeURIComponent(String(lastPaid.purchaseId))}`
        : '/ko/myPage/orders';

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className={`text-xl font-semibold mb-4 ${
                isSuccess ? 'text-green-600'
                    : phase === 'pending' ? 'text-yellow-600'
                        : phase === 'error' ? 'text-red-600'
                            : 'text-gray-700'
            }`}>
                {isSuccess ? '결제가 완료되었습니다.'
                    : phase === 'pending' ? '승인 대기 중'
                        : phase === 'error' ? '결제에 실패했습니다.'
                            : '결제 상태 확인'}
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

                {typeof amount === 'number' && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">결제금액</span>
                        <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                )}

                <div className="flex justify-between p-4">
                    <span className="text-gray-600">상태</span>
                    <span className={`font-medium ${
                        isSuccess ? 'text-green-600'
                            : phase === 'pending' ? 'text-yellow-600'
                                : phase === 'error' ? 'text-red-600'
                                    : 'text-gray-700'
                    }`}>
                        {isSuccess ? '성공' : phase === 'pending' ? '승인 대기' : phase === 'error' ? '실패' : '확인 필요'}
                    </span>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => router.push('/ko/online-store')} className="px-4 py-2 rounded border">
                    계속 쇼핑
                </button>
                {isSuccess && (
                    <button
                        onClick={() => router.push(link)}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        주문 내역 보기
                    </button>
                )}
            </div>
        </div>
    );
}
