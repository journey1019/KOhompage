import Image from 'next/image';
import globalIoT from '../../../../public/images/nav/global.jpg';
import containeIoT from '../../../../public/images/nav/container.jpg';
import satellite from '../../../../public/images/nav/satellite.jpg';
import ais from '../../../../public/images/nav/vessel.jpg';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

interface SolutionsProps {
    locale: string; // locale을 props로 받음
}

export default function Solutions({ locale }: SolutionsProps) {
    const solutions = [
        {
            slug: "container-iot",
            title: "Container IoT",
            description: "냉동/냉장 컨테이너 실시간 추적, 상태 모니터링, 원격제어 솔루션",
        },
        {
            slug: "global-iot",
            title: "Global IoT",
            description: "건설장비 / 기상정보 / 해양정보 상태 모니터링",
        },
        {
            slug: "satellite",
            title: "Satellite Communication",
            description: "INMARSAT / ORBCOMM / STARLINK 위성통신 서비스",
        },
        {
            slug: "ais",
            title: "AIS",
            description: "위성/육상망을 통한 AIS 정보 수집 및 정보제공 서비스",
        },
    ];

    return (
        <div className="grid max-w-screen-2xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6">
            <div
                id="mega-menu-full-dropdown"
                className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
            >
                <div className="grid max-w-screen-xl px-4 py-3 mx-auto text-gray-900 dark:text-white grid-cols-1 sm:grid-cols-4 md:px-6">
                    {solutions.map((solution, index) => (
                        <ul key={`${locale}-${solution.slug}-${index}`}> {/* 고유한 key 생성 */}
                            <li key={`/${locale}/solutions/${solution.slug}`}>
                                <a
                                    href={`/${locale}/solutions/${solution.slug}`}
                                    className="block px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <div className="flex flex-col items-start">
                                        <div className="rounded-md bg-gray-200 dark:bg-white/5 p-1 ring-1 ring-gray-300 dark:ring-white/10">
                                            <HandRaisedIcon
                                                aria-hidden="true"
                                                className="h-5 w-5 text-black dark:text-white"
                                            />
                                        </div>
                                        <div className="font-semibold pt-5">{solution.title}</div>
                                        <div className="text-sm pt-2 text-gray-400">{solution.description}</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}
