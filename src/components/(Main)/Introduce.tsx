import Link from 'next/link';
import Image from 'next/image';
import Partner from '@/components/Partner';

export default function Introduce() {
    return (
        <section className="relative w-full min-h-[calc(100vh-1000px)] bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-2 items-center">
                    <div className="max-w-xl lg:max-w-lg mx-auto text-center lg:text-start">
                        <h2 className="text-5xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            전세계 Total M2M Service를 제공하는 Provider
                        </h2>
                        <p className="mt-4 text-md sm:text-lg lg:text-xl text-gray-500 leading-6 sm:leading-7 lg:leading-8">
                            앱 내외에서 새로운 메시징 경험을 구축하여 고객 도달범위, 참여율 및 만족도를 최고 수준으로 향상해보세요.
                        </p>
                        <div className="flex flex-col items-center space-y-4 lg:space-y-0 mt-6 lg:flex-row lg:gap-x-5">
                            <a
                                href="/contact-us"
                                type="button"
                                className="w-full max-w-xs lg:max-w-[12rem] bg-red-800 font-bold text-white rounded-full py-3 px-6 sm:px-8 lg:px-10 text-center border-2 border-gray-50">
                                상담 요청하기
                            </a>
                            <button
                                className="w-full max-w-xs lg:max-w-[12rem] bg-white font-bold text-red-800 rounded-full border-2 border-red-800 py-3 px-6 sm:px-8 lg:px-10">
                                탐구하기
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src={`/images/main/dashboard.png`}
                            alt="main_dashboard"
                            width={500}
                            height={300}
                            className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg"
                            unoptimized
                        />
                    </div>
                </div>
                {/*<Partner/>*/}
            </div>
        </section>
    );
}
