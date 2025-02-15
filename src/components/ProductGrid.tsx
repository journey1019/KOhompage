import { ProductCard } from '@/components/ProductCard';
import SerachCategory from '@/components/SearchCategory';
import PageHero from '@/components/PageHero';

const products = [
    {
        id: 1,
        name: '분류',
        href: '#',
        price: 'Earthen Bottle',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/GT-1200-index.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'General and Multi-Purpose Asset Tracking',
        href: '#',
        price: 'ST6000 Series',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/use/CT-3500.png',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'General and Multi-Purpose Asset Tracking',
        href: '#',
        price: 'ST-9100',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/use/ST-2100.png',
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
    {
        id: 5,
        name: 'General and Multi-Purpose Asset Tracking',
        href: '#',
        price: 'Machined Mechanical Pencil',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/IDP-800_index.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 6,
        name: 'Modem',
        href: '#',
        price: 'Focus Card Tray',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/ST-6100.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 7,
        name: 'VSAT',
        href: '#',
        price: 'Focus Multi-Pack',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/use/ST-9100.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 8,
        name: 'Trailer Tracking',
        href: '#',
        price: 'Nomad Tumbler',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/VSAT_Antenna.png',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 9,
        name: 'Focus Carry Pouch',
        href: '#',
        price: 'Nomad Tumbler',
        imageSrc: 'https://www.orbcomm.co.kr/resources/img/hardware/new/use/ST-9100.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
];

export default function ProductGrid() {
    return (
        <div className="bg-white dark:bg-gray-900">
            <PageHero
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                intro="KOREAORBCOMM FOR FINANCIAL SERVICES"
                title="글로벌 통신으로 경험을 향상시키세요"
                subtitle="이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다."
            />
            <div className="flex relative w-full flex-row ">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-white font-bold mt-2 text-center">
                    제품정보, 증상을 찾아보세요
                </h2>
            </div>
            {/*<SerachCategory />*/}
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <p className='w-full justify-center text-4xl dark:text-white'>ALL</p>
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
