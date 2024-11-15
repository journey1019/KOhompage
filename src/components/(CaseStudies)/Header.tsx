import Image from 'next/image';

export default function Header() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div
                className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image className="w-full dark:hidden"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
                     alt="dashboard image"
                     width={500} height={300} unoptimized
                />
                <Image className="w-full hidden dark:block"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                     alt="dashboard image"
                     width={500} height={300} unoptimized
                />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">한강 홍수통제소</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        한강 홍수통제소는 한강 유역에서 발생할 수 있는 홍수에 대한 사전 경보 및 대처 방안을 제공합니다. 이를 통해 홍수로 인한 피해를 최소화하고, 지역 주민들이 신속하게 대처할 수 있도록 돕습니다.
                        한강과 그 지류의 수위를 실시간으로 모니터링하며, 급격한 수위 상승에 따른 위험을 분석하고 관리합니다.
                        한강 유역 내의 댐, 저수지 등의 수자원을 통제하고 관리함으로써, 건기와 홍수기에 적절한 수자원 분배와 수량 조절을 하고, 홍수 방지와 관련된 중장기 계획을 수립하고, 각종 재해에 대비하기 위한 인프라 구축 및 유지 관리에 기여합니다.
                    </p>
                    <a href="#"
                       className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                        Get started
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}