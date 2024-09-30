import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';

export default function Solutions() {
    return (
        <div
            className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-4 md:px-6">
            <ul className="hidden mb-4 space-y-4 md:mb-0 md:block">
                <Image
                    src={globalIoT}
                    alt="global IoT"
                    width={300}
                    height={200}
                    unoptimized
                    className="object-cover h-48" />
                <p className="text-black text-xl font-bold">Global IoT</p>
                <li>Application of monitoring to various industrial fields such as construction equipment,
                    marine information, climate information, etc
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <Image
                    src={containerIoT}
                    alt="Container IoT"
                    width={300}
                    height={200}
                    unoptimized
                    className="object-cover h-48" />
                <p className="text-black text-xl font-bold">Container IoT</p>
                <li>Telematics solutions for tracking and logistics of containers and intelligent trailers
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <Image
                    src={satellite}
                    alt="Satellite"
                    width={300}
                    height={200}
                    unoptimized
                    className="object-cover h-48" />
                <p className="text-black text-xl font-bold">Satellite</p>
                <li>Customized & inexpensive satellite communication services enable high-speed broadband
                    Internet service
                </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
                <Image
                    src={ais}
                    alt="AIS"
                    width={300}
                    height={200}
                    unoptimized
                    className="object-cover h-48" />
                <p className="text-black text-xl font-bold">AIS</p>
                <li>Support ship identification, location, and navigation, and improve marine safety</li>
            </ul>
        </div>
    )
}