import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';

export const metadata: Metadata = {
    title: 'Hardware',
    description: 'KOREA ORBCOMM 의 Hardware 소개'
}

export default function HardwarePage() {
    return(
        <ProductGrid/>
    )
}