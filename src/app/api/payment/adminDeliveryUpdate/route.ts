import { NextRequest } from 'next/server';
import { proxyPostBodyFetch } from '@/lib/server/fetchProxy';

export async function POST(req: NextRequest) {
    return proxyPostBodyFetch(req, '/admin/dc/update');
}
