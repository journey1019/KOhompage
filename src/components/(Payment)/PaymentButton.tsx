'use client';

import { Bootpay } from '@bootpay/client-js';

const PaymentButton = () => {
    const handlePayment = async () => {
        await Bootpay.requestPayment({
            application_id: '68745846285ac508a5ee7a0b', // 부트페이 관리자에서 확인
            price: 1000,
            order_name: '테스트 상품',
            order_id: 'order_' + Date.now(),
            pg: 'nicepay',
            method: 'card', // 'card', 'phone', 'vbank', etc.
            user: {
                id: 'user_1234',
                username: '홍길동',
                phone: '01000000000',
                email: 'test@test.com',
            },
            items: [
                {
                    id: 'item_code_1',
                    name: '테스트 상품 1', // 필수
                    qty: 1,                    // 필수
                    price: 1000,               // 단가
                },
            ],
            extra: {
                test_deposit: true, // 가상계좌일 때 자동 입금 처리
                // 추후 URL 변경 'http://localhost:3000' -> 'https://www.orbcomm.co.kr/ko'
                redirect_url: 'http://localhost:3000/ko/shop/payment-result', // ✅ 반드시 http(s)://로 시작
            },
        }).then((res) => {
            console.log('결제 성공', res);
        }).catch((err) => {
            console.log('결제 실패', err);
        });
    };

    return (
        <button onClick={handlePayment} className="px-4 py-2 bg-blue-600 text-white rounded">
            결제 테스트
        </button>
    );
};

export default PaymentButton;
