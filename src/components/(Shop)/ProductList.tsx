'use client';

import { productList } from '@/data/products';
import { Bootpay } from '@bootpay/client-js';

const ProductList = () => {
    const handlePayment = async (product: typeof productList[0]) => {
        if (product.paymentType === 'subscription') {
            alert('정기결제 상품은 현재 결제가 불가능합니다.');
            return;
        }

        try {
            await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price: product.price,
                order_name: product.name,
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
                        id: product.id,
                        name: product.name,
                        qty: 1,
                        price: product.price,
                    },
                ],
                extra: {
                    test_deposit: true,
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result', // 운영시 https로 변경
                },
            });

            console.log('결제 성공');
        } catch (err) {
            console.log('결제 실패', err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {productList.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg shadow hover:shadow-md transition overflow-hidden"
                >
                    {/* 상품 이미지 */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />

                    {/* 상품 정보 */}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                        <p className="text-base font-bold mb-2">{product.price.toLocaleString()}원</p>

                        <button
                            onClick={() => handlePayment(product)}
                            disabled={product.paymentType === 'subscription'}
                            className={`w-full py-2 rounded text-sm font-medium ${
                                product.paymentType === 'subscription'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            {product.paymentType === 'subscription' ? '결제불가' : '결제하기'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default ProductList;
