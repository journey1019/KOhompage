// src/components/Analytics.tsx
'use client'

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (!window.gtag) return;
        window.gtag('config', 'G-2NGPZE546T', {
            page_path: pathname,
        });
    }, [pathname]);

    return null;
}
