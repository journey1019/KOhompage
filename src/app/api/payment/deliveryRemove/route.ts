import { NextRequest } from 'next/server';
import { proxyDeleteQueryFetch } from '@/lib/server/fetchProxy';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
    return proxyDeleteQueryFetch(req, '/deliveryManage/delete');
}
