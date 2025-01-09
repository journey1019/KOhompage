import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    PresentationChartBarIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { RiShipLine } from "react-icons/ri";
;

const login = [
    { name: 'ORBCOMM Platform', description: 'Fleet Management Solutions', url: 'https://platform.orbcomm.com/', icon: ChartPieIcon },
    { name: 'Maritime Platform', description: 'Driving container tracking', url: 'https://platform.orbcommmaritime.com/', icon: CursorArrowRaysIcon },
    { name: 'NMS', description: "Network Monitoring System", url: 'https://nms.commtrace.com/', icon: PresentationChartBarIcon },
    { name: 'VMS', description: "Vessel Monitoring System", url: 'https://vms.commtrace.com/', icon: RiShipLine },
    { name: 'Windward', description: 'Decision Support Platform to Accelerate Global Trade', url: 'https://windward.ai/', icon: SquaresPlusIcon },
    { name: "Lloyd's List", description: 'Real-time ship movement monitoring', url: 'https://www.lloydslist.com/', icon: ArrowPathIcon },
]
const callsToAction = [
    // { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Admin', href: '/admin', icon: UserIcon },
    { name: 'Contact sales', href: '/contact-us', icon: PhoneIcon },
]

export default function Login() {
    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <span className='text-black dark:text-white'>Platforms</span>
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-black dark:text-white" />
            </PopoverButton>

            <PopoverPanel
                transition
                // className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                className="absolute right-0 z-10 mt-5 flex w-screen max-w-max transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-2">
                        {login.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                </div>
                                <div>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </a>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
