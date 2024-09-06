import Link from 'next/link';
import Mode from '@/components/Mode';

export default function Header() {
    return(
        <header className='flex justify-between items-center p-4'>
            <Link href="/">
                <h1 className="text-3xl font-bold">{"KOREA ORBCOMM"}</h1>
            </Link>
            <nav className='flex'>
                <div className='flex gap-4'>
                    <Link href={'/solutions'}>SOLUTIONS</Link>
                    <Link href={'/hardware'}>HARDWARE</Link>
                    <Link href={'/company'}>COMPANY</Link>
                    <Link href={'/support'}>SUPPORT</Link>
                </div>
                <div className="ml-10 px-4 text-center justify-center items-center bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-lg">
                    <button>Login</button>
                </div>
                <div className='pl-10 pr-5 text-center justify-center items-center'>
                    <Mode/>
                </div>
            </nav>
        </header>
    )
}