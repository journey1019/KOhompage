import { NextRequest } from 'next/server';
import { proxyPostQueryFetch } from '@/lib/server/fetchProxy';

export async function POST(req: NextRequest) {
    return proxyPostQueryFetch(req, '/user/changePwd');
}
