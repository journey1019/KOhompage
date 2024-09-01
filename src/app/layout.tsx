// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';


type Props = {
    children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
        <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/solutions">Solutions</Link>
                    </li>
                    <li>
                        <Link href="/hardware">Hardware</Link>
                    </li>
                    <li>
                        <Link href="/company">Company</Link>
                    </li>
                    <li>
                        <Link href="/support">Support</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
        <footer>Footer Content</footer>
        </body>
        </html>
    );
}
