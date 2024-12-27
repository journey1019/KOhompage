import PartnerSliderLines from '@/components/PartnerSliderLines';

export default function Partner() {
    return (
        <section className="bg-white w-full h-auto">
            <div className="py-8 max-w-screen-2xl mx-auto">
                <h2 className="text-center text-md font-semibold text-gray-500 pb-5">OUR PARTNERS</h2>
                <PartnerSliderLines line={1} />
                <PartnerSliderLines line={2} />
            </div>
        </section>
    );
}
