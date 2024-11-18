import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function HomePage() {
    const t = useTranslations('home');
    return (
        <div>
            <h1>{t('HomePage.title')}</h1>
            <Link href="/about">{t('HomePage.about')}</Link>
        </div>
    );
}