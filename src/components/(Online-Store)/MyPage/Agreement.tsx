"use client";

import React, { useMemo, useState } from "react";
import TermsModal from '@/components/(Online-Store)/MyPage/TermsModal';
import AgreementItem from '@/components/(Online-Store)/MyPage/AgreementItem';

type AgreementKey = "terms" | "notice" | "exchange";
type Status = { agreed?: boolean; date?: string };

export default function Agreement({
                                      status,
                                  }: {
    status?: {
        terms?: Status;          // 이용약관 동의
        exchange?: Status;       // 교환/환불 동의
    };
}) {
    const [active, setActive] = useState<AgreementKey | null>(null);
    console.log(status)

    const AGREEMENTS = useMemo(
        () => [
            {
                key: "terms" as const,
                label: "이용약관 동의",
                pdf: "/pdf/support/TermsOfUse.pdf",
                checkable: true,
                meta: status?.terms,
            },
            {
                key: "notice" as const,
                label: "이용약관 변경에 따른 고지",
                pdf: "/pdf/support/Noti_TermsOfUse.pdf",
                checkable: false, // 공지문: 체크 없음
            },
            {
                key: "exchange" as const,
                label: "교환/환불 약관 동의",
                pdf: "/pdf/support/ExchangeRefundPolicy.pdf",
                checkable: true,
                meta: status?.exchange,
            },
        ],
        [status]
    );

    const activeItem = AGREEMENTS.find(a => a.key === active);

    return (
        <section className="space-y-3 sm:space-y-4">
            {AGREEMENTS.map(({ key, label, pdf, checkable, meta }) => {
                const agreed = meta?.agreed ?? false;
                const date = meta?.date;

                return (
                    <div
                        key={key}
                        className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            {/* 왼쪽: 체크 + 라벨 */}
                            <div className="flex items-center gap-2">
                                {checkable ? (
                                    <AgreementItem
                                        id={`agree-${key}`}
                                        label={label}
                                        checked={agreed}
                                        disabled
                                        onView={() => setActive(key)}
                                    />
                                ) : (
                                    // 공지 항목: 체크 대신 라벨만
                                    <span className="text-sm font-medium text-gray-800">{label}</span>
                                )}
                            </div>

                            {/* 오른쪽: 액션/상태 */}
                            <div className="flex items-center gap-2">
                                {checkable && (
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs ${
                                            agreed
                                                ? "bg-green-50 text-green-700 border border-green-200"
                                                : "bg-gray-50 text-gray-600 border border-gray-200"
                                        }`}
                                    >
                    {agreed ? "동의" : "미동의"}
                  </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setActive(key)}
                                    className="h-9 rounded-md border px-3 text-sm hover:bg-gray-50"
                                >
                                    전문보기
                                </button>
                            </div>
                        </div>

                        {/* 날짜 메타 (있을 때만) */}
                        {checkable && date && (
                            <div className="mt-2 text-xs text-gray-500">
                                동의일시: {date}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* 모달: 모바일 풀스크린에 가깝게 */}
            <TermsModal open={!!active} onClose={() => setActive(null)} title={activeItem?.label}>
                {activeItem ? <PdfEmbed src={activeItem.pdf} /> : null}
                {activeItem && (
                    <div className="mt-3 flex justify-end gap-2">
                        <a
                            href={activeItem.pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="h-10 rounded-md border px-3 text-sm hover:bg-gray-50"
                        >
                            새 탭으로 열기
                        </a>
                        <a
                            href={activeItem.pdf}
                            download
                            className="h-10 rounded-md bg-gray-900 px-3 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                            다운로드
                        </a>
                    </div>
                )}
            </TermsModal>
        </section>
    );
}

/* ---- PDF 임베드: iOS/안드, 데스크탑 대응 ---- */
function PdfEmbed({ src }: { src: string }) {
    return (
        <div className="h-[70vh] w-full md:h-[80vh]">
            {/* 1) object > 2) iframe > 3) 링크 안내 순서로 폴백 */}
            <object data={src} type="application/pdf" className="h-full w-full rounded">
                <iframe src={src} className="h-full w-full rounded" title="PDF 문서" />
                <div className="p-4 text-sm text-gray-600">
                    이 브라우저는 PDF 미리보기를 지원하지 않습니다.{" "}
                    <a href={src} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        새 탭으로 열거나
                    </a>{" "}
                    <a href={src} download className="text-blue-600 underline">
                        다운로드
                    </a>
                    해 확인해 주세요.
                </div>
            </object>
        </div>
    );
}
