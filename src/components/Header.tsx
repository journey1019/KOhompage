import Link from 'next/link';

export default function Header() {
    return(
        <header className='flex justify-between items-center p-4'>
            <Link href="/">
                <h1 className="text-3xl font-bold">{"KOREA ORBCOMM"}</h1>
            </Link>
            <nav className='flex gap-4'>
                <Link href={'/solutions'}>SOLUTIONS</Link>
                <Link href={'/hardware'}>HARDWARE</Link>
                <Link href={'/company'}>COMPANY</Link>
                <Link href={'/support'}>SUPPORT</Link>
            </nav>
        </header>
    )
}