'use client';

import PageHero from '@/components/PageHero';
import React, { useState } from 'react';
import AuthComponent from '@/components/(Shop)/Auth';
import { productList } from '@/data/products';
import ProductCard from '@/components/(Shop)/ProductCard';

const ShopPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return(
        <section>
            <PageHero
                size="py-52"
                url="/images/shop/shop2.png"
                intro=""
                title="요금제 구매"
                subtitle=""
            />
            <AuthComponent />

            <div className="mx-auto max-w-7xl maxWeb:max-w-screen-2xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl maxWeb:text-5xl font-bold text-gray-800 mb-8">Shop</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
                    {/* Left Section: SearchBar & Filtering */}
                    <div className="lg:col-span-1 space-y-6">

                    </div>

                    {/* Right Section: Products */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="col-span-full flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
                            </div>
                        ) : productList.length > 0 ? (
                            productList.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-10">
                                No products available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopPage;