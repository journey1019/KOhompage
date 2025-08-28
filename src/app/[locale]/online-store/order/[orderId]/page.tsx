/** src/app/[locale]/online-store/order/[orderId]/page.tsx */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { formatCurrency } from '@/lib/utils/payment';
import { serverPaid, CreateOrderDraftResponse } from '@/lib/api/paidApi';

export default function OrderSummaryPage() {
    const router = useRouter();

    /** Login 토큰 만료시 Login Page 이동 */
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const tokenExpired = localStorage.getItem("tokenExpired");
        // 현재 시간
        const now = new Date();
        // tokenExpired 문자열 → Date 객체 변환
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(" ", "T")) : null;

        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push("/ko/login");
        }
    }, [router]);

    const params = useParams<{ orderId: string }>();
    const orderId = decodeURIComponent(params.orderId);
    const [draft, setDraft] = useState<CreateOrderDraftResponse | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // 1) draft 로드
    useEffect(() => {
        const raw = sessionStorage.getItem(`order-draft:${orderId}`);
        if (raw) {
            try {
                setDraft(JSON.parse(raw));
            } catch {
                setDraft(null);
            }
        }
    }, [orderId]);

    const rows = useMemo(() => {
        if (!draft) return [];
        return [
            { k: '상품명', v: draft.productNm },
            { k: '수량', v: String(draft.purchaseQuantity) },
            { k: '제품단가', v: formatCurrency(draft.productPrice) },
            { k: '부가세', v: `${draft.taxAddYn === 'Y' ? draft.taxAddValue + (draft.taxAddType === 'percent' ? '%' : '원') : '미부과'}` },
            { k: '결제 예정금액', v: formatCurrency(draft.paidPrice) },
            { k: '주문만료', v: draft.expiredDate },
            { k: '수령인', v: draft.deliveryInfo.recipient },
            { k: '주소', v: `${draft.deliveryInfo.addressMain} ${draft.deliveryInfo.addressSub ?? ''}`.trim() },
            { k: '우편번호', v: draft.deliveryInfo.postalCode },
            { k: '연락처', v: draft.deliveryInfo.phone },
        ];
    }, [draft]);

    const pay = async () => {
        if (!draft || submitting) return;
        setSubmitting(true);
        try {
            // Bootpay 결제
            const bootRes = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: draft.paidPrice,
                order_name: draft.productNm,
                order_id: draft.orderId,         // 서버 발급 orderId
                pg: 'nicepay',
                method: 'card',
                user: {},                        // (선택) 사용자 정보 추가 가능
                items: [{ id: String(draft.productId), name: draft.productNm, qty: draft.purchaseQuantity, price: draft.paidPrice }],
                extra: {
                    separately_confirmed: false,
                    redirect_url: `${location.origin}/ko/online-store/payment-result`,
                },
            });

            switch (bootRes.event) {
                case 'confirm': {
                    await Bootpay.confirm();
                    break;
                }
                case 'done': {
                    const receiptId =
                        (bootRes.data && (bootRes.data.receipt_id || bootRes.data.receiptId)) ||
                        (bootRes as any).receipt_id || (bootRes as any).receiptId || '';

                    if (!receiptId) {
                        alert('영수증 번호 수신 실패');
                        break;
                    }

                    // 서버 결제 확정
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
                        receiptId,
                        billingPrice: draft.paidPrice,
                    });

                    // 결제결과 페이지 이동
                    sessionStorage.setItem('last-paid', JSON.stringify({
                        orderId: draft.orderId,
                        receiptId,
                        paidPrice: draft.paidPrice,
                        productNm: draft.productNm,
                    }));
                    router.push(`/ko/online-store/payment-result?orderId=${encodeURIComponent(draft.orderId)}&status=success`);
                    break;
                }
                case 'cancel': {
                    alert('결제가 취소되었습니다.');
                    break;
                }
                case 'error': {
                    alert('결제 중 오류가 발생했습니다.');
                    break;
                }
                default:
                    break;
            }
        } catch (e: any) {
            console.error(e);
            alert(e?.message || '결제 처리에 실패했습니다.');
            router.push(`/ko/online-store/payment-result?orderId=${encodeURIComponent(orderId)}&status=fail`);
        } finally {
            setSubmitting(false);
        }
    };

    if (!draft) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">주문서</h1>
                <div className="p-6 border rounded bg-gray-50">
                    주문 정보를 찾을 수 없습니다.
                    <div className="mt-4 flex gap-2">
                        <button onClick={() => router.push('/ko/online-store')} className="px-4 py-2 rounded bg-gray-200">상품 목록</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">주문서 확인</h1>

            <div className="border rounded-md divide-y">
                {rows.map(({ k, v }) => (
                    <div key={k} className="flex justify-between p-4">
                        <span className="text-gray-600">{k}</span>
                        <span className="font-medium">{v}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={() => router.push('/ko/online-store')}
                    className="px-4 py-2 rounded border"
                    disabled={submitting}
                >
                    계속 쇼핑
                </button>
                <button
                    onClick={pay}
                    className={`px-4 py-2 rounded text-white ${submitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={submitting}
                >
                    {submitting ? '결제 중…' : '결제하기'}
                </button>
            </div>
        </div>
    );
}
