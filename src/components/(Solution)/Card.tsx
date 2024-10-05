import Image from 'next/image';

export default function Card() {
    return (
        <div className='w-full dark:bg-gray-900'>
            <div className="max-w-2xl mx-auto p-4 lg:max-w-7xl lg:px-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mx-auto">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="md:shrink-0">
                            <Image
                                className="h-full w-full object-cover md:h-full md:w-48 lg:w-96"
                                src="/images/posts/javascript-10-tips.png"
                                alt="Modern building architecture"
                                width={300}
                                height={100}
                                unoptimized
                            />
                        </div>
                        {/* Content Section */}
                        <div className="p-6 md:p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                Company retreats
                            </div>
                            <a
                                href="#"
                                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                            >
                                Incredible accommodation for your team
                            </a>
                            <p className="mt-2 text-slate-500">
                                Looking to take your team away on a retreat to enjoy awesome food and take in some
                                sunshine?
                                We have a list of places to do just that.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
