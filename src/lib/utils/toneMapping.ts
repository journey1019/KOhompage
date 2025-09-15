// src/app/[locale]/online-store/superAdmin/paid/utils/toneMapping.ts
import type { BadgeTone } from "@/components/(Online-Store)/MyPage/Badge";

export function toneByStatus(
    statusLocale?: string,
    purchaseStatus?: string | number,
    cancelledPrice?: number
): BadgeTone {
    const s = (statusLocale || "").toLowerCase().trim();

    if (typeof cancelledPrice === "number" && cancelledPrice > 0) {
        return "yellow";
    }
    if (/완료|성공/.test(s)) return "green";
    if (/대기/.test(s)) return "yellow";
    if (/취소|실패|거절/.test(s)) return "red";

    const p = String(purchaseStatus || "").toUpperCase();
    if (p === "PAID") return "green";
    if (p === "PENDING" || p === "WAIT") return "yellow";
    if (p === "CANCELLED" || p === "FAIL") return "red";

    return "gray";
}

export function toneByMethod(method?: string): BadgeTone {
    const m = (method || "").toLowerCase().trim();
    if (m === "card") return "blue";
    if (m === "vbank" || m === "bank") return "yellow";
    if (m === "phone") return "green";
    if (m === "kakao" || m === "naverpay") return "blue";
    return "gray";
}

export function toneByCategory(category?: string): BadgeTone {
    const c = (category || "").toLowerCase().trim();
    if (c.includes("inmarsat")) return "blue";
    if (c.includes("starlink")) return "green";
    if (c.includes("og2") || c.includes("orbcomm")) return "yellow";
    return "gray";
}

export function toneByType(type?: string): BadgeTone {
    const t = (type || "").toLowerCase().trim();
    if (t === "device") return "blue";
    if (t === "service") return "green";
    if (t === "plan" || t === "subscription") return "yellow";
    return "gray";
}
