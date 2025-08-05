// lib/api/mock/payment.ts

export async function mockValidateApi(productId: string) {
    if (productId === 'item-3') {
        return { success: false, message: '해당 상품은 품절되었습니다.' };
    }
    return { success: true };
}
