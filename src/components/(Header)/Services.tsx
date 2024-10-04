import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
    { name: 'ORBCOMM Flatform', description: 'Fleet Management Solutions', href: '#', icon: ChartPieIcon },
    { name: 'Maritime Flatform', description: 'Driving container tracking', href: '#', icon: CursorArrowRaysIcon },
    { name: 'NMS', description: "Network Monitoring System", href: '#', icon: FingerPrintIcon },
    { name: 'VMS', description: "Vessel Monitoring System", href: '#', icon: FingerPrintIcon },
    { name: 'Windward', description: 'Decision Support Platform to Accelerate Global Trade', href: '#', icon: SquaresPlusIcon },
    { name: "Lloyd's List", description: 'Real-time ship movement monitoring', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    // { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Admin', href: '#', icon: UserIcon },
    { name: 'Contact sales', href: '/support', icon: PhoneIcon },
]

export default function Services() {
    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <span>Services</span>
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-2">
                        {solutions.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                </div>
                                <div>
                                    <a href={item.href} className="font-semibold text-gray-900">
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
