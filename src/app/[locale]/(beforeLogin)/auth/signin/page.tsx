import LoginModal from "@/app/[locale]/(beforeLogin)/_component/LoginModal";
import { use } from 'react';

interface Props {
    params: Promise<{ locale: string }>;
}

const SignInPage = ({ params }: Props) => {
    const { locale } = use(params); // ✅ Promise 해제
    return(
        <LoginModal locale={locale}/>
    )
}

export default SignInPage;