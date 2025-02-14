"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimes, FaComments } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

const PopupWidget = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false); // 버튼 클릭

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
            {/* 메인 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition-transform duration-300"
            >
                {isOpen ? <FaTimes size={24} /> : <FaPlus size={24} />}
            </button>

            {/* 팝업 메뉴 */}
            <div
                className={`absolute bottom-16 right-2 flex flex-col space-y-3 transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
                {/* 카카오톡 채널 추가 */}
                <a
                    href="https://pf.kakao.com/_FHxajn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-yellow-400 text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
                    onClick={handleClose}
                >
                    <RiKakaoTalkFill />
                </a>

                {/* 문의하기 */}
                <button
                    className="flex items-center p-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
                    onClick={() => {
                        router.push('/contact-us');
                        handleClose();
                    }}
                >
                    <FaComments />
                </button>
            </div>
        </div>
    );
};

export default PopupWidget;
