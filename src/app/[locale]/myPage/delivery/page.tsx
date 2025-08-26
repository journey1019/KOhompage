/** src/app/[locale]/mypage/delivery/page.tsx */
'use client';

import { useEffect, useState } from 'react';
import {
    fetchDeliveryList, mapRecordToDeliveryInfo, saveDeliveryToStorage,
    DeliveryManageListItem,
} from '@/lib/api/delivery';
import { useRouter, useParams } from 'next/navigation';

export default function DeliverySelectPage() {
    const [list, setList] = useState<DeliveryManageListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { locale } = useParams() as { locale: string };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetchDeliveryList();
                setList(res || []);
            } finally { setLoading(false); }
        })();
    }, []);

    const onSelect = (item: DeliveryManageListItem) => {
        saveDeliveryToStorage(mapRecordToDeliveryInfo(item));
        alert('배송지가 적용되었습니다.');
        router.push(`/${locale}/order/checkout`);
    };

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">배송지 선택</h1>
            {loading ? (
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" />
                    <div>불러오는 중…</div>
                </div>
            ) : list.length === 0 ? (
                <div className="text-gray-600">등록된 배송지가 없습니다.</div>
            ) : (
                <div className="space-y-3">
                    {list.map(item => (
                        <div key={item.addressIndex} className="border rounded p-3 flex justify-between items-start">
                            <div className="text-sm leading-6">
                                <div className="font-medium">{item.recipient} / {item.phone || item.telNo}</div>
                                <div>{item.addressMain} {item.addressSub} ({item.postalCode})</div>
                                {item.alias ? <div className="text-gray-500">{item.alias}</div> : null}
                            </div>
                            <button
                                className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => onSelect(item)}
                            >
                                사용
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
