"use client";

import { IoIosArrowForward } from "react-icons/io";

type Props = {
    id: string;
    label: string;
    checked?: boolean;     // 표시는 유지(읽기 전용이라면 disabled와 함께 사용)
    disabled?: boolean;
    onView: () => void;    // 전문보기 클릭 콜백
};

export default function AgreementItem({
                                          id,
                                          label,
                                          checked = true,
                                          disabled = true,
                                          onView,
                                      }: Props) {
    return (
        <div className="space-y-2">
            <div className="flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    readOnly
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
                <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900">
                    {label}
                </label>
            </div>

            <button
                type="button"
                onClick={onView}
                className="flex flex-row items-center gap-1 pt-2 pl-4 ms-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                <span>전문보기</span>
                <IoIosArrowForward />
            </button>
        </div>
    );
}
