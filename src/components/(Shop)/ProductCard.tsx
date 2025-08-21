import { productList } from '@/data/products';
import { Product } from '@/types/product';
import { Bootpay } from '@bootpay/client-js';
import { mockValidateApi } from '@/lib/api/mock/payment';
import { useRouter } from 'next/navigation';

const ProductCard: React.FC<Product> = ({ id, name, category, price, paymentType, description, image }) => {
    const useMock = true;
    const router = useRouter();

    const validateOrder = async (productId: string, userId: string) => {
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
                    userId,
                    quantity: 1,
                }),
            });
            return await res.json();
        }
    };

    // console.log(localStorage.getItem('userToken'))
    // console.log(localStorage.getItem('tokenExpired'))
    // console.log(localStorage.getItem('paymentUserInfo'))
    const handlePayment = async () => {
        // 1️⃣ 로그인 여부 확인
        const token = localStorage.getItem("userToken");
        const userInfoStr = localStorage.getItem("paymentUserInfo");

        if (!token || !userInfoStr) {
            alert("로그인이 필요합니다.");
            router.push("/ko/login");
            return;
        }

        // 2️⃣ 사용자 정보 파싱
        const userInfo = JSON.parse(userInfoStr);

        try {
            // 3️⃣ 결제 요청
            const response = await Bootpay.requestPayment({
                application_id: '68745846285ac508a5ee7a0b',
                price,
                order_name: name,
                order_id: 'order_' + Date.now(),
                pg: 'nicepay',
                method: 'card',
                user: {
                    id: userInfo.userId,
                    username: userInfo.userNm,
                    phone: userInfo.phone || '01000000000', // phone 값이 없으면 기본값
                    email: userInfo.email || 'test@test.com',
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

            // 4️⃣ 결제 이벤트 처리
            switch (response.event) {
                case 'confirm':
                    const data = await validateOrder(id, userInfo.userId);

                    if (data.success) {
                        await Bootpay.confirm();
                    } else {
                        await Bootpay.destroy();
                        alert(data.message || '결제를 진행할 수 없습니다.');
                    }
                    break;

                case 'done':
                    // console.log('결제 완료:', response);
                    break;

                default:
                    break;
            }
        } catch (e) {
            // console.error('결제 실패:', e);
        }
    };

    return (
        <div className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img src={image} alt={name} className="w-full h-72 object-cover" />

            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{name}</h2>
                <p className="text-sm text-gray-500 mb-1">{category[0].toUpperCase() + category.slice(1, category.length)}</p>
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
                    {paymentType === 'subscription' ? '구매불가' : '구매하기'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;