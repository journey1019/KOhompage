"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bootpay } from '@bootpay/client-js';
import { mockValidateApi } from '@/lib/api/mock/payment';
import { ProductList, Product } from '@/lib/api/productApi';

import { ensureDeliveryInfoFromAPI, isValidDelivery } from '@/lib/api/delivery';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { getProductImageUrl, fetchProductImageObjectUrl } from '@/lib/api/resourceApi';
import {
    createOrderDraft,
    serverPaid,
    CreateOrderDraftRequest,
    OrderOptionItem,
    toOrderOption,
    normalizeOptions,
    savePendingOrderDraft
} from '@/lib/api/paidApi';

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
const ProductCard: React.FC<Product> = ({ productId, productNm, productCategory, productType, useYn, mainDesc, mainImagePath, mainImageFileNm, productPrice, taxAddYn, taxAddType, taxAddValue = 0, stockQuantity, finalPrice, availablePurchase, codeOption }) => {
    const router = useRouter();
    const fallbackSrc = '/images/DefaultImage.png';
    const [imageUrl, setImageUrl] = useState<string>(fallbackSrc)

    const userInfo = JSON.parse(localStorage.getItem('paymentUserInfo')!);

    // 이미지 로드 (보호 API 대응)
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
                // 공개라면 경로로 재시도
                setImageUrl(getProductImageUrl(productId, mainImageFileNm) || fallbackSrc);
            }
        }
        load();
        return () => { if (revoked) URL.revokeObjectURL(revoked); };
    }, [productId, mainImageFileNm]);

    const onClickBuy = async () => {
        // 로그인 체크
        const token = localStorage.getItem('userToken');
        const userInfoStr = localStorage.getItem('paymentUserInfo');
        if (!token || !userInfoStr) return router.push('/ko/login');
        if (useYn === 'N' || stockQuantity <= 0) return alert('현재 구매할 수 없는 상품입니다.');

        // 배송지 확보(현 구조: localStorage)
        const delivery = JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null');
        if (!delivery?.recipient || !delivery?.addressMain || !delivery?.postalCode || !delivery?.phone) {
            alert('배송지 정보가 없습니다. 마이페이지에서 배송지 등록 후 다시 시도해 주세요.');
            return router.push('/ko/myPage/delivery');
        }

        try {
            // 1) 사전 주문 생성 → draft 생성
            const payload: CreateOrderDraftRequest = {
                productId,
                productNm,
                finalPrice,
                purchaseQuantity: 1,
                productPrice,
                taxAddYn,
                taxAddType,
                taxAddValue,
                orderOption: toOrderOption(normalizeOptions(codeOption), { /* 선택 옵션 있으면 전달 */ }),
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
                product: {
                    productId,
                    productNm,
                    productPrice,
                    finalPrice,
                    taxAddYn,
                    taxAddType,
                    taxAddValue,
                },
                quantity: 1,
                orderOptionList: payload.orderOption,
                amount: draftRes.paidPrice,
                expiredDate: draftRes.expiredDate,
                purchaseIndex: draftRes.purchaseIndex,
            });

            // 주문서에서 재사용할 초안도 저장
            useCheckoutStore.getState().setDraft(draftRes);

            // 2) draft를 sessionStorage에 저장 → 주문서 페이지에서 사용
            sessionStorage.setItem(`order-draft:${draftRes.orderId}`, JSON.stringify(draftRes));

            // 3) 주문서로 이동
            router.push(`/ko/online-store/order/${encodeURIComponent(draftRes.orderId)}`);
        } catch (e: any) {
            console.error(e);
            alert(e?.message || '주문 생성에 실패했습니다.');
        }
    };

    return (
        <div className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
                src={imageUrl}
                alt={productNm}
                className="w-full h-72 object-cover"
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; if (t.src !== fallbackSrc) t.src = fallbackSrc; }}
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{productNm}</h2>
                <p className="text-sm text-gray-500 mb-1">
                    {productType[0].toUpperCase() + productType.slice(1)}
                </p>
                <div className="flex justify-between">
                    <p className="text-base font-bold mb-2">{finalPrice.toLocaleString()}원</p>
                    <span className="text-sm text-gray-500">재고: {stockQuantity}</span>
                </div>
                <button
                    onClick={onClickBuy}
                    disabled={useYn === 'N' || stockQuantity <= 0}
                    className={`w-full py-2 rounded text-sm font-medium ${
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