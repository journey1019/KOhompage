import Image from 'next/image';

export default function Cart() {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <Image
                        src='/images/posts/javascript-10-tips.png'
                        className='h-48 w-full object-cover md:h-full md:w-48'
                        alt='Modern building architecture'
                        width={500}
                        height={700}
                        unoptimized
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company
                        retreats
                    </div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible
                        accommodation for your team</a>
                    <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome
                        food and take in some sunshine? We have a list of places to do just that.</p>
                </div>
            </div>
        </div>
    )
}