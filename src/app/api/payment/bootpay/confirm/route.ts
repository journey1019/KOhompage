// src/app/api/payment/bootpay/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BASE = process.env.BOOTPAY_BASE_URL ?? 'https://api.bootpay.co.kr'; // stage면 stage URL로
const APP_ID = process.env.BOOTPAY_APPLICATION_ID!;
const PRIVATE_KEY = process.env.BOOTPAY_PRIVATE_KEY!;

export async function POST(req: NextRequest) {
    try {
        const { receipt_id } = await req.json();
        if (!receipt_id) return NextResponse.json({ status: false, message: 'receipt_id required' }, { status: 400 });

        // 1) 토큰 발급
        const tRes = await fetch(`${BASE}/request/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ application_id: APP_ID, private_key: PRIVATE_KEY }),
            cache: 'no-store'
        });
        const tJson = await tRes.json();
        const token = tJson?.data?.token;
        if (!token) return NextResponse.json({ status: false, message: 'token error' }, { status: 500 });

        // 2) 최종 승인
        const cRes = await fetch(`${BASE}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify({ receipt_id }),
            cache: 'no-store'
        });
        const cJson = await cRes.json();

        // Bootpay 표준 응답에 맞춰 성공 여부 판단
        const ok = cRes.ok && (cJson?.status === 200 || cJson?.status === 201 || cJson?.status === true);
        return NextResponse.json({ status: ok, data: cJson }, { status: ok ? 200 : 400 });
    } catch (e: any) {
        return NextResponse.json({ status: false, message: String(e?.message || e) }, { status: 500 });
    }
}
