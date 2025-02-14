/** components/PopupWidget.tsx */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimes, FaComments } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

const PopupWidget = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false); // 버튼 클릭

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 maxWeb:bottom-12 maxWeb:right-12 z-50">
            {/* 메인 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 3xl:w-20 3xl:h-20 maxWeb:w-24 maxWeb:h-24 flex items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition-transform duration-300"
            >
                {isOpen ? <FaTimes size={24} className="3xl:size-10 maxWeb:size-14" /> : <FaPlus size={24} className="3xl:size-10 maxWeb:size-14" />}
            </button>

            {/* 팝업 메뉴 */}
            <div
                className={`absolute bottom-16 3xl:bottom-24 maxWeb:bottom-28 right-1 maxWeb:right-2 flex flex-col space-y-3 transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
                {/* 카카오톡 채널 추가 */}
                <a
                    href="https://pf.kakao.com/_FHxajn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 maxWeb:p-4 bg-yellow-400 text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
                    onClick={handleClose}
                >
                    <RiKakaoTalkFill className="w-6 h-6 3xl:w-12 3xl:h-12" />
                </a>

                {/* 문의하기 */}
                <button
                    className="flex items-center p-3 maxWeb:p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
                    onClick={() => {
                        router.push('/contact-us');
                        handleClose();
                    }}
                >
                    <FaComments className="w-6 h-6 3xl:w-12 3xl:h-12" />
                </button>
            </div>
        </div>
    );
};

export default PopupWidget;
