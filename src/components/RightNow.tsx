// pages/index.tsx

import Image from 'next/image';

const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
];
const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
];
const offices = [
    { location: '서울 본사(HQ)', tel: 'T. 02-3444-7311', address: 'A. 06536 서울특별시 서초구 강남대로 525 세영제이타워 15층', mail: 'M. support@orbcomm.co.kr'},
    { location: '위성 지구국(Gateway Earth Station)', tel: 'T. 031-642-9940', address: 'A. 17416 경기도 이천시 장호원읍 장여로 229-100'}
]

export default function RightNow() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
            <Image
                alt="Background"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                width={500}
                height={500}
                priority
                className="absolute inset-0 -z-10 dark:block hidden"
                unoptimized
            />
            <div
                aria-hidden="true"
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl dark:from-[#ff4694] dark:to-[#776fff]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20 dark:from-[#ff4694] dark:to-[#776fff]"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl dark:from-[#ff4694] dark:to-[#776fff] sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20 dark:from-[#ff4694] dark:to-[#776fff]"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Work with us</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-900 dark:text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse">
                                <dt className="text-base leading-7 text-gray-700 dark:text-gray-300">{stat.name}</dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                    <dl className='mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-1 lg:grid-cols-2'>
                        {offices.map((office) => (
                            <div key={office.location} className="flex flex-col-reverse border-l-2 border-gray-300 dark:border-amber-50 pl-4">
                                <dt className="text-base leading-7 text-gray-700 dark:text-gray-300">{office.mail}</dt>
                                <dt className="text-base leading-7 text-gray-700 dark:text-gray-300">{office.tel}</dt>
                                <dt className="text-base leading-7 text-gray-700 dark:text-gray-300">{office.address}</dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">{office.location}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
