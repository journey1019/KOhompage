'use client'

import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'

export default function SidebarDrawer() {
    const [open, setOpen] = useState(false)
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen)

    // 아코디언 상태
    const [expanded, setExpanded] = useState<string | null>('회원관리')

    const handleAccordionToggle = (panel: string) => {
        setExpanded(expanded === panel ? null : panel)
    }

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
                    {[
                        {
                            title: '회원관리',
                            items: ['서브 메뉴 1-1', '서브 메뉴 1-2', '서브 메뉴 1-3'],
                        },
                        {
                            title: '콘텐츠 관리',
                            items: ['뉴스레터', '자료실'],
                        },
                        {
                            title: '제품관리',
                            items: ['계정', '보안'],
                        },
                    ].map((section) => (
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
                                        <li key={item} className="hover:text-blue-500 hover:bg-gray-100 cursor-pointer pl-4 py-2">
                                            {item}
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
