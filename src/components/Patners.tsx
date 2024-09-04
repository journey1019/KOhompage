import PartnersName from '@/components/PartnersName';
import MultiCarousel from '@/components/MultiCarousel';
import { getAllPartners } from '@/service/partners';

export default async function OurPartners() {
    const partners = await getAllPartners();

    return(
        <section className='my-4'>
            <h2 className='text-2xl font-bold my-2'>Partners</h2>
            <MultiCarousel>
                {partners.map(partner => <PartnersName key={partner.index} partner={partner} />)}
            </MultiCarousel>
        </section>
    )
}