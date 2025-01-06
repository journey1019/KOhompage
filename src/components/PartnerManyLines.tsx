import PartnerSliderLines from '@/components/PartnerSliderLines';

export default function Partner() {
    return (
        <section className="bg-white w-full h-auto">
            <div className="py-8 max-w-screen-2xl mx-auto px-4 md:px-6">
                <h2 className="text-center text-sm md:text-md font-semibold text-gray-500 pb-5">
                    OUR PARTNERS
                </h2>
                <div className="hidden md:block">
                    {/* 데스크탑과 태블릿 레이아웃 */}
                    <PartnerSliderLines line={1} />
                    <PartnerSliderLines line={2} />
                </div>
                <div className="md:hidden">
                    {/* 모바일 레이아웃: 단일 슬라이더 */}
                    <PartnerSliderLines line={1} />
                    <PartnerSliderLines line={2} />
                </div>
            </div>
        </section>
    );
}
