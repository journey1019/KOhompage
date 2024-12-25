import Image from 'next/image';

export default function Feature() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section 1 */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center">
                <div className="flex justify-center order-1 lg:order-none">
                    <Image
                        src="/images/solutions/ais/UseData1.png"
                        alt="main_dashboard"
                        width={500}
                        height={300}
                        className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg"
                        unoptimized
                    />
                </div>
                <div className="max-w-xl lg:max-w-lg mx-auto text-center lg:text-start order-2 lg:order-none">
                    <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
                        전세계 해상을 커버하는 AIS 데이터
                    </h2>
                    <p className="mt-4 text-md sm:text-lg lg:text-xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                        Korea ORBCOMM의 AIS 서비스는 저궤도 AIS 위성과 10,000여개의 육상 AIS 기지국들을 통해 전세계 해상 전역의 AIS 신호를 탐지합니다.
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center">
                <div className="max-w-xl lg:max-w-lg mx-auto text-center lg:text-start order-2 lg:order-none">
                    <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
                        고품질의 AIS 데이터
                    </h2>
                    <p className="mt-4 text-md sm:text-lg lg:text-xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                        Korea ORBCOMM의 AIS 서비스는  60만척 이상의 선박에서 일일 천만개의 AIS 메시지를 수집/처리합니다.
                    </p>
                </div>
                <div className="flex justify-center order-1 lg:order-none">
                    <Image
                        src="/images/solutions/ais/UseData2.png"
                        alt="main_dashboard"
                        width={500}
                        height={300}
                        className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg"
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
}
