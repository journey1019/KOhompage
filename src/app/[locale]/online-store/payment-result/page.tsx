/** src/app/[locale]/online-store/payment-result/page.tsx */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/payment';

type PaidSummary = {
    orderId: string;
    receiptId: string;
    paidPrice: number;
    productNm: string;
};

export default function PaymentResultPage() {
    const sp = useSearchParams();
    const router = useRouter();

    const status = sp.get('status') || 'unknown'; // success | fail
    const orderId = sp.get('orderId') || '';

    const [paid, setPaid] = useState<PaidSummary | null>(null);

    useEffect(() => {
        const raw = sessionStorage.getItem('last-paid');
        if (raw) {
            try { setPaid(JSON.parse(raw)); } catch { setPaid(null); }
        }
    }, []);

    const isSuccess = status === 'success';

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className={`text-xl font-semibold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? '결제가 완료되었습니다.' : '결제에 실패했습니다.'}
            </h1>

            <div className="border rounded-md divide-y">
                <div className="flex justify-between p-4">
                    <span className="text-gray-600">주문번호</span>
                    <span className="font-medium">{orderId}</span>
                </div>
                {paid?.receiptId && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">영수증 번호</span>
                        <span className="font-medium">{paid.receiptId}</span>
                    </div>
                )}
                {paid?.productNm && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">상품명</span>
                        <span className="font-medium">{paid.productNm}</span>
                    </div>
                )}
                {typeof paid?.paidPrice === 'number' && (
                    <div className="flex justify-between p-4">
                        <span className="text-gray-600">결제금액</span>
                        <span className="font-medium">{formatCurrency(paid.paidPrice)}</span>
                    </div>
                )}
                <div className="flex justify-between p-4">
                    <span className="text-gray-600">상태</span>
                    <span className={`font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {isSuccess ? '성공' : '실패'}
          </span>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => router.push('/ko/online-store')} className="px-4 py-2 rounded border">
                    계속 쇼핑
                </button>
                {isSuccess && (
                    <button onClick={() => router.push('/ko/mypage/orders')} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                        주문 내역 보기
                    </button>
                )}
            </div>
        </div>
    );
}
