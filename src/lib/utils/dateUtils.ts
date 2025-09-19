// src/app/[locale]/online-store/superAdmin/paid/utils/dateUtils.ts
import { toDash, fromDash } from "@/module/helper";

export function ymdToInput(ymd: string) {
    try {
        return toDash(ymd);
    } catch {
        return "";
    }
}
export function inputToYmd(input: string) {
    try {
        return fromDash(input);
    } catch {
        return "";
    }
}

export const fmtInputKST = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(d);

export function formatDateTimeKST(s?: string) {
    if (!s) return '-';
    const d = new Date(s.replace(' ', 'T') + '+09:00');
    if (Number.isNaN(d.getTime())) return s;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}


export function todayDash(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function ymd(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${dd}`
};