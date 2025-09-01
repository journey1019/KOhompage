/** src/app/api/payment/historyList/route.ts */
import { NextRequest } from 'next/server';
import { proxyGetFetch } from '@/lib/server/fetchProxy';

export async function GET(req: NextRequest) {
    return proxyGetFetch(req, '/history/paid/list');
}
