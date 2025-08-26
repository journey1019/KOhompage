/** src/app/[locale]/cart/page.tsx */
'use client';
import { useCartStore } from '@/stores/cartStore';
import QuantitySelector from '@/components/(Payment)/QuantitySelector';
import { toOrderOption } from '@/lib/api/paidApi';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { items, updateQuantity, removeItem, subtotal } = useCartStore();
    const router = useRouter();

    const total = subtotal();

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-xl font-bold mb-4">장바구니</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">장바구니가 비었습니다.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map((it) => (
                            <div key={it.productId} className="flex justify-between items-center border rounded p-3">
                                <div className="flex-1">
                                    <div className="font-semibold">{it.productNm}</div>
                                    <div className="text-sm text-gray-500">
                                        {Object.entries(it.selectedOptions).flatMap(([gid, arr]) => arr.map(v => (
                                            <span key={`${gid}:${v}`} className="inline-block mr-2">#{gid}:{v}</span>
                                        )))}
                                    </div>
                                </div>
                                <QuantitySelector
                                    value={it.quantity}
                                    min={1}
                                    max={it.availablePurchase ?? it.stockQuantity ?? 99}
                                    onChange={(q) => updateQuantity(it.productId, q)}
                                />
                                <div className="w-28 text-right font-bold">
                                    {(it.finalPrice * it.quantity).toLocaleString()}원
                                </div>
                                <button className="ml-3 text-red-500" onClick={() => removeItem(it.productId)}>삭제</button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end items-center space-x-6">
                        <div className="text-lg">
                            합계: <span className="font-bold">{total.toLocaleString()}원</span>
                        </div>
                        <button
                            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => router.push('/ko/cart/checkout')}
                        >
                            결제하기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
