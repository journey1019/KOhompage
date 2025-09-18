/** src/app/[locale]/online-store/order/[orderId]/page.tsx */
'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { formatCurrency } from '@/lib/utils/payment';
import { serverPaid, CreateOrderDraftResponse, clearPendingOrderDraft, serverPaidConfirmOnly } from '@/lib/api/paidApi';
import { Badge } from '@/components/(Online-Store)/MyPage/Badge';
import { formatDateTimeKST } from '@/lib/utils/dateUtils';
import { SectionCard, KV } from '@/components/(Online-Store)/MyPage/SectionCard';
import { DeliveryManageListItem } from '@/lib/api/delivery';
import DeliverySelectModal from '@/components/(Online-Store)/Order/DeliverySelectModal';
import { toDraftDeliveryInfo } from '@/lib/utils/DeliveryManageListItem';

export default function OrderSummaryPage() {
    const router = useRouter();

    // 배송지 변경 모달
    const [addrModalOpen, setAddrModalOpen] = useState(false);

    function openAddrModal() {
        setAddrModalOpen(true);
    }
    function closeAddrModal() {
        setAddrModalOpen(false);
    }

    function applySelectedAddress(item: DeliveryManageListItem) {
        setDraft(prev => {
            if (!prev) return prev;
            const next = {
                ...prev,
                deliveryInfo: { ...prev.deliveryInfo, ...toDraftDeliveryInfo(item) }
            };
            // ✅ 세션에 즉시 반영 (결제 직전까지 주문서의 배송지는 로컬에서 유지)
            sessionStorage.setItem(`order-draft:${orderId}`, JSON.stringify(next));
            return next;
        });
    }

    /** Login 토큰 만료시 Login Page 이동 */
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const tokenExpired = localStorage.getItem("tokenExpired");
        // 현재 시간
        const now = new Date();
        // tokenExpired 문자열 → Date 객체 변환
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(" ", "T")) : null;

        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push("/ko/online-store/login");
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
            { k: '개당 최종가(부가세포함)', v: formatCurrency(draft.finalPrice) }, // 개당 최종가
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

        // 이전 성공 캐시 제거 (가장 먼저)
        sessionStorage.removeItem('last-paid');

        try {
            const baseUrl =
                (typeof window !== 'undefined' ? window.location.origin : '') ||
                process.env.NEXT_PUBLIC_SITE_URL ||
                'http://localhost:3000';

            // 간단한 모바일 브라우저 체크
            const isMobile =
                typeof navigator !== 'undefined' &&
                /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

            const requiresConfirm = !isMobile; // PC-popup은 true(수동 승인), 모바일 redirect는 false(자동 승인)
// 결제 전에 세션에 저장 (결과 페이지에서 분기용)

            sessionStorage.setItem(`order-flow:${draft.orderId}`, JSON.stringify({ requiresConfirm }));

            // 서버가 내려준 총액만 신뢰 (최우선: finalPrice, 없으면 paidPrice)
            const TOTAL = Number(draft.finalPrice ?? draft.paidPrice);

            const bootRes = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: Number(draft.paidPrice),
                order_name: draft.productNm,
                order_id: draft.orderId,
                pg: 'nicepay',
                method: ['card', 'bank'],
                // methods: ['card', 'bank', 'vbank'], // 카드/계좌이체/가상계좌 허용
                user: {},
                items: [
                    {
                        id: String(draft.productId), // 문자열 권장
                        name: draft.productNm,
                        qty: Number(draft.purchaseQuantity),
                        price: Number(draft.finalPrice),
                    },
                ],
                extra: {
                    open_type: isMobile ? 'redirect' : 'popup', // 모바일은 redirect 권장
                    popup: { width: 800, height: 600 },
                    separately_confirmed: isMobile ? false : true, // 👈 모바일은 자동 승인 | 수동 승인 플로우
                    // redirect_url: `${baseUrl}/ko/online-store/payment-result`,
                    redirect_url: `${baseUrl}/ko/online-store/payment-result?order_id=${encodeURIComponent(draft.orderId)}`,
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
                            finalPrice: Number(draft.paidPrice),      // 총액
                            orderStatus: draft.orderStatus,
                            purchaseQuantity: Number(draft.purchaseQuantity),
                            productPrice: Number(draft.productPrice),
                            taxAddYn: draft.taxAddYn,
                            taxAddType: draft.taxAddType,
                            taxAddValue: draft.taxAddValue,
                            paidPrice: Number(draft.paidPrice),
                            expiredDate: draft.expiredDate,
                            purchaseIndex: draft.purchaseIndex,
                            orderId: draft.orderId,
                            deliveryInfo: draft.deliveryInfo,
                            receiptId,
                            billingPrice: Number(draft.paidPrice),
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
                                    purchaseId: draft.purchaseIndex,
                                }),
                            );
                            console.log(draft)

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

                    // 취소 시에도 확실히 제거
                    sessionStorage.removeItem('last-paid');

                    alert('결제가 취소되었습니다.');
                    router.push(
                        `/ko/online-store/payment-result?orderId=${encodeURIComponent(draft.orderId)}&status=fail`,
                    );
                    break;
                }

                case 'error': {
                    // 팝업 정리
                    try { await Bootpay.destroy(); } catch {}

                    // 에러 시에도 제거
                    sessionStorage.removeItem('last-paid');

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
            // 예외 발생 시에도 제거
            sessionStorage.removeItem('last-paid');

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

    const hasOption = Array.isArray(draft.orderOption) && draft.orderOption.length > 0;
    const taxLabel = draft.taxAddYn === 'Y'
        ? `${draft.taxAddValue}${draft.taxAddType === 'percent' ? '%' : '원'}`
        : '미부과';


    return (
        <div className="mx-auto w-full max-w-[475px] px-4 py-6 md:max-w-6xl md:px-6">
            {/* 헤더: 상품명 / 주문번호 / 만료 */}
            <div className="mb-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                            {draft.productNm}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge tone="blue">주문번호: {draft.orderId}</Badge>
                            <Badge tone="yellow">주문 만료: {formatDateTimeKST(draft.expiredDate)}</Badge>
                        </div>
                    </div>

                    {/* 모바일에선 아래로 떨어지도록 text-right 대신 자체 정렬 */}
                    <div className="md:text-right">
                        <div className="text-sm text-gray-600">결제 예정금액</div>
                        <div className="text-2xl font-extrabold md:text-3xl">
                            {formatCurrency(Number(draft.paidPrice))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 본문: 좌측 정보 · 우측 금액 요약 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* 우측(1칸): 가격 요약 — 모바일에서 먼저 보여주기 */}
                <div className="space-y-6 order-2 md:col-span-1">
                    <SectionCard title="결제 요약">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">제품 단가</span>
                                <span className="font-medium">{formatCurrency(Number(draft.finalPrice))}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">수량</span>
                                <span className="font-medium">{Number(draft.purchaseQuantity)}</span>
                            </div>
                            <div className="my-2 border-t" />
                            <div className="flex items-center justify-between text-lg">
                                <span className="font-semibold text-gray-800">결제 예정 총액</span>
                                <span className="font-extrabold text-gray-900">
                {formatCurrency(Number(draft.paidPrice))}
              </span>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 액션 영역 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={pay}
                                className={`h-12 w-full rounded-md text-sm font-semibold text-white ${
                                    submitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                                disabled={submitting}
                            >
                                {submitting ? '결제 중…' : '결제하기'}
                            </button>
                            <button
                                onClick={() => router.push('/ko/online-store')}
                                className="h-12 w-full rounded-md border text-sm"
                                disabled={submitting}
                            >
                                계속 쇼핑
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-gray-500">
                            결제 완료 후, 마이페이지 &gt; 주문내역에서 영수증 및 배송 상태를 확인할 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 좌측(2칸): 상품/주문/배송/옵션 — 모바일에선 뒤로 */}
                <div className="space-y-6 order-1 md:col-span-2">
                    <SectionCard title="상품 정보">
                        {/* 모바일 1열, md부터 2열 */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <KV k="상품명" v={draft.productNm} />
                            <KV k="수량" v={String(draft.purchaseQuantity)} />
                            <KV
                                k="제품 단가"
                                v={<span className="font-semibold">{formatCurrency(Number(draft.finalPrice))}</span>}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard title="주문 정보">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <KV k="주문번호" v={<span className="font-mono text-sm md:text-base">{draft.orderId}</span>} mono />
                            <KV
                                k="주문 가능 여부"
                                v={draft.orderStatus ? <Badge tone="green">가능</Badge> : <Badge tone="red">불가</Badge>}
                            />
                            <KV k="만료일시" v={formatDateTimeKST(draft.expiredDate)} />
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="배송 정보"
                        right={
                            <button
                                onClick={openAddrModal}
                                className="rounded-md px-3 py-1.5 text-xs font-semibold text-white"
                            >
                                <Badge tone="gray">
                                    배송지 변경
                                </Badge>
                            </button>
                        }
                    >
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <KV k="수령인" v={draft.deliveryInfo.recipient} />
                            <KV k="연락처" v={draft.deliveryInfo.phone} />
                            <KV k="우편번호" v={draft.deliveryInfo.postalCode} />
                            <KV
                                k="상태"
                                v={
                                    draft.deliveryInfo.deliveryStatus === 'W' ? (
                                        <Badge tone="gray">대기</Badge>
                                    ) : draft.deliveryInfo.deliveryStatus === 'P' ? (
                                        <Badge tone="blue">배송중</Badge>
                                    ) : draft.deliveryInfo.deliveryStatus === 'D' ? (
                                        <Badge tone="green">완료</Badge>
                                    ) : (
                                        draft.deliveryInfo.deliveryStatus
                                    )
                                }
                            />
                        </div>

                        <div className="mt-2">
                            <div className="text-sm text-gray-500">주소</div>
                            <div className="font-medium">
                                {`${draft.deliveryInfo.addressMain} ${draft.deliveryInfo.addressSub ?? ''}`.trim()}
                            </div>
                        </div>

                        {(draft.deliveryInfo.deliveryDesc || draft.deliveryInfo.telNo) && (
                            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                {draft.deliveryInfo.deliveryDesc && <KV k="배송메모" v={draft.deliveryInfo.deliveryDesc} />}
                                {draft.deliveryInfo.telNo && <KV k="TEL" v={draft.deliveryInfo.telNo} />}
                            </div>
                        )}
                    </SectionCard>

                    <DeliverySelectModal open={addrModalOpen} onClose={closeAddrModal} onSelect={applySelectedAddress} />

                    {hasOption && (
                        <SectionCard
                            title="옵션 정보"
                            right={<span className="text-xs text-gray-500">{draft.orderOption?.length}개</span>}
                        >
                            <div className="flex flex-wrap gap-2">
                                {draft.orderOption!.map((o) => (
                                    <span
                                        key={`${o.codeId}:${o.key}:${o.value}`}
                                        className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs"
                                    >
                  <span className="text-gray-500">{o.key}</span>
                  <span className="font-medium text-gray-900">{o.value}</span>
                </span>
                                ))}
                            </div>
                        </SectionCard>
                    )}
                </div>
            </div>
        </div>
    );
}
