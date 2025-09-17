/** src/app/[locale]/online-store/myPage/orders/page.tsx */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaidCancelUser from '@/components/(Online-Store)/Admin/PaidCancelUser';
import { getPaidDetail, PaidDetailResponse, getPaidList, PaidListResponse } from '@/lib/api/historyApi';
import { formatCurrency } from '@/lib/utils/payment';
import { toDash, fromDash } from '@/module/helper';
import DeliveryHistoryModal from '@/components/(Online-Store)/MyPage/DeliveryHistoryModal';
import DeliveryChangeModal from '@/components/(Online-Store)/MyPage/DeliveryChangeModal';
import { OrderListItem, statusClassByLocale, StatusBadge, Card, Row, deliveryStatusLabel } from '@/components/(Online-Store)/MyPage/OrderListItem';


/* --------------------- Page --------------------- */
export default function OrdersPage() {
    const router = useRouter();
    const sp = useSearchParams();
    const purchaseIdParam = sp.get('purchaseId');
    const purchaseId = purchaseIdParam ? Number(purchaseIdParam) : undefined;
    
    // 배송 이력 조회
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
        const fmt = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
        return { start: fmt(start), end: fmt(end) };
    });

    // DatePicker UI용 상태
    const [uiRange, setUiRange] = useState<{ start: string; end: string }>(() => ({
        start: toDash(dateRange.start),
        end: toDash(dateRange.end),
    }));
    const onChangeUiDate =
        (k: 'start' | 'end') =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setUiRange((s) => ({ ...s, [k]: e.target.value }));
            };
    const applyRange = () => {
        if (!uiRange.start || !uiRange.end) {
            alert('날짜를 모두 선택해 주세요.');
            return;
        }
        let startDash = uiRange.start;
        let endDash = uiRange.end;
        if (startDash > endDash) [startDash, endDash] = [endDash, startDash];
        setUiRange({ start: startDash, end: endDash });
        setDateRange({ start: fromDash(startDash), end: fromDash(endDash) });
    };
    const todayDash = (() => {
        const d = new Date();
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    })();

    useEffect(() => {
        if (purchaseId) return;
        setListLoading(true);
        setListError(null);
        getPaidList(dateRange.start, dateRange.end)
            .then((rows) => {
                // rows가 배열인지 확인하고 아닐 경우 빈 배열로
                setItems(Array.isArray(rows) ? rows : []);
            })
            .catch((e) => {
                setListError(e?.message ?? '주문 내역을 불러오지 못했습니다.');
                // 실패 시에도 items는 빈 배열 유지
                setItems([]);
            })
            .finally(() => setListLoading(false));
    }, [purchaseId, dateRange]);



    // 최신순 정렬은 렌더 시 계산(가독성 ↑)
    const sortedItems = useMemo(() => {
        const arr = Array.isArray(items) ? items : [];
        const safeTime = (s?: string) => {
            if (!s) return 0;
            // 백엔드 포맷 → ISO(+09:00)로 보정
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
        // 결제 취소/실패/거절 상태는 변경 불가
        const status = detail.purchaseDetailInfo?.statusLocale ?? "";
        if (/취소|실패|거절/i.test(status)) return { can: false, reason: "취소/실패 상태" };
        // 배송상태: W(대기)만 변경 허용. P/D는 불가
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
        } catch (e:any) {
            setDetailError(e?.message ?? "주문 내역 재조회 실패");
        } finally {
            setDetailLoading(false);
        }
    }

    useEffect(() => {
        reloadDetail();
    }, [purchaseId]);

    const productImgUrl = useMemo(() => {
        if (!data?.productInfo?.mainImagePath || !data?.productInfo?.mainImageFileNm) return null;
        return data.productInfo.mainImagePath;
    }, [data]);


    // OrdersPage 내부에 유틸로 추가
    function judgeCancelable(detail: PaidDetailResponse | null): { can: boolean; reason?: string } {
        if (!detail) return { can: false, reason: "데이터 없음" };

        const status = detail.purchaseDetailInfo?.statusLocale ?? "";
        if (/취소|실패|거절/i.test(status)) return { can: false, reason: "이미 취소/실패 상태" };

        // 일부/전액 취소 금액 키가 없을 수 있으므로 안전히 체크
        const cancelledPrice: number | undefined = (detail as any)?.purchaseDetailInfo?.cancelledPrice;
        if (typeof cancelledPrice === "number" && cancelledPrice > 0) {
            return { can: false, reason: "이미 취소된 결제입니다." };
        }

        // 배송 상태: W(대기)만 취소 허용, P(배송중)/D(완료)는 불가
        const ship = detail.purchaseDelivery?.deliveryStatus; // 'W' | 'P' | 'D' 등
        if (ship === "P") return { can: false, reason: "배송중 상태에서는 취소할 수 없습니다." };
        if (ship === "D") return { can: false, reason: "배송완료 주문은 취소할 수 없습니다." };

        // 그 외(승인대기/결제완료 & 배송대기)면 허용
        return { can: true };
    }


    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">주문내역 / 배송정보</h2>

            {/* ===== 리스트 모드 ===== */}
            {!purchaseId && (
                <>
                    {/* 필터 영역 */}
                    <div className="mb-4 p-4 border rounded-md flex items-end gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">시작일</label>
                            <input
                                type="date"
                                className="border rounded px-3 py-2 w-44"
                                value={uiRange.start}
                                onChange={onChangeUiDate('start')}
                                max={todayDash}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">종료일</label>
                            <input
                                type="date"
                                className="border rounded px-3 py-2 w-44"
                                value={uiRange.end}
                                onChange={onChangeUiDate('end')}
                                max={todayDash}
                            />
                        </div>
                        <button onClick={applyRange} className="px-4 h-[42px] rounded bg-gray-800 text-white">
                            적용
                        </button>
                    </div>

                    {/* 리스트 */}
                    {listLoading && <div className="p-6 border rounded bg-gray-50">불러오는 중…</div>}
                    {listError && <div className="p-6 border rounded bg-red-50 text-red-700">{listError}</div>}
                    {!listLoading && !listError && sortedItems.length === 0 && (
                        <div className="p-6 border rounded bg-gray-50">해당 기간에 주문내역이 없습니다.</div>
                    )}

                    <div className="space-y-3">
                        {sortedItems.map((it) => (
                            <OrderListItem
                                key={it.purchaseId}
                                item={it}
                                onDetail={() =>
                                    router.push(`/ko/online-store/myPage/orders?purchaseId=${encodeURIComponent(String(it.purchaseId))}`)
                                }
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
                    <div className="mb-4">
                        <button
                            onClick={() => router.push('/ko/online-store/myPage/orders')}
                            className="px-3 py-2 rounded border"
                        >
                            ← 주문 목록으로
                        </button>
                    </div>

                    {detailLoading && <div className="p-6 border rounded bg-gray-50">불러오는 중…</div>}
                    {detailError && <div className="p-6 border rounded bg-red-50 text-red-700">{detailError}</div>}

                    {data && (
                        <div className="space-y-6">
                            {/* 주문 요약 (statusLocale 최상단 + 강조) */}
                            <Card>
                                <div className="p-4 flex flex-col gap-3">
                                    {/* ✅ 상태 배지: 가장 상단 & 눈에 띄게 */}
                                    <div>
                                        <StatusBadge text={data.purchaseDetailInfo.statusLocale} size="lg" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {productImgUrl ? (
                                            <img
                                                src={productImgUrl}
                                                alt={data.productInfo.productNm}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                        ) : (
                                            <div
                                                className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                                                NO IMG
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-gray-600">주문번호</div>
                                            <div className="text-base font-semibold break-all">{data.orderId}</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm text-gray-600">결제금액</div>
                                            <div
                                                className="text-2xl font-extrabold">{formatCurrency(data.purchaseFee)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* 결제 정보 */}
                            <Card>
                                <div className="p-4 font-semibold">결제 정보</div>
                                <div className="divide-y">
                                    <Row k="결제수단" v={data.purchaseDetailInfo.methodSymbol.toUpperCase()} />
                                    <Row k="PG사" v={data.purchaseDetailInfo.pgCompany} />
                                    <Row k="결제상태"
                                         v={<StatusBadge text={data.purchaseDetailInfo.statusLocale} size="sm" />} />
                                    <Row k="승인일시" v={data.purchaseDetailInfo.purchasedAt} />
                                    <Row k="요청일시" v={data.purchaseDetailInfo.requestedAt} />
                                    {data.purchaseDetailInfo.cardCompany && (
                                        <Row
                                            k="카드사"
                                            v={`${data.purchaseDetailInfo.cardCompany} (${data.purchaseDetailInfo.cardType}/${data.purchaseDetailInfo.cardOwnerType})`}
                                        />
                                    )}
                                    {data.purchaseDetailInfo.cardNo &&
                                        <Row k="카드번호" v={data.purchaseDetailInfo.cardNo} />}
                                    {typeof data.purchaseDetailInfo.taxFree === 'number' && (
                                        <Row k="면세금액" v={formatCurrency(data.purchaseDetailInfo.taxFree)} />
                                    )}
                                    {data.purchaseDetailInfo.receiptId &&
                                        <Row k="영수증 ID" v={data.purchaseDetailInfo.receiptId} />}
                                    {data.purchaseDetailInfo.receiptUrl && (
                                        <Row
                                            k="영수증"
                                            v={
                                                <a
                                                    className="text-blue-600 underline"
                                                    href={data.purchaseDetailInfo.receiptUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    영수증 보기
                                                </a>
                                            }
                                        />
                                    )}
                                </div>
                            </Card>

                            {/* 배송 정보 */}
                            <Card>
                                <div className="p-4 flex flex-row justify-between items-center">
                                    <div className="font-semibold">배송 정보</div>
                                    {data && (
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => openHistory(data.purchaseId)}
                                                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                                            >
                                                배송 이력 보기
                                            </button>

                                            {/* 배송지 변경 */}
                                            {(() => {
                                                const j = judgeAddressChangeable(data);
                                                return (
                                                    <button
                                                        onClick={() => setAddrOpen(true)}
                                                        disabled={!j.can}
                                                        title={!j.can ? j.reason : undefined}
                                                        className={`rounded-md border px-3 py-2 text-sm ${j.can ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"}`}
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
                                    <Row
                                        k="주소"
                                        v={`${data.purchaseDelivery.addressMain} ${data.purchaseDelivery.addressSub ?? ''}`.trim()}
                                    />
                                    <Row k="우편번호" v={data.purchaseDelivery.postalCode} />
                                    <Row k="배송상태" v={deliveryStatusLabel(data.purchaseDelivery.deliveryStatus)} />
                                    {data.purchaseDelivery.deliveryCompany && (
                                        <Row k="택배사"
                                             v={data.purchaseDelivery.companyName ?? data.purchaseDelivery.deliveryCompany} />
                                    )}
                                    {data.purchaseDelivery.deliveryCode &&
                                        <Row k="송장번호" v={data.purchaseDelivery.deliveryCode} />}
                                    {data.purchaseDelivery.linkUrl && (
                                        <Row
                                            k="배송조회"
                                            v={
                                                <a
                                                    className="text-blue-600 underline"
                                                    href={data.purchaseDelivery.linkUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    배송추적 링크
                                                </a>
                                            }
                                        />
                                    )}
                                </div>
                            </Card>

                            {/* 상품 / 과금 정보 */}
                            <Card>
                                <div className="p-4 font-semibold">상품 / 과금 정보</div>
                                <div className="divide-y">
                                    <Row k="상품명" v={data.productInfo.productNm} />
                                    <Row k="상품분류"
                                         v={`${data.productInfo.productCategory} / ${data.productInfo.productType}`} />
                                    <Row k="구매수량" v={String(data.purchaseQuantity)} />
                                    <Row k="상품단가" v={formatCurrency(data.productPrice)} />
                                    <Row
                                        k="부가세"
                                        v={data.taxYn === 'Y' ? `${data.taxAddValue}${data.taxAddType === 'percent' ? '%' : '원'}` : '미부과'}
                                    />
                                    <Row k="결제금액(총)" v={<span
                                        className="font-extrabold">{formatCurrency(data.purchaseFee)}</span>} />
                                    {data.orderOption?.length > 0 && (
                                        <div className="flex justify-between p-4">
                                            <span className="text-gray-600">옵션</span>
                                            <div className="text-right">
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
                                    // 성공 후 상세 재조회(배지/상태 갱신)
                                    await reloadDetail();
                                }}
                            />
                        )}
                    </div>
                </>
            )}

            <DeliveryHistoryModal
                open={historyOpen}
                purchaseId={historyPid}
                onClose={closeHistory}
            />

            {data && (
                <DeliveryChangeModal
                    open={addrOpen}
                    purchaseId={data.purchaseId}
                    onClose={() => setAddrOpen(false)}
                    initial={{
                        recipient: data.purchaseDelivery?.recipient,
                        addressMain: data.purchaseDelivery?.addressMain,
                        addressSub: data.purchaseDelivery?.addressSub ?? "",
                        postalCode: data.purchaseDelivery?.postalCode,
                        phone: data.purchaseDelivery?.phone,
                        telNo: data.purchaseDelivery?.telNo ?? "",
                        deliveryDesc: data.purchaseDelivery?.deliveryDesc ?? "",
                    }}
                    onSuccess={async () => {
                        // 저장 성공 후 최신 상세 재조회(화면 갱신)
                        await reloadDetail();
                    }}
                />
            )}

        </div>
    );
}
