// data/products.ts
import { Product } from '@/types/product'

export const products: Product[] = [
    { id: 'item-1', name: 'Starlink Set', category: 'device', price: 1100000, paymentType: 'one-time', image: '' },
    { id: 'item-2', name: 'ST6100', category: 'device', price: 1500000, paymentType: 'one-time', image: '' },
    { id: 'item-3', name: 'KSV-1001', category: 'device', price: 1800000, paymentType: 'one-time', image: '/images/shop/hardware/KSV.png' },
    { id: 'item-4', name: '어선안전법 대응 서비스 (6개월 통신료 포함)', category: 'package', price: 2500000, paymentType: 'one-time', image: '/images/shop/solution/fishing_boat1.png' },
    { id: 'item-5', name: 'Starlink 통신료', category: 'service', price: 55000, paymentType: 'subscription', image: '' },
    { id: 'item-6', name: 'VMS Commtrace', category: 'service', price: 66000, paymentType: 'subscription', image: '/images/shop/solution/VMS.png' }
]


export const productList: Product[] = [
    { id: 'item-1', name: 'Starlink Set', category: 'device', price: 1100000, paymentType: 'one-time', image: '/images/shop/hardware/StarlinkSet.png' },
    { id: 'item-2', name: 'ST6100', category: 'device', price: 44000, paymentType: 'one-time', image: '/images/shop/hardware/ST6100.png' },
    { id: 'item-3', name: 'KSV-1001', category: 'device', price: 1400000, paymentType: 'one-time', image: '/images/shop/hardware/KSV.png' },
    { id: 'item-4', name: '어선안전법 대응 서비스 (6개월 통신료 포함)', category: 'package', price: 475000, paymentType: 'one-time', image: '/images/shop/solution/fishing_boat1.png' },
    { id: 'item-5', name: 'Starlink 통신료', category: 'service', price: 55000, paymentType: 'subscription', image: '/images/shop/telecom/telecommunication_charge.png' },
    { id: 'item-6', name: 'VMS Commtrace', category: 'service', price: 66000, paymentType: 'subscription', image: '/images/shop/solution/VMS.png' }
]
