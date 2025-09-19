'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaidCancelUser from '@/components/(Online-Store)/Admin/PaidCancelUser';
import { getPaidDetail, PaidDetailResponse, getPaidList, PaidListResponse } from '@/lib/api/historyApi';
import { formatCurrency } from '@/lib/utils/payment';
import { toDash, fromDash } from '@/module/helper';
import DeliveryHistoryModal from '@/components/(Online-Store)/MyPage/DeliveryHistoryModal';
import DeliveryChangeModal from '@/components/(Online-Store)/MyPage/DeliveryChangeModal';
import { OrderListItem, StatusBadge, Card, Row, deliveryStatusLabel } from '@/components/(Online-Store)/MyPage/OrderListItem';
import { todayDash, ymd } from '@/lib/utils/dateUtils';
import DateRangeMobile from '@/app/[locale]/online-store/myPage/_components/DateRangeMobile';


/* --------------------- Page --------------------- */
export default function OrdersPage() {
    const router = useRouter();
    const sp = useSearchParams();
    const purchaseIdParam = sp.get('purchaseId');
    const purchaseId = purchaseIdParam ? Number(purchaseIdParam) : undefined;

    // 배송 이력
    const [historyOpen, setHistoryOpen] = useState(false);
    const [historyPid, setHistoryPid] = useState<number | null>(null);

    // 배송지 변경
    const [addrOpen, setAddrOpen] = useState(false);

    /* 토큰 만료 체크 */
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const tokenExpired = localStorage.getItem('tokenExpired');
        const now = new Date();
        const expiredAt = tokenExpired ? new Date(tokenExpired.replace(' ', 'T')) : null;
        if (!token || !expiredAt || expiredAt.getTime() < now.getTime()) {
            router.push('/ko/online-store/login');
        }
    }, [router]);

    /* ===== 리스트 모드 상태 ===== */
    const [listLoading, setListLoading] = useState<boolean>(!purchaseId);
    const [listError, setListError] = useState<string | null>(null);
    const [items, setItems] = useState<PaidListResponse[]>([]);

    const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return { start: ymd(start), end: ymd(end) }; // 내부 저장: yyyymmdd
    });

    // DatePicker UI용 상태(표시는 yyyy-MM-dd)
    const [uiRange, setUiRange] = useState<{ start: string; end: string }>(() => ({
        start: toDash(dateRange.start),
        end: toDash(dateRange.end),
    }));

    const applyRange = () => {
        if (!uiRange.start || !uiRange.end) {
            alert('날짜를 모두 선택해 주세요.');
            return;
        }
        let [s, e] = [uiRange.start, uiRange.end];
        if (s > e) [s, e] = [e, s];
        setUiRange({ start: s, end: e });
        setDateRange({ start: fromDash(s), end: fromDash(e) }); // 서버 요청 포맷: yyyymmdd
    };

    useEffect(() => {
        if (purchaseId) return;
        setListLoading(true);
        setListError(null);
        getPaidList(dateRange.start, dateRange.end)
            .then((rows) => setItems(Array.isArray(rows) ? rows : []))
            .catch((e) => {
                setListError(e?.message ?? '주문 내역을 불러오지 못했습니다.');
                setItems([]);
            })
            .finally(() => setListLoading(false));
    }, [purchaseId, dateRange]);

    // 최신순 정렬
    const sortedItems = useMemo(() => {
        const arr = Array.isArray(items) ? items : [];
        const safeTime = (s?: string) => {
            if (!s) return 0;
            const iso = s.includes('T') ? s : s.replace(' ', 'T') + '+09:00';
            const t = Date.parse(iso);
            return Number.isNaN(t) ? 0 : t;
        };
        return [...arr].sort((a, b) => {
            const aT = safeTime(a.purchasedAt || a.purchaseDate);
            const bT = safeTime(b.purchasedAt || b.purchaseDate);
            return bT - aT;
        });
    }, [items]);

    /* ===== 배송 이력 상태 ===== */
    function openHistory(purchaseId: number) {
        setHistoryPid(purchaseId);
        setHistoryOpen(true);
    }
    function closeHistory() {
        setHistoryOpen(false);
    }

    /* ===== 배송지 변경 ===== */
    function judgeAddressChangeable(detail: PaidDetailResponse | null): { can: boolean; reason?: string } {
        if (!detail) return { can: false, reason: "데이터 없음" };
        const status = detail.purchaseDetailInfo?.statusLocale ?? "";
        if (/취소|실패|거절/i.test(status)) return { can: false, reason: "취소/실패 상태" };
        const ship = detail.purchaseDelivery?.deliveryStatus;
        if (ship === "P") return { can: false, reason: "배송중에는 변경할 수 없습니다." };
        if (ship === "D") return { can: false, reason: "배송완료 주문은 변경할 수 없습니다." };
        return { can: true };
    }

    /* ===== 상세 모드 상태 ===== */
    const [detailLoading, setDetailLoading] = useState<boolean>(!!purchaseId);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [data, setData] = useState<PaidDetailResponse | null>(null);

    async function reloadDetail() {
        if (!purchaseId) return;
        try {
            setDetailLoading(true);
            setDetailError(null);
            const res = await getPaidDetail(purchaseId);
            setData(res);
        } catch (e: any) {
            setDetailError(e?.message ?? "주문 내역 재조회 실패");
        } finally {
            setDetailLoading(false);
        }
    }
    useEffect(() => { reloadDetail(); }, [purchaseId]);

    const productImgUrl = useMemo(() => {
        if (!data?.productInfo?.mainImagePath || !data?.productInfo?.mainImageFileNm) return null;
        return data.productInfo.mainImagePath;
    }, [data]);

    function judgeCancelable(detail: PaidDetailResponse | null): { can: boolean; reason?: string } {
        if (!detail) return { can: false, reason: "데이터 없음" };
        const status = detail.purchaseDetailInfo?.statusLocale ?? "";
        if (/취소|실패|거절/i.test(status)) return { can: false, reason: "이미 취소/실패 상태" };
        const cancelledPrice: number | undefined = (detail as any)?.purchaseDetailInfo?.cancelledPrice;
        if (typeof cancelledPrice === "number" && cancelledPrice > 0) return { can: false, reason: "이미 취소된 결제입니다." };
        const ship = detail.purchaseDelivery?.deliveryStatus;
        if (ship === "P") return { can: false, reason: "배송중 상태에서는 취소할 수 없습니다." };
        if (ship === "D") return { can: false, reason: "배송완료 주문은 취소할 수 없습니다." };
        return { can: true };
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-3 sm:px-4">
            <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold">주문내역 / 배송정보</h2>

            {/* ===== 리스트 모드 ===== */}
            {!purchaseId && (
                <>
                    {/* 날짜 필터: 모바일 최적화 */}
                    <DateRangeMobile
                        uiRange={uiRange}
                        onChange={setUiRange}
                        onApply={applyRange}
                        busy={listLoading}
                    />

                    {/* 리스트 상태 */}
                    {listLoading && <div className="rounded-md border bg-gray-50 p-4 sm:p-6 text-sm">불러오는 중…</div>}
                    {listError && <div className="rounded-md border bg-red-50 p-4 sm:p-6 text-sm text-red-700">{listError}</div>}
                    {!listLoading && !listError && sortedItems.length === 0 && (
                        <div className="rounded-md border bg-gray-50 p-4 sm:p-6 text-sm">해당 기간에 주문내역이 없습니다.</div>
                    )}

                    {/* 주문 리스트: 카드 간격/터치 타깃 개선 */}
                    <div className="space-y-2 sm:space-y-3">
                        {sortedItems.map((it) => (
                            <OrderListItem
                                key={it.purchaseId}
                                item={it}
                                onDetail={() => router.push(`/ko/online-store/myPage/orders?purchaseId=${encodeURIComponent(String(it.purchaseId))}`)}
                                onTrace={() => openHistory(it.purchaseId)}
                                onExchange={() => alert('교환/반품 신청 기능은 준비 중입니다.')}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ===== 상세 모드 ===== */}
            {purchaseId && (
                <>
                    <div className="mb-3 sm:mb-4">
                        <button
                            onClick={() => router.push('/ko/online-store/myPage/orders')}
                            className="h-10 rounded-md border px-3 text-sm hover:bg-gray-50"
                        >
                            ← 주문 목록으로
                        </button>
                    </div>

                    {detailLoading && <div className="rounded-md border bg-gray-50 p-4 sm:p-6 text-sm">불러오는 중…</div>}
                    {detailError && <div className="rounded-md border bg-red-50 p-4 sm:p-6 text-sm text-red-700">{detailError}</div>}

                    {data && (
                        <div className="space-y-4 sm:space-y-6">
                            {/* 주문 요약: 이미지/금액 레이아웃 반응형 */}
                            <Card>
                                <div className="flex flex-col gap-3 p-4">
                                    <div>
                                        <StatusBadge text={data.purchaseDetailInfo.statusLocale} size="lg" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        {productImgUrl ? (
                                            <img
                                                src={productImgUrl}
                                                alt={data.productInfo.productNm}
                                                className="h-28 w-full max-w-[7rem] rounded object-cover sm:w-28"
                                            />
                                        ) : (
                                            <div className="flex h-28 w-full max-w-[7rem] items-center justify-center rounded bg-gray-100 text-xs text-gray-500 sm:w-28">
                                                NO IMG
                                            </div>
                                        )}

                                        <div className="mt-2 flex-1 min-w-0 sm:mt-0">
                                            <div className="text-xs text-gray-600">주문번호</div>
                                            <div className="break-all text-base font-semibold">{data.orderId}</div>
                                        </div>

                                        <div className="mt-2 text-left sm:mt-0 sm:text-right">
                                            <div className="text-xs text-gray-600">결제금액</div>
                                            <div className="text-2xl font-extrabold">{formatCurrency(data.purchaseFee)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* 결제 정보 */}
                            <Card>
                                <div className="p-4 text-base font-semibold">결제 정보</div>
                                <div className="divide-y">
                                    <Row k="결제수단" v={data.purchaseDetailInfo.methodSymbol.toUpperCase()} />
                                    <Row k="PG사" v={data.purchaseDetailInfo.pgCompany} />
                                    <Row k="결제상태" v={<StatusBadge text={data.purchaseDetailInfo.statusLocale} size="sm" />} />
                                    <Row k="승인일시" v={data.purchaseDetailInfo.purchasedAt} />
                                    <Row k="요청일시" v={data.purchaseDetailInfo.requestedAt} />
                                    {data.purchaseDetailInfo.cardCompany && (
                                        <Row
                                            k="카드사"
                                            v={`${data.purchaseDetailInfo.cardCompany} (${data.purchaseDetailInfo.cardType}/${data.purchaseDetailInfo.cardOwnerType})`}
                                        />
                                    )}
                                    {data.purchaseDetailInfo.cardNo && <Row k="카드번호" v={data.purchaseDetailInfo.cardNo} />}
                                    {/*{typeof data.purchaseDetailInfo.taxFree === 'number' && (*/}
                                    {/*    <Row k="면세금액" v={formatCurrency(data.purchaseDetailInfo.taxFree)} />*/}
                                    {/*)}*/}
                                    {/*{data.purchaseDetailInfo.receiptId && <Row k="영수증 ID" v={data.purchaseDetailInfo.receiptId} />}*/}
                                    {data.purchaseDetailInfo.receiptUrl && (
                                        <Row
                                            k="영수증"
                                            v={
                                                <a className="text-blue-600 underline" href={data.purchaseDetailInfo.receiptUrl} target="_blank" rel="noreferrer">
                                                    영수증 보기
                                                </a>
                                            }
                                        />
                                    )}
                                </div>
                            </Card>

                            {/* 배송 정보 */}
                            <Card>
                                <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-base font-semibold">배송 정보</div>
                                    {data && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openHistory(data.purchaseId)}
                                                className="h-10 rounded-md border px-3 text-sm hover:bg-gray-50"
                                            >
                                                배송 이력 보기
                                            </button>
                                            {(() => {
                                                const j = judgeAddressChangeable(data);
                                                return (
                                                    <button
                                                        onClick={() => setAddrOpen(true)}
                                                        disabled={!j.can}
                                                        title={!j.can ? j.reason : undefined}
                                                        className={`h-10 rounded-md border px-3 text-sm ${j.can ? 'hover:bg-gray-50' : 'cursor-not-allowed opacity-50'}`}
                                                    >
                                                        배송지 변경
                                                    </button>
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                                <div className="divide-y">
                                    <Row k="수령인" v={data.purchaseDelivery.recipient} />
                                    <Row k="연락처" v={data.purchaseDelivery.phone} />
                                    <Row k="주소" v={`${data.purchaseDelivery.addressMain} ${data.purchaseDelivery.addressSub ?? ''}`.trim()} />
                                    <Row k="우편번호" v={data.purchaseDelivery.postalCode} />
                                    <Row k="배송상태" v={deliveryStatusLabel(data.purchaseDelivery.deliveryStatus)} />
                                    {data.purchaseDelivery.deliveryCompany && (
                                        <Row k="택배사" v={data.purchaseDelivery.companyName ?? data.purchaseDelivery.deliveryCompany} />
                                    )}
                                    {data.purchaseDelivery.deliveryCode && <Row k="송장번호" v={data.purchaseDelivery.deliveryCode} />}
                                    {data.purchaseDelivery.linkUrl && (
                                        <Row
                                            k="배송조회"
                                            v={
                                                <a className="text-blue-600 underline" href={data.purchaseDelivery.linkUrl} target="_blank" rel="noreferrer">
                                                    배송추적 링크
                                                </a>
                                            }
                                        />
                                    )}
                                </div>
                            </Card>

                            {/* 상품 / 과금 정보 */}
                            <Card>
                                <div className="p-4 text-base font-semibold">상품 / 과금 정보</div>
                                <div className="divide-y">
                                    <Row k="상품명" v={data.productInfo.productNm} />
                                    <Row k="상품분류" v={`${data.productInfo.productCategory} / ${data.productInfo.productType}`} />
                                    <Row k="구매수량" v={String(data.purchaseQuantity)} />
                                    <Row k="상품단가" v={formatCurrency(data.productPrice)} />
                                    {/*<Row k="부가세" v={data.taxYn === 'Y' ? `${data.taxAddValue}${data.taxAddType === 'percent' ? '%' : '원'}` : '미부과'} />*/}
                                    <Row k="결제금액(총)" v={<span className="font-extrabold">{formatCurrency(data.purchaseFee)}</span>} />
                                    {data.orderOption?.length > 0 && (
                                        <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-start sm:justify-between">
                                            <span className="text-gray-600">옵션</span>
                                            <div className="text-sm sm:text-base sm:text-right">
                                                {data.orderOption.map((o) => (
                                                    <div key={`${o.codeId}:${o.key}:${o.value}`}>
                                                        {o.key}: {o.value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-end">
                        {data && (
                            <PaidCancelUser
                                purchaseId={data.purchaseId}
                                receiptId={data.purchaseDetailInfo?.receiptId || ''}
                                defaultMessage="사용자 요청 취소"
                                {...(() => {
                                    const j = judgeCancelable(data);
                                    return { cancellable: j.can, disabledReason: j.reason };
                                })()}
                                onSuccess={async () => {
                                    await reloadDetail();
                                }}
                            />
                        )}
                    </div>
                </>
            )}

            <DeliveryHistoryModal open={historyOpen} purchaseId={historyPid} onClose={closeHistory} />

            {data && (
                <DeliveryChangeModal
                    open={addrOpen}
                    purchaseId={data.purchaseId}
                    onClose={() => setAddrOpen(false)}
                    initial={{
                        recipient: data.purchaseDelivery?.recipient,
                        addressMain: data.purchaseDelivery?.addressMain,
                        addressSub: data.purchaseDelivery?.addressSub ?? '',
                        postalCode: data.purchaseDelivery?.postalCode,
                        phone: data.purchaseDelivery?.phone,
                        telNo: data.purchaseDelivery?.telNo ?? '',
                        deliveryDesc: data.purchaseDelivery?.deliveryDesc ?? '',
                    }}
                    onSuccess={async () => {
                        await reloadDetail();
                    }}
                />
            )}
        </div>
    );
}
