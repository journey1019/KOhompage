import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';


export const metadata:Metadata = {
    title: {
        default: 'HARDWARE',
        template: 'KOREA ORBCOMM | %s'
    },
    description: 'KOREA ORBCOMM의 하드웨어',
    icons: {
        icon: '/favicon.ico',
    }
}

export default function HardBasePage() {
    return(
        <ProductGrid/>
    )
}