"use client";

import React, { useMemo, useState } from "react";
import TermsModal from '@/components/(Online-Store)/MyPage/TermsModal';
import AgreementItem from '@/components/(Online-Store)/MyPage/AgreementItem';

// 각 전문보기 콘텐츠(예시용; 실제 텍스트/마크업으로 채우세요)
function PrivacyContent() {
    return (
        <div>
            <h4 className="mb-2 text-base font-semibold">개인정보 수집 및 이용</h4>
            <p className="mb-2">
                (예시) 여기에 개인정보 처리방침 본문을 렌더링합니다. HTML/리치텍스트 가능.
            </p>
            <ul className="list-disc pl-5">
                <li>수집항목: …</li>
                <li>이용목적: …</li>
                <li>보유기간: …</li>
            </ul>
        </div>
    );
}
function LocationContent() {
    return (
        <div>
            <h4 className="mb-2 text-base font-semibold">위치정보 이용약관</h4>
            <p>(예시) 위치정보 서비스 제공에 대한 약관 내용…</p>
        </div>
    );
}
function RefundContent() {
    return (
        <div>
            <h4 className="mb-2 text-base font-semibold">교환/환불 약관</h4>
            <p>(예시) 교환/환불 기준, 절차, 예외 사항 등…</p>
        </div>
    );
}

type AgreementKey = "privacy" | "location" | "refund";

export default function Agreement() {
    // 어떤 전문을 열지 추적
    const [active, setActive] = useState<AgreementKey | null>(null);

    // 라벨/컨텐츠 매핑 (내용은 자유롭게 교체 가능)
    const AGREEMENTS = useMemo(
        () => [
            { key: "privacy" as const, label: "개인정보보호 동의", Content: PrivacyContent },
            { key: "location" as const, label: "위치정보 동의", Content: LocationContent },
            { key: "refund" as const, label: "교환/환불 동의", Content: RefundContent },
        ],
        []
    );

    const activeItem = AGREEMENTS.find((a) => a.key === active);
    const ActiveContent = activeItem?.Content;

    return (
        <section className="space-y-6">
            {AGREEMENTS.map(({ key, label }) => (
                <AgreementItem
                    key={key}
                    id={`agree-${key}`}
                    label={label}
                    checked
                    disabled
                    onView={() => setActive(key)}
                />
            ))}

            <TermsModal
                open={!!active}
                onClose={() => setActive(null)}
                title={activeItem?.label}
            >
                {ActiveContent ? <ActiveContent /> : null}
            </TermsModal>
        </section>
    );
}
