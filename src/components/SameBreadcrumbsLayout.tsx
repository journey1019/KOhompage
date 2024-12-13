import React from 'react';
import SameBreadcrumbs from '@/components/SameBreadcrumbs';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string; classification?: string; id?: string }; // id 추가
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    const { locale, classification, id } = params;

    // notice/[id]와 notice/new 경로에서는 Breadcrumbs를 사용하지 않음
    const isExcludedPath =
        classification === 'notice' && (id !== undefined || id === 'new');

    const breadcrumbs = [
        // { label: 'Resources', href: `/${locale}/resources` }, // 항상 고정된 위치
        { label: 'Blog', href: `/${locale}/resources/blog` },
        { label: 'Notice', href: `/${locale}/resources/notice` },
        { label: 'Board', href: `/${locale}/resources/board` },
    ];

    return (
        <div>
            {/* Breadcrumbs 컴포넌트에 classification 전달 */}
            {!isExcludedPath && <SameBreadcrumbs items={breadcrumbs} current={classification || ''} />}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
