import { Product } from '@/types/product';
import { productList } from '@/data/products';
import { Bootpay } from '@bootpay/client-js';

const ProductCard: React.FC<Product> = ({ id, name, category, price, paymentType, description, image }) => {

    const handlePayment = async () => {
        if (paymentType === 'subscription') {
            alert('정기결제 상품은 현재 결제가 불가능합니다.');
            return;
        }

        try {
            await Bootpay.requestPayment({
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
                    test_deposit: true,
                    redirect_url: 'http://localhost:3000/ko/shop/payment-result',
                },
            });

            console.log('결제 성공');
        } catch (err) {
            console.log('결제 실패', err);
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