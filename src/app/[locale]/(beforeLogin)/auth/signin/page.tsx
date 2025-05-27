import LoginModal from "@/app/[locale]/(beforeLogin)/_component/LoginModal";
import Main from "@/app/[locale]/(beforeLogin)/_component/Main";
import { use } from 'react';

interface Props {
    params: Promise<{ locale: string }>;
}

const SignInPage = ({ params }: Props) => {
    const { locale } = use(params); // ✅ Promise 해제
    return(
        <LoginModal locale={locale}/>
        // <Main/>
    )
}

export default SignInPage;