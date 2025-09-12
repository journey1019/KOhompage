import { ProductPriceItem } from '@/lib/api/adminApi';
import { className } from 'postcss-selector-parser';

/** PG - Admin FormatKST */
export function formatKST(datetimeStr?: string) {
    if (!datetimeStr) return "-";
    const iso = datetimeStr.replace(" ", "T") + "+09:00";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return datetimeStr;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

/** PG - Final Fee 계산 */
export function calcFinalfee(row: ProductPriceItem) {
    const base = Number(row.productPrice) || 0;
    if (row.taxAddYn === "Y") {
        if (row.taxAddType === "percent") return Math.round(base * (1 + (Number(row.taxAddValue) || 0) / 100));
        return base + (Number(row.taxAddValue) || 0);
    }
    return base;
}


export const fmtKST = (s?: string | null) => {
    if (!s) return "-";
    const d = new Date(String(s).replace(" ", "T") + "+09:00");
    if (Number.isNaN(d.getTime())) return s as string;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
        d.getHours()
    )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};