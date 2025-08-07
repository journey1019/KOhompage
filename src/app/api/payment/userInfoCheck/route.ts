import { NextRequest } from 'next/server';
import { proxyGetFetch } from '@/lib/server/fetchProxy';

export async function GET(req: NextRequest) {
    return proxyGetFetch(req, '/signin/userInfoCheck');
}
