/** src/app/[locale]/online-store/order/[orderId]/page.tsx */
'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { formatCurrency } from '@/lib/utils/payment';
import { serverPaid, CreateOrderDraftResponse, clearPendingOrderDraft, serverPaidConfirmOnly } from '@/lib/api/paidApi';

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

    // confirm 단계 중복 호출 방지
    const confirmingRef = useRef(false);

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
            const baseUrl =
                (typeof window !== 'undefined' ? window.location.origin : '') ||
                process.env.NEXT_PUBLIC_SITE_URL ||
                'http://localhost:3000';

            const bootRes = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: draft.paidPrice,
                order_name: draft.productNm,
                order_id: draft.orderId,
                pg: 'nicepay',
                method: 'card',
                user: {},
                items: [
                    {
                        id: String(draft.productId), // 문자열 권장
                        name: draft.productNm,
                        qty: draft.purchaseQuantity,
                        price: draft.paidPrice,
                    },
                ],
                extra: {
                    open_type: 'popup',
                    popup: { width: 800, height: 600 },
                    separately_confirmed: true, // 수동 승인 플로우
                    redirect_url: `${baseUrl}/ko/online-store/payment-result`,
                    card_quota: '0,2,3',
                },
            });

            switch (bootRes.event) {
                case 'confirm': {
                    const receiptId =
                        (bootRes.data && (bootRes.data.receipt_id || bootRes.data.receiptId)) ||
                        (bootRes as any).receipt_id ||
                        (bootRes as any).receiptId ||
                        '';

                    if (!receiptId) {
                        alert('영수증 번호를 확인할 수 없습니다.');
                        // 안전차원: 팝업 정리
                        try { await Bootpay.destroy(); } catch {}
                        break;
                    }

                    if (confirmingRef.current) break; // 중복 가드
                    confirmingRef.current = true;

                    try {
                        // 1) 서버 결제 확정(재고/검증 등)
                        const res = await serverPaid({
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
                            deliveryInfo: draft.deliveryInfo,
                            receiptId,
                            billingPrice: draft.paidPrice,
                        });

                        if (res?.status === true && res?.orderMessage === 'done') {
                            // 2) Bootpay에 최종 승인 (200이어야 한다고 가정)
                            try {
                                await Bootpay.confirm();  // 정상 완료
                            } catch (e) {
                                console.error('Bootpay.confirm error:', e);
                                // confirm 실패해도 팝업을 닫아 UX 이상 방지
                            } finally {
                                // ✅ confirm 이후 팝업 강제 정리
                                try { await Bootpay.destroy(); } catch {}
                            }

                            // 3) 임시 데이터 정리 및 완료 페이지 이동
                            clearPendingOrderDraft();
                            sessionStorage.removeItem(`order-draft:${draft.orderId}`);

                            // 결과 표시용 저장 (선택)
                            sessionStorage.setItem(
                                'last-paid',
                                JSON.stringify({
                                    orderId: draft.orderId,
                                    receiptId,
                                    paidPrice: draft.paidPrice,
                                    productNm: draft.productNm,
                                }),
                            );

                            // done 이벤트를 기다리지 않고 바로 이동 (popup 모드에서 더 안정적)
                            router.push(
                                `/ko/online-store/payment-result?event=done&order_id=${encodeURIComponent(
                                    draft.orderId,
                                )}&receipt_id=${encodeURIComponent(receiptId)}&status=success`,
                            );
                        } else {
                            alert(res?.orderMessage || '재고 부족 등 사유로 결제를 승인할 수 없습니다.');
                            try { await Bootpay.destroy(); } catch {}
                        }
                    } catch (e: any) {
                        console.error('serverPaid error at confirm:', e);
                        alert(e?.message || '결제 승인에 실패했습니다.');
                        // 승인 실패 시 팝업 닫기
                        try { await Bootpay.destroy(); } catch {}
                    } finally {
                        confirmingRef.current = false;
                    }
                    break;
                }

                case 'done': {
                    // 일부 케이스에선 confirm 후 done 이벤트가 들어올 수 있음
                    const receiptId =
                        (bootRes.data && (bootRes.data.receipt_id || bootRes.data.receiptId)) ||
                        (bootRes as any).receipt_id ||
                        (bootRes as any).receiptId ||
                        '';

                    // 팝업 정리
                    try { await Bootpay.destroy(); } catch {}

                    router.push(
                        `/ko/online-store/payment-result?event=done&order_id=${encodeURIComponent(
                            draft.orderId,
                        )}&receipt_id=${encodeURIComponent(receiptId)}&status=success`,
                    );
                    break;
                }

                case 'cancel': {
                    // 팝업 정리
                    try { await Bootpay.destroy(); } catch {}
                    alert('결제가 취소되었습니다.');
                    router.push(
                        `/ko/online-store/payment-result?orderId=${encodeURIComponent(draft.orderId)}&status=fail`,
                    );
                    break;
                }

                case 'error': {
                    // 팝업 정리
                    try { await Bootpay.destroy(); } catch {}
                    console.error('Bootpay error:', bootRes);
                    alert(bootRes?.message || '결제 중 오류가 발생했습니다.');
                    router.push(
                        `/ko/online-store/payment-result?orderId=${encodeURIComponent(draft.orderId)}&status=fail`,
                    );
                    break;
                }

                default:
                    // 예외 케이스에서도 팝업 정리 시도
                    try { await Bootpay.destroy(); } catch {}
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
