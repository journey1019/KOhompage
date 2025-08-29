// 'use client';
//
// import { useEffect, useMemo, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { fetchPaidHistoryDetailByIndex, PaidHistoryDetailResponse } from '@/lib/api/historyApi';
// import { formatCurrency } from '@/lib/utils/payment';
//
// function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray' }) {
//     const map = {
//         green: 'bg-green-100 text-green-700 border-green-200',
//         yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
//         red: 'bg-red-100 text-red-700 border-red-200',
//         blue: 'bg-blue-100 text-blue-700 border-blue-200',
//         gray: 'bg-gray-100 text-gray-700 border-gray-200',
//     } as const;
//     return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded border ${map[color]}`}>{children}</span>;
// }
//
// function Row({ label, value }: { label: string; value?: React.ReactNode }) {
//     return (
//         <div className="flex justify-between p-3">
//             <span className="text-gray-600">{label}</span>
//             <span className="font-medium text-right break-all">{value ?? '-'}</span>
//         </div>
//     );
// }
//
// export default function OrderDetailPage() {
//     const router = useRouter();
//     const params = useParams<{ purchaseId: string }>();
//     const purchaseId = params.purchaseId;
//     const [data, setData] = useState<PaidHistoryDetailResponse | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [err, setErr] = useState<string | null>(null);
//
//     useEffect(() => {
//         let mounted = true;
//         (async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetchPaidHistoryDetailByIndex(purchaseId);
//                 if (!mounted) return;
//                 setData(res);
//                 setErr(null);
//             } catch (e: any) {
//                 setErr(e?.message || '결제 상세를 불러오지 못했다.');
//             } finally {
//                 if (mounted) setLoading(false);
//             }
//         })();
//         return () => {
//             mounted = false;
//         };
//     }, [purchaseId]);
//
//     const summary = useMemo(() => {
//         if (!data) return null;
//         const pd = data.purchaseDetailInfo;
//         const purchaseStatusBadge = pd.statusLocale || (data.purchaseStatus === 'Y' ? '결제완료' : '오류/취소');
//         const methodText = pd.methodSymbol?.toUpperCase() || data.purchaseType?.toUpperCase();
//         return {
//             statusLocale: purchaseStatusBadge,
//             amount: data.purchaseFee,
//             method: methodText,
//             orderId: data.orderId,
//             receiptId: pd.receiptId,
//             purchasedAt: pd.purchasedAt,
//             requestedAt: pd.requestedAt,
//             pg: pd.pgCompany,
//             receiptUrl: pd.receiptUrl,
//         };
//     }, [data]);
//
//     const product = data?.productInfo;
//     const delivery = data?.purchaseDelivery;
//     const pay = data?.purchaseDetailInfo;
//
//     const statusColor = useMemo<'green' | 'yellow' | 'red' | 'blue' | 'gray'>(() => {
//         const s = summary?.statusLocale || '';
//         if (s.includes('완료')) return 'green';
//         if (s.includes('대기')) return 'yellow';
//         if (s.includes('취소') || s.includes('실패')) return 'red';
//         return 'blue';
//     }, [summary]);
//
//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <div className="mb-4 flex items-center justify-between">
//                 <h1 className="text-xl font-semibold">결제 상세</h1>
//                 <div className="flex gap-2">
//                     <button onClick={() => router.push('/ko/myPage/orders')} className="px-3 py-1 text-sm rounded border">주문 목록으로</button>
//                 </div>
//             </div>
//
//             {loading && (
//                 <div className="border rounded p-6 text-sm text-gray-600">불러오는 중…</div>
//             )}
//
//             {err && !loading && (
//                 <div className="border rounded p-6 text-sm text-red-600">오류: {err}</div>
//             )}
//
//             {data && !loading && (
//                 <div className="space-y-6">
//                     {/* 결제 요약 */}
//                     <section className="border rounded overflow-hidden">
//                         <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
//                             <div className="font-semibold">결제 요약</div>
//                             <Badge color={statusColor}>{summary?.statusLocale}</Badge>
//                         </div>
//                         <div className="divide-y">
//                             <Row label="결제금액" value={formatCurrency(summary?.amount || 0)} />
//                             <Row label="결제수단" value={summary?.method} />
//                             <Row label="주문번호" value={summary?.orderId} />
//                             <Row label="영수증 번호" value={summary?.receiptId} />
//                             <Row label="결제 요청시각" value={summary?.requestedAt} />
//                             <Row label="결제 완료시각" value={summary?.purchasedAt} />
//                             <Row label="PG사" value={summary?.pg} />
//                         </div>
//                         <div className="p-4 flex gap-2">
//                             {summary?.receiptUrl && (
//                                 <a
//                                     href={summary.receiptUrl}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//                                 >
//                                     영수증 보기
//                                 </a>
//                             )}
//                             {delivery?.linkUrl && (
//                                 <a
//                                     href={delivery.linkUrl}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="px-3 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 text-sm"
//                                 >
//                                     택배 조회
//                                 </a>
//                             )}
//                         </div>
//                     </section>
//
//                     {/* 상품 정보 */}
//                     <section className="border rounded overflow-hidden">
//                         <div className="p-4 border-b bg-gray-50 font-semibold">상품 정보</div>
//                         <div className="p-4 flex gap-4">
//                             <div className="w-28 h-28 rounded border overflow-hidden bg-white">
//                                 {product?.mainImageFileNm ? (
//                                     <img
//                                         src={product?.mainImagePath ?? '/images/DefaultImage.png'}
//                                         alt={product?.productNm}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => {
//                                             const t = e.currentTarget as HTMLImageElement;
//                                             t.src = '/images/DefaultImage.png';
//                                         }}
//                                     />
//                                 ) : (
//                                     <img src="/images/DefaultImage.png" className="w-full h-full object-cover" />
//                                 )}
//                             </div>
//                             <div className="flex-1">
//                                 <div className="text-base font-semibold">{product?.productNm}</div>
//                                 <div className="text-sm text-gray-500 mt-1">
//                                     카테고리: {product?.productCategory || '-'} / 타입: {product?.productType || '-'}
//                                 </div>
//                                 <div className="mt-2 grid grid-cols-2 gap-2">
//                                     <div className="text-sm text-gray-600">단가</div>
//                                     <div className="text-sm font-medium text-right">{formatCurrency(data.productPrice)}</div>
//                                     <div className="text-sm text-gray-600">수량</div>
//                                     <div className="text-sm font-medium text-right">{data.purchaseQuantity}</div>
//                                     <div className="text-sm text-gray-600">총 결제금액</div>
//                                     <div className="text-sm font-medium text-right">{formatCurrency(data.purchaseFee)}</div>
//                                     <div className="text-sm text-gray-600">부가세</div>
//                                     <div className="text-sm font-medium text-right">
//                                         {data.taxYn === 'Y' ? `${data.taxAddType === 'percent' ? `${data.taxAddValue}%` : `${formatCurrency(data.taxAddValue)}`}` : '미부과'}
//                                     </div>
//                                 </div>
//
//                                 {data.orderOption && Array.isArray(data.orderOption) && data.orderOption.length > 0 && (
//                                     <div className="mt-3">
//                                         <div className="text-sm text-gray-600 mb-1">옵션</div>
//                                         <ul className="list-disc list-inside text-sm text-gray-800">
//                                             {data.orderOption.map((op, idx) => (
//                                                 <li key={idx}>{op.key}: {op.value}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </section>
//
//                     {/* 배송 정보 */}
//                     <section className="border rounded overflow-hidden">
//                         <div className="p-4 border-b bg-gray-50 font-semibold">배송 정보</div>
//                         <div className="divide-y">
//                             <Row label="수령인" value={delivery?.recipient} />
//                             <Row label="연락처" value={delivery?.phone} />
//                             <Row label="주소" value={`${delivery?.addressMain || ''} ${delivery?.addressSub || ''}`.trim()} />
//                             <Row label="우편번호" value={delivery?.postalCode} />
//                             <Row label="배송상태" value={
//                                 <span className="inline-flex gap-2 items-center">
//                   <Badge color={
//                       delivery?.deliveryStatus === 'D' ? 'green' :
//                           delivery?.deliveryStatus === 'P' ? 'blue' :
//                               'yellow'
//                   }>
//                     {delivery?.deliveryStatus === 'D' ? '배송완료'
//                         : delivery?.deliveryStatus === 'P' ? '배송중'
//                             : '준비중'}
//                   </Badge>
//                 </span>
//                             } />
//                             <Row label="택배사" value={delivery?.companyName || delivery?.deliveryCompany || '-'} />
//                             <Row label="송장번호" value={delivery?.deliveryCode || '-'} />
//                             {delivery?.linkUrl && (
//                                 <div className="p-3 text-right">
//                                     <a
//                                         href={delivery.linkUrl}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         className="text-sm text-blue-600 hover:underline"
//                                     >
//                                         배송 조회 링크 열기
//                                     </a>
//                                 </div>
//                             )}
//                         </div>
//                     </section>
//
//                     {/* 결제 원장(카드/PG) */}
//                     <section className="border rounded overflow-hidden">
//                         <div className="p-4 border-b bg-gray-50 font-semibold">결제 상세(원장)</div>
//                         <div className="divide-y">
//                             <Row label="PG사" value={pay?.pgCompany} />
//                             <Row label="결제수단" value={pay?.methodSymbol?.toUpperCase()} />
//                             <Row label="카드사" value={pay?.cardCompany || '-'} />
//                             <Row label="카드번호" value={pay?.cardNo || '-'} />
//                             <Row label="영수증 번호" value={pay?.receiptId} />
//                             <Row label="요청시각" value={pay?.requestedAt} />
//                             <Row label="완료시각" value={pay?.purchasedAt} />
//                             <Row label="결제금액" value={formatCurrency(pay?.price || 0)} />
//                             <Row label="비과세" value={formatCurrency(pay?.taxFree || 0)} />
//                             <Row label="취소금액" value={formatCurrency(pay?.cancelledPrice || 0)} />
//                             <Row label="상태" value={pay?.statusLocale} />
//                             <div className="p-3 text-right">
//                                 {pay?.receiptUrl && (
//                                     <a
//                                         className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//                                         href={pay.receiptUrl}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                     >
//                                         부트페이 영수증 보기
//                                     </a>
//                                 )}
//                             </div>
//                         </div>
//                     </section>
//
//                     {/* 하단 액션 */}
//                     <div className="flex justify-end gap-2">
//                         <button onClick={() => router.push('/ko/myPage/orders')} className="px-4 py-2 rounded border">
//                             주문 목록으로
//                         </button>
//                         <button
//                             onClick={() => router.push('/ko/support')}
//                             className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
//                         >
//                             고객센터 문의
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React from 'react';

export default function OrdersPage() {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">주문내역 / 배송정보</h2>
            <div>여기에 주문내역과 배송정보 표시</div>;
        </>
    );
}