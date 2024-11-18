import { Metadata } from 'next';

export const metadata = {
    title: {
        default: 'KOREA ORBCOMM | Board',
        template: 'KOREA ORBCOMM | %s'
    },
    description: '코리아오브컴 게시판',
    icons: {
        icon: '/favicon.ico',
    }
}

type Props = {
    children: React.ReactNode;
}
export default function BoardLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    );
}
