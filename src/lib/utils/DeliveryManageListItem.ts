import DeliverySelectModal from '@/components/(Online-Store)/Order/DeliverySelectModal';
import type { DeliveryManageListItem } from '@/lib/api/delivery';

// 주문서 draft의 deliveryInfo 타입에 맞게 변환
export function toDraftDeliveryInfo(item: DeliveryManageListItem) {
    return {
        recipient: item.recipient,
        addressMain: item.addressMain,
        addressSub: item.addressSub,
        postalCode: item.postalCode,
        phone: item.phone,
        telNo: item.telNo,
        deliveryDesc: item.deliveryDesc,
        deliveryStatus: 'W' as const, // 주문 단계에선 대기
    };
}
