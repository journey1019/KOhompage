import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';

export default function Hardware() {
    return (
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul className="hidden mb-4 space-y-4 md:mb-0 md:block">
                <p className="font-bold text-red-800 text-base">Global Trade Platform</p>
                <li>
                    GT1200 Series
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">Container IoT</p>
                <li>
                    CT3500 Series
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">HCE</p>
                <li>
                    ST2100 Series
                </li>
                <li>
                    ST6000 Series
                </li>
                <li>
                    IDP-800
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">AIS</p>
                <li>
                    ST6000 Series
                </li>
                <li>
                    ST-9100 Series
                </li>
                <li>
                    QPRO
                </li>
                <li>
                    Q4000
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">M2M</p>
                <li>
                    OG2 and OGi
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">Space</p>
                <li>
                    VSAT Antenna
                </li>
                <li>
                    iDirect Modem
                </li>
            </ul>
        </div>
    )
}