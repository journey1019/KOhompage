import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';
import { HandRaisedIcon } from '@heroicons/react/24/outline';

export default function CaseStudies() {
    return (
        // <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
        //     <ul className="hidden mb-4 space-y-4 md:mb-0 md:block">
        //         <p className="font-bold text-red-800 text-base">Global Trade Platform</p>
        //         <li>
        //             GT1200 Series
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <p className="font-bold text-red-800 text-base">Container IoT</p>
        //         <li>
        //             CT3500 Series
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <p className="font-bold text-red-800 text-base">HCE</p>
        //         <li>
        //             ST2100 Series
        //         </li>
        //         <li>
        //             ST6000 Series
        //         </li>
        //         <li>
        //             IDP-800
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <p className="font-bold text-red-800 text-base">AIS</p>
        //         <li>
        //             ST6000 Series
        //         </li>
        //         <li>
        //             ST-9100 Series
        //         </li>
        //         <li>
        //             QPRO
        //         </li>
        //         <li>
        //             Q4000
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <p className="font-bold text-red-800 text-base">M2M</p>
        //         <li>
        //             OG2 and OGi
        //         </li>
        //     </ul>
        //     <ul className="mb-4 space-y-4 md:mb-0">
        //         <p className="font-bold text-red-800 text-base">Space</p>
        //         <li>
        //             VSAT Antenna
        //         </li>
        //         <li>
        //             iDirect Modem
        //         </li>
        //     </ul>
        // </div>
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div id="mega-menu-full-dropdown"
                 className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
                <div
                    className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                    <ul>
                        <li>
                            <a href="/[locale]/casestudies/case_1"
                               className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10 mr-3 flex items-center justify-center">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold">홍수통제소</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/[locale]/casestudies/case_2"
                               className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10 mr-3 flex items-center justify-center">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold">CASE_2</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/[locale]/casestudies/case_3"
                               className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10 mr-3 flex items-center justify-center">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold">CASE_3</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="/[locale]/casestudies/case_4"
                               className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center">
                                    <div
                                        className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10 mr-3 flex items-center justify-center">
                                        <HandRaisedIcon aria-hidden="true"
                                                        className="h-5 w-5 text-black dark:text-white" />
                                    </div>
                                    <div className="font-semibold">CASE_4</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}