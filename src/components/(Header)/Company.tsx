import Image from 'next/image';
import globalIoT from '../../../public/images/nav/global.jpg';
import containerIoT from '../../../public/images/nav/container.jpg';
import satellite from '../../../public/images/nav/satellite.jpg';
import ais from '../../../public/images/nav/vessel.jpg';

export default function Company() {
    return (
        <div
            className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div id="mega-menu-full-dropdown" className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
                <div className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                    <ul>
                        <li className="block px-3 py-2">
                            <div className="font-bold">RESOURCES</div>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">Case Studies</div>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mx-auto">
                                <div className="font-semibold">Brochure</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">Blog</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">Guide</div>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li className="block px-3 py-2">
                            <div className="font-bold">COMPANY</div>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">About us</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">Partners</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="font-semibold">Newsroom</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}