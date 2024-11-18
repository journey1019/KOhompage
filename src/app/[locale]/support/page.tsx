import Contact from '@/components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Support',
    description: 'KOREA ORBCOMM Support'
}

export default function SupportPage() {
    return(
        <>
            <Contact />
        </>
    )
}