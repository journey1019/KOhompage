import Image from 'next/image';
import { Solution } from '@/service/solutions';

type Props = { solution: Solution }
export default function SolutionCard({ solution: { solution, title, subTitle, image, advantage } }: Props) {
    return (
        <div className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-md leading-8 text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
                            {subTitle}
                        </p>
                    </div>
                    <dl className="flex justify-center">
                        <Image
                            src={image}
                            className="w-full h-auto filter brightness-80 dark:brightness-75 object-cover rounded-lg"
                            alt="Solution Image"
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
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-40"
                />
            </div>
            <div className="grid grid-cols-1 gap-8 mx-auto mt-10 max-w-7xl sm:mt-20 sm:grid-cols-1 lg:grid-cols-3">
                {advantage.map((good) => (
                    <div className="flex flex-col p-5 relative hover:transform hover:-translate-x-2 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 ease-out border-2 border-transparent hover:border-gray-200 hover:rounded-lg dark:hover:border-gray-600 dark:shadow-gray-700"
                        key={good.image}
                    >
                        <Image
                            src={good.image}
                            alt="Advantage Icon"
                            className="my-2 dark:filter dark:invert dark:brightness-50"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {good.title}
                        </h2>
                        <p className="mt-2 text-base text-gray-700 dark:text-gray-400">
                            {good.subTitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
