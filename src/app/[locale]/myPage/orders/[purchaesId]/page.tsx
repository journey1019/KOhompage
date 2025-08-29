/** src/app/[locale]/myPage/orders/[purchaseId]/page.tsx */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { PaidHistoryDetailResponse } from '@/lib/api/historyApi';
import { fetchPaidHistoryDetail } from '@/lib/api/historyApi';
import { formatCurrency } from '@/lib/utils/payment';

function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: 'green'|'yellow'|'red'|'gray' }) {
    const map: Record<string, string> = {
        green: 'bg-green-100 text-green-700 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        red: 'bg-red-100 text-red-700 border-red-200',
        gray: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return <span className={`inline-block px-2 py-0.5 text-xs rounded border ${map[color]}`}>{children}</span>;
}

function Row({ label, value, mono = false }:{ label: string; value?: React.ReactNode; mono?: boolean }) {
    return (
        <div className="flex justify-between p-3">
            <span className="text-gray-500">{label}</span>
            <span className={`font-medium ${mono ? 'font-mono' : ''}`}>{value ?? '-'}</span>
        </div>
    );
}

function formatDate(s?: string) {
    if (!s) return '';
    // 백엔드: 'YYYY-MM-DD HH:mm:ss'
    const d = new Date(s.replace(' ', 'T'));
    if (isNaN(d.getTime())) return s;
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export default function PaidHistoryDetailPage() {
    const router = useRouter();
    const { purchaseId } = useParams<{ purchaseId: string }>();

    const [data, setData] = useState<PaidHistoryDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState<string>();

    // 로그인 토큰 체크(필요시)
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const tokenExpired = localStorage.getItem('tokenExpired');
        const now = new Date();
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(' ', 'T')) : null;
        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push('/ko/login');
            return;
        }
    }, [router]);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                const res = await fetchPaidHistoryDetail(purchaseId); // GET 권장
                if (!alive) return;
                setData(res);
            } catch (e: any) {
                setErrMsg(e?.message || '결제 이력 조회 실패');
            } finally {
                setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [purchaseId]);

    const statusColor: 'green'|'yellow'|'red'|'gray' =
        data?.purchaseDetailInfo?.purchaseStatus === 1 ? 'green' : data?.purchaseStatus === 'Y' ? 'green'
            : data?.purchaseStatus === 'N' ? 'red' : 'gray';

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">결제 상세</h1>
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-100 rounded" />
                    <div className="h-40 bg-gray-100 rounded" />
                    <div className="h-40 bg-gray-100 rounded" />
                </div>
            </div>
        );
    }

    if (errMsg || !data) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">결제 상세</h1>
                <div className="p-6 border rounded bg-red-50 text-red-700">
                    {errMsg || '데이터가 없습니다.'}
                </div>
                <div className="mt-4">
                    <button onClick={() => router.back()} className="px-4 py-2 rounded border">뒤로</button>
                </div>
            </div>
        );
    }

    const { purchaseDetailInfo, purchaseDelivery, productInfo } = data;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">결제 상세</h1>
                <div className="flex items-center gap-2">
                    <Badge color={statusColor}>
                        {purchaseDetailInfo?.statusLocale || (data.purchaseStatus === 'Y' ? '결제완료' : '상태확인')}
                    </Badge>
                    {purchaseDetailInfo?.confirmEvent && <Badge color="gray">{purchaseDetailInfo.confirmEvent}</Badge>}
                </div>
            </div>

            {/* 결제 요약 */}
            <section className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">결제 요약</div>
                <Row label="주문번호" value={data.orderId} mono />
                <Row label="결제일시" value={formatDate(data.purchaseDate)} />
                <Row label="결제방식" value={purchaseDetailInfo?.pgCompany ? `${purchaseDetailInfo.pgCompany} / ${purchaseDetailInfo.methodSymbol}` : data.purchaseType} />
                <Row label="결제금액" value={formatCurrency(data.purchaseFee)} />
                <Row label="수량" value={String(data.purchaseQuantity)} />
            </section>

            {/* 결제 상세 */}
            <section className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">결제 상세</div>
                <Row label="영수증 번호" value={purchaseDetailInfo?.receiptId} mono />
                <Row label="PG사" value={purchaseDetailInfo?.pgCompany} />
                <Row label="카드사" value={purchaseDetailInfo?.cardCompany} />
                <Row label="카드번호" value={purchaseDetailInfo?.cardNo} mono />
                <Row label="승인 상태" value={purchaseDetailInfo?.statusLocale} />
                <Row label="요청시각" value={formatDate(purchaseDetailInfo?.requestedAt)} />
                <Row label="승인시각" value={formatDate(purchaseDetailInfo?.purchasedAt)} />
                {purchaseDetailInfo?.receiptUrl && (
                    <div className="flex justify-between p-3">
                        <span className="text-gray-500">영수증</span>
                        <a
                            href={purchaseDetailInfo?.receiptUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Bootpay 영수증 보기
                        </a>
                    </div>
                )}
            </section>

            {/* 배송 정보 */}
            <section className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">배송 정보</div>
                <Row label="수령인" value={purchaseDelivery?.recipient} />
                <Row label="연락처" value={purchaseDelivery?.phone} />
                <Row label="우편번호" value={purchaseDelivery?.postalCode} />
                <Row label="주소" value={`${purchaseDelivery?.addressMain || ''} ${purchaseDelivery?.addressSub || ''}`.trim()} />
                <Row label="배송상태" value={purchaseDelivery?.deliveryStatus} />
                <Row label="송장번호" value={purchaseDelivery?.deliveryCode || '-'} />
                {purchaseDelivery?.linkUrl ? (
                    <div className="flex justify-between p-3">
                        <span className="text-gray-500">택배 조회</span>
                        <a
                            href={purchaseDelivery.linkUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            배송 조회 링크
                        </a>
                    </div>
                ) : (
                    purchaseDelivery?.fullUrl && (
                        <div className="flex justify-between p-3">
                            <span className="text-gray-500">택배 조회</span>
                            <span className="text-sm text-gray-400">운송장/택배사가 등록되면 링크가 활성화됩니다.</span>
                        </div>
                    )
                )}
            </section>

            {/* 상품 정보 */}
            <section className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 font-semibold">상품 정보</div>
                <Row label="상품명" value={productInfo?.productNm} />
                <Row label="상품유형" value={productInfo?.productType} />
                <Row label="카테고리" value={productInfo?.productCategory} />
                <Row label="정가" value={formatCurrency(productInfo?.productPrice ?? 0)} />
                <Row label="판매가" value={formatCurrency(productInfo?.finalPrice ?? 0)} />
                {Array.isArray(productInfo?.codeOption) && productInfo!.codeOption!.length > 0 && (
                    <div className="p-3">
                        <div className="text-gray-500 mb-1">옵션</div>
                        <div className="flex flex-wrap gap-2">
                            {productInfo!.codeOption!.map((opt) => (
                                <Badge key={opt} color="gray">{opt}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <div className="flex justify-end gap-2">
                <button onClick={() => router.push('/ko/online-store')} className="px-4 py-2 rounded border">
                    계속 쇼핑
                </button>
                <button onClick={() => router.push('/ko/myPage/orders')} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                    주문 목록
                </button>
            </div>
        </div>
    );
}
