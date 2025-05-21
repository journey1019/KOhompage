'use client'

import { useState } from 'react'
import Link from 'next/link';
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'

interface Props{
    locale: string;
}
export default function SidebarDrawer({ locale }: Props) {
    const [open, setOpen] = useState(false)
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen)

    // 아코디언 상태
    const [expanded, setExpanded] = useState<string | null>('회원관리')

    const handleAccordionToggle = (panel: string) => {
        setExpanded(expanded === panel ? null : panel)
    }

    const menuSections = [
        {
            title: '콘텐츠 관리',
            items: [
                { name: '자료실', href: 'resource' },
                // { name: '블로그', href: 'blog' },
            ],
        },
        {
            title: '제품 관리',
            items: [
                { name: '하드웨어', href: 'hardware' },
            ],
        },
        {
            title: '결제 관리(준비중)',
            items: [
                { name: '회원관리', href: 'payment/user' },
                { name: '상품관리', href: 'payment/item' },
                { name: '결제내역', href: 'payment/detail' },
                { name: '주문관리', href: 'payment/order' },
            ],
        },
        {
            title: '통계(준비중)',
            items: [
                { name: '대시보드', href: 'dashboard' },
            ],
        },
    ];

    return (
        <>
            <button
                onClick={toggleDrawer(true)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {open ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    className: 'w-80 sm:w-96 flex flex-col bg-white shadow-lg',
                }}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">관리자 페이지</h2>
                    <IconButton onClick={toggleDrawer(false)}>
                        <IoMdClose />
                    </IconButton>
                </div>

                <div className="flex-1 overflow-y-auto divide-y px-4 py-2">
                    {/* 아코디언 항목 */}
                    {menuSections.map((section) => (
                        <div key={section.title} className="py-2">
                            <button
                                className="flex w-full items-center justify-between text-left font-medium text-gray-800 hover:text-blue-600"
                                onClick={() => handleAccordionToggle(section.title)}
                            >
                                <span>{section.title}</span>
                                <IoIosArrowDown
                                    className={`transition-transform duration-200 ${
                                        expanded === section.title ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {expanded === section.title && (
                                <ul className="mt-2 text-sm text-gray-600">
                                    {section.items.map((item) => (
                                        <li key={item.name} className="list-none">
                                            <Link
                                                href={`/${locale}/admin/${item.href}`}
                                                className="block w-full pl-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500 transition"
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.name}
                                            </Link>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </Drawer>
        </>
    )
}
