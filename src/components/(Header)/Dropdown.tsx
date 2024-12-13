'use client';

import React from 'react';
import Solutions from './Solutions';
import CaseStudies from './CaseStudies';
import Hardware from './Hardware';

interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownComponents: Record<string, (locale: string) => JSX.Element> = {
    solutions: (locale) => <Solutions locale={locale} />,
    caseStudies: () => <CaseStudies/>,
    hardware: () => <Hardware/>,
}

export default function Dropdown({ menuKey, locale }: DropdownProps) {
    const Component = dropdownComponents[menuKey];
    return (
        <div
            className="fixed left-0 top-16 w-screen bg-white shadow-lg border-y z-50"
            onMouseEnter={(e) => e.stopPropagation()} // 부모 이벤트 방지
            onMouseLeave={(e) => e.stopPropagation()} // 부모 이벤트 방지
        >
            {Component ? Component(locale) : null}
            {/*{Component || null}*/}
        </div>
    );
}

// 'use client';
//
// import React from 'react';
// import Link from 'next/link';
//
// interface DropdownProps {
//     menuKey: string;
//     locale: string;
// }
//
// const dropdownContent: Record<string, { label: string; href: string }[]> = {
//     solutions: [
//         { label: 'IoT Solutions', href: '/solutions/iot' },
//         { label: 'AI Solutions', href: '/solutions/ai' },
//         { label: 'Cloud Solutions', href: '/solutions/cloud' },
//         { label: 'Big Data Solutions', href: '/solutions/big-data' },
//     ],
//     hardware: [
//         { label: 'Laptops', href: '/hardware/laptops' },
//         { label: 'Desktops', href: '/hardware/desktops' },
//         { label: 'Accessories', href: '/hardware/accessories' },
//         { label: 'Networking', href: '/hardware/networking' },
//     ],
//     company: [
//         { label: 'About Us', href: '/company/about' },
//         { label: 'Careers', href: '/company/careers' },
//         { label: 'Contact', href: '/company/contact' },
//         { label: 'Blog', href: '/company/blog' },
//     ],
// };
//
// const Dropdown = ({ menuKey, locale }: DropdownProps) => {
//     const items = dropdownContent[menuKey];
//
//     return (
//         <div className="fixed left-1/2 transform -translate-x-1/2 top-16 w-screen bg-white shadow-lg border-t z-50">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 max-w-screen-2xl mx-auto">
//                 {items.map((item) => (
//                     <Link
//                         key={item.href}
//                         href={`/${locale}${item.href}`}
//                         className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-red-600"
//                     >
//                         <h3 className="font-semibold">{item.label}</h3>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Dropdown;
