'use client';

import { useSession } from 'next-auth/react';

const AuthComponent = () => {
    const { data: session, status } = useSession();
    console.log(session)
    console.log(status)
    if (session?.user?.role === 'ADMIN') {
        // 관리자 권한 허용
        console.log('관리자입니다.');
    } else {
        console.log('일반 사용자입니다.');
    }
    return(
        <>
        </>
    )
}
export default AuthComponent;