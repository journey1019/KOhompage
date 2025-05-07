import PageHero from '@/components/PageHero';
import React from 'react';
import Payment from '@/components/(Shop)/Payment';
import AuthComponent from '@/components/(Shop)/Auth';

const ShopPage = () => {
    return(
        <section>
            <PageHero
                size="py-52"
                url="/images/shop/shop2.png"
                intro=""
                title="요금제 구매"
                subtitle=""
            />
            <AuthComponent/>

            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">Shop</h1>

                <Payment/>

            </div>
        </section>
    )
}

export default ShopPage;