export type TaxYN = 'Y' | 'N';
export type TaxType = 'percent' | 'fee';

export function toTaxYN(v: string | undefined | null): TaxYN {
    return String(v).toUpperCase() === 'N' ? 'N' : 'Y';
}

export function toTaxType(v?: string | null): TaxType | undefined {
    return v === 'percent' || v === 'fee' ? v : undefined;
}
