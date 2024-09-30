import Image from 'next/image';
import profileImage from '../../public/images/profile.png';
import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';

export default function Hero() {
    return(
        <section className="relative w-full h-[calc(100vh-74px)] bg-white dark:bg-gray-900">
            <VideoBackground src="/video/main_video.mov" />

            {/* 비디오 위에 표시되는 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full dark:bg-black/50">
                <h2 className="text-3xl text-white font-bold mt-2">
                    {'Hello, Here is Korea Orbcomm'}
                </h2>
                <h2 className="text-xl text-white font-semibold">
                    Satellite communication service provider
                </h2>
                <p className="text-gray-100">Korea ORBCOMM</p>
                <Link href="/contact">
                    <button className="bg-red-800 font-bold text-white rounded-xl py-1 px-4 mt-2">
                        Contact Us!
                    </button>
                </Link>
            </div>
        </section>
        // <section className='bg-white dark:bg-gray-900'>
        //     <div className='py-96 text-center'>
        //         {/*<Image className='rounded-full mx-auto' src={profileImage} alt='Picture of the author' width={250} height={250}/>*/}
        //         <h2 className='text-3xl text-black dark:text-white font-bold mt-2'>{"Hello, Here is Korea Orbcomm"}</h2>
        //         <h2 className='text-xl text-black dark:text-white font-semibold'>Satellite communication service provider</h2>
        //         <p className='text-black dark:text-gray-100'>Korea ORBCOMM</p>
        //         <Link href='/contact'>
        //             <button className='bg-red-800 font-bold text-white rounded-xl py-1 px-4 mt-2'>Contact Us!</button>
        //         </Link>
        //     </div>
        // </section>
    )
}