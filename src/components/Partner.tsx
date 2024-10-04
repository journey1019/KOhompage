import PartnerSliderFast from '@/components/PartnerSliderFast';
import PartnerSliderSlow from '@/components/PartnerSliderSlow';

export default function Partner() {
    return (
        <section className="bg-white dark:bg-gray-900 w-full h-auto">
            <div className='py-8 mt-10 max-w-screen-2xl mx-auto'>
                <h2 className="text-center text-xl font-semibold mb-8 dark:text-white">TRUSTED BY 4,000+ CUSTOMERS GLOBALLY</h2>
                {/*<PartnerSliderFast />*/}
                <PartnerSliderSlow />
            </div>
        </section>
    );
}
