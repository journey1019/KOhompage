import { ProductCard } from '@/components/ProductCard';

const products = [
    {
        id: 2,
        name: 'General and Multi-Purpose Asset Tracking',
        href: '#',
        price: 'ST6000 Series',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/use/CT-3500.png',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 4,
        name: 'Maritime',
        href: '#',
        price: 'Focus Paper Refill',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/ST-6100.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
];

export default function ProductGrid() {
    return (
        <div className="bg-white dark:bg-gray-900">

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <p className='w-full justify-center text-4xl dark:text-white'>Hardware</p>
                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            href={product.href}
                            price={product.price}
                            imageSrc={product.imageSrc}
                            imageAlt={product.imageAlt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
