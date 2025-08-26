"use client";

import { useState, useEffect } from 'react';

import { Bootpay } from '@bootpay/client-js';
import { mockValidateApi } from '@/lib/api/mock/payment';
import { useRouter } from 'next/navigation';
import { ProductList, Product } from '@/lib/api/productApi';
import { getProductImageUrl, fetchProductImageObjectUrl } from '@/lib/api/resourceApi';
import { createOrderDraft, CreateOrderDraftRequest, normalizeOptions, toOrderOption, OptionGroup, OrderOption, createOrder, CreateOrderRequest, PaymentInfo } from '@/lib/api/paidApi';
import QuantitySelector from '@/components/(Payment)/QuantitySelector';
import OptionPicker from '@/components/(Payment)/OptionPicker';
import { useCartStore } from '@/stores/cartStore';
import { ensureDeliveryInfoFromAPI, isValidDelivery, readDeliveryFromStorage } from '@/lib/api/delivery';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { savePendingOrderDraft } from '@/lib/payment/pending';
import { addWindowFocusTracking } from '@react-aria/interactions';
import { toTaxYN, toTaxType } from '@/lib/payment/typeGuards';


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
    const useMock = true;
    const router = useRouter();
    const fallbackSrc = '/images/DefaultImage.png';
    const [imageUrl, setImageUrl] = useState<string>(fallbackSrc)

    const addItem = useCartStore(s => s.addItem);
    const [qty, setQty] = useState(1);
    const [groups] = useState<OptionGroup[]>(normalizeOptions(codeOption));
    const [selected, setSelected] = useState<Record<string, string[]>>({}); // groupId -> key[]
    const setDraft = useCheckoutStore(s => s.setDraft);

    const maxPurchase = Math.max(1, availablePurchase ?? (availablePurchase as any) ?? stockQuantity ?? 99);
    const canBuy =
        (groups.every(g => !g.required || (selected[g.id]?.length ?? 0) > 0)) &&
        qty >= 1 && qty <= maxPurchase;

    const onAddToCart = () => {
        if (!canBuy) return alert('필수 옵션/수량을 확인해 주세요.');
        addItem({
            productId,
            productNm,
            productPrice,
            finalPrice,
            taxAddYn,
            taxAddType,
            taxAddValue: taxAddValue ?? 0,
            imageUrl: undefined, // 필요 시 getProductImageUrl 사용해서 저장
            quantity: qty,
            selectedOptions: selected,
            stockQuantity,
            availablePurchase: availablePurchase ?? (availablePurchase as any),
        });
        alert('장바구니에 담았습니다.');
    };

    const onBuyNow = async () => {
        // 옵션 수량
        if (!canBuy) return alert("필수 옵션/수량을 확인해 주세요.");

        // 로그인 확인
        const token = localStorage.getItem("userToken");
        const userInfoStr = localStorage.getItem("paymentUserInfo");
        if (!token || !userInfoStr) return router.push("/ko/login");

        // 배송지 확보
        const delivery = await ensureDeliveryInfoFromAPI();
        if (!isValidDelivery(delivery)) {
            alert("배송지 정보를 입력해 주세요.");
            return router.push("/ko/mypage/delivery");
        }

        const body: CreateOrderDraftRequest = {
            productId,
            productNm,
            finalPrice,
            purchaseQuantity: qty,
            productPrice,
            taxAddYn: toTaxYN(taxAddYn),
            taxAddType: toTaxType(taxAddType),
            taxAddValue,
            orderOption: toOrderOption(groups, selected), // 이미 있는 헬퍼 활용
            deliveryInfo: {
                ...delivery,
                postalCode: String(delivery.postalCode),
                phone: delivery.phone?.replace(/-/g, ""), // 서버 스펙에 맞춰 정규화
            },
        };

        try {
            const draft = await createOrderDraft(body); // ✅ 1) 서버 잠금/검증
            savePendingOrderDraft({
                orderId: draft.orderId,
                userId: JSON.parse(userInfoStr).userId,
                product: {
                    productId,
                    productNm,
                    productPrice,
                    finalPrice,
                    taxAddYn: toTaxYN(taxAddYn),
                    taxAddType: toTaxType(taxAddType),
                    taxAddValue
                },
                quantity: qty,
                orderOptionList: body.orderOption ?? [],
                amount: draft.paidPrice,          // 서버가 계산한 최종 결제금액
                expiredDate: draft.expiredDate,   // 있으면 저장
                purchaseIndex: draft.purchaseIndex
            });

            useCheckoutStore.getState().setDraft(draft); //    2) 초안 보관
            router.push("/ko/order/checkout"); //    3) 체크아웃 이동
        } catch (e: any) {
            if (e?.message === "HTTP 403") {
                alert("로그인 세션이 만료되었습니다. 로그인 페이지로 이동합니다.");
                router.push("/ko/login");
            } else {
                console.error("주문 생성 오류:", e);
                alert("주문 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            }
        }
    };


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

    return (
        <div className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img src={imageUrl} alt={productNm} className="w-full h-72 object-cover" onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== fallbackSrc) target.src = fallbackSrc;
            }} />

            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{productNm}</h2>
                <p className="text-sm text-gray-500 mb-1">{productType[0].toUpperCase() + productType.slice(1, productType.length)}</p>
                <div className="flex flex-row justify-between">
                    <p className="text-base font-bold mb-2">{finalPrice.toLocaleString()}원</p>
                    <span className="text-sm 2xl:text-base text-gray-500">상품 재고: {stockQuantity}</span>
                </div>

                <button
                    onClick={onBuyNow}
                    disabled={!canBuy}
                    className={`w-full py-2 rounded text-sm font-medium ${
                        useYn === 'N' || stockQuantity <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {useYn === 'N' || stockQuantity <= 0 ? '구매불가' : '구매하기'}
                </button>
            </div>

            <div className="p-4 space-y-3">
                <OptionPicker groups={groups} value={selected} onChange={setSelected} />
                <div className="flex items-center justify-between">
                    <QuantitySelector value={qty} onChange={setQty} min={1} max={maxPurchase} />
                    <div className="text-base font-bold">{(finalPrice * qty).toLocaleString()}원</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button onClick={onAddToCart} className="w-full py-2 rounded border text-gray-700 hover:bg-gray-50">
                        장바구니
                    </button>
                    <button
                        onClick={onBuyNow}
                        className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                        disabled={!canBuy}
                    >
                        바로구매
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;