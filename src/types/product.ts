// types/product.ts
export interface Product {
    id: string
    name: string
    category: 'device' | 'service' | 'package' | 'telecom_fee'
    price: number
    paymentType: 'one-time' | 'subscription'
    description?: string
    image?: string
}
