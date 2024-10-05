import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

export default function Solutions() {
    return (
        // <div
        //     className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-4 md:px-6">
        //     <ul className="hidden mb-4 space-y-4 md:mb-0 md:block">
        //         <Image
        //             src={globalIoT}
        //             alt="global IoT"
        //             width={300}
        //             height={200}
        //             unoptimized
        //             className="object-cover h-48" />
        //         <p className="text-black text-xl font-bold">Global IoT</p>
        //         <li>Application of monitoring to various industrial fields such as construction equipment,
        //             marine information, climate information, etc
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <Image
        //             src={containerIoT}
        //             alt="Container IoT"
        //             width={300}
        //             height={200}
        //             unoptimized
        //             className="object-cover h-48" />
        //         <p className="text-black text-xl font-bold">Container IoT</p>
        //         <li>Telematics solutions for tracking and logistics of containers and intelligent trailers
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <Image
        //             src={satellite}
        //             alt="Satellite"
        //             width={300}
        //             height={200}
        //             unoptimized
        //             className="object-cover h-48" />
        //         <p className="text-black text-xl font-bold">Satellite</p>
        //         <li>Customized & inexpensive satellite communication services enable high-speed broadband
        //             Internet service
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <Image
        //             src={ais}
        //             alt="AIS"
        //             width={300}
        //             height={200}
        //             unoptimized
        //             className="object-cover h-48" />
        //         <p className="text-black text-xl font-bold">AIS</p>
        //         <li>Support ship identification, location, and navigation, and improve marine safety</li>
        //     </ul>
        // </div>
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div id="mega-menu-full-dropdown" className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
                <div className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                    <ul>
                        <li>
                            <a href="/solutions/globalIoT" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex flex-col items-start">
                                    <div className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                        <HandRaisedIcon aria-hidden="true" className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold pt-5">Global IoT</div>
                                    <div className="text-sm pt-2 text-gray-400">건설장비 모니터링, 해양정보 모니터링, 기후정보 모니터링 </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/solutions/containerIoT" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex flex-col items-start">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold pt-5">Container IoT</div>
                                    <div className="text-sm pt-2 text-gray-400">컨테이너 및 지능형 트레일러의 추적 및 물류를 위한 Telematics 솔루션</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/solutions/satellite" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex flex-col items-start">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold pt-5">Satellite</div>
                                    <div className="text-sm pt-2 text-gray-400">전세계 모든 지역에서의 AIS 정보 수집 및 제공</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/solutions/ais" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex flex-col items-start">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold pt-5">AIS</div>
                                    <div className="text-sm pt-2 text-gray-400">선박의 식별, 위치, 탐색을 지원하고 해양 안전을 향상</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}