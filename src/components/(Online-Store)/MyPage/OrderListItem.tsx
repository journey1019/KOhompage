import { PaidListResponse } from '@/lib/api/historyApi';
import { formatCurrency } from '@/lib/utils/payment';
// import { cn } from '@/lib/cn' // 프로젝트에 cn 유틸 있으면 사용해도 OK

export function statusClassByLocale(locale: string) {
    if (/완료|성공/i.test(locale)) return 'bg-green-600';
    if (/대기/i.test(locale)) return 'bg-amber-600';
    if (/취소|실패|거절/i.test(locale)) return 'bg-red-600';
    return 'bg-gray-600';
}

/** 뱃지: 모바일은 기본(sm), md↑에서 md, lg↑에서 lg */
export function StatusBadge({ text, size = 'lg' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
    const base = 'inline-flex items-center rounded-full text-white font-extrabold';
    const pad =
        size === 'lg'
            ? 'px-4 py-1.5 text-base'
            : size === 'md'
                ? 'px-3 py-1 text-sm'
                : 'px-2 py-0.5 text-xs';

    return <span className={`${base} ${pad} ${statusClassByLocale(text)}`}>{text}</span>;
}

/** 카드: 모바일 기본 여백↑, 그림자/모서리 */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

/** Key-Value Row: 모바일은 세로 스택, md↑에서는 좌우 정렬 */
export function Row({ k, v }: { k: string; v: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1 p-4 md:flex-row md:items-center md:justify-between">
            <span className="text-xs text-gray-500 md:text-sm">{k}</span>
            <span className="font-medium text-gray-900 md:text-base md:text-right break-words">
        {v}
      </span>
        </div>
    );
}

export function deliveryStatusLabel(s: 'W' | 'P' | 'D') {
    switch (s) {
        case 'W':
            return '배송대기';
        case 'P':
            return '배송중';
        case 'D':
            return '배송완료';
        default:
            return s;
    }
}

export function OrderListItem({
                                  item,
                                  onDetail,
                                  onTrace,
                                  onExchange,
                              }: {
    item: PaidListResponse;
    onDetail: () => void;
    onTrace: () => void;
    onExchange: () => void;
}) {
    const dateStr = item.purchasedAt || item.purchaseDate || '';

    return (
        <Card className="p-4">
            {/* 상태 뱃지: 모바일은 작게, md↑에서 md 사이즈로 확대 */}
            <div className="mb-3">
        <span className="md:hidden">
          <StatusBadge text={item.statusLocale} size="sm" />
        </span>
                <span className="hidden md:inline">
          <StatusBadge text={item.statusLocale} size="md" />
        </span>
            </div>

            {/* 본문: 모바일 세로, md↑ 가로 정렬 */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {/* 썸네일: 모바일 56, md↑ 72 */}
                {item.mainImagePath ? (
                    <img
                        src={item.mainImagePath}
                        alt={item.productNm}
                        className="h-14 w-14 rounded object-cover md:h-18 md:w-18 lg:h-20 lg:w-20"
                    />
                ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded bg-gray-100 text-[10px] text-gray-500 md:h-18 md:w-18 lg:h-20 lg:w-20">
                        NO IMG
                    </div>
                )}

                {/* 정보 영역 */}
                <div className="min-w-0 flex-1">
                    {/* 날짜: 모바일 xs, md↑ sm */}
                    <div className="text-xs text-gray-500 md:text-sm">{dateStr}</div>

                    {/* 상품명: 모바일 2줄까지, 데스크톱은 한 줄 트렁케이트 */}
                    <div className="mt-0.5 font-semibold leading-snug text-gray-900 line-clamp-2 md:line-clamp-1 md:truncate">
                        {item.productNm}
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                        수량 {item.purchaseQuantity} · 총{' '}
                        <span className="font-bold text-gray-900">{formatCurrency(item.purchaseFee)}</span>
                    </div>

                    {/* 보조 정보 (선택): 모바일에서는 줄바꿈, md↑에서는 인라인 */}
                    <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500 md:flex-row md:flex-wrap md:items-center md:gap-3">
                        {item.methodSymbol && <span>결제수단: {item.methodSymbol.toUpperCase()}</span>}
                        {item.productType && <span>타입: {item.productType}</span>}
                        {item.productCategory && <span>분류: {item.productCategory}</span>}
                    </div>
                </div>

                {/* 액션: 모바일 풀폭 스택, md↑ 가로 배치 */}
                <div className="mt-2 grid grid-cols-2 gap-2 md:mt-0 md:flex md:flex-none md:items-center md:gap-2">
                    <button
                        onClick={onDetail}
                        className="col-span-2 rounded-md bg-blue-600 px-3 py-2 text-center text-sm text-white hover:bg-blue-700 md:col-span-1 md:min-w-[120px]"
                    >
                        주문 상세보기
                    </button>
                    <button
                        onClick={onTrace}
                        className="rounded-md border px-3 py-2 text-center text-sm hover:bg-gray-50 md:col-span-1 md:min-w-[120px]"
                    >
                        배송조회
                    </button>
                    {/* 필요 시 열기
          <button
            onClick={onExchange}
            className="rounded-md border px-3 py-2 text-center text-sm hover:bg-gray-50 md:min-w-[120px]"
          >
            교환·반품
          </button>
          */}
                </div>
            </div>
        </Card>
    );
}
