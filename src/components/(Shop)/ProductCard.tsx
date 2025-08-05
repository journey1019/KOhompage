import { Product } from '@/types/product';
import { productList } from '@/data/products';
import { Bootpay } from '@bootpay/client-js';
import { mockValidateApi } from '@/lib/api/mock/payment';

const ProductCard: React.FC<Product> = ({ id, name, category, price, paymentType, description, image }) => {
    const useMock = true;

    const validateOrder = async (productId: string) => {
        if (useMock) {
            return await mockValidateApi(productId);
        } else {
            const res = await fetch('https://your-backend-api.com/api/order/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiptId: 'mock-receipt', // 또는 response.receipt_id
                    productId,
                    userId: 'user_1234',
                    quantity: 1,
                }),
            });
            return await res.json();
        }
    };

    const handlePayment = async () => {
        try {
            const response = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price,
                order_name: name,
                order_id: 'order_' + Date.now(),
                pg: 'nicepay',
                method: 'card',
                user: {
                    id: 'user_1234',
                    username: '홍길동',
                    phone: '01000000000',
                    email: 'test@test.com',
                },
                items: [
                    {
                        id,
                        name,
                        qty: 1,
                        price,
                    },
                ],
                extra: {
                    separately_confirmed: true,
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                },
            });

            switch (response.event) {
                case 'confirm':
                    // ✅ [STEP 1] 백엔드 API로 승인 전 검증 요청
                    const res = await fetch('https://your-backend-api.com/api/order/validate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            receiptId: response.receipt_id,
                            productId: id,
                            userId: 'user_1234',
                            quantity: 1,
                        }),
                    });

                    const data = await validateOrder(id);
                    console.log('response : ', response)
                    console.log('data : ', data)

                    if (data.success) {
                        // ✅ [STEP 2] 검증 통과 → 결제 승인
                        await Bootpay.confirm();
                    } else {
                        // ❌ 검증 실패 → 결제 중단
                        await Bootpay.destroy();
                        alert(data.message || '결제를 진행할 수 없습니다.');
                    }
                    break;

                case 'done':
                    // ✅ 결제 완료 후 처리
                    console.log('결제 완료:', response);
                    break;

                default:
                    break;
            }
        } catch (e) {
            console.error('결제 실패:', e);
        }
    };


    return (
        <div className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img src={image} alt={name} className="w-full h-48 object-cover" />

            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{name}</h2>
                <p className="text-sm text-gray-500 mb-1">{category}</p>
                <p className="text-base font-bold mb-2">{price.toLocaleString()}원</p>

                <button
                    onClick={handlePayment}
                    disabled={paymentType === 'subscription'}
                    className={`w-full py-2 rounded text-sm font-medium ${
                        paymentType === 'subscription'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {paymentType === 'subscription' ? '결제불가' : '결제하기'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;