"use client";

/**
 * ProductCard
 *
 * 상품 목록에서 상품 카드를 보여주는 커스텀 컴포넌트입니다.
 *
 * @component
 * @param {number} [productId] - 상품 ID
 * @param {string} [productNm] - 상품명
 * @param {string} [productCategory] - 상품 범주
 * @param {string} [productType] - 상품 타입
 * @param {(value: string) => string} [useYn] - 사용여부 (Y/N)
 * @param {string} [productType] - 상품 타입
 * @param {React.ReactNode} [rightIcon] - 오른쪽에 표시할 아이콘
 * @param {React.ReactNode} [leftIcon] - 왼쪽에 표시할 아이콘
 * @param {TextInputProps} [...props] - 추가 TextInput 속성
 * @returns {JSX.Element}
 */


/** src/components/(Payment)/ProductCard.tsx */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/api/productApi';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { getProductImageUrl, fetchProductImageObjectUrl } from '@/lib/api/resourceApi';
import {
    createOrderDraft,
    savePendingOrderDraft,
    toOrderOption,
    normalizeOptions,
    CreateOrderDraftRequest
} from '@/lib/api/paidApi';

const ProductCard: React.FC<Product> = ({
                                            productId, productNm, productCategory, productType, useYn,
                                            mainDesc, mainImagePath, mainImageFileNm,
                                            productPrice, taxAddYn, taxAddType, taxAddValue = 0,
                                            stockQuantity, finalPrice, availablePurchase, codeOption
                                        }) => {
    const router = useRouter();
    const fallbackSrc = '/images/DefaultImage.png';
    const [imageUrl, setImageUrl] = useState<string>(fallbackSrc);

    // ✅ 구매 수량 상태 추가
    const [qty, setQty] = useState(1);

    const userInfo = JSON.parse(localStorage.getItem('paymentUserInfo') || 'null');

    // 이미지 로드
    useEffect(() => {
        let revoked: string | null = null;
        async function load() {
            try {
                if (mainImageFileNm) {
                    const objUrl = await fetchProductImageObjectUrl(productId, mainImageFileNm);
                    setImageUrl(objUrl);
                    revoked = objUrl;
                } else {
                    setImageUrl(fallbackSrc);
                }
            } catch {
                setImageUrl(getProductImageUrl(productId, mainImageFileNm) || fallbackSrc);
            }
        }
        load();
        return () => { if (revoked) URL.revokeObjectURL(revoked); };
    }, [productId, mainImageFileNm]);

    const onClickBuy = async () => {
        const token = localStorage.getItem('userToken');
        const userInfoStr = localStorage.getItem('paymentUserInfo');
        if (!token || !userInfoStr) return router.push('/ko/login');
        if (useYn === 'N' || stockQuantity <= 0) return alert('현재 구매할 수 없는 상품입니다.');

        const delivery = JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null');
        if (!delivery?.recipient || !delivery?.addressMain || !delivery?.postalCode || !delivery?.phone) {
            alert('배송지 정보가 없습니다. 마이페이지에서 배송지 등록 후 다시 시도해 주세요.');
            return router.push('/ko/myPage/delivery');
        }

        try {
            const payload: CreateOrderDraftRequest = {
                productId,
                productNm,
                finalPrice,
                purchaseQuantity: qty, // ✅ 선택한 수량 반영
                productPrice,
                taxAddYn,
                taxAddType,
                taxAddValue,
                orderOption: toOrderOption(normalizeOptions(codeOption), {}),
                deliveryInfo: {
                    recipient: String(delivery.recipient),
                    addressMain: String(delivery.addressMain),
                    addressSub: String(delivery.addressSub || ''),
                    postalCode: String(delivery.postalCode),
                    phone: String(delivery.phone).replace(/[^0-9]/g, ''),
                },
            };

            const draftRes = await createOrderDraft(payload);
            if (!draftRes.orderStatus) return alert('현재 구매할 수 없는 상품입니다.');

            const userInfo = JSON.parse(userInfoStr);
            savePendingOrderDraft({
                orderId: draftRes.orderId,
                userId: userInfo.userId,
                product: { productId, productNm, productPrice, finalPrice, taxAddYn, taxAddType, taxAddValue },
                quantity: qty, // ✅ 반영
                orderOptionList: payload.orderOption,
                amount: draftRes.paidPrice,
                expiredDate: draftRes.expiredDate,
                purchaseIndex: draftRes.purchaseIndex,
            });

            useCheckoutStore.getState().setDraft(draftRes);
            sessionStorage.setItem(`order-draft:${draftRes.orderId}`, JSON.stringify(draftRes));

            router.push(`/ko/online-store/order/${encodeURIComponent(draftRes.orderId)}`);
        } catch (e: any) {
            console.error(e);
            alert(e?.message || '주문 생성에 실패했습니다.');
        }
    };

    // 최대 구매 가능 수량 (재고 vs availablePurchase 중 작은 값)
    const maxQty = Math.min(stockQuantity, availablePurchase ?? stockQuantity);

    return (
        <div className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img src={imageUrl} alt={productNm} className="w-full h-72 object-cover"
                 onError={(e) => { const t = e.currentTarget as HTMLImageElement; if (t.src !== fallbackSrc) t.src = fallbackSrc; }} />
            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{productNm}</h2>
                <p className="text-sm text-gray-500 mb-1">
                    {productType[0].toUpperCase() + productType.slice(1)}
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-base font-bold">{finalPrice.toLocaleString()}원</p>
                    <span className="text-sm text-gray-500">재고: {stockQuantity}</span>
                </div>

                {/* ✅ 수량 선택 */}
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`qty-${productId}`} className="text-sm text-gray-600">수량</label>
                    <select
                        id={`qty-${productId}`}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {Array.from({ length: maxQty }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onClickBuy}
                    disabled={useYn === 'N' || stockQuantity <= 0}
                    className={`w-full mt-3 py-2 rounded text-sm font-medium ${
                        useYn === 'N' || stockQuantity <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {useYn === 'N' || stockQuantity <= 0 ? '구매불가' : '구매하기'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
