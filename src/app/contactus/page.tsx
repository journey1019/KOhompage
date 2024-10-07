import { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'KOREA ORBCOMM Support'
}

export default function ContactUs() {
    return(
        <section className="dark:bg-gray-900">
            <Contact />
        </section>
    )
}