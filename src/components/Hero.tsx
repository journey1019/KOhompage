import Image from 'next/image';
import profileImage from '../../public/images/profile.png';
import Link from 'next/link';

export default function Hero() {
    return(
        <section className='text-center bg-black text-white py-20'>
            {/*<Image className='rounded-full mx-auto' src={profileImage} alt='Picture of the author' width={250} height={250}/>*/}
            <h2 className='text-3xl font-bold mt-2'>{"Hello, Here is Korea Orbcomm"}</h2>
            <h2 className='text-xl font-semibold'>Satellite communication service provider</h2>
            <p>Korea ORBCOMM</p>
            <Link href='/contact'>
                <button className='bg-red-800 font-bold text-white rounded-xl py-1 px-4 mt-2'>Contact Us!</button>
            </Link>
        </section>
    )
}