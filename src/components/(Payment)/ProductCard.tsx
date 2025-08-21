"use client";

import { useState, useEffect } from 'react';

import { Bootpay } from '@bootpay/client-js';
import { mockValidateApi } from '@/lib/api/mock/payment';
import { useRouter } from 'next/navigation';
import { ProductList, Product } from '@/lib/api/productApi';
import { getProductImageUrl, fetchProductImageObjectUrl } from '@/lib/api/resourceApi';
import { createOrder, CreateOrderRequest, PaymentInfo } from '@/lib/api/paidApi';

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

const ProductCard: React.FC<Product> = ({ productId, productNm, productCategory, productType, useYn, mainDesc, mainImagePath, mainImageFileNm, productPrice, taxAddYn, taxAddType, taxAddValue = 0, stockQuantity, finalPrice, availablePurchase, codeOption }) => {
    const useMock = true;
    const router = useRouter();
    const fallbackSrc = '/images/DefaultImage.png';
    const [imageUrl, setImageUrl] = useState<string>(fallbackSrc)

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

    // 주문 옵션/배송지 구성 헬퍼
    const buildOrderPayload = (userInfo: any, orderId: string): CreateOrderRequest => {
        const purchaseQuantity = 1; // 단건구매 기준 (필요하면 UI에서 선택)
        const optionList =
            (codeOption || []).map((code, idx) => ({
                codeId: String(idx + 1),
                key: 'DEFAULT',
                value: code,
                codeNm: code,
            })) || [];

        // 배송지 정보는 localStorage에 저장해뒀다고 가정
        const delivery =
            JSON.parse(localStorage.getItem('paymentDeliveryInfo') || 'null') || null;

        if (!delivery?.recipient || !delivery?.addressMain || !delivery?.postalCode || !delivery?.phone) {
            throw new Error('배송지 정보가 없습니다. 마이페이지에서 배송지 등록 후 다시 시도해 주세요.');
        }

        const payment: PaymentInfo = {
            orderId,
            pg: 'nicepay',
            method: 'card',
            amount: finalPrice,
        };

        return {
            userId: userInfo.userId,
            productId,
            productNm,
            productPrice,
            finalPrice,
            purchaseQuantity,
            taxAddYn,
            taxAddType,
            taxAddValue,
            orderOption: optionList,
            deliveryInfo: {
                recipient: delivery.recipient,
                addressMain: delivery.addressMain,
                addressSub: delivery.addressSub || '',
                postalCode: Number(delivery.postalCode),
                phone: delivery.phone,
            },
            payment,
        };
    };

    const validateOrder = async (id: number, userId: string) => {
        if (useMock) {
            return await mockValidateApi(id);
        } else {
            // 실제 검증 API가 있다면 여기에 연결
            const res = await fetch('/api/payment/order/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: id, userId, quantity: 1 }),
            });
            return await res.json();
        }
    };

    const handlePayment = async () => {
        // 1) 로그인 여부 확인
        const token = localStorage.getItem("userToken");
        const userInfoStr = localStorage.getItem("paymentUserInfo");

        if (!token || !userInfoStr) {
            alert("로그인이 필요합니다.");
            router.push("/ko/login");
            return;
        }

        // 사용자 정보 파싱
        const userInfo = JSON.parse(userInfoStr);

        if (useYn === 'N' || stockQuantity <= 0) {
            alert('현재 구매할 수 없는 상품입니다.');
            return;
        }

        // 2) order_id 생성(서버 선생성 방식 가능하나, 여기선 클라 생성)
        const orderId = `order_${Date.now()}_${productId}`;


        // 3) Bootpay 결제 요청
        try {
            const response = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: finalPrice, // ✅ Bootpay는 price를 사용
                order_name: productNm,
                order_id: orderId,
                pg: 'nicepay',
                method: 'card',
                user: {
                    id: userInfo.userId,
                    username: userInfo.userNm,
                    phone: userInfo.phone || '01000000000',
                    email: userInfo.email || 'test@test.com',
                },
                items: [
                    {
                        id: String(productId),      // ✅ 권장 키
                        name: productNm,
                        qty: 1,
                        price: finalPrice,
                    },
                ],
                extra: {
                    separately_confirmed: true, // confirm 이벤트에서 서버 검증 후 승인
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                },
            });

            // 4) 결제 이벤트 처리
            switch (response.event) {
                case 'confirm': {
                    // 서버 재고/한도 검증 (현재는 mock)
                    const ok = await validateOrder(productId, userInfo.userId);
                    if (ok?.success) {
                        await Bootpay.confirm();
                    } else {
                        await Bootpay.destroy();
                        alert(ok?.message || '결제를 진행할 수 없습니다.');
                    }
                    break;
                }
                case 'done': {
                    // 결제 완료 → 서버에 주문 저장
                    try {
                        const receiptId =
                            (response.data && (response.data.receipt_id || response.data.receiptId)) ||
                            (response as any).receipt_id || (response as any).receiptId || '';

                        const payload = buildOrderPayload(userInfo, orderId);
                        payload.payment.receiptId = receiptId;

                        await createOrder(payload);

                        router.push(`/ko/shop/payment-result?orderId=${encodeURIComponent(orderId)}&status=success`);
                    } catch (err: any) {
                        console.error('주문 저장 실패:', err);
                        alert(err?.message || '주문 저장에 실패했습니다. 문의해 주세요.');
                        router.push(`/ko/shop/payment-result?orderId=${encodeURIComponent(orderId)}&status=fail`);
                    }
                    break;
                }
                case 'cancel': {
                    alert('결제가 취소되었습니다.');
                    break;
                }
                case 'error': {
                    alert('결제 중 오류가 발생했습니다.');
                    break;
                }
                default:
                    break;
            }
        } catch (e) {
            console.error('결제 실패:', e);
            alert('결제 요청에 실패했습니다.');
        }
    };


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
                    onClick={handlePayment}
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
}

export default ProductCard;