import Image from 'next/image';
import ImageCard from '@/components/component/ImageCard';

export default function Company() {
    return(
        <section className="w-full bg-white">
            <div className="mx-auto max-x-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-24">
                <div className="m-auto max-w-5xl pb-10">
                    <h2 className="text-center text-md font-semibold text-red-800 pb-6 sm:pb-10">OUR COMPANY</h2>
                    <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">전세계 IoT Service를 위한 통신 서비스와 하드웨어, 어플리케이션을 제공하는 Total SERVICE Provider</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto mt-20 max-w-7xl sm:mt-20">
                    <ImageCard
                        src="images/references/Satellite.png"
                        alt="main_company1"
                        title="ORBCOMM 위성 데이터"
                        description="Learning curve network effects return on investment."
                    />
                    <ImageCard
                        src="images/references/satellite2.png"
                        alt="main_company2"
                        title="INMARSAT 위성 데이터 통신"
                        description="Learning curve network effects return on investment."
                    />
                    <ImageCard
                        src="images/references/dashboard.png"
                        alt="main_company3"
                        title="위치정보사업자"
                        description="Learning curve network effects return on investment."
                    />
                </div>
                <div className="mt-10 flex justify-center w-full">
                    <a href='/about'
                        type="button"
                        className="border focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm lg:text-md px-5 py-2.5 me-2 mb-2 bg-white text-black border-gray-600 hover:border-red-700 hover:bg-red-800 hover:text-white"
                    >
                        About More
                    </a>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto mt-20 max-w-7xl sm:mt-40">
                    {[
                        { value: '10,000 +', label: '최종 사용자' },
                        { value: '7,000,000 +', label: '월간 데이터' },
                        { value: '60,000 +', label: '선박' },
                    ].map((item, index) => (
                        <div key={index}
                             className="flex flex-col w-full m-5 text-center justify-center dark:text-white">
                            <h3 className="text-6xl md:text-7xl lg:text-7xl font-bold mb-5">
                                {item.value}
                            </h3>
                            <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}