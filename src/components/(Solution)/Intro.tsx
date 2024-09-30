import Image from 'next/image';

export default function Intro() {
    return(
        <section className='flex flex-col md:flex-row md:justify-between p-10 bg-gray-50 dark:bg-gray-900'>
            <div className='max-w-screen-2xl mx-auto'>
                <section className='flex-1 flex flex-col justify-center items-start mb-8 md:mb-0 px-5'>
                    <h2 className='mb-2 text-4xl font-bold tracking-tight dark:text-white py-4'>
                        데이터 기반 의사 결정을 위한 통찰력으로 고객 지원
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300'>
                        ORBCOMM의 선구적인 IoT 기술로 운영을 최적화하고, 수익성을 극대화하고, 보다 지속 가능한 미래를 구축하세요.<br />
                        30년의 경험을 바탕으로 ORBCOMM은 데이터의 힘을 통해 전 세계적으로 백만 개가 넘는 자산을 관리할 수 있도록 지원합니다.
                    </p>
                    <section className='my-8'>
                        <button
                            // 버튼 클릭 시 /company 로 이동
                            className='inline-flex items-center px-6 py-3 font-medium text-center rounded-full hover:bg-gray-100 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-100'>
                            <h5 className='text-base text-sm font-semibold text-red-800 dark:text-white'>
                                KOREA ORBCOMM에 대해 알아보세요
                            </h5>
                        </button>
                    </section>
                </section>
                <section className='flex-1'>
                    <Image
                        src='https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg'
                        className='w-full h-1/3 filter brightness-80'
                        alt='KOREA ORBCOMM'
                        width={500}
                        height={700}
                        unoptimized
                    />
                </section>
            </div>
        </section>
    )
}