// src/lib/utils/payment.ts
export const formatCurrency = (n: number) =>
    n.toLocaleString('ko-KR') + '원';

export const onlyDigits = (v: string) => (v || '').replace(/[^0-9]/g, '');
