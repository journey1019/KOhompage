import React from 'react';
import SameBreadCrumbs from '@/components/SameBreadCrumbs';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string; classification: string };
}

const classifications = {
    Video: '/[locale]/resources/blog/video',
    Datasheet: '/[locale]/resources/blog/datasheet',
    Brochure: '/[locale]/resources/blog/brochure',
};

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    const { locale, classification } = params;

    const breadcrumbs = [
        { label: 'Blog', href: `/${locale}/resources/blog` },
        { label: 'Video', href: `/${locale}/resources/blog/video` },
        { label: 'Brochure', href: `/${locale}/resources/blog/brochure` },
        { label: 'Datasheet', href: `/${locale}/resources/blog/datasheet` },
    ];

    return (
        <div>
            <SameBreadCrumbs items={breadcrumbs} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
