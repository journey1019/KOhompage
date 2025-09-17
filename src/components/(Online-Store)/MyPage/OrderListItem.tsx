import { PaidListResponse } from '@/lib/api/historyApi';
import { formatCurrency } from '@/lib/utils/payment';

export function statusClassByLocale(locale: string) {
    // 결제완료/승인대기/취소/실패 등 일부 키워드 기준으로 색상 매핑
    if (/완료|성공/i.test(locale)) return 'bg-green-600';
    if (/대기/i.test(locale)) return 'bg-amber-600';
    if (/취소|실패|거절/i.test(locale)) return 'bg-red-600';
    return 'bg-gray-600';
}

export function StatusBadge({ text, size = 'lg' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
    const base = 'inline-flex items-center rounded-full text-white font-extrabold';
    const pad = size === 'lg' ? 'px-4 py-1.5 text-base' : size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';
    return <span className={`${base} ${pad} ${statusClassByLocale(text)}`}>{text}</span>;
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`border rounded-md ${className}`}>{children}</div>;
}

export function Row({ k, v }: { k: string; v: React.ReactNode }) {
    return (
        <div className="flex justify-between p-4">
            <span className="text-gray-600">{k}</span>
            <span className="font-medium text-right">{v}</span>
        </div>
    );
}

export function deliveryStatusLabel(s: 'W' | 'P' | 'D') {
    switch (s) {
        case 'W': return '배송대기';
        case 'P': return '배송중';
        case 'D': return '배송완료';
        default: return s;
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
            {/* ✅ statusLocale를 최상단에 크게 강조 */}
            <div className="mb-3">
                <StatusBadge text={item.statusLocale} size="md" />
            </div>

            <div className="flex gap-4 items-center">
                {/* 썸네일 */}
                {item.mainImagePath ? (
                    <img src={item.mainImagePath} alt={item.productNm} className="w-16 h-16 object-cover rounded" />
                ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">NO IMG</div>
                )}

                {/* 본문 */}
                <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-600">{dateStr}</div>
                    <div className="font-semibold truncate">{item.productNm}</div>
                    <div className="text-sm text-gray-600">
                        수량 {item.purchaseQuantity} · 총{' '}
                        <span className="font-bold text-gray-900">{formatCurrency(item.purchaseFee)}</span>
                    </div>
                </div>

                {/* 액션 */}
                <div className="flex flex-col gap-2">
                    <button onClick={onDetail} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                        주문 상세보기
                    </button>
                    <button onClick={onTrace} className="px-3 py-2 rounded border">
                        배송조회
                    </button>
                    {/*<button onClick={onExchange} className="px-3 py-2 rounded border">*/}
                    {/*    교환·반품 신청*/}
                    {/*</button>*/}
                </div>
            </div>
        </Card>
    );
}