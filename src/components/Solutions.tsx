import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const solution1_good = [
    {
        image: '/images/icons/truck.png',
        title: 'Free Shipping',
        subTitle: 'It\'s not actually free we just price it into the products.Someone\'s paying for it, and it\'s not us'
    },
    {
        image: '/images/icons/trophy.png',
        title: '10-year warranty',
        subTitle: 'If it breaks in the first 10 years we\'ll replace it. After that you\'re on your own though'
    },
    {
        image: '/images/icons/exchange.png',
        title: 'Exchanges',
        subTitle: 'If you don\'t like it, trade it to one of your friends for something of theirs. Don\'t send it here though.'
    },
]

export default function Solutions() {
    return(
        <div className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-900 py-16 sm:py-24 lg:py-32 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">Solution1. We Built our business on great customer service</h2>
                        <p className="mt-4 text-md leading-8 text-gray-600 dark:text-gray-300">
                            At the beginning at least, but then we realized we could make a lot more money if we kinda stopped caring about that. Our new strategy is to write a bunch of things that look really good in the headlines, then clarify in the small print but hope people don&apos;t actually read it.
                        </p>
                        {/*<div className="mt-20 flex max-w-md gap-x-4">*/}
                        {/*    <label htmlFor="email-address" className="sr-only">*/}
                        {/*        Email address*/}
                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        id="email-address"*/}
                        {/*        name="email"*/}
                        {/*        type="email"*/}
                        {/*        required*/}
                        {/*        placeholder="Enter your email"*/}
                        {/*        autoComplete="email"*/}
                        {/*        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"*/}
                        {/*    />*/}
                        {/*    <button*/}
                        {/*        type="submit"*/}
                        {/*        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"*/}
                        {/*    >*/}
                        {/*        Subscribe*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                    <dl className="flex">
                        <Image
                            src='https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg'
                            className='w-full h-1/3 filter brightness-80'
                            alt='Solution1'
                            width={500}
                            height={700}
                            unoptimized
                        />
                    </dl>
                </div>
            </div>
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                />
            </div>
            <div
                className='grid grid-cols-1 gap-8 mx-auto mt-10 max-w-7xl sm:mt-20 sm:grid-cols-1 lg:grid-cols-3'>
                {solution1_good.map((good) => (
                    <div className="flex flex-col" key={good.image}>
                        <Image src={good.image} alt="truck"
                               className="my-2 dark:filter dark:invert dark:brightness-0" width={100} height={100}
                               unoptimized />
                        <h2 className="text-lg font-semibold dark:text-white">{good.title}</h2>
                        <p className="mt-2 text-base text-gray-700 dark:text-gray-400">{good.subTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}