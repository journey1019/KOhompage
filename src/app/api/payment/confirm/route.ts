import { NextRequest, NextResponse } from 'next/server';
import { Bootpay } from '@bootpay/backend-js';

export async function POST(req: NextRequest) {
    try {
        const { receipt_id } = await req.json();
        if (!receipt_id) {
            return NextResponse.json({ status: false, message: 'receipt_id required' }, { status: 400 });
        }

        Bootpay.setConfiguration({
            application_id: process.env.BOOTPAY_APP_ID!, // 환경변수 설정 필요
            private_key: process.env.BOOTPAY_PRIVATE_KEY!,
        });

        await Bootpay.getAccessToken();
        const result = await Bootpay.confirmPayment(receipt_id); // ✅ 서버 최종승인
        return NextResponse.json({ status: true, data: result });
    } catch (e: any) {
        return NextResponse.json({ status: false, message: String(e?.message || e) }, { status: 500 });
    }
}
