import React from 'react';
import SameBreadcrumbs from '@/components/SameBreadcrumbs';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string; classification: string };
}

const classifications = {
    Notice: '/[locale]/resources/notice',
    New: '/[locale]/resources/notice/new',
    Video: '/[locale]/resources/blog/video',
    Datasheet: '/[locale]/resources/blog/datasheet',
    Brochure: '/[locale]/resources/blog/brochure',
};

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    const { locale, classification } = params;

    const breadcrumbs = [
        { label: 'Resources', href: undefined }, // 항상 고정된 위치
        { label: 'Notice', href: `/${locale}/resources/notice` },
        { label: 'Blog', href: `/${locale}/resources/blog` },
        { label: 'Board', href: `/${locale}/resources/board` },
    ];

    return (
        <div>
            <SameBreadcrumbs items={breadcrumbs} current={classification} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;