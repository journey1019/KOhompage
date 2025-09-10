import React, { type Dispatch, type SetStateAction } from "react";
import { formatKST } from '@/module/pgAdminHelper';
import { Badge } from "@/components/(Online-Store)/Admin/AdminUI";
import type { ProductDetailResponse } from "@/lib/api/adminApi";

// ✅ 실제 프로젝트의 Product 타입을 export하는 위치로 바꿔서 import 하세요.
// 임시 최소 정의가 필요하면 아래 주석의 대체 타입을 사용해도 됩니다.
// import type { Product } from "@/lib/types";
type Product = {
    productId: number;
    productNm?: string;
    productCategory?: string;
    productType?: string;
    useYn?: "Y" | "N" | string;
    createId?: string;
    updateId?: string;
    createDate?: string;
    updateDate?: string;
    codeOption?: string[];
    // 필요 시 필드 추가
};

type ModalMode = "create" | "edit" | "deleteConfirm" | null;

interface AdminProductDetailProps {
    selected: Product;
    setSelected: Dispatch<SetStateAction<Product | null>>;
    setModalMode: Dispatch<SetStateAction<ModalMode>>;
    detail: ProductDetailResponse | null;
    detailLoading: boolean;
    detailError: string | null;
    /** ✅ 선택 prop로 변경 */
    imageUrl?: string;
}

const AdminProductDetail: React.FC<AdminProductDetailProps> = ({
                                                                   selected,
                                                                   setSelected,
                                                                   setModalMode,
                                                                   detail,
                                                                   detailLoading,
                                                                   detailError,
                                                                   imageUrl,
                                                               }) => {

    return (
        <>
            {/* 예시: 로딩/에러/콘텐츠 */}
            {detailLoading && <div className="text-sm text-gray-500">로딩 중…</div>}
            {detailError && (
                <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {detailError}
                </div>
            )}

            {detail && (
                <div className="space-y-3">
                    {/* 이미지 */}
                    {/*<div>*/}
                    {/*    <div className="text-xs text-gray-500">메인 이미지</div>*/}
                    {/*    {imageUrl ? (*/}
                    {/*        <img*/}
                    {/*            src={imageUrl}*/}
                    {/*            alt={detail.mainImageFileNm ?? detail.productNm}*/}
                    {/*            className="mt-1 aspect-square w-full rounded border object-cover"*/}
                    {/*        />*/}
                    {/*    ) : (*/}
                    {/*        <div className="mt-1 rounded border bg-gray-50 p-4 text-center text-gray-400">*/}
                    {/*            이미지 없음*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* 기본 정보 */}
                    <div>
                        <div className="text-xs text-gray-500">상품ID</div>
                        <div className="font-medium">{selected.productId}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">상품명</div>
                        <div>{selected.productNm}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <div className="text-xs text-gray-500">분류</div>
                            <div>{selected.productCategory}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">타입</div>
                            <div>{selected.productType}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">사용</div>
                            <div>{selected.useYn}</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">구매옵션</div>
                        <div>{(selected.codeOption?.length ?? 0) > 0 ? selected.codeOption?.join(", ") : "없음"}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="text-xs text-gray-500">생성자</div>
                            <div>{selected.createId}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">수정자</div>
                            <div>{selected.updateId}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="text-xs text-gray-500">생성일</div>
                            <div>{formatKST(selected.createDate)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">최종수정</div>
                            <div>{formatKST(selected.updateDate)}</div>
                        </div>
                    </div>

                    {/* 상세 데이터: 로딩/에러/콘텐츠 */}
                    <div className="pt-3 border-t mt-3">
                        <div className="mb-2 text-xs text-gray-500">상세 정보</div>

                        {detailLoading && (
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
                                <div className="h-4 w-48 rounded bg-gray-100 animate-pulse" />
                                <div className="h-24 w-full rounded bg-gray-100 animate-pulse" />
                            </div>
                        )}

                        {detailError && (
                            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                                {detailError}
                            </div>
                        )}

                        {detail && (
                            <div className="space-y-4">
                                {/* 메인이미지 & 설명 */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-1">
                                        <div className="text-xs text-gray-500">메인 이미지</div>
                                        {detail.mainImagePath ? (
                                            // 서버 경로일 수 있으니 우선 그대로 노출
                                            <img
                                                src={imageUrl}
                                                alt={detail.mainImageFileNm ?? detail.productNm}
                                                className="mt-1 aspect-square w-full rounded border object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="mt-1 rounded border bg-gray-50 p-4 text-center text-gray-400">
                                                이미지 없음
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-xs text-gray-500">설명</div>
                                        <div className="mt-1 whitespace-pre-wrap">
                                            {detail.mainDesc ?? "—"}
                                        </div>

                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            <div>
                                                <div className="text-xs text-gray-500">재고 수량</div>
                                                <div className="font-medium">{detail.stockQuantity}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">구매 제한</div>
                                                <div className="font-medium">
                                                    {detail.availablePurchase ?? (detail as any).avaliablePurchase ?? 0}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">옵션 코드</div>
                                                <div className="truncate">
                                                    {(detail.codeOption?.length ?? 0) > 0
                                                        ? detail.codeOption?.join(", ")
                                                        : "없음"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 가격 리스트 */}
                                <div>
                                    <div className="text-xs text-gray-500">가격 리스트</div>
                                    {detail.productPriceList?.length ? (
                                        <div className="mt-2 overflow-hidden rounded border">
                                            <table className="w-full text-xs">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-2 py-1 text-left font-medium">권한</th>
                                                    <th className="px-2 py-1 text-right font-medium">기본금액</th>
                                                    <th className="px-2 py-1 text-center font-medium">부가세</th>
                                                    <th className="px-2 py-1 text-center font-medium">타입</th>
                                                    <th className="px-2 py-1 text-right font-medium">값</th>
                                                    <th className="px-2 py-1 text-right font-medium">최종요금</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {detail.productPriceList.map((it, i) => (
                                                    <tr key={i} className="border-t">
                                                        <td className="px-2 py-1">{it.roleId}</td>
                                                        <td className="px-2 py-1 text-right">
                                                            {it.productPrice.toLocaleString()}
                                                        </td>
                                                        <td className="px-2 py-1 text-center">{it.taxAddYn}</td>
                                                        <td className="px-2 py-1 text-center">{it.taxAddType}</td>
                                                        <td className="px-2 py-1 text-right">
                                                            {it.taxAddType === "percent"
                                                                ? `${it.taxAddValue}%`
                                                                : it.taxAddValue.toLocaleString()}
                                                        </td>
                                                        <td className="px-2 py-1 text-right font-semibold">
                                                            {it.finalfee.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="mt-1 rounded border bg-gray-50 p-3 text-gray-500">
                                            가격 정보 없음
                                        </div>
                                    )}
                                </div>

                                {/* 구매 대기 목록 */}
                                <div>
                                    <div className="text-xs text-gray-500">구매 대기 목록</div>
                                    {detail.purchaseWatingList?.length ? (
                                        <div className="mt-2 overflow-hidden rounded border">
                                            <table className="w-full text-xs">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-2 py-1 text-left font-medium">Idx</th>
                                                    <th className="px-2 py-1 text-left font-medium">구매자</th>
                                                    <th className="px-2 py-1 text-center font-medium">상태</th>
                                                    <th className="px-2 py-1 text-right font-medium">수량</th>
                                                    <th className="px-2 py-1 text-center font-medium">만료시각</th>
                                                    <th className="px-2 py-1 text-center font-medium">만료인덱스</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {detail.purchaseWatingList.map((w) => (
                                                    <tr key={w.purchaseIndex} className="border-t">
                                                        <td className="px-2 py-1">{w.purchaseIndex}</td>
                                                        <td className="px-2 py-1">{w.userId}</td>
                                                        <td className="px-2 py-1 text-center">
                                                            <Badge
                                                                tone={w.purchaseYn === "Y" ? "green" : w.purchaseYn === "N" ? "red" : "yellow"}>
                                                                {w.purchaseYn}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-2 py-1 text-right">{w.purchaseQuantity}</td>
                                                        <td className="px-2 py-1 text-center">{formatKST(w.purchaseExpired)}</td>
                                                        <td className="px-2 py-1 text-center">{w.expiredIndex}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="mt-1 rounded border bg-gray-50 p-3 text-gray-500">
                                            대기 내역 없음
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <div className="text-xs text-gray-500">빠른 작업</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <button onClick={() => {
                                setSelected(selected);
                                setModalMode("edit");
                            }} className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50">수정
                            </button>
                            <button onClick={() => {
                                setSelected(selected);
                                setModalMode("deleteConfirm");
                            }} className="rounded-md border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50">삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminProductDetail;
