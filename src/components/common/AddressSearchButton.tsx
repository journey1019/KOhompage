"use client";

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        daum?: any;
    }
}

interface AddressSearchButtonProps {
    onComplete: (data: {
        postalCode: string;
        addressMain: string;
    }) => void;
}

const AddressSearchButton: React.FC<AddressSearchButtonProps> = ({ onComplete }) => {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (scriptLoaded.current || window.daum?.Postcode) return;

        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        script.onload = () => {
            scriptLoaded.current = true;
        };
        document.body.appendChild(script);
    }, []);

    const handleSearch = () => {
        if (!window.daum?.Postcode) {
            alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        new window.daum.Postcode({
            oncomplete: (data: any) => {
                const fullAddress = data.address;
                const zonecode = data.zonecode;
                onComplete({ postalCode: zonecode, addressMain: fullAddress });
            },
        }).open();
    };

    return (
        <button
            type="button"
            onClick={handleSearch}
            className="h-[42px] px-4 text-sm bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 whitespace-nowrap"
        >
            주소 찾기
        </button>
    );
};

export default AddressSearchButton;
