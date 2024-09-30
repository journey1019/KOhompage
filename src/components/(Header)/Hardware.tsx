import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';

export default function Hardware() {
    return (
        <div
            className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul className="hidden mb-4 space-y-4 md:mb-0 md:block">
                <p className="font-bold text-red-800 text-base">Trailer Tracking, Dry Van, Chassis and Dry Container</p>
                <li>Application of monitoring to various industrial fields such as construction equipment,
                    marine information, climate information, etc
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">Intermodal Containers and Cargo Security</p>
                <li>Telematics solutions for tracking and logistics of containers and intelligent trailers
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">Maritime</p>
                <li>Customized & inexpensive satellite communication services enable high-speed broadband
                    Internet service
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">General and Multi-Purpose Asset Tracking</p>
                <li>Support ship identification, location, and navigation, and improve marine safety</li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">Modem</p>
                <li>Support ship identification, location, and navigation, and improve marine safety</li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <p className="font-bold text-red-800 text-base">VSAT</p>
                <li>Support ship identification, location, and navigation, and improve marine safety</li>
            </ul>
        </div>
    )
}