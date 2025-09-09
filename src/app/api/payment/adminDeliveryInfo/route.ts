import { NextRequest } from 'next/server';
import { proxyGetFetch } from '@/lib/server/fetchProxy';

/**
 * 배송사 정보
 * */
export async function GET(req: NextRequest) {
    return proxyGetFetch(req, '/admin/dc/list');
}