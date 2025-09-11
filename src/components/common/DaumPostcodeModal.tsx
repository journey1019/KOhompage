// src/components/common/DaumPostcodeModal.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (data: { zonecode: string; address: string }) => void;
};

export default function DaumPostcodeModal({ isOpen, onClose, onSelect }: Props) {
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        // 스크립트 로드(중복 방지)
        const ensureScript = () =>
            new Promise<void>((resolve, reject) => {
                if (window.daum?.Postcode) return resolve();
                const id = "daum-postcode-script";
                if (document.getElementById(id)) {
                    (document.getElementById(id) as HTMLScriptElement).addEventListener("load", () => resolve());
                    return;
                }
                const s = document.createElement("script");
                s.id = id;
                s.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
                s.async = true;
                s.onload = () => resolve();
                s.onerror = () => reject(new Error("주소 스크립트를 불러오지 못했습니다."));
                document.body.appendChild(s);
            });

        let destroyed = false;

        ensureScript()
            .then(() => {
                if (destroyed || !wrapRef.current) return;

                const postcode = new window.daum!.Postcode({
                    oncomplete: (data: any) => {
                        // 도로명/지번 중 선택값
                        const base = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

                        // 추가 정보(법정동/건물명)
                        const extras: string[] = [];
                        if (data.bname) extras.push(data.bname);
                        if (data.buildingName) extras.push(data.buildingName);
                        const address = extras.length ? `${base} (${extras.join(", ")})` : base;

                        onSelect({ zonecode: data.zonecode, address });
                        onClose();
                    },
                    width: "100%",
                    height: "100%",
                });

                // 임베드
                postcode.embed(wrapRef.current!, { q: "" });
            })
            .catch((e) => {
                console.error(e);
                alert("주소 검색을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.");
                onClose();
            });

        return () => {
            destroyed = true;
            if (wrapRef.current) wrapRef.current.innerHTML = ""; // iframe 정리
        };
    }, [isOpen, onClose, onSelect]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-2">
                    <h3 className="text-sm font-medium">주소 검색</h3>
                    <button onClick={onClose} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">닫기</button>
                </div>
                <div className="h-[420px]" ref={wrapRef} />
            </div>
        </div>
    );
}
