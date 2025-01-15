'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const links = [
    { name: 'Company', href: '/about' },
    { name: 'Solutions', href: '/solutions/container-iot' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact-us' },
];

const offices = [
    {
        location: '서울 본사(HQ)',
        tel: 'T. 02-3444-7311',
        address: 'A. 06536 서울특별시 서초구 강남대로 525, 15',
        mail: 'M. sales@orbcomm.co.kr',
    },
    {
        location: '위성 지구국(Gateway Earth Station)',
        tel: 'T. 031-642-9940',
        address: 'A. 17416 경기도 이천시 장호원읍 장여로 229-100',
        mail: 'M. support@orbcomm.co.kr',
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const gradientAnimation = {
    animate: {
        backgroundPosition: ['0% 50%', '100% 50%'],
        transition: { duration: 8, repeat: Infinity, ease: 'linear' },
    },
};

export default function WorkWithUs() {
    return (
        <motion.div
            className="relative isolate overflow-hidden bg-gray-100 dark:bg-gray-900 py-14 sm:py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-[#ffe5e5] via-[#776fff] to-[#ffe5e5] opacity-70"
                style={{ backgroundSize: '300% 300%' }}
                variants={gradientAnimation}
            ></motion.div>

            {/* Static Image Background */}
            <Image
                alt="Background"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                width={500}
                height={500}
                priority
                className="absolute inset-0 -z-20 hidden dark:block"
                unoptimized
            />

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-2xl lg:mx-0"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Together, We Build Connectivity.
                    </h2>
                    <p className="mt-3 sm:mt-8 text-md sm:text-lg leading-8 text-gray-700 dark:text-gray-300">
                        자산과 인프라를 연결하여 가치를 확장하고,
                    </p>
                    <p className="sm:mt-2 text-md sm:text-lg leading-8 text-gray-700 dark:text-gray-300">
                        IoT 데이터를 통해 새로운 가능성을 발견하세요.
                    </p>
                </motion.div>
                <motion.div
                    className="mx-auto mt-5 sm:mt-16 max-w-2xl lg:mx-0 lg:max-w-none"
                    variants={itemVariants}
                >
                <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:gap-y-6 text-base font-semibold leading-7 text-gray-900 dark:text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1 }}
                                className="hover:text-red-600"
                            >
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </motion.a>
                        ))}
                    </div>
                    <motion.dl
                        className="mt-8 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-1 lg:grid-cols-2 items-start"
                        variants={containerVariants}
                    >
                        {offices.map((office) => (
                            <motion.div
                                key={office.location}
                                className="flex flex-col-reverse border-l-2 border-gray-300 dark:border-amber-50 pl-4"
                                variants={itemVariants}
                            >
                                <dt className="text-sm sm:text-base sm:pt-1 leading-7 text-gray-700 dark:text-gray-300">{office.mail}</dt>
                                <dt className="text-sm sm:text-base sm:pt-1 leading-7 text-gray-700 dark:text-gray-300">{office.tel}</dt>
                                <dt className="text-sm sm:text-base sm:pt-1 leading-7 text-gray-700 dark:text-gray-300">{office.address}</dt>
                                <dd className="text-lg sm:text-2xl sm:pt-1 font-bold leading-9 tracking-tight text-gray-900 dark:text-white">{office.location}</dd>
                            </motion.div>
                        ))}
                    </motion.dl>
                </motion.div>
            </div>
        </motion.div>
    );
}
