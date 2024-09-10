import Image from 'next/image';
import profileImage from '../../public/images/profile.png';
import Link from 'next/link';

export default function Hero() {
    return(
        <section className='bg-white dark:bg-gray-900'>
            <div className='py-96 text-center py-96'>
                {/*<Image className='rounded-full mx-auto' src={profileImage} alt='Picture of the author' width={250} height={250}/>*/}
                <h2 className='text-3xl text-black dark:text-white font-bold mt-2'>{"Hello, Here is Korea Orbcomm"}</h2>
                <h2 className='text-xl text-black dark:text-white font-semibold'>Satellite communication service provider</h2>
                <p className='text-black dark:text-gray-100'>Korea ORBCOMM</p>
                <Link href='/contact'>
                    <button className='bg-red-800 font-bold text-white rounded-xl py-1 px-4 mt-2'>Contact Us!</button>
                </Link>
            </div>
        </section>
    )
}